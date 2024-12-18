import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    fullname: {
      type: "String",
      required: "true",
      validate: [
        {
          validator: (value) => validator.isLength(value, { min: 3, max: 50 }),
          message: "Name must be between 3 and 50 characters.",
        },
      ],
      default: "",
    },
    coverphoto: {
      type: "String",
      required: true,
      default: "default.jpeg",
    },
    profilephoto: {
      type: "String",
      required: true,
      default: "default.jpeg",
    },
    tittle: {
      type: "string",
      minLength: 0,
      required: true,
      maxLength: 300,
      default: "not set",
    },
    gender: {
      type: "String",
      required: true,
      enum: ["male", "female", "other", "not set"],
      default: "not set",
    },
    status: {
      type: "String",
      required: true,
      enum: ["active", "blocked", "rastricted"],
      default: "active",
    },
    role: {
      type: "String",
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    user_reg_token: {
      type: "String",
      required: false,
      default: "",
    },
    hometwon: {
      type: "string",
      required: true,
      minLength: 0,
      maxLength: 50,
      default: "not set",
    },
    warning: {
      type: "Number",
      required: false,
      default: 0,
    },
    conversion: {
      type: "Number",
      required: false,
      default: 0,
    },
    homecity: {
      type: "string",
      required: true,
      minLength: 0,
      maxLength: 50,
      default: "not set",
    },
    birthday: {
      type: "string",
      required: true,
      default: "not set",
    },
    online_status: {
      type: "string",
      enum: ["true", "false"],
      required: true,
      default: "false",
    },
    phone: {
      type: "String",
      required: true,
    },
    password: {
      type: "String",
      required: true,
    },

    device_model: {
      type: "String",
      required: false,
    },
    whatsapp_number: {
      type: "String",
      required: false,
    },
    access_routes: {
      type: "Array",
      required: false,
      default: [],
    },
    verificationCode: {
      type: "Number",
    },
    position: {
      type: "string",
      required: true,
      minLength: 0,
      maxLength: 50,
      default: "not set",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("user", userSchema);
export default UserModel;
