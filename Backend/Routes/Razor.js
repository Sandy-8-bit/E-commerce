const express = require('express');
const router = express.Router();
const {createOrder} = require("../Controllers/Razor")


router.post("/createOrder",createOrder)

        
module.exports = router