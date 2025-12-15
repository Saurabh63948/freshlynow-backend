import crypto from "crypto";
import razorpay from "../utils/razorpay.js";



export const createPaymentLink = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    const paymentLink = await razorpay.paymentLink.create(
      {
        amount: amount * 100,
        currency: "INR",
        description: "FreshlyNow Order",
        notes: { orderId },
        callback_method: "get",
      }
    );

    res.json({
      success: true,
      data: paymentLink,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    res.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
