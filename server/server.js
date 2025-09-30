import dotenv from "dotenv";
import express from "express";
import { connectdb } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

connectdb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello bby");
});


import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

app.use(errorHandler)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});


