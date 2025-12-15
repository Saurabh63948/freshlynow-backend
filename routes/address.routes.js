import express from "express";
import auth from "../middleware/auth.js";
import {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/address.controller.js";

const router = express.Router();

/* CREATE */
router.post("/", auth, createAddress);

/* LIST */
router.get("/", auth, getAddresses);

/* EDIT */
router.put("/:id", auth, updateAddress);

/* DELETE */
router.delete("/:id", auth, deleteAddress);

/* SET DEFAULT */
router.patch("/:id/default", auth, setDefaultAddress);

export default router;
