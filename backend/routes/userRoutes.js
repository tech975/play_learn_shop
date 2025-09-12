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
router.put('/user/update', auth, userController.updateUserProfile);
router.put('/profile', auth, upload.uploadProfile.single('profilePic'), userController.uploadProfilePic);
router.post("/achievements", auth, upload.uploadAchievement.single('image'), userController.uploadAchievement);

module.exports = router;
