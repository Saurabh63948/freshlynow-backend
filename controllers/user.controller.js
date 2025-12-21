// controllers/user.controller.js
import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import verifyEmailTemplate from "../utils/verificationEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefressToken from "../utils/generateRefressToken.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken"



// export async function registerUserController(req, res) {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({
//         message: "Provide all required fields",
//         error: true,
//         success: false,
//       });
//     }

//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({
//         message: "User is already registered with this email",
//         error: true,
//         success: false,
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     const newUser = new UserModel({
//       name,
//       email,
//       password: hashPassword,
//       verify_email: false, 
//     });

//     const savedUser = await newUser.save();

//     const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`;

//     try {
//       await sendEmail({
//         sendTo: email,
//         subject: "Verify Your Email - Binkeyit",
//         html: verifyEmailTemplate({ name, url: verifyUrl }),
//       });
//     } catch (emailError) {
//       console.warn(" Email sending failed:", emailError.message);
//     }

//     return res.status(201).json({
//       message: "User registered successfully. Verification email sent.",
//       error: false,
//       success: true,
//       data: savedUser,
//     });
//   } catch (error) {
//     console.error("Register error:", error.message);
//     return res.status(500).json({
//       message: error.message || "Server error",
//       error: true,
//       success: false,
//     });
//   }
// }
// export async function registerUserController(req, res) {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({
//         message: "Provide all required fields",
//         error: true,
//         success: false,
//       });
//     }

//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({
//         message: "User is already registered with this email",
//         error: true,
//         success: false,
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     const newUser = new UserModel({
//       name,
//       email,
//       password: hashPassword,
//       verify_email: false,
//     });

//     const savedUser = await newUser.save();

    
//     const verifyUrl = `https://tantalizingly-garbleable-lia.ngrok-free.dev/api/users/verify-email?token=${savedUser._id}`;

//     await sendEmail({
//       sendTo: email,
//       subject: "Verify Your Email - Binkeyit",
//       html: verifyEmailTemplate({
//         name,
//         url: verifyUrl,
//       }),
//     });

//     return res.status(201).json({
//       message: "User registered successfully. Verification email sent.",
//       error: false,
//       success: true,
//     });

//   } catch (error) {
//     console.error("Register error:", error.message);
//     return res.status(500).json({
//       message: "Server error",
//       error: true,
//       success: false,
//     });
//   }
// }


export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide all required fields",
        error: true,
        success: false,
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User is already registered with this email",
        error: true,
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
      verify_email: false,
    });

    const savedUser = await newUser.save();

    // ✅ Email sending should NOT break register
    try {
      await sendEmail({
        sendTo: email,
        subject: "Verify Your Email - FreshlyNow",
        html: verifyEmailTemplate({
          name,
          token: savedUser._id,   // ✅ CORRECT
        }),
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    // ✅ Send success always
    return res.status(200).json({
      success: true,
      error: false,
      message: "User registered successfully. Please verify your email.",
    });

  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({
      message: "Server error",
      error: true,
      success: false,
    });
  }
}



// export async function verifyEmailController(req, res) {
//   try {
//     const { token } = req.query;

//     if (!token) {
//       return res.send("Invalid verification link");
//     }

//     const user = await UserModel.findById(token);

//     if (!user) {
//       return res.send("Invalid or expired verification link");
//     }

//     if (user.verify_email) {
//       return res.send(`
//         <h2>Email already verified </h2>
//         <p>You can now login.</p>
//       `);
//     }

//     user.verify_email = true;
//     await user.save();

//     return res.send(`
//       <h2>Email verified successfully 🎉</h2>
//       <p>You can now login in the app.</p>
//     `);

//   } catch (error) {
//     return res.send("Verification failed");
//   }
// }
export async function verifyEmailController(req, res) {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send(`
        <h2>Invalid verification link</h2>
        <p>The verification token is missing.</p>
      `);
    }

    const user = await UserModel.findById(token);

    if (!user) {
      return res.status(400).send(`
        <h2>Invalid or expired link</h2>
        <p>Please request a new verification email.</p>
      `);
    }

    if (user.verify_email) {
      return res.status(200).send(`
        <h2>Email already verified ✅</h2>
        <p>You can now login in the app.</p>
      `);
    }

    user.verify_email = true;
    await user.save();

    return res.status(200).send(`
      <h2>Email verified successfully 🎉</h2>
      <p>You can now login in the app.</p>
    `);

  } catch (error) {
    console.error("Verify email error:", error.message);
    return res.status(500).send(`
      <h2>Verification failed</h2>
      <p>Please try again later.</p>
    `);
  }
}


export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Provide email and password",
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not registered",
        success: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

   
    const accessToken = await generateAccessToken(user);


    const refreshToken = await generateRefressToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role, 
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}


//LOGOUT CONTAINER
export async function logoutController(req, res) {
  try {
    const userid = req.userId;
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption); // Fix the name
    res.clearCookie("refressToken", cookiesOption);
    const removeRefressToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });
    return res.json({
      message: "Logout successfully..",
      error: false,
      success: true,
      data:userid
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      // success: false
    });
  }
}

//upload user avtar

// export async function uploadImageAvtar(req, res) {
//   try {
//     const userId = req.userId; // coming from auth middleware
//     const image = req.file; // multer middleware

//     const upload = await uploadImageClodinary(image);
//     const updateUser = await UserModel.findByIdAndUpdate(userId, {
//       avatar: upload.secure_url || upload.url,
//     });
//     return res.json({
//       message: "upload profile",
//       data: {
//         _id: userId,
//         avatar: upload.secure_url,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       // success: false
//     });
//   }
// }
export async function uploadImageAvtar(req, res) {
  try {
    const userId = req.userId;
    const image = req.file;  

    if (!image) {
      return res.status(400).json({
        error: true,
        message: "Image is required",
      });
    }

    const upload = await uploadImageClodinary(image);

    await UserModel.findByIdAndUpdate(
      userId,
      { avatar: upload.secure_url },
      { new: true }
    );

    return res.json({
      message: "Profile image uploaded successfully",
      data: {
        _id: userId,
        avatar: upload.secure_url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message || "Server error",
    });
  }
}


//update user details
export  async function updateUserDetails(req, res) {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;

    // if(!name,!email,!mobile,!password){
    //    return res.status(400).json({
    //   message: error.message || error,
    //   error: true,
    //   // success: false
    // });
    // }
    let hashPassword = "";
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      ...(name && { name: name }),
      ...(email && { email: email }),
      ...(mobile && { mobile: mobile }),
      ...(password && { password: hashPassword }),
    });
   
    const updatedUser=await UserModel.findById(userId);
    
      return res.json({
        message : "updated user successfully",
        error:false,
        success:true,
        data:updatedUser
      })


  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      // success: false
    });
  }
}

// forget password 
export async function forgetPasswordController(req, res) {
  try {
    const { email } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    const otp = generateOtp();
    const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await UserModel.findByIdAndUpdate(existingUser._id, {
      forget_password_otp: otp,
      forget_password_expiry: expireTime.toISOString()
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot password from Blinkit",
      html: forgotPasswordTemplate({
        name: existingUser.name,
        otp: otp
      })
    });

    return res.json({
      message: "Check your email",
      error: false,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}


//verify forgot password otp

export async function verifyForgotPasswordOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(401).json({
        message: "Provide valid email and OTP",
        error: true,
        success: false
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        message: "Email is not available",
        error: true,
        success: false
      });
    }

    const currentTime = new Date();

    if (new Date(existingUser.forget_password_expiry) < currentTime) {
      return res.status(400).json({
        message: "OTP has expired",
        error: true,
        success: false
      });
    }

    if (otp !== existingUser.forget_password_otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false
      });
    }

    // Optional: Clear OTP and expiry after success
    // await UserModel.findByIdAndUpdate(existingUser._id, {
    //   forget_password_otp: null,
    //   forget_password_expiry: null
    // });

    return res.json({
      message: "OTP verified successfully",
      error: false,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      error: true,
      success: false
    });
  }
}

//reset the password 
export async function resetPassword(req, res) {
  try {
    const { email, newPassWord, confirmPassword } = req.body;

    // Validate input
    if (!email || !newPassWord || !confirmPassword) {
      return res.status(400).json({
        message: "Please fill in all the fields",
        error: true,
        success: false
      });
    }

    if (newPassWord !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        error: true,
        success: false
      });
    }

    // Check if user exists
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid email",
        error: true,
        success: false
      });
    }

    
    const checkPassword = await bcrypt.compare(newPassWord, existingUser.password);
     if (checkPassword) {
      return res.status(400).json({
      message: "Please provide a different password than the current one.",
        error: true,
        success: false,
      });
    }

  // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassWord, salt);

    // Update password
   const update= await UserModel.findOneAndUpdate(
      { email },
      { password: hashPassword },
      { new: true }
    );

    return res.json({
      message: "Password reset successfully",
      error: false,
      success: true,
      data:update
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      error: true,
      success: false
    });
  }
}

//refresh token controller  




export async function refreshToken(req, res) {
  try {
    const refreshToken =
      req.cookies.refressToken ||
      req?.headers?.authorization?.split(" ")[1]; // Bearer <token>

      


    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is missing",
        error: true,
        success: false
      });
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_REFRESS_TOKEN);



    // Optional: Check if the user exists
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }
  
    //Generate new access token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRETE_KEY_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
  
   
    // Optionally regenerate refresh token
    const newRefreshToken = jwt.sign(
      { id: user._id },
      process.env.SECRETE_KEY_REFRESS_TOKEN,
      { expiresIn: "7d" }
    );

    // Optionally set new refresh token in cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken,
      error: false,
      success: true
    });

  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(401).json({
      message: "Invalid or expired refresh token",
      error: true,
      success: false
    });
  }
}
