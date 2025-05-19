const Product = require("../Models/Product");
const mongoose = require('mongoose')
const User = require("../Models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return res.status(500).json({ error: error.message });
    }
}
exports.searchByTitle = async (req, res) => {
    try {
        const { words } = req.params;

        if (!words || words.trim() === "") {
            return res.status(400).json({ message: "Search words are required" });
        }

        // Split the input into words and create a case-insensitive regex for each
        const regexArray = words.split(" ").map(word => ({
            title: { $regex: word, $options: "i" }
        }));

        // Match any product whose title contains at least one of the words
        const products = await Product.find({ $or: regexArray });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        return res.status(200).json(products);

    } catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



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


exports.filterProducts = async (req, res) => {
    try {
        const { category, brand, minPrice, maxPrice, minRating, title } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (brand) {
            filter.brand = brand;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating) };
        }

        if (title) {
            filter.title = { $regex: title, $options: "i" }; // case-insensitive search
        }

        const products = await Product.find(filter);
        return res.status(200).json(products);

    } catch (error) {
        console.error("Error fetching products:", error.message);
        return res.status(500).json({ error: error.message });
    }
};
exports.addComment = async (req, res) => {
    try {
      const { id } = req.params;  // Product ID from URL parameter
      const { comment, rating, userId,name} = req.body;  // `userId` passed directly in the request body
  
        if(!name){
            return res.status(400).json({ message: "Name is required" });
        }
        

  
  
     
      // Check if `userId` exists in the request body
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      // Validate that the user exists in the User collection
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find the product by ID
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Add the new review with `userId`, ensuring it's valid
      product.reviews.push({ user: userId, comment, rating ,name});
      await product.save(); // Save the updated product with the new review
  
      return res.status(200).json(product);  // Return the updated product
    } catch (error) {
      console.error("Error adding comment:", error.message);
      return res.status(500).json({ error: error.message });
    }
  };


  exports.search = async (req, res) => {
    try {
        const { query } = req.query;
        const products = await Product.find({ $text: { $search: query } });
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error searching products:", error.message);
        return res.status(500).json({ error: error.message });
    }
};


exports.searchProducts = async (req, res) => {
    try {
      const { query } = req.query;
  
      if (!query) {
        return res.status(400).json({ 
          success: false,
          message: 'Search query is required' 
        });
      }
  
      const products = await Product.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },       // Case-insensitive title search
          { description: { $regex: query, $options: 'i' } }, // Search in description
          { category: { $regex: query, $options: 'i' } },   // Search in category
          { brand: { $regex: query, $options: 'i' } }       // Search in brand
        ]
      }).limit(10); // Limit results to 10 items
  
      if (products.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No products found matching your search'
        });
      }
  
      res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
  
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during search',
        error: error.message
      });
    }
  };
  