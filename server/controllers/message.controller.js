import { asyncHandler } from "../middleware/catchAsynsErrors.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/messages.model.js";
import { ApiError } from "../middleware/errorHandler.js";
import { User } from "../models/user.model.js";
import { io, onlineUsers } from "../socket/socket.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const { message } = req.body;
  const { receiverId } = req.params;

  let chat = await Chat.findById(receiverId);
  if (chat) {
    if (chat.isGroupChat) {
      //will handle grp chat
    }
  } else {
    const userExist = await User.findById(receiverId);
    if (!userExist)
      throw new ApiError(400, "user don't exist with whom you want to chat");

    chat = await Chat.findOne({
      users: {
        $all: [senderId, receiverId],
      },
    });
    if (!chat)
      chat = await Chat.create({
        users: [senderId, receiverId],
      });
  }

  const newMessage = await Message.create({
    chat: chat._id,
    sender: senderId,
    message: message,
  });

  chat = await Chat.findByIdAndUpdate(
    chat._id,
    {
      $set: { lastMessage: newMessage._id, updatedAt: Date.now() },
    },
    { new: true }
  ).populate([
    { path: "users", select: "name profilePicture email" },
    {
      path: "lastMessage",
      populate: { path: "sender", select: "name profilePicture" },
    },
  ]);
  await newMessage.populate("sender", "name profilePicture");

  // Real-time socket event
  const otherUser = chat.users.find(
    (user) => user._id.toString() !== senderId.toString()
  );
  const receiver = onlineUsers.get(String(otherUser._id));
  const sender = onlineUsers.get(String(senderId));
  if (receiver?.socketId)
    io.to(receiver.socketId).emit("new-message", { newMessage, chat });
  if (sender?.socketId)
    io.to(sender.socketId).emit("new-message", { newMessage, chat });

  return res.status(201).json({
    success: true,
    content: newMessage,
    chat,
  });
});

export const fetchMessages = asyncHandler(async (req, res, next) => {
  const chatId = req.params.chatId;
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit) || 50;

  const skip = (page - 1) * limit;

  const messages = await Message.find({ chat: chatId })
  .sort({createdAt:-1})
    .skip(skip)
    .limit(limit + 1)
    .populate("sender", "name profilePicture")
    .lean();

  const hasMorePage = messages.length > limit;
  if (hasMorePage) {
    messages.pop();
  }

  res.status(200).json({
    success: true,
    messages,
    page,
    limit,
    hasMorePage,
  });
});

export const deleteMessage = asyncHandler(async (req, res, next) => {
  const messageId = req.params.messageId;
  const message = await Message.findOneAndDelete({ _id: messageId });

  if (!message) throw new ApiError(404, "message not found");

  await Chat.updateOne(
    {
      _id: message.chat,
      lastMessage: messageId,
    },
    { $unset: { lastMessage: "" } }
  );
  res.status(200).json({
    success: true,
    message: "message deleted successfully",
  });
});
