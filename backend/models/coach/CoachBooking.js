const mongoose = require("mongoose");

const coachBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: "Coach", required: true, index: true },
  slot:  { type: mongoose.Schema.Types.ObjectId, ref: "CoachSlot", required: true, unique: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  payment: {
    provider: { type: String, enum: ["razorpay"], default: "razorpay" },
    orderId: String,
    paymentId: String,
    status: { type: String, enum: ["created","paid","failed","refunded"], default: "created", index: true },
    raw: Object
  },
  status: { type: String, enum: ["pending","confirmed","cancelled"], default: "pending", index: true }
}, { timestamps: true });

module.exports = mongoose.model("CoachBooking", coachBookingSchema);
