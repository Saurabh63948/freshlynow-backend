import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import connectDB from "./config/connectDB.js";

/* ROUTES */
import userRouter from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import categoriesRoutes from "./routes/categories.route.js";
import subCategoryRoutes from "./routes/subCategory.route.js";
import orderRoutes from "./routes/order.route.js";
import addressRoutes from "./routes/address.routes.js";
import adminOrderRoutes from "./routes/admin.order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import paymentWebhookRoutes from "./routes/webhook.routes.js";

const app = express();


app.use(
  "/api/payment/webhook",
  paymentWebhookRoutes
);


app.use(
  cors({
    credentials: true,
    origin: process.env.Frontend_url,
  })
);

app.use(express.json()); // only once
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);


app.get("/", (req, res) => {
  res.send(" Server is running perfectly");
});

app.use("/api/user", userRouter);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminOrderRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/payment", paymentRoutes);


const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(" DB CONNECTION FAILED", err.message);
  });
