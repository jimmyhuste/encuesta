const connection = require('../database/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret_key = process.env.SECRET_KEY;
// Función para generar un token para el id de la persona que ha votado
const generateToken = (id_persona) => {
  const segundosPorDia = 24 * 60 * 60; // 1 día = 24 horas * 60 minutos * 60 segundos
  const diasExpiracion = 30;
  const duracionExpiracion = segundosPorDia * diasExpiracion;
  const tokenVoto = jwt.sign({ id_persona }, secret_key, { expiresIn: duracionExpiracion });
  return tokenVoto;
};

// Crear un nuevo voto
exports.createVoto = (votoData) => {
  return new Promise((resolve, reject) => {
    const { id_persona, id_candidato } = votoData;
    const query = 'INSERT INTO votos (id_persona, id_candidato) VALUES (?, ?)';
    connection.query(query, [id_persona, id_candidato], (error, result) => {
      if (error) {
        reject(error);
      } else {
        const newVoto = {
          id: result.insertId,
          id_persona,
          id_candidato
        };
        resolve(newVoto);
      }
    });
  });
};

exports.getVotoByPersonaId = (personaId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM votos WHERE id_persona = ?';
    connection.query(query, [personaId], (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length === 0) {
        resolve(null);
      } else {
        resolve(results[0]);
      }
    });
  });
};

exports.getAllVotos = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT c.nombre, c.apellido, COUNT(v.id_candidato) AS total_votos
      FROM candidatos AS c
      LEFT JOIN votos AS v ON c.id = v.id_candidato
      GROUP BY c.id, c.nombre
    `;
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

exports.generateToken = generateToken; // Exporta la función para usarla en el controlador
