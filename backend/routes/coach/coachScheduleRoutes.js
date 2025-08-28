const express = require('express');
const router = express.Router();
const coachScheduleController = require('../../controllers/coach/CoachScheduleController');
const auth = require('../../middleware/auth');

// coach schedule routes
router.post('/', auth, auth.authorize('admin', 'coach'), coachScheduleController.createSchedule);
router.get('/', auth, coachScheduleController.getAllSchedules);
router.get('/coach/:coachId', auth, coachScheduleController.getScheduleByCoach);
router.get('/:id', auth, coachScheduleController.getScheduleById);
router.put('/:id', auth, auth.authorize('admin', 'coach'), coachScheduleController.updateSchedule);
router.delete('/:id', auth, auth.authorize('admin', 'coach'), coachScheduleController.deleteSchedule);

router.post('/:id/weekly', auth, auth.authorize('admin', 'coach'), coachScheduleController.addWeeklyDay);
router.put('/:id/weekly/:dayIndex', auth, auth.authorize('admin', 'coach'), coachScheduleController.updateWeeklyDay);
router.delete('/:id/weekly/:dayIndex', auth, auth.authorize('admin', 'coach'), coachScheduleController.removeWeeklyDay);

router.post('/:id/overrides', auth, auth.authorize('admin', 'coach'), coachScheduleController.addOverride);
router.put('/:id/overrides/:overrideIndex', auth, auth.authorize('admin', 'coach'), coachScheduleController.updateOverride);
router.delete('/:id/overrides/:overrideIndex', auth, auth.authorize('admin', 'coach'), coachScheduleController.removeOverride);


module.exports = router;
