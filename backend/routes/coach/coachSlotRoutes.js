const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const {
  getAllSlots,
  getSlotById,
  createSlot,
  bookCoachSlot,
  updateSlot,
  deleteSlot,
  updateSlotStatus,
  generateSlots
} = require('../../controllers/coach/CoachSlotController');

router.get('/', getAllSlots);
router.get('/:id', getSlotById);
router.post('/', createSlot);
router.post('/book', auth, bookCoachSlot);
router.put('/:id', updateSlot);
router.delete('/:id', deleteSlot);
router.patch('/:id/status', updateSlotStatus);
router.post('/bulk', generateSlots)

module.exports = router;
