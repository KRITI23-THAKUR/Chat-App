import { asyncHandler } from "../middleware/catchAsynsErrors.js";
import { ApiError } from "../middleware/errorHandler.js";

export const register = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    throw new ApiError(
      400,
      "fullname, email, password something is missing"
    );
  }

  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
  });
});
