//========================================================
//====================    Diagrams   =====================
//========================================================

const express = require('express');
const diagramsController = require('../controllers/diagrams');
const router = express.Router();

router.get('/diagrams', diagramsController.get_ShowDiagramsList);
router.post('/diagrams', diagramsController.post_AddDiagram);
router.get('/diagrams/:dname', diagramsController.get_Diagram);
router.get('/diagrams/:dname/image', diagramsController.get_DiagramImage);
router.delete('/:dname', diagramsController.delete_RemoveDiagram);
router.put('/:dname', diagramsController.put_UpdateDiagram);

module.exports = router;
