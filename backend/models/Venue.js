const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    email: String, 
    phone: String,
    role: String,
    price: { type: Number, required: true },
    priceType: { type: String, default: 'hourly' },
    sports: { type: [String], required: true, default: [] },
    images: { type: [String], default: [] },
    slots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot' }],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    groundAddress: { type: String, required: true },
    groundName: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }, { timestamps: true }
)
module.exports = mongoose.model('Venue', venueSchema);
