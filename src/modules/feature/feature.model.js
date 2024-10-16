import { Schema, model } from "mongoose";
import validator from "validator";

const featureSchema = new Schema(
  {
    name: {
      type: "String",
      required: "true",
      default: "",
    },
    label: {
      type: "String",
      required: true,
      default: "",
    },
    route: {
      type: "String",
      required: true,
      default: "",
    },
    title: {
      type: "string",
      required: false,
      default: "",
    },
    description: {
      type: "String",
      required: false,
      default: "",
    },
    users: {
      type: "Array",
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const FeatureModel = model("feature", featureSchema);
export default FeatureModel;
