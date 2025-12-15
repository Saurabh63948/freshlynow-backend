import mongoose from "mongoose";
import express from "express";

import dotenv from "dotenv";
dotenv.config();
const app=express();
if(!process.env.MONGO_URI){
  throw new Error(
    "please provide MONGO_URI in .env file"
  )
}

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected Db")
    
  }catch(err){
    console.log("mongodb connection error ",err)
    process.exit(1);
  }
}

export default connectDB;