const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Example routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id/suspend', userController.suspendUser);
router.put('/updateUserProfile', auth, userController.updateUserProfile);

module.exports = router;
