const Product = require("../Models/Product");
const express = require("express");

exports.postProduct = async (req, res) => {
    try {
        const { title, description, price, oldPrice, category, brand, stock, images, rating, reviews } = req.body;

        if (!title || !price || !category) {
            return res.status(400).json({ message: "Title, price, and category are required." });
        }

        const newProduct = new Product({
            title,
            description,
            price,
            oldPrice,
            category,
            brand,
            stock,
            images,
            rating,
            reviews
        });

        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Product Creation Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
};
