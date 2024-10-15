import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "./auth.model.js";
import {
  createUserService,
  findOneByIdFromUser,
  findOneByEmailFromUser,
  updateMeService,
} from "./auth.service.js";
import { genarateToken } from "../../utils/genarateToken.js";
import { jwtTokenSercretKey } from "../../../secret.js";

export const createUserController = async (req, res) => {
  try {
    // Check for required credentials
    const { fullname, phone, token, password } = req.body;
    if (!fullname || !phone || !token || !password) {
      return res.status(409).json({
        statusCode: 409,
        message: "All credentials are required.",
      });
    }

    // Verify the token
    jwt.verify(token, jwtTokenSercretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          statusCode: 401,
          message: "Invalid JWT token",
        });
      }

      // Check if decoded token is valid
      if (!decoded || decoded?.role !== "supper_admin") {
        return res.status(401).json({
          statusCode: 401,
          message: "The token is invalid!",
        });
      }

      const tokenTime = new Date(decoded.time).getTime();
      const currentTime = Date.now();

      if (currentTime > tokenTime) {
        return res.status(401).json({
          statusCode: 401,
          message: "Invalid URL: Current time exceeds token time",
        });
      }

      // Check if the user already exists
      const checkUser = await UserModel.findOne({ phone });
      if (checkUser) {
        return res.status(409).json({
          statusCode: 409,
          message: "This phone is already in use",
        });
      }

      // Hash the password
      const hashPassword = bcryptjs.hashSync(password, 10);
      const userinfo = {
        fullname,
        phone,
        password: hashPassword,
      };

      // Create the user
      const result = await createUserService(userinfo);
      if (!result) {
        return res.status(500).json({
          statusCode: 500,
          message: "Something went wrong",
        });
      }

      // Generate a new token for the created user
      const tokenObj = {
        userId: result._id,
        role: result.role,
      };

      const newToken = await genarateToken(tokenObj);
      if (!newToken) {
        return res.status(500).json({
          statusCode: 500,
          message: "Something went wrong",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Registered successfully",
        data: result,
        token: newToken,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    if (!req.body.phone || !req.body.password) {
      return res.status(409).json({
        statusCode: 409,
        message: "All cradencial required.",
      });
    }

    const result = await findOneByEmailFromUser(req.body.phone);

    if (!result) {
      return res.status(404).json({
        statusCode: 404,
        message: "No account found with this phone",
      });
    }

    const checkPassword = await bcryptjs.compare(
      req.body.password,
      result.password
    );

    if (!checkPassword) {
      return res.status(401).json({
        statusCode: 401,
        message: "Password is incorrect",
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

    res.status(200).json({
      statusCode: 200,
      message: "Login success",
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

export const findMeControler = async (req, res) => {
  try {
    const userd = req.user.userId;

    if (!userd) {
      res.status(498).json({
        statusCode: 498,
        message: "Something wrong",
      });
    }

    const data = await findOneByIdFromUser(userd);

    if (!data) {
      res.status(498).json({
        statusCode: 498,
        message: "Something wrong",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatyeMeControler = async (req, res) => {
  try {
    if (!req.body && !req.params.id) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await updateMeService(req);

    if (!data) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
