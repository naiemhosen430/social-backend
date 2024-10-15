import jwt from "jsonwebtoken";
import { jwtTokenSercretKey } from "../../../secret.js";

export const verifyTokenController = async (req, res) => {
  try {
    const token = req.body.token;

    // Ensure token is provided
    if (!token) {
      return res.status(400).json({
        statusCode: 400,
        message: "Token is required",
      });
    }

    // Verify the token
    jwt.verify(token, jwtTokenSercretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          statusCode: 401,
          message: "Invalid JWT token",
        });
      }

      // Check if decoded is valid
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

      // Log the token and send the response
      return res.status(200).json({
        statusCode: 200,
        message: "Successful",
        data: decoded,
      });
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};
