const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const coachController = require('../../controllers/coach/CoachController');

router.get('/', coachController.getCoaches);
router.post('/create', auth, coachController.createCoach);
router.get('/:id', auth, coachController.getCoachById);
router.put('/:id', auth, auth.authorize('admin', 'coach'), coachController.updateCoach);

// admin access 
router.delete('/:id', auth, auth.authorize('admin'), coachController.deleteCoach);
router.get('/coaches/pending', auth, auth.authorize('admin', 'coach'), coachController.getPendingCoaches);
router.post('/coaches/:id/approve', auth, auth.authorize('coach', 'admin'), coachController.approveCoach);
router.post('/coaches/:id/reject', auth, auth.authorize('admin'), coachController.rejectCoach);


module.exports = router;

