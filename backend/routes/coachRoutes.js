// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const coachController = require('../controllers/coach/CoachController');
// const coachScheduleController = require('../controllers/coach/CoachScheduleController');

// // router.get('/', auth, coachController.getCoaches);
// // router.post('/create', auth, auth.authorize('admin', 'coach'), coachController.createCoach);
// // router.get('/schedules', auth, coachScheduleController.getAllSchedules);
// // router.get('/:id', auth, coachController.getCoachById);
// // router.put('/:id', auth, auth.authorize('admin', 'coach'), coachController.updateCoach);

// // // admin access 
// // router.delete('/:id', auth, auth.authorize('admin'), coachController.deleteCoach);
// // router.get('/coaches/pending', auth, auth.authorize('admin', 'coach'), coachController.getPendingCoaches);
// // router.post('/coaches/:id/approve', auth, auth.authorize('coach', 'admin'), coachController.approveCoach);
// // router.post('/coaches/:id/reject', auth, auth.authorize('admin'), coachController.rejectCoach);

// // // coach schedule routes
// // router.post('/schedules', auth, auth.authorize('admin', 'coach'), coachScheduleController.createSchedule);
// // router.get('/schedules/coach/:coachId', auth, coachScheduleController.getScheduleByCoach);
// // router.get('/schedules/:id', auth, coachScheduleController.getScheduleById);
// // router.put('/schedules/:id', auth, auth.authorize('admin', 'coach'), coachScheduleController.updateSchedule);
// // router.delete('/schedules/:id', auth, auth.authorize('admin', 'coach'), coachScheduleController.deleteSchedule);

// // router.post('/schedules/:id/weekly', auth, auth.authorize('admin', 'coach'), coachScheduleController.addWeeklyDay);
// // router.put('/schedules/:id/weekly/:dayIndex', auth, auth.authorize('admin', 'coach'), coachScheduleController.updateWeeklyDay);
// // router.delete('/schedules/:id/weekly/:dayIndex', auth, auth.authorize('admin', 'coach'), coachScheduleController.removeWeeklyDay);

// // router.post('/schedules/:id/overrides', auth, auth.authorize('admin', 'coach'), coachScheduleController.addOverride);
// // router.put('/schedules/:id/overrides/:overrideIndex', auth, auth.authorize('admin', 'coach'), coachScheduleController.updateOverride);
// // router.delete('/schedules/:id/overrides/:overrideIndex', auth, auth.authorize('admin', 'coach'), coachScheduleController.removeOverride);

// module.exports = router;