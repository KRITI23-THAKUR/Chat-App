import express from "express";
import {register,login,logout}  from "../controllers/auth.controller.js";
import { authUser } from "../middleware/authMiddleware.js";
import { registerValidator ,loginValidator,logoutValidator} from "../utils/validations/auth.validations.js";
import { validate } from "../middleware/validate.js";


const authRoutes=express.Router();

 authRoutes.post("/register",registerValidator,validate,register);
 authRoutes.post("/login",loginValidator, validate,login);
 authRoutes.get('/logout',logoutValidator,validate,logout);

 export default authRoutes;