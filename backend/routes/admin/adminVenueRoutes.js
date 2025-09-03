const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminVenueController');
const auth = require('../../middleware/auth');

router.get('/venue-request/pending', auth, adminController.getPendingRequests);
router.put('/venue-request/status/:requestId', auth, adminController.updateRequestStatus);
router.post('/venue-request', auth, adminController.applyAsOwner);

module.exports = router;