const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  amount: Number,
  paymentStatus: String,
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Payment", paymentSchema);
