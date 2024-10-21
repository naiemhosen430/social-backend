import express from "express";
import { getAllNewSupport } from "./message.controler.js";

const messageRouter = express.Router();

messageRouter.route("/newsupports").get(getAllNewSupport);

export default messageRouter;
