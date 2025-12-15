import CategoryModel from "../models/category.model.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const imageFile = req.file; // multer se aayega

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    let imageUrl = "";

    //  upload image to cloudinary (optional)
    if (imageFile) {
      const upload = await uploadImageClodinary(imageFile);
      imageUrl = upload.secure_url;
    }

    const category = await CategoryModel.create({
      name,
      image: imageUrl,
    });

    return res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  const categories = await CategoryModel.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    data: categories,
  });
};
