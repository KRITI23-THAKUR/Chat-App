import { deleteFile, uploadImage } from "../config/cloudniary.js";
import { asyncHandler } from "../middleware/catchAsynsErrors.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../middleware/errorHandler.js";


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

export const uploadProfilePicture = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const profile_picture = req.user.profilePicture;
  const userPublic_id = req.user.profilePicturePublicId;

  const file = req.file;
  if (!file) {
    throw new ApiError(404, "profile picture is required");
  }
  if (profile_picture) {
    await deleteFile(userPublic_id);
  }
  const public_id = `profilePicture_${Date.now()}`;

  const result = await uploadImage(file, public_id, "profile_picture");
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        profilePicture: result.url,
        profilePicturePublicId: result.public_id,
      },
    },
    {
      new: true,
    }
  );
  res.status(201).json({
    success: true,
    message: "profile picture uploaded successfully",
    user,
  });
});
