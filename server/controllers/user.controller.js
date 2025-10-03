import { asyncHandler } from "../middleware/catchAsynsErrors.js";
import { User } from "../models/user.model.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const query = req.query.search
    ? {
        name: { $regex: query, $options: "i" },
      }
    : {};

  const users = await User.find(query);

  return res.status(200).json({
    success: true,
    users,
  });
});
export const getCurrentUser = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    user: req.user,
  });
});
