const express = require('express');
const votosController = require('../controllers/votosController');

const router = express.Router();

router.get('/votos', votosController.obtenerPorcentajeVotosPorCandidato);
router.post('/votos', votosController.createVoto);

module.exports = router;
