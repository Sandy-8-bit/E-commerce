const express = require('express');
const router = express.Router();

const { getProducts ,getProductById,getLatestProducts , getComments} = require('../Controllers/Products');


router.get("/products", getProducts)
router.get("/latestProducts", getLatestProducts)
router.get("/getComments", getComments)
router.get("/products/:id", getProductById)

module.exports = router;    