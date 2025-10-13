import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) =>
  res.status(200).json({
    success: true,
    message: "SERVER IS LIVE",
  })
);
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(errorHandler);
