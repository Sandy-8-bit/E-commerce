const Razorpay = require("razorpay");

const RAZORPAY_KEY_ID =  "rzp_test_rKiMueoMmDr4F8";
const RAZORPAY_SECRET = "hc8qFgWsMU7spdKF89deIcFk";

const instance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET
});

exports.createOrder =   async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount , // amount in smallest currency unit (paise)
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).send(err);
  }
};


