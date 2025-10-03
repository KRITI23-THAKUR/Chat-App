import express from "express";
import { getAllUsers, getCurrentUser } from "../controllers/user.controller.js";
import { authUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authUser,getAllUsers);
router.get("/me", authUser, getCurrentUser);

export default router;
