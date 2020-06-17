//========================================================
//====================     eCores    =====================
//========================================================

const express = require('express');
const ecoresController = require('../controllers/ecores');
const router = express.Router();

router.get('/ecores', ecoresController.get_ShowEcoreList);
router.post('/ecores', ecoresController.post_AddEcore);
router.get('/ecores/:ename', ecoresController.get_Ecore);
router.post('/ecores/:ename/delete', ecoresController.post_RemoveEcore);

module.exports = router;
