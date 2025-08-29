const CoachSlot = require('../../models/coach/CoachSlot');
const Coach = require('../../models/coach/Coach');
const CoachBooking = require('../../models/coach/CoachBooking');
const moment = require("moment");

exports.getAllSlots = async (req, res) => {
  try {
    const { coachId, date, status } = req.query;
    const filter = {};
    if (coachId) filter.coach = coachId;
    if (date) filter.date = date;
    if (status) filter.status = status;

    console.info(coachId, date)

    const slots = await CoachSlot.find(filter).populate("coach");
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Error fetching slots", error: err.message });
  }
};

exports.getSlotById = async (req, res) => {
  try {
    const slot = await CoachSlot.findById(req.params.id).populate("coach");
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: "Error fetching slot", error: err.message });
  }
};

exports.bookCoachSlot = async (req, res) => {
  try {
    const { slotIds } = req.body;
    const userId = req.user.id;

    console.log("slotIds: ", slotIds)

    if (!slotIds || slotIds.length === 0) {
      return res.status(400).json({ message: "At least one slot must be selected" });
    }

    // Fetch all slots
    const slots = await CoachSlot.find({ _id: { $in: slotIds } }).populate("coach");

    if (slots.length !== slotIds.length) {
      return res.status(404).json({ message: "Some slots not found" });
    }

    // Check if any slot is already booked
    const alreadyBooked = slots.filter(slot => slot.status === "booked");
    if (alreadyBooked.length > 0) {
      return res.status(400).json({
        message: `${alreadyBooked.length} slot(s) are already booked`,
        bookedSlots: alreadyBooked.map(s => s._id)
      });
    }

    // Mark slots as booked
    await CoachSlot.updateMany(
      { _id: { $in: slotIds } },
      { $set: { status: "booked" } }
    );

    // Create bookings
    const bookings = await Promise.all(
      slots.map(slot =>
        CoachBooking.create({
          user: userId,
          coach: slot.coach._id,
          slot: slot._id,
          amount: slot.price,
          status: "confirmed",
          payment: { status: "created", provider: "razorpay" }
        })
      )
    );

    res.status(201).json({
      message: `${bookings.length} slot(s) booked successfully`,
      bookings
    });

  } catch (error) {
    console.error("Error booking coach slot:", error);
    res.status(500).json({ message: "Error booking coach slot", error: error.message });
  }
};

exports.createSlot = async (req, res) => {
  try {
    const { coach, date, startISO, endISO, price, currency } = req.body;

    if (!coach || !date || !startISO || !endISO || !price) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const uniq = `${coach}-${new Date(startISO).toISOString()}`;
    const slot = await CoachSlot.create({ coach, date, startISO, endISO, price, currency, uniq });

    res.status(201).json(slot);
  } catch (err) {
    res.status(500).json({ message: "Error creating slot", error: err.message });
  }
};

exports.updateSlot = async (req, res) => {
  try {
    const slot = await CoachSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: "Error updating slot", error: err.message });
  }
};

exports.deleteSlot = async (req, res) => {
  try {
    const slot = await CoachSlot.findByIdAndDelete(req.params.id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    res.json({ message: "Slot deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting slot", error: err.message });
  }
};

exports.updateSlotStatus = async (req, res) => {
  try {
    const { status, holdUntil } = req.body;
    const slot = await CoachSlot.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    slot.status = status || slot.status;
    if (holdUntil) slot.holdUntil = holdUntil;

    await slot.save();
    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: "Error updating slot status", error: err.message });
  }
};

exports.generateSlots = async (req, res) => {
  try {
    const { coachId, date, startTime, endTime, slotDuration, price } = req.body;

    if (!coachId || !date || !startTime || !endTime || !slotDuration || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if coach exists
    const coach = await Coach.findById(coachId);
    if (!coach) return res.status(404).json({ message: "Coach not found" });

    const start = moment(`${date} ${startTime}`, "YYYY-MM-DD HH:mm");
    const end = moment(`${date} ${endTime}`, "YYYY-MM-DD HH:mm");

    if (!start.isValid() || !end.isValid() || !end.isAfter(start)) {
      return res.status(400).json({ message: "Invalid date/time range" });
    }

    const slots = [];
    let current = start.clone();

    while (current.isBefore(end)) {
      const slotStart = current.clone();
      const slotEnd = current.clone().add(slotDuration, "minutes");

      if (slotEnd.isAfter(end)) break;

      const uniq = `${coachId}-${slotStart.toISOString()}`;

      // Check if slot already exists
      const exists = await CoachSlot.findOne({ uniq });
      if (!exists) {
        const slot = new CoachSlot({
          coach: coachId,
          date,
          startISO: slotStart.toISOString(),
          endISO: slotEnd.toISOString(),
          price,
          status: "available",
          uniq
        });
        await slot.save();
        slots.push(slot);
      }

      current = slotEnd;
    }

    return res.status(201).json({
      message: `${slots.length} slots generated`,
      slots
    });
  } catch (error) {
    console.error("Error generating slots:", error);
    res.status(500).json({ message: "Error generating slots", error: error.message });
  }
};