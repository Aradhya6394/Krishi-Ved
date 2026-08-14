import Groq from "groq-sdk";
import mongoose from "mongoose";
import Conversation from "./chatbot.model.js";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const SYSTEM_PROMPT = `
You are KrishiVed AI, a friendly and helpful agricultural assistant for farmers.

Your main purpose is to have natural conversations with farmers and help them with farming-related questions.

- Talk naturally and simply.
- You may use Hindi, English, or Hinglish depending on the farmer's language.
- Keep answers practical and concise.
- Ask useful follow-up questions when necessary.
- Remember information from previous messages in the same conversation.
- Understand references such as "it", "this crop", "the leaves", "there", etc.
- Do not repeatedly ask for information already provided.
- Do not claim certainty when information is insufficient.
- Do not invent live weather, mandi prices, sensor data, or other real-time information.
- KrishiVed has separate modules for weather, irrigation, mandi prices and other specialized information.
- If the farmer asks for information belonging to a specialized module, tell them to use the relevant KrishiVed module.
- For fertilizers, pesticides and chemicals, avoid giving confident dosage or chemical recommendations without sufficient context.
- Keep responses short unless a detailed explanation is actually needed.
- Be friendly, respectful and helpful.
`;

const generateConversationTitle = (message) => {
    if (!message || !message.trim()) {
        return "New Chat";
    }

    const cleanMessage = message.replace(/\s+/g, " ").trim();

    const title = cleanMessage
        .replace(
            /^(what|why|how|when|where|can|could|should|is|are|my)\s+/i,
            ""
        )
        .trim();

    if (title.length <= 45) {
        return title || "New Chat";
    }

    return `${title.substring(0, 42)}...`;
};

const generateChatbotResponse = async (
    message,
    conversationId = null,
    userId
) => {
    if (!message || !message.trim()) {
        throw new Error("Message is required");
    }

    if (!userId) {
        throw new Error("Authentication required");
    }

    let conversation = null;

    if (conversationId) {
        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            throw new Error("Invalid conversation ID");
        }

        conversation = await Conversation.findOne({
            _id: conversationId,
            userId
        });

        if (!conversation) {
            throw new Error("Conversation not found");
        }
    }

    if (!conversation) {
        conversation = new Conversation({
            userId,
            title: generateConversationTitle(message),
            messages: []
        });

        await conversation.save();
    }

    const chatMessages = [
        {
            role: "system",
            content: SYSTEM_PROMPT
        },
        ...conversation.messages.map((msg) => ({
            role: msg.role,
            content: msg.content
        })),
        {
            role: "user",
            content: message.trim()
        }
    ];

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 1000
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
        throw new Error("AI did not return a response");
    }

    conversation.messages.push({
        role: "user",
        content: message.trim()
    });

    conversation.messages.push({
        role: "assistant",
        content: reply
    });

    if (
        !conversation.title ||
        conversation.title === "New Chat"
    ) {
        conversation.title = generateConversationTitle(message);
    }

    await conversation.save();

    return {
        conversationId: conversation._id.toString(),
        reply
    };
};

const createNewConversation = async (userId) => {
    if (!userId) {
        throw new Error("Authentication required");
    }

    const conversation = new Conversation({
        userId,
        title: "New Chat",
        messages: []
    });

    await conversation.save();

    return conversation;
};

const getUserConversations = async (userId) => {
    if (!userId) {
        throw new Error("Authentication required");
    }

    return await Conversation
        .find({ userId })
        .select("_id title createdAt updatedAt")
        .sort({ updatedAt: -1 });
};

const getConversationById = async (
    conversationId,
    userId
) => {
    if (!userId) {
        throw new Error("Authentication required");
    }

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        throw new Error("Invalid conversation ID");
    }

    const conversation = await Conversation.findOne({
        _id: conversationId,
        userId
    });

    if (!conversation) {
        throw new Error("Conversation not found");
    }

    return conversation;
};

const deleteConversation = async (
    conversationId,
    userId
) => {
    if (!userId) {
        throw new Error("Authentication required");
    }

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        throw new Error("Invalid conversation ID");
    }

    const conversation = await Conversation.findOneAndDelete({
        _id: conversationId,
        userId
    });

    if (!conversation) {
        throw new Error("Conversation not found");
    }

    return conversation;
};

export {
    generateChatbotResponse,
    createNewConversation,
    getUserConversations,
    getConversationById,
    deleteConversation
};