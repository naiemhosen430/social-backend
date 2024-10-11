import express from "express";
import {
  createUserController,
  findMeControler,
  loginUserController,
  updatyeMeControler,
} from "./auth.controler.js";
import { authentication } from "../../utils/Authentication.js";

const authRouter = express.Router();

authRouter.route("/register").post(createUserController);

authRouter.route("/login").post(loginUserController);

authRouter.route("/me").get(authentication, findMeControler);

authRouter.route("/update").put(authentication, updatyeMeControler);

export default authRouter;
