import express from "express";
import { getAllNewSupport, getAllSupport } from "./message.controler.js";
import { authentication } from "../../utils/Authentication.js";

const messageRouter = express.Router();

messageRouter.route("/newsupports").get(authentication, getAllNewSupport);
messageRouter.route("/getallsupports").get(authentication, getAllSupport);

export default messageRouter;
