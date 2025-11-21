import express from "express";
import { getProducts, getProductsById } from "../controller/products-controller";

const router = express.Router();

router.get("/", getProducts)
router.get("/:id", getProductsById)
router.post("/", () => {})
router.put("/:id", () => {})
router.delete("/:id", () => {})

export default router;