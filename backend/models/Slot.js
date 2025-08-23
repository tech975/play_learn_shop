const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Add more fields as needed
});

module.exports = mongoose.model('Slot', slotSchema);
