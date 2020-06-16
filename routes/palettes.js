const express = require('express');
const palettesController = require('../controllers/palettes');
const router = express.Router();

router.get('/palettes', palettesController.get_ShowPalettesList);
router.post('/palettes', palettesController.post_AddPalette);
router.get('/palettes/:pname', palettesController.get_Palette);
router.post('/palettes/:pname/delete', palettesController.post_RemovePalette);
router.put('/palettes/:pname', palettesController.put_UpdatePalette);

module.exports = router;
