import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    customer_obj: {
      type: Object,
      required: "true",
      default: "",
    },

    agent_name: {
      type: String,
      required: false,
      default: null,
    },
    user_name: {
      type: String,
      required: false,
      default: null,
    },
    agent_id: {
      type: String,
      required: false,
      default: null,
    },
    msg_id: {
      type: "String",
      required: "false",
      default: "",
    },
    type: {
      type: "String",
      required: true,
      enum: ["telegram", "facebook", "email", "whatsapp"],
      default: "",
    },
    status: {
      type: "String",
      required: true,
      enum: ["active", "blocked", "achieved", "rejected"],
      default: "active",
    },
    online_status: {
      type: "String",
      enum: ["true", "false"],
      required: true,
      default: "false",
    },
    chats: {
      type: "Array",
      enum: ["true", "false"],
      required: true,
      default: "false",
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = model("message", messageSchema);
export default MessageModel;
