//========================================================
//=======================    JSON    =====================
//========================================================

const express = require('express');
const jsonsController = require('../controllers/json');
const router = express.Router();

router.get('/jsons', jsonsController.get_AllJson);
router.get('/jsons/:pname', jsonsController.get_Json);
router.get('/jsonbyuri', jsonsController.get_JsonByUri);

module.exports = router;
