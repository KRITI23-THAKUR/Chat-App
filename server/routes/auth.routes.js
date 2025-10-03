import express from "express";
import {register,login,logout}  from "../controllers/auth.controller.js";
import { authUser } from "../middleware/authMiddleware.js";
import { registerValidator } from "../utils/validations/auth.validations.js";
import { validate } from "../middleware/validate.js";

const authRoutes=express.Router();

 authRoutes.post("/register",registerValidator,validate,register);
 authRoutes.post("/login",login);
 authRoutes.get('/logout',authUser,logout);

 export default authRoutes;