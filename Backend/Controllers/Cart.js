const Cart = require("../Models/Cart");
const Product = require("../Models/Product");

// Add to Cart
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [{ productId, quantity }] });
        } else {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateCartQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Find the user's cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Update the product quantity
        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        cart.products[productIndex].quantity = quantity;

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (err) {
        console.error("Error updating cart:", err);
        res.status(500).json({ message: "Failed to update cart" });
    }
};

exports.removeAllCart = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
  
    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      cart.products = [];
      await cart.save();
  
      return res.status(200).json({ message: "Cart cleared successfully", cart });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
// Remove from Cart
exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);
        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Cart
exports.getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate("products.productId");

        if (!cart) return res.status(200).json({ products: [] });

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

