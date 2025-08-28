const mongoose = require("mongoose");

const coachSlotSchema = new mongoose.Schema({
  coach: { type: mongoose.Schema.Types.ObjectId, ref: "Coach", index: true, required: true },
  date: { type: String, index: true, required: true },
  startISO: { type: Date, required: true, index: true },
  endISO: { type: Date, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ["available","held","booked","expired"], default: "available", index: true },
  // temporary hold for payment
  holdUntil: { type: Date, index: true },
  uniq: { type: String, unique: true }
}, { timestamps: true });

coachSlotSchema.index({ coach: 1, startISO: 1 }, { unique: true });

module.exports = mongoose.model("CoachSlot", coachSlotSchema);
