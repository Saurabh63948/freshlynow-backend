// routes/subCategory.route.js
import express from "express";
import upload from "../middleware/multer.js";
import {
  createSubCategory,
  getSubCategoriesByCategory,
} from "../controllers/subCategory.controller.js";

const router = express.Router();

router.post("/", upload.single("image"), createSubCategory);
router.get("/", getSubCategoriesByCategory);

export default router;
