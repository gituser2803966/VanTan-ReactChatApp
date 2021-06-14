import express from "express";
import { CreateConversation } from "../controllers/ConversationController.js";

const router = express.Router();

router.post("/new", CreateConversation);

export default router;
