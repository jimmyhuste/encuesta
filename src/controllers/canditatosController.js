const candidatosModel = require('../models/candidatosModel');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public/images'); // Asegúrate de que la ruta de destino sea correcta
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware para verificar si se cargó la imagen correctamente
const validateImageUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'La imagen no se cargó correctamente' });
  }
  next();
};

// Obtener todos los candidatos
exports.getAllCandidatos = async (req, res) => {
  try {
    const candidatos = await candidatosModel.getAllCandidatos();
    res.json(candidatos);
  } catch (error) {
    console.error('Error al obtener los candidatos:', error);
    res.status(500).json({ error: 'Error al obtener los candidatos' });
  }
};

// Obtener un candidato por ID
exports.getCandidatoById = async (req, res) => {
  const candidatoId = req.params.id;
  try {
    const candidato = await candidatosModel.getCandidatoById(candidatoId);
    res.json(candidato);
  } catch (error) {
    console.error('Error al obtener el candidato:', error);
    res.status(500).json({ error: 'Error al obtener el candidato' });
  }
};

// Crear un nuevo candidato con Multer
exports.createCandidato = [upload.single('foto'), validateImageUpload, async (req, res) => {
  const { nombre, apellido, profesion } = req.body;
  const foto = req.file;

  try {
    const candidatoData = { nombre, apellido, foto: foto.filename, profesion }; // Guardamos el nombre del archivo en la base de datos en lugar de la imagen en sí.
    const newCandidato = await candidatosModel.createCandidato(candidatoData);
    res.json(newCandidato);
  } catch (error) {
    console.error('Error al crear el candidato:', error);
    res.status(500).json({ error: 'Error al crear el candidato' });
  }
}];

// Actualizar un candidato existente con Multer
exports.updateCandidato = [upload.single('foto'), validateImageUpload, async (req, res) => {
  const candidatoId = req.params.id;
  const { nombre, apellido, profesion } = req.body;
  const foto = req.file;

  try {
    const candidatoData = { nombre, apellido, foto: foto.filename, profesion }; // Guardamos el nombre del archivo en la base de datos en lugar de la imagen en sí.
    const updatedCandidato = await candidatosModel.updateCandidato(candidatoId, candidatoData);
    res.json(updatedCandidato);
  } catch (error) {
    console.error('Error al actualizar el candidato:', error);
    res.status(500).json({ error: 'Error al actualizar el candidato' });
  }
}];

// Eliminar un candidato existente
exports.deleteCandidato = async (req, res) => {
  const candidatoId = req.params.id;
  try {
    await candidatosModel.deleteCandidato(candidatoId);
    res.json({ message: 'Candidato eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el candidato:', error);
    res.status(500).json({ error: 'Error al eliminar el candidato' });
  }
};
