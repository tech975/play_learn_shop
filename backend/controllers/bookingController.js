const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const Venue = require('../models/Venue');

// 1️⃣ Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { user, venue, slot, coach, amount, date } = req.body;

    if (!user || !venue || !slot || !amount || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if slot is already booked
    const existing = await Booking.findOne({ slot, date, status: { $ne: 'cancelled' } });
    if (existing) {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    // Mark slot as booked
    await Slot.findByIdAndUpdate(slot, { isBooked: true });

    const booking = await Booking.create({
      user,
      venue,
      slot,
      coach,
      amount,
      date,
      status: 'pending',
      paymentStatus: 'unpaid',
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2️⃣ Get Bookings (user / venue owner / coach)
exports.getBookings = async (req, res) => {
  try {
    const { userId, ownerId, coachId } = req.query;
    let filter = {};

    if (userId) filter.user = userId;
    if (coachId) filter.coach = coachId;
    if (ownerId) {
      const venues = await Venue.find({ owner: ownerId }).select('_id');
      filter.venue = { $in: venues.map(v => v._id) };
    }

    const bookings = await Booking.find(filter)
      .populate('user', 'name email')
      .populate({ path: 'venue', populate: { path: 'owner', select: 'name email' } })
      .populate('slot')
      .populate('coach', 'name');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3️⃣ Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    // Free the slot
    await Slot.findByIdAndUpdate(booking.slot, { isBooked: false });

    res.json({ message: 'Booking cancelled and refunded' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4️⃣ Update Booking Status (e.g., pending → confirmed)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
