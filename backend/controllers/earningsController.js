const Earnings = require('../models/Earnings');
exports.getEarnings = async (req, res) => {
  try {
    const { ownerId, coachId } = req.query;
    let filter = {};
    if (ownerId) filter.owner = ownerId;
    if (coachId) filter.coach = coachId;
    const earnings = await Earnings.find(filter).populate('owner coach booking');
    const total = earnings.reduce((sum, e) => sum + e.amount, 0);
    res.json({ total, earnings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
