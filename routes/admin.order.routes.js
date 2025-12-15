import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

/* ADMIN ONLY */
router.get("/orders", auth, admin, getAllOrders);
router.patch("/orders/:id/status", auth, admin, updateOrderStatus);

export default router;
