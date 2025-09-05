
const mongoose = require("mongoose");

const ownerRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    email: String,
    phone: String,
    role: String,
    groundAddress: { type: String, required: true },
    groundName: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("OwnerRequest", ownerRequestSchema);
