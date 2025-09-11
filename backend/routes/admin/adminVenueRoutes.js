const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminVenueController');
const auth = require('../../middleware/auth');

router.get('/venue-request/pending', auth, auth.authorize('admin'), adminController.getPendingRequests);
router.put('/venue-request/status/:id', auth, auth.authorize('admin'), adminController.updateRequestStatus);

module.exports = router;