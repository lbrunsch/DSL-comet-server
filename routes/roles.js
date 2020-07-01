const express = require('express');
const rolesController = require('../controllers/roles');
const router = express.Router();

router.get('/roles', rolesController.get_ShowRole);
router.post('/roles', rolesController.post_AddRole);
//router.get('/roles/:ename', rolesController.get_ManageRole);

module.exports = router;
