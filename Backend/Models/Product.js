const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    category: { type: String, required: true },
    brand: { type: String },
    images: [{ type: String, required: true }],
    rating: { type: Number, default: 0 },

    // 👕 Size variations with separate stock values
    sizes: [
      {
        size: { type: String, required: true }, // e.g., "S", "M", "L", "XL"
        stock: { type: Number, required: true, default: 0 }
      }
    ],

    // ⭐ User reviews
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true },
        comment: { type: String },
        name: { type: String },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Product", ProductSchema);
