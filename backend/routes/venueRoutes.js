const express = require('express');
const router = express.Router();
const venueController = require('../controllers/venue/venueController');
const auth = require('../middleware/auth');
const { uploadVenue } = require('../middleware/upload');

router.get('/', venueController.getVenues);
router.get('/:id', auth, venueController.getVenueById);
router.get('/owner/:ownerId', auth, auth.authorize('owner'), venueController.getOwnerVenues);
router.get('/approved', auth, venueController.getApprovedVenues);
router.post('/', auth, auth.authorize('owner'), venueController.createVenue);
router.put('/owner/:id', auth, auth.authorize('owner'), venueController.updateVenue);
router.delete('/owner/:id', auth, auth.authorize('admin'), venueController.deleteVenue);
router.post('/upload-images/:requestId', auth, auth.authorize('owner'), uploadVenue.array('images', 3), venueController.uploadVenueImages);
router.post('/venue-request', auth, venueController.applyAsOwner);
module.exports = router;
