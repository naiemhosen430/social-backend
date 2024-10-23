import express from "express";
import authRouter from "../modules/auth/auth.router.js";
import supper_admin_router from "../modules/supper_admin/supper_admin.router.js";
import { verifyTokenController } from "../modules/global/verifyTokenController.js";
import messageRouter from "../modules/message/message.router.js";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Social inventory serber is runing");

  res.json("Social inventory server is runing");
});

// user router
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/supper_admin", supper_admin_router);
router.post("/api/v1/verifyusertoken", verifyTokenController);
router.use("/api/v1/message", messageRouter);

export default router;
