const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  sport: { type: String, required: true },
  price: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  slots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot' }],
  image: { type: String, default: "", required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  // Add more fields as needed
});

module.exports = mongoose.model('Venue', venueSchema);
