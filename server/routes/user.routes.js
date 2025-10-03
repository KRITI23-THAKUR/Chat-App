import express from "express";
import { getAllUsers, getCurrentUser } from "../controllers/user.controller.js";
import { authUser } from "../middleware/authMiddleware.js";
import { getAllUsersValidator } from "../utils/validations/user.validation.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.get("/", authUser,getAllUsersValidator, validate,getAllUsers);
router.get("/me", authUser, getCurrentUser);

export default router;
