const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  category: { type: String, required: true },
  brand: { type: String },
  images: [{ type: String, required: true }],
  rating: { type: Number, default: 0 },

  // Stock per size
  sizes: [
    {
      size: { type: String, required: true }, // e.g., "S", "M", "L", "XL"
      stock: { type: Number, required: true, default: 0 }
    }
  ],

  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, required: true },
      comment: { type: String },
      name: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", ProductSchema);
