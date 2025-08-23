// Venue Controller
const Venue = require('../models/Venue');
const Slot = require('../models/Slot');
exports.getVenues = async (req, res) => {
  try {
    const { sport, location, price } = req.query;
    let filter = {};
    if (sport) filter.sport = sport;
    if (location) filter.location = location;
    if (price) filter.price = { $lte: Number(price) };
    const venues = await Venue.find(filter).populate('owner', 'name email').populate('slots');
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).populate('owner', 'name email').populate('slots');
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createVenue = async (req, res) => {
  try {
    const { name, location, sport, price, owner } = req.body;
    if (!name || !location || !sport || !price || !owner) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const venue = await Venue.create({ name, location, sport, price, owner });
    res.status(201).json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json({ message: 'Venue deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
