const express = require('express');
const dashboardController = require('../controllers/dashboard');
const is_authorized = require('../middleware/is-authorized');
const router = express.Router();

router.get('/dashboard', dashboardController.get_Dashboard);
router.get('/dashboard/:ename', dashboardController.get_ManageEcore);

module.exports = router;
