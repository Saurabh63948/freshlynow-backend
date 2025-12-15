// models/subCategory.model.js
import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: true,
    },
  },
  { timestamps: true }
);

const SubCategoryModel = mongoose.model("subCategory", subCategorySchema);
export default SubCategoryModel;
