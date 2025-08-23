const express = require('express');
const router = express.Router();
const earningsController = require('../controllers/earningsController');

router.get('/', earningsController.getEarnings);

module.exports = router;
