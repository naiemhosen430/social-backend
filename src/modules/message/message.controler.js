import { getAllNewsupportService } from "./message.service.js";

export const getAllNewSupport = async (req, res) => {
  try {
    const allFeatureData = await getAllNewsupportService();
    return res.status(200).json({
      statusCode: 200,
      message: "Successful",
      data: allFeatureData,
    });
  } catch (error) {
    console.error("Error fetching new support messages:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message || "An error occurred",
    });
  }
};
