import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    participants: [String],
    createdBy: String,
    createAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: Date.now,
    },
    messages: [String],
  },
  { collection: "conversations" }
);

const ConversationModel = mongoose.model("conversation", ConversationSchema);

export default ConversationModel;
