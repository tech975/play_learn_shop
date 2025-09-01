// Venue Controller
const Venue = require('../models/Venue');
const Slot = require('../models/Slot');
const { generateSlotsForVenue } = require('../services/slotService');

exports.getVenues = async (req, res) => {
  try {
    const { sport, location, price, search } = req.query;
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

exports.getOwnerVenues = async (req, res) => {
  const { ownerId } = req.params;

  try {
    const venues = await Venue.find({ owner: ownerId }).populate('owner', 'name email').populate('slots');
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.createVenue = async (req, res) => {
  try {
    const { name, location, sport, price, owner } = req.body;
    if (!name || !location || !sport || !price || !owner) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const venue = await Venue.create({ name, location, sport, price, owner });

    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 10);

    await generateSlotsForVenue({
      venue: venue._id,
      startDate: today,
      endDate,
      startHour: 9,
      endHour: 12,
      slotDuration: 60
    });

    res.status(201).json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findOne({
      _id: req.params.id,
      // ownerId: req.user._id
    });


    if (!venue) {
      return res.status(404).json({ message: "Venue not found or not yours" });
    }

    const { name, location, sport, price, image, status } = req.body;
    if (name) venue.name = name;
    if (location) venue.location = location;
    if (sport) venue.sport = sport;
    if (price) venue.price = price;
    if (image) venue.image = image;
    if (status) venue.status = status;

    await venue.save();

    res.status(200).json({ message: "Venue updated successfully", venue });
  } catch (error) {
    res.status(500).json({ message: "Error updating venue", error: error.message });
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
