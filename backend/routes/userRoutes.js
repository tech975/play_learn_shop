const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Example routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/users', auth, userController.getAllUsers);
router.get('/user/:id', auth, userController.getUserById);
router.put('/updateUserProfile', auth, userController.updateUserProfile);
router.put('/profile', auth, upload.single('profilePic'), userController.uploadProfilePic);

module.exports = router;
