// Venue Controller
const Venue = require('../../models/Venue');
const Slot = require('../../models/Slot');
const User = require('../../models/User');
const { generateSlotsForVenue } = require('../../services/slotService');

exports.createVenue = async (req, res) => {
  try {
    const { name, location, sport, price } = req.body;
    if (!name || !location || !sport || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const venue = await Venue.create({ name, location, sport, price, owner: req.user._id });

    if (status === 'approved') {
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
    }

    res.status(201).json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.applyAsOwner = async (req, res) => {
  try {
    let { price, priceType, sports, groundName, groundAddress } = req.body;

    const validGroundName = groundName.trim().toLowerCase();
    const validGroundAddress = groundAddress.trim().toLowerCase();

    if (!validGroundName || !validGroundAddress || !price || !sports || sports.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(req.user._id).select("name email phone role");

    const existing = await Venue.findOne({ owner: req.user._id, groundAddress: validGroundAddress, groundName: validGroundName, status: { $in: ["pending", "approved"] } });
    if (existing) {
      return res.status(400).json({ message: "You already have a pending request" });
    }

    const request = await Venue.create({
      owner: req.user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      price,
      priceType: priceType || 'hourly',
      sports,
      groundName: validGroundName,
      groundAddress: validGroundAddress
    });

    // request = await request.populate("user", "name email phone role");

    res.status(201).json({ message: "Request submitted", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getVenues = async (req, res) => {
  try {
    const { sport, location, price, search } = req.query;
    let filter = {};
    if (sport) filter.sport = sport;
    if (location) filter.location = location;
    if (price) filter.price = { $lte: Number(price) };

    const venues = await Venue.find(filter).populate('owner').populate('slots');
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).populate('owner').populate('slots');
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOwnerVenues = async (req, res) => {
  const { ownerId } = req.params;

  try {
    const venues = await Venue.find({ owner: ownerId }).populate('owner').populate('slots');
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getAllOwnerVenues = async (req, res) => {
  
  try {

    const { ownerIds } = req.params;
    if(!ownerIds) {
      return res.status(400).json({ message: "No ownerIds found" })
    }
    const venues = await Venue.find({ owner: { $in: ownerIds?.split(",")} }).populate('owner');
    res.json(venues)
  } catch (error) {
    res.status(500).json({ message: "Error while getting all the owner venues"})
    console.log(error)
  }
}

exports.getApprovedVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ status: "approved" }).populate("owner");
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Error fetching venues", error: error.message });
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
    // if (image) venue.image = image;
    if (status) venue.status = status;

    await venue.save();

    res.status(200).json({ message: "Venue updated successfully", venue });
  } catch (error) {
    res.status(500).json({ message: "Error updating venue", error: error.message });
  }
};

exports.uploadVenueImages = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.requestId);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    const existingImageCount = venue?.images ? venue?.images.length : 0;
    const newImageCount = req?.files ? req?.files?.length : 0;

    if (existingImageCount + newImageCount > 3) {
      return res.status(400).json({ message: 'You can upload a maximum of 3 images only' });
    }

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      venue.images.push(...req?.files?.map(file => file.path));
    }

    await venue.save();
    res.status(200).json({ message: 'Images uploaded successfully', venue });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading images', error: error.message });
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
