const express = require('express');
const creatorController = require('../controllers/creator');
const is_authorized = require('../middleware/is-authorized');
const router = express.Router();

router.get('/creator', is_authorized('creator'), creatorController.creator);

module.exports = router;
