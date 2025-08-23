const mongoose = require('mongoose');

const earningsSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['owner', 'coach'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Earnings', earningsSchema);
