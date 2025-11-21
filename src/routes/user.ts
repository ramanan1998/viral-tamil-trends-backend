import express from "express";
import { getTotalUsers } from "../controller/user-controller";

const router = express.Router();

router.get("/", getTotalUsers)

export default router;