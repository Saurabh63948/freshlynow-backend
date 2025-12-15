import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    name: String,
    image: Array,
    price: Number,
    qty: Number,
    subTotal: Number,
  },
  { _id: false }
);

const addressSnapshotSchema = new mongoose.Schema(
  {
    name: String,
    mobile: String,
    address_line: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    items: [orderItemSchema],

    deliveryAddress: addressSnapshotSchema,

    payment_status: {
      type: String,
      default: "PENDING",
    },

    paymentId: {
      type: String,
      default: "",
    },

    subTotalAmt: {
      type: Number,
      required: true,
    },

    totalAmt: {
      type: Number,
      required: true,
    },

    order_status: {
      type: String,
      default: "PLACED", // PLACED → CONFIRMED → SHIPPED → DELIVERED
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel;
