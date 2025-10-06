import { query } from "express-validator";

// Validate search query for getAllUsers
export const getAllUsersValidator = [
  query("search")
    .optional()
    .isString()
    .withMessage("Search query must be a string")
];
