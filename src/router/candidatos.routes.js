const express = require('express');
const candidatosController = require('../controllers/canditatosController');

const router = express.Router();

router.get('/candidatos', candidatosController.getAllCandidatos);
router.get('/candidato/:id', candidatosController.getCandidatoById);
router.post('/candidato', candidatosController.createCandidato);
router.put('/candidato/:id', candidatosController.updateCandidato);
router.delete('/candidato/:id', candidatosController.deleteCandidato);

module.exports = router;