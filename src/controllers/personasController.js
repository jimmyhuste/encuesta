const personasModel = require('../models/personasModel');

// Obtener todas las personas
exports.getAllPersonas = async (req, res) => {
  try {
    const personas = await personasModel.getAllPersonas();
    res.json(personas);
  } catch (error) {
    console.error('Error al obtener las personas:', error);
    res.status(500).json({ error: 'Error al obtener las personas' });
  }
};

// Crear una nueva persona
exports.createPersona = async (req, res) => {
  const { nombres, lugar } = req.body;
  try {
    const personaData = { nombres, lugar };
    const newPersona = await personasModel.createPersona(personaData);
    res.json(newPersona);
  } catch (error) {
    console.error('Error al crear la persona:', error);
    res.status(500).json({ error: 'Error al crear la persona' });
  }
};

// Eliminar una persona existente
exports.deletePersona = async (req, res) => {
  const personaId = req.params.id;
  try {
    await personasModel.deletePersona(personaId);
    res.json({ message: 'Persona eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la persona:', error);
    res.status(500).json({ error: 'Error al eliminar la persona' });
  }
};

