import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    media: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Message=mongoose.model("Message",messageSchema);
