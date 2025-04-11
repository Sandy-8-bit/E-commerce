const express = require('express');
const router = express.Router();
const {sendMail , sendOfferEmails} = require("../Controllers/Mail")

router.post("/sendMail",sendMail)
router.post("/send-offer", sendOfferEmails);
        
module.exports = router