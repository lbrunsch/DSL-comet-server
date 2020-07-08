const express = require('express');
const dashboardController = require('../controllers/dashboard');
const is_authorized = require('../middleware/is-authorized');
const router = express.Router();

router.get('/dashboard', dashboardController.get_Dashboard);
router.get('/dashboard/:ename', dashboardController.get_ManageEcore);
router.post('/dashboard/:ename', dashboardController.post_DeleteEcore);
router.post('/dashboard/:ename/palettes', dashboardController.post_DeletePalettes);
router.post('/dashboard/:ename/roles', dashboardController.post_DeleteRoles);
router.post('/dashboard/:ename/hierarchy', dashboardController.post_ManageRoles);
router.post('/dashboard/:ename/hierarchy/update', dashboardController.post_modifyRoles);
router.post('/roleApp/', dashboardController.post_app);


module.exports = router;
