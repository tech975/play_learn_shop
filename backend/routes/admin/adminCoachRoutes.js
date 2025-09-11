const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const adminCoachController = require('../../controllers/admin/adminCoachController');

router.get('/coach-request', auth, auth.authorize('admin', 'owner', 'user'), adminCoachController.getAllCoaches);
router.put('/coach-request/status/:id', auth, auth.authorize('owner', 'admin', 'user'), adminCoachController.updateRequestStatus);

module.exports = router;