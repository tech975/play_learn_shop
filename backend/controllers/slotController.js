const Slot = require('../models/Slot');
exports.createSlot = async (req, res) => {
  try {
    const { venue, date, startTime, endTime, coach } = req.body;
    if (!venue || !date || !startTime || !endTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const slot = await Slot.create({ venue, date, startTime, endTime, coach });
    res.status(201).json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
