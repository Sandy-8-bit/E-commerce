const express = require('express');
const router = express.Router();

const { postProduct } = require('../Controllers/Admin');
const {verifyAdmin} = require("../Middleware/authMiddleware")

router.post("/admin/post", verifyAdmin ,postProduct)

module.exports = router;



