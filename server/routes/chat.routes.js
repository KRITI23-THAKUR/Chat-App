import express from "express";
import { deleteMessage, fetchMessages, sendMessage } from "../controllers/message.controller.js";
import { authUser } from "../middleware/authMiddleware.js";
import { connection, deleteWholeChat } from "../controllers/chat.controller.js"
import { connectionValidator, deleteMessageValidator, fetchMessagesValidator, sendMessageValidator } from "../utils/validations/chat.validation.js";
import { validate } from "../middleware/validate.js";

const router=express.Router()

router.post("/message/:receiverId",authUser,sendMessageValidator,validate,sendMessage)
router.get("/connections",authUser,connectionValidator,validate,authUser,connection)
router.get("/messages/:chatId",authUser,fetchMessagesValidator,validate,fetchMessages)
router.delete("/message/:messageId",authUser,deleteMessageValidator,validate,deleteMessage)
router.delete("/:chatId",authUser,deleteMessageValidator,validate,deleteWholeChat)

export default router  