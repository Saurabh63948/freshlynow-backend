// import { v2 as cloudinary } from 'cloudinary';


// cloudinary.config({
//   cloud_name:process.env.CLOUD_NAME,
//   api_key:process.env.CLOUD_API_KEY,
//   api_secret:process.env.CLOUD_API_SECRET_KEY
// })

// const uploadImageClodinary=async(image)=>{
//   const buffer =image?.buffer|| Buffer.from(await image.arrayBuffer())

//   const uploadImage = await new Promise((res,rej)=>{
//      cloudinary.uploader.upload_stream({folder:"blinkit"},(error,uploadResult)=>{
//       return res(uploadResult)
//      }).end(buffer)
//   })

//   return uploadImage
// }

// export default uploadImageClodinary;


import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
});

const uploadImageClodinary = async (image) => {
  const buffer =
    image?.buffer || Buffer.from(await image.arrayBuffer());

  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "blinkit" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    ).end(buffer);
  });

 
  return uploadResult.secure_url;
};

export default uploadImageClodinary;
