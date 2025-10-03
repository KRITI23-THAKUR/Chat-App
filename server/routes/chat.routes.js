import express from "express";
import { deleteMessage, fetchMessages, sendMessage } from "../controllers/message.controller.js";
import { authUser } from "../middleware/authMiddleware.js";
import { connection, deleteWholeChat } from "../controllers/chat.controller.js"

const router=express.Router()

router.post("/message/:receiverId",authUser,sendMessage)
router.get("/connections",authUser,connection)
router.get("/messages/:chatId",authUser,fetchMessages)
router.delete("/message/:messageId",authUser,deleteMessage)
router.delete("/:chatId",authUser,deleteWholeChat)

export default router  