const express = require('express');
const router = express.Router();

const { getProducts,addComment ,getProductById,getLatestProducts ,filterProducts, getComments,searchByTitle} = require('../Controllers/Products');


router.get("/products", getProducts)
router.get("/latestProducts", getLatestProducts)
router.get("/getComments", getComments)
router.get("/products/:id", getProductById)
router.put("/addComment/:id",addComment)
router.get("/filterProducts", filterProducts)
router.get("/search", getProducts)
router.get('/products/search-title/:words', searchByTitle);



module.exports = router;    