const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'owner', 'coach', 'admin'], default: 'user' },
  phone: { type: String, default: null },
  location: { type: String, default: '' },
  dob: { type: Date, default: null },
  gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
  profilePic: { type: String , default: '' },
  preferredSports: { type: [String], default: [] },
  mybookings: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  mysessions: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach' },
  achievements: [{
    image: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }],
  wallet: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
