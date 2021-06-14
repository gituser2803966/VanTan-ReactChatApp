import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    sendAt: {
      type: Date,
      default: Date.now,
    },
    readBy: [String],
    deleteAt: {
      type: Date,
      default: null,
    },
    conversation: [],
  },
  { collection: "messages" }
);

const MessageModel = mongoose.model("message", MessageSchema);

export default MessageModel;
