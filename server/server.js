import dotenv from "dotenv";
import express from "express";
import { connectdb } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

connectdb();


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true              
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello ");
});

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import chatRoutes from "./routes/chat.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat",chatRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
