import express from "express";
import { supper_admin_authentication } from "../../utils/Authentication.js";
import {
  createUserController,
  createUserTokenController,
  getAllUsersController,
} from "./supper_admin.controler.js";

const supper_admin_router = express.Router();

supper_admin_router
  .route("/createadmin")
  .post(supper_admin_authentication, createUserController);

supper_admin_router
  .route("/createregistertoken")
  .post(supper_admin_authentication, createUserTokenController);

supper_admin_router
  .route("/getalluser")
  .get(supper_admin_authentication, getAllUsersController);

export default supper_admin_router;
