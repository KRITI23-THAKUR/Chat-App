import { asyncHandler } from "../middleware/catchAsynsErrors.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/messages.model.js";
import { ApiError } from "../middleware/errorHandler.js";
import { User } from "../models/user.model.js";

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
    if (!userExist) {
      throw new ApiError(400, "user don't exist with whom you want to chat");
    }
    chat = await Chat.findOne({
      users: {
        $all: [senderId, receiverId],
      },
    });
    if (!chat) {
      chat = await Chat.create({
        users: [senderId, receiverId],
      });
    }
  }

  const newMessage = await Message.create({
    chat: chat._id,
    sender: senderId,
    message: message,
  });

  await Chat.findByIdAndUpdate(chat._id, {
    $set: { lastMessage: newMessage._id, updatedAt: Date.now() },
  });

  await newMessage.populate("sender", "name profilePicture");

  return res.status(201).json({
    success: true,
    content: newMessage,
  });
});

export const fetchMessages = asyncHandler(async (req, res, next) => {
  const chatId = req.params.chatId;
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit) || 50;

  const skip = (page - 1) * limit;

  const messages = await Message.find({ chat: chatId })
    .skip(skip)
    .limit(limit + 1)
    .populate("sender", "name profilePicture")
    .sort({ createdAt: -1 })
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
