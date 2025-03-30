const express = require('express');
const router = express.Router();
const { register , Login ,getUser } = require('../Controllers/authController');

router.post("/register",register)
router.post("/login",Login)


router.get("/getUser",getUser)
module.exports = router;
