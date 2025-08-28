const express = require('express');
const router = express.Router();

const {
  getAllSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot,
  updateSlotStatus,
  generateSlots
} = require('../../controllers/coach/CoachSlotController');

router.get('/', getAllSlots);
router.get('/:id', getSlotById);
router.post('/', createSlot);
router.put('/:id', updateSlot);
router.delete('/:id', deleteSlot);
router.patch('/:id/status', updateSlotStatus);
router.post('/bulk', generateSlots)

module.exports = router;
