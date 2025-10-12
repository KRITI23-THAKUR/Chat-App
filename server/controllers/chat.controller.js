import { connections } from "mongoose";
import { asyncHandler } from "../middleware/catchAsynsErrors.js";
import { Chat } from "../models/chat.model.js";
import { ApiError } from "../middleware/errorHandler.js";
import { Message } from "../models/messages.model.js";

export const connection = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const chats = await Chat.find({ users: userId })
    .populate([
      {
        path: "users",
        match: { _id: { $ne: userId } }, //exclude the login user
        select: "name fullname profilePicture",
      },
      {
        path: "lastMessage",
        select: "message sender",
        populate: {
          path: "sender",
          select: "name fullname profilePicture",
        },
      },
    ])
    .sort({ updatedAt: -1 });

  res.status(201).json({
    success: true,
    connections: chats,
  });
});

export const deleteWholeChat = asyncHandler(async (req, res, next) => {
  const chatId = req.params.chatId;

  // const chat=await Chat.findOne({_id:chatId})
  // const chat=await Chat.findById(chatId)

  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new ApiError(404, "chat not found");
  }

  await Promise.all([
    Chat.findByIdAndDelete(chatId),
    Message.deleteMany({ chat: chatId }),
  ]);

  res.status(200).json({
    success: true,
    message: "chat deleted successfully",
  });
});

export const getChat = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  console.log(req.params)
  const otherUserId = req.params.userId;
  const chat = await Chat.findOne({
    users: { $all: [userId, otherUserId] },
  }).populate([
    {
      path: "users",
      select: "name  profilePicture fullname",
    },
    {
      path: "lastMessage",
      populate: {
        path: "sender",
        select: "name profilePicture fullname",
      },
    },
  ]);
  res.status(200).json({
    success:true,
    chat
  })
});
