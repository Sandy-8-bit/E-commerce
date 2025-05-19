// routes/cart.js
const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/Cart");

router.post("/addCart", cartController.addToCart);
router.delete("/removeCart", cartController.removeFromCart);
router.get("/cart/:userId", cartController.getCart);
router.post("/deleteallcart",cartController.removeAllCart)
router.post("/updatecart", cartController.updateCartQuantity);

module.exports = router;
