const Slot = require('../../models/Slot');
const Booking = require("../../models/Booking");

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const { generateSlotsForVenue } = require('../../services/slotService');

dayjs.extend(utc);
dayjs.extend(timezone);

exports.createSlot = async (req, res) => {
  try {
    const slotsData = req.body;

    if (!Array.isArray(slotsData) || slotsData.length === 0) {
      return res.status(400).json({ message: 'Send an array of slots' });
    }
    const convertedSlots = slotsData.map((slot) => {
      if (!slot.venue || !slot.date || !slot.startTime || !slot.endTime) {
        throw new Error("All fields are required for each slot");
      }

      return {
        ...slot,
        date: dayjs.tz(slot.date, "Asia/Kolkata").toDate(),
        startTime: dayjs.tz(slot.startTime, "Asia/Kolkata").toDate(),
        endTime: dayjs.tz(slot.endTime, "Asia/Kolkata").toDate(),
      };
    });

    const createdSlots = await Slot.insertMany(convertedSlots);

    res.status(201).json(createdSlots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.bookSlots = async (req, res) => {
  try {
    const { slotIds, amount } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(slotIds) || slotIds.length === 0) {
      return res.status(400).json({ message: "Send an array of slot IDs" });
    }

    let bookings = [];

    for (let slotId of slotIds) {
      const slot = await Slot.findById(slotId).populate("venue");
      if (!slot) continue;
      if (slot.isBooked) continue;

      const booking = new Booking({
        user: userId,
        venue: slot.venue._id,
        // slot: slot._id,
        amount,
        slots: [slot._id],
        date: slot.date,
        status: "pending",
        paymentStatus: "unpaid",
      });

      await booking.save();

      slot.isBooked = true;
      await slot.save();

      bookings.push(booking);
    }

    if (bookings.length === 0) {
      return res.status(400).json({ message: "No available slots to book" });
    }

    res.status(201).json({
      message: "Slots booked successfully",
      bookings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSlotsByVenue = async (req, res) => {
  try {
    const { venueId } = req.params;
    const { date } = req.query;

    let query = { venue: venueId };

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    const slots = await Slot.find(query)
      .populate("venue", "name location")
      .sort({ startTime: 1 });

    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { venueId } = req.params;
    const { date } = req.query;

    const query = { venue: venueId, date, isBooked: false  };

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      query.date = { $gte: startOfDay, $lte: endOfDay };

    }

    const availableSlots = await Slot.find(query);
    res.status(200).json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.generateSlots = async (req, res) => {
  try {
    const createdSlots = await generateSlotsForVenue(req.body);
    res.status(201).json({ message: "Slots generated", createdSlots });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate slots found" });
    }
    res.status(500).json({ message: err.message });
  }
};

exports.updateSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // slot find & update
    const updatedSlot = await Slot.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedSlot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.status(200).json({
      message: "Slot updated successfully",
      slot: updatedSlot,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Slot
exports.deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSlot = await Slot.findByIdAndDelete(id);

    if (!deletedSlot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.status(200).json({
      message: "Slot deleted successfully",
      slot: deletedSlot,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
