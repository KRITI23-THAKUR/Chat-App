import { asyncHandler } from "../middleware/catchAsynsErrors.js";
import { User } from "../models/user.model.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const searchQuery = req.query.search
    ? { name: { $regex: req.query.search, $options: "i" } }
    : {};

  const users = await User.find(searchQuery);

  return res.status(200).json({
    success: true,
    users,
  });
});

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});
