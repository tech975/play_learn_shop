const express = require('express');
const router = express.Router();
const venueController = require('../controllers/venueController');
const auth = require('../middleware/auth');

router.get('/', auth, venueController.getVenues);
router.get('/:id', auth, venueController.getVenueById);
router.get('/owner/:ownerId', auth, auth.authorize('owner'), venueController.getOwnerVenues);
router.post('/', auth, auth.authorize('owner'), venueController.createVenue);
router.put('/owner/:id', auth, auth.authorize('owner'), venueController.updateVenue);
router.delete('/owner/:id', auth, auth.authorize('admin'), venueController.deleteVenue);

module.exports = router;
