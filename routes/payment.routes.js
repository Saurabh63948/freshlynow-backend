import express from "express";
import auth from "../middleware/auth.js";
import {
  createPaymentLink,
 
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/payment-link", auth, createPaymentLink);

router.post("/verify", auth, verifyPayment);

export default router;
