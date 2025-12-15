import productModel from "../models/product.model.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";
// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({ publish: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const uploadProductImage =async(req,res)=>{
//   try {
//     const image =req.file;
//     if(!image){
//       return res.status(400).json({
//         success: false,
//         message: "Image file is required",
//       });
//     }

//     const upload =await uploadImageClodinary(image);
//     return res.status(200).json({
//       success :true,
//       data:{
//         url:upload.url,
//         public_id:upload.public_id,
//       },
//     })
//   } 
//     catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }

export const uploadProductImage = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const upload = await uploadImageClodinary(image);

    return res.status(200).json({
      success: true,
      data: {
      
        url: upload.secure_url,   
        public_id: upload.public_id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
      publish,
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Product name and price are required",
      });
    }

    const product = await productModel.create({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
      publish,
    });

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
