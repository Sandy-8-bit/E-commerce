const express = require('express');
const router = express.Router();

const { getProducts,addComment ,getProductById,getLatestProducts ,filterProducts, getComments} = require('../Controllers/Products');


router.get("/products", getProducts)
router.get("/latestProducts", getLatestProducts)
router.get("/getComments", getComments)
router.get("/products/:id", getProductById)
router.put("/addComment/:id",addComment)
router.get("/filterProducts", filterProducts)
module.exports = router;    