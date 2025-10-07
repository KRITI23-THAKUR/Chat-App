import express from "express";
import { getAllUsers, getCurrentUser, uploadProfilePicture } from "../controllers/user.controller.js";
import { authUser } from "../middleware/authMiddleware.js";
import { getAllUsersValidator } from "../utils/validations/user.validation.js";
import { validate } from "../middleware/validate.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/", authUser,getAllUsersValidator, validate,getAllUsers);
router.get("/me", authUser, getCurrentUser);
router.patch("/profile-picture",authUser,upload.single("file"),uploadProfilePicture)

export default router;
