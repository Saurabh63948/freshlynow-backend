// controllers/subCategory.controller.js
import SubCategoryModel from "../models/subCategory.model.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";

export const createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const imageFile = req.file;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "SubCategory name & category are required",
      });
    }

    let imageUrl = "";

    // optional image upload
    if (imageFile) {
      const upload = await uploadImageClodinary(imageFile);
      imageUrl = upload.secure_url;
    }

    const subCategory = await SubCategoryModel.create({
      name,
      category,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- FETCH SUB CATEGORY BY CATEGORY ---------------- */
export const getSubCategoriesByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category id is required",
      });
    }

    const subCategories = await SubCategoryModel.find({ category }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
