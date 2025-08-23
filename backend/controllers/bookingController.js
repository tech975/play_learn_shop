const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
exports.createBooking = async (req, res) => {
  try {
    const { user, venue, slot, coach, amount } = req.body;
    if (!user || !venue || !slot || !amount) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Mark slot as booked
    await Slot.findByIdAndUpdate(slot, { isBooked: true });
    const booking = await Booking.create({ user, venue, slot, coach, amount, status: 'pending', paymentStatus: 'paid' });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const { userId, ownerId, coachId } = req.query;
    let filter = {};
    if (userId) filter.user = userId;
    if (ownerId) filter['venue.owner'] = ownerId;
    if (coachId) filter.coach = coachId;
    const bookings = await Booking.find(filter).populate('user venue slot coach');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();
    // Mark slot as not booked
    await Slot.findByIdAndUpdate(booking.slot, { isBooked: false });
    res.json({ message: 'Booking cancelled and refunded' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
