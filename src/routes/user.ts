import express from "express";
import { getUser } from "../controller/user-controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.get("/getUser", verifyToken, getUser)

export default router;