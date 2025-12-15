import express from "express";
import { createProduct, getProducts, uploadProductImage } from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";
const router = express.Router();

// FETCH PRODUCTS
router.get("/", getProducts);
router.post(
  "/upload-image",
  upload.single("image"),
  uploadProductImage
);
// CREATE PRODUCT
router.post("/", createProduct);

export default router;
