import {
    generateChatbotResponse,
    getUserConversations,
    getConversationById,
    deleteConversation,
    createNewConversation
} from "./chatbot.service.js";

const chat = async (req, res) => {
    try {
        const { message, conversationId } = req.body;
        const userId = req.user.id;

        const result = await generateChatbotResponse(
            message,
            conversationId,
            userId
        );

        return res.status(200).json({
            success: true,
            data: {
                conversationId: result.conversationId,
                message,
                reply: result.reply
            }
        });
    } catch (error) {
        console.error("Chatbot error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to process chatbot request",
            error: error.message
        });
    }
};

const getConversations = async (req, res) => {
    try {
        const userId = req.user.id;

        const conversations = await getUserConversations(userId);

        return res.status(200).json({
            success: true,
            data: conversations
        });
    } catch (error) {
        console.error("Get conversations error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch conversations",
            error: error.message
        });
    }
};

const getConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;

        const conversation = await getConversationById(
            conversationId,
            userId
        );

        return res.status(200).json({
            success: true,
            data: conversation
        });
    } catch (error) {
        console.error("Get conversation error:", error.message);

        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const removeConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;

        await deleteConversation(
            conversationId,
            userId
        );

        return res.status(200).json({
            success: true,
            message: "Conversation deleted successfully"
        });
    } catch (error) {
        console.error("Delete conversation error:", error.message);

        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const newConversation = async (req, res) => {
    try {
        const userId = req.user.id;

        const conversation = await createNewConversation(userId);

        return res.status(201).json({
            success: true,
            data: {
                conversationId: conversation._id,
                title: conversation.title,
                messages: conversation.messages
            }
        });
    } catch (error) {
        console.error("Create conversation error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to create new conversation",
            error: error.message
        });
    }
};

export {
    chat,
    getConversations,
    getConversation,
    removeConversation,
    newConversation
};