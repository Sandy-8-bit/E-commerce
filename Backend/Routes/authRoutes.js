const express = require('express');
const router = express.Router();
const { register , Login ,getUser,updateUserDetails,getUserDetails } = require('../Controllers/authController');

router.post("/register",register)
router.post("/login",Login)
router.post("/getuserss",getUserDetails)
router.put("/details",updateUserDetails)

router.get("/getUser",getUser)
module.exports = router;
