const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// router.post('/', bookingController.createBooking);
// router.get('/', bookingController.getBookings);
// router.patch('/:id/cancel', bookingController.cancelBooking);
// router.patch('/:id', bookingController.updateBookingStatus);


router.post('/', auth, bookingController.createBooking);
router.get('/', auth, bookingController.getBookings);
router.put('/:id/status', auth, bookingController.updateBookingStatus);
router.delete('/:id', auth, bookingController.cancelBooking);

module.exports = router;
