import express from "express";
import { supper_admin_authentication } from "../../utils/Authentication.js";
import {
  createUserController,
  createUserTokenController,
  getAllUsersController,
  geteUsersController,
  updateUsersController,
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

supper_admin_router
  .route("/getuser/:id")
  .get(supper_admin_authentication, geteUsersController);

supper_admin_router
  .route("/updateuser/:id")
  .put(supper_admin_authentication, updateUsersController);

export default supper_admin_router;
