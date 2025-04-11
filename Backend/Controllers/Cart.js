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
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
