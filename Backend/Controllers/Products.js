const Product = require("../Models/Product");
const mongoose = require('mongoose')

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return res.status(500).json({ error: error.message });
    }
}


exports.getLatestProducts = async (req, res) => {
    try {

        const products = await Product.find().sort({ createdAt: -1 }).limit(10); 

        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return res.status(500).json({ error: error.message });
    }
};
exports.getComments = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        const productsWith5StarReviews = products.map(product => {
            const fiveStarReviews = product.reviews.filter(review => review.rating === 5);
            return {
                ...product.toObject(),
                reviews: fiveStarReviews,
            };
        });

        return res.status(200).json(productsWith5StarReviews);
    } catch (error) {
        return res.status(500).json({ message: "error" });
    }
}


exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Optional: Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};