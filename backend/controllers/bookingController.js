const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const Venue = require('../models/Venue');

// 1️⃣ Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { user, venue, slots, coach, amount, date } = req.body;

    if (!Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({ message: "Send an array of slots" });
    }

    // Check if any slot is already booked
    const existing = await Booking.findOne({
      slots: { $in: slots },
      date,
      status: { $ne: "cancelled" },
    });

    if (existing) {
      return res.status(400).json({ message: "One or more slots already booked" });
    }

    // Mark all selected slots as booked
    await Slot.updateMany(
      { _id: { $in: slots } },
      { $set: { isBooked: true } }
    );

    const booking = await Booking.create({
      user,
      venue,
      slots, // <-- array
      coach,
      amount,
      date,
      status: "pending",
      paymentStatus: "unpaid",
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
      .populate('slots')
      .populate('coach', 'name');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3️⃣ Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('venue');
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

exports.confirmBookingPayment = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "paid";
    booking.status = "confirmed"; // if you want auto-confirm after payment
    await booking.save();

    res.status(200).json({ message: "Payment confirmed", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
