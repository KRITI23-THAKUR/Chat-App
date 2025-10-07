import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config({ path: "./.env" });
cloudinary.config({
  cloud_name: process.env.CLOUDNIARY_NAME,
  api_key: process.env.CLOUDNIARY_API_KEY,
  api_secret: process.env.CLOUDNIARY_API_SECRET_KEY,
});

export const uploadImage = async (file, public_id, folder_name) => {
  const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`;
  const uploadResult = await cloudinary.uploader
    .upload(base64, {
      public_id: public_id,
      folder: folder_name,
    })
    .catch((error) => {
      throw new ApiError(500, "Server failed to upload profile picture");
    });
  return uploadResult;
};

export const deleteFile = async (public_id) => {
  if (!public_id) {
    throw new ApiError(404, "public id is required");
  }
  const result = cloudinary.uploader.destroy(public_id);
  return result;
};
