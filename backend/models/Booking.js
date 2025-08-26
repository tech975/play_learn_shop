const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  slots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }],
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  date: { type: Date, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded', 'unpaid'], default: 'pending' },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  // Add more fields as needed
});

module.exports = mongoose.model('Booking', bookingSchema);
