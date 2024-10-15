import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { genarateToken } from "../../utils/genarateToken.js";
import { createUserService } from "./supper_admin.service.js";
import { jwtTokenSercretKey } from "../../../secret.js";
import UserModel from "../auth/auth.model.js";

export const createUserController = async (req, res) => {
  try {
    if (!req.body.fullname || !req.body.email || !req.body.password) {
      return res.status(409).json({
        statusCode: 409,
        message: "All cradencial required.",
      });
    }

    const checkUser = await UserModel.findOne({ email: req.body.email });
    if (checkUser) {
      return res.status(409).json({
        statusCode: 409,
        message: "This email is already in use",
      });
    }

    const hashPassword = bcryptjs.hashSync(req.body.password, 10);
    const userinfo = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashPassword,
    };

    const result = await createUserService(userinfo);

    if (!result) {
      return res.status(500).json({
        statusCode: 500,
        message: "Something went wrong",
      });
    }

    const tokenObj = {
      userId: result._id,
      role: result.role,
    };

    const token = await genarateToken(tokenObj);

    if (!token) {
      return res.status(500).json({
        statusCode: 500,
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "User created successfully",
      data: result,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export const createUserTokenController = async (req, res) => {
  const { time } = req?.body;
  if (req.user.role === "supper_admin") {
    const tokenObj = {
      supper_id: req.user.userId,
      role: req.user.role,
      time,
    };

    const time_m = new Date(time);
    const currentTime = new Date();

    const durationInSeconds = Math.floor(
      (time_m.getTime() - currentTime.getTime()) / 1000
    );
    const token = jwt.sign(tokenObj, jwtTokenSercretKey, {
      expiresIn: durationInSeconds,
    });

    await UserModel.updateOne(
      { _id: req.user.userId },
      {
        $set: {
          user_reg_token: token,
        },
      }
    );

    const my_updated_data = await UserModel.findOne({ _id: req.user.userId });

    return res.status(200).json({
      statusCode: 200,
      message: "User created successfully",
      data: my_updated_data,
    });
  } else {
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export const getAllUsersController = async (req, res) => {
  const { time } = req?.body;
  if (req.user.role === "supper_admin") {
    const allUsers = await UserModel.find();

    return res.status(200).json({
      statusCode: 200,
      message: "Successfull",
      data: allUsers,
    });
  } else {
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};
