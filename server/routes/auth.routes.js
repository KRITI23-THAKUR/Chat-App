import express from "express";
import {register,login,logout, getCurrentUser}  from "../controllers/auth.controller.js";
import { authUser } from "../middleware/authMiddleware.js";



  const authRoutes=express.Router();

 authRoutes.post("/register",register);
 authRoutes.post("/login",login);
 authRoutes.get('/logout',logout);

 authRoutes.get("/user",authUser,getCurrentUser)
 

 export default authRoutes;