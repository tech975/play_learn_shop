const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/auth').authorize;

router.post('/', auth, authorize('owner'), slotController.createSlot);
router.get('/', auth, authorize('owner'), slotController.getSlots);
router.get("/venue/:venueId", auth, slotController.getSlotsByVenue);
router.get("/available/:venueId", slotController.getAvailableSlots);
router.post('/generate', auth, authorize('owner'), slotController.generateSlots);
router.put('/book', auth, slotController.bookSlots);
router.put('/:id', auth, authorize('owner'), slotController.updateSlot);
router.delete('/:id', auth, authorize('owner'), slotController.deleteSlot);

module.exports = router;
