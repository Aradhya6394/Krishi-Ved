import express from "express";

import {
    chat,
    getConversations,
    getConversation,
    removeConversation,
    newConversation
} from "./chatbot.controller.js";

import protect from "../../middleware/auth.middleware.js";

const router = express.Router();


// ==========================================
// CHAT WITH KRISHIVED AI
// ==========================================

router.post(
    "/",
    protect,
    chat
);


// ==========================================
// GET ALL CONVERSATIONS
// ==========================================

router.get(
    "/conversations",
    protect,
    getConversations
);


// ==========================================
// GET ONE CONVERSATION
// ==========================================

router.get(
    "/conversations/:conversationId",
    protect,
    getConversation
);


// ==========================================
// DELETE ONE CONVERSATION
// ==========================================

router.delete(
    "/conversations/:conversationId",
    protect,
    removeConversation
);


// ==========================================
// CREATE NEW CONVERSATION
// ==========================================

router.post(
    "/new",
    protect,
    newConversation
);


export default router;