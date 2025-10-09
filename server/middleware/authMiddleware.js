import jwt from "jsonwebtoken";
import { asyncHandler } from "./catchAsynsErrors.js";
import { User } from "../models/user.model.js";
import { ApiError } from "./errorHandler.js";

export const authUser = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) throw new ApiError(401, "unauthorized access :-) token required");

  const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findById(decoded.id);
  
  req.user = user;
  next();
});
