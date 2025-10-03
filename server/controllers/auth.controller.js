import { asyncHandler } from "../middleware/catchAsynsErrors.js";
import { ApiError } from "../middleware/errorHandler.js";
import { User } from "../models/user.model.js";

/*----------------------------
@Register
---------------------*/
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new ApiError(400, "fullname, email, password something is missing");

  const user = await User.findOne({ email });
  if (user) throw new ApiError(400, "user by this email already registered");

  const newUser = await User.create({ name, email, password });
  if (!newUser) throw new ApiError(400, " error while creating new user");

  const token = await newUser.generateJwtToken();
  const registeredUser = await User.findById(newUser._id).select("-password");

  const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

  return res.status(201).cookie("token", token, { expires: expiryDate }).json({
    success: true,
    user: registeredUser,
    token,
    message: "registration successfull",
  });
});

/*----------------------------
@login
---------------------*/
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "email and password both are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(400, " plz go and register first");

  const isPasswordMatched = await user.isPasswordCorrect(password);
  if (!isPasswordMatched) throw new ApiError(400, "password is incorrect");

  const token = await user.generateJwtToken();
  const loggedInUser = await User.findById(user._id);

  const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return res.status(200).cookie("token", token, { expires: expiryDate }).json({
    success: true,
    token,
    message: "login successfully",
    user: loggedInUser,
  });
});

/*-----------------------------
@logout
-----------------------------*/

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", { httpOnly: true });

  return res.status(200).json({
    message: "logout successfully",
  });
});
