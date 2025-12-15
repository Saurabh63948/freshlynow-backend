import jwt from  "jsonwebtoken"
import UserModel from "../models/user.model.js"


const generateRefressToken =async(userId)=>{
  const token = await jwt.sign({
    id:userId
  },process.env.SECRETE_KEY_REFRESS_TOKEN,{expiresIn : "30d"})

  const updateRefressToken = await UserModel.updateOne({
    _id : userId
  },
{
  refresh_token:token
})

  return token
}

export default generateRefressToken;