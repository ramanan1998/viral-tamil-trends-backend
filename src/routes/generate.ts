import express from "express";
import { generateQuery } from "../controller/generate-controller";

const router = express.Router();

router.get("/", generateQuery)

export default router;