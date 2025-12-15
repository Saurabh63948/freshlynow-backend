import crypto from "crypto";
import OrderModel from "../models/order.model.js";

export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

   
    const rawBody = req.body.toString();

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.log(" Webhook signature mismatch");
      return res.status(400).json({ success: false });
    }

    const body = JSON.parse(rawBody);
    const event = body.event;

    console.log(" WEBHOOK EVENT:", event);

    if (event === "payment_link.paid") {
      const payment = body.payload.payment.entity;
      const orderId =
        body.payload.payment_link.entity.notes.orderId;

      await OrderModel.findOneAndUpdate(
        { orderId },
        {
          payment_status: "PAID",
          order_status: "CONFIRMED",
          paymentId: payment.id,
        }
      );

      console.log(" Order marked PAID:", orderId);
    }

    /* ===== PAYMENT FAILED / CANCELLED ===== */
    if (
      event === "payment.failed" ||
      event === "payment_link.cancelled"
    ) {
      const orderId =
        body.payload.payment_link.entity.notes.orderId;

      await OrderModel.findOneAndUpdate(
        { orderId },
        { payment_status: "FAILED" }
      );

      console.log(" Payment failed:", orderId);
    }

    res.json({ success: true });
  } catch (err) {
    console.error(" WEBHOOK ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
