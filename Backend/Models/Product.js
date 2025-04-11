const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  oldPrice: { type: Number }, // Optional, for showing discounts
  category: { type: String, required: true }, // Example: "Electronics", "Clothing"
  brand: { type: String },
  stock: { type: Number, required: true, default: 0 }, // Number of items available
  images: [{ type: String, required: true }], // Array of image URLs
  rating: { type: Number, default: 0 }, // Average product rating
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, required: true },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
