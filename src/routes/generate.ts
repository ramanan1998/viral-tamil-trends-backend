import express from "express";
import { generateQuery } from "../controller/generate-controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.get("/", verifyToken, generateQuery)

export default router;