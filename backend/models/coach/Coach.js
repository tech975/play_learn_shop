const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
  // owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  sport: { type: String, index: true, required: true },
  bio: { type: String },
  experienceYears: { type: Number, default: 0, required: true },
  certifications: [{ type: String }],
  pricing: {
    type: { type: String, enum: ["hourly", "per_session"], default: "per_session" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" }
  },
  location: {
    address: String,
    city: { type: String, index: true },
    state: String,
    pincode: String,
    // coordinates: { type: { type: String, enum: ["Point"], default: "Point" },
    //                coordinates: { type: [Number], index: "2dsphere" } }
  },
  media: {
    avatar: String,
    gallery: [String]
  },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
}, { timestamps: true });

module.exports = mongoose.model("Coach", coachSchema);
