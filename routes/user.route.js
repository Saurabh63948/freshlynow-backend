

import { Router } from "express"
import  {  forgetPasswordController, loginController, logoutController, refreshToken, registerUserController, resetPassword, updateUserDetails, uploadImageAvtar, verifyEmailController, verifyForgotPasswordOtp } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const userRouter =Router();

userRouter.post("/register",registerUserController)
userRouter.get("/verify-email", verifyEmailController);

userRouter.post("/login",loginController)
userRouter.get("/logout",auth,logoutController)
userRouter.put("/upload-avatar",auth,upload.single('avatar'),uploadImageAvtar)
userRouter.put("/update-user",auth,updateUserDetails)
userRouter.put("/forget-password",forgetPasswordController)
userRouter.put("/forget-passwordVerification",verifyForgotPasswordOtp)
userRouter.put("/reset-password",resetPassword)
userRouter.post("/refresh-token",refreshToken)
export default userRouter;