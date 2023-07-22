const votosModel = require('../models/votosModel');

exports.createVoto = async (req, res) => {
  try {
    const { id_persona, id_candidato } = req.body;

    // Verificar si la persona ya tiene un voto
    const existingVoto = await votosModel.getVotoByPersonaId(id_persona);
    if (existingVoto) {
      return res.status(400).json({ error: 'Ou deja vote poun yon kandida, ou paka vote anko.' });
    }

    // Crear el nuevo voto
    const votoData = { id_persona, id_candidato };
    const newVoto = await votosModel.createVoto(votoData);

    // Generar un token para la persona que ha votado
    const tokenVoto = votosModel.generateToken(id_persona);

    res.json({ voto: newVoto, tokenVoto });
  } catch (error) {
    console.error('Error al crear el voto:', error);
    res.status(500).json({ error: 'Error al crear el voto' });
  }
};

exports.obtenerPorcentajeVotosPorCandidato = (req, res) => {
  votosModel.getAllVotos()
    .then((votos) => {
      // Calcular el porcentaje de votos por candidato
      const totalVotosEmitidos = votos.reduce((total, candidato) => total + candidato.total_votos, 0);

      const candidatosConPorcentaje = votos.map((candidato) => ({
        nombre: candidato.nombre,
        apellido: candidato.apellido,
        totalVotos: candidato.total_votos,
        porcentajeVotos: ((candidato.total_votos / totalVotosEmitidos) * 100).toFixed(2) + '%',
      }));

      res.json(candidatosConPorcentaje);
    })
    .catch((error) => {
      console.error('Error al obtener los votos:', error);
      res.status(500).json({ error: 'Error al obtener los votos' });
    });
};
