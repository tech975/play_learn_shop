const express = require('express');
const router = express.Router();
const venueController = require('../controllers/venueController');
const auth = require('../middleware/auth');

router.get('/', auth, venueController.getVenues);
router.get('/:id', auth, venueController.getVenueById);
router.post('/', auth, venueController.createVenue);
router.put('/:id', auth, venueController.updateVenue);
router.delete('/:id', auth, venueController.deleteVenue);

module.exports = router;
