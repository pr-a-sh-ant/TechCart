// app.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userToken = require("./routes/userTokenRoute");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cloudinarySign = require("./routes/cloudinarySign");
const khaltiRoutes = require("./routes/khaltiPayment");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to the database

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/token", userToken);
app.use("/api/user", userRoutes);
app.use("/api/cloudinary-sign", cloudinarySign);
app.use("/api/payments/process/khalti", khaltiRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
