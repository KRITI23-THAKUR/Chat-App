import { body, param, query } from "express-validator";

// Send Message
export const sendMessageValidator = [
  param("receiverId")
    .isMongoId()
    .withMessage("Invalid receiverId format"),
  body("message")
    .notEmpty()
    .withMessage("Message content is required")
    .isLength({ max: 500 })
    .withMessage("Message cannot exceed 500 characters"),
];

// Fetch Messages
export const fetchMessagesValidator = [
  param("chatId")
    .isMongoId()
    .withMessage("Invalid chatId format"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

// Delete Single Message
export const deleteMessageValidator = [
  param("messageId")
    .isMongoId()
    .withMessage("Invalid messageId format"),
];

// Delete Whole Chat
export const deleteWholeChatValidator = [
  param("chatId")
    .isMongoId()
    .withMessage("Invalid chatId format"),
];

// Connections (optional: add pagination if needed)
export const connectionValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];
