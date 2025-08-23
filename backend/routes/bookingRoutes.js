const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.patch('/:id/cancel', bookingController.cancelBooking);
router.patch('/:id', bookingController.updateBookingStatus);

module.exports = router;
