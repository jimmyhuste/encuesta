const express = require('express');
const personasController = require('../controllers/personasController');

const router = express.Router();

router.get('/personas', personasController.getAllPersonas);
router.post('/personas', personasController.createPersona);
router.delete('/personas/:id', personasController.deletePersona);

module.exports = router;
