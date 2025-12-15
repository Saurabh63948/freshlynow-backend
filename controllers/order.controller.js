import OrderModel from "../models/order.model.js";
import AddressModel from "../models/address.model.js";
import { v4 as uuidv4 } from "uuid";


export const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartItems, addressId } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const address = await AddressModel.findById(addressId);

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Invalid address",
      });
    }

    const items = cartItems.map((item) => ({
      productId: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      qty: item.qty,
      subTotal: item.price * item.qty,
    }));

    const subTotalAmt = items.reduce(
      (sum, i) => sum + i.subTotal,
      0
    );

    const order = await OrderModel.create({
      userId,
      orderId: `ORD-${uuidv4().slice(0, 8).toUpperCase()}`,
      items,
      deliveryAddress: {
        name: address.name,
        mobile: address.mobile,
        address_line: address.address_line,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
      },
      subTotalAmt,
      totalAmt: subTotalAmt,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    console.log("ORDER ERROR ", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMyOrders = async (req, res) => {
  const orders = await OrderModel.find({
    userId: req.userId,
  }).sort({ createdAt: -1 });

  res.json({
    success: true,
    data: orders,
  });
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "PLACED",
      "CONFIRMED",
      "SHIPPED",
      "DELIVERED",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await OrderModel.findByIdAndUpdate(
      id,
      { order_status: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order status updated",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
