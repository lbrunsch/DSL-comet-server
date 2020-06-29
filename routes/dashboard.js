const express = require('express');
const dashboardController = require('../controllers/dashboard');
const is_authorized = require('../middleware/is-authorized');
const router = express.Router();

router.get('/dashboard', is_authorized('dashboard'), dashboardController.dashboard);

module.exports = router;
