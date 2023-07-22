const connection = require('../database/db');

// Obtener todos los candidatos
exports.getAllCandidatos = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT c.id, c.nombre, c.apellido, c.foto, c.profesion, COUNT(v.id) AS total_votos FROM candidatos c LEFT JOIN votos v ON c.id = v.id_candidato GROUP BY c.id';
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Obtener un candidato por ID
exports.getCandidatoById = (candidatoId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM candidatos WHERE id = ?';
    connection.query(query, [candidatoId], (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length === 0) {
        reject(new Error('Candidato no encontrado'));
      } else {
        resolve(results[0]);
      }
    });
  });
};

// Crear un nuevo candidato
exports.createCandidato = (candidatoData) => {
  return new Promise((resolve, reject) => {
    const { nombre, apellido, foto, profesion } = candidatoData;
    const query = 'INSERT INTO candidatos (nombre, apellido, foto, profesion) VALUES (?, ?, ?, ?)';
    connection.query(query, [nombre, apellido, foto, profesion], (error, result) => {
      if (error) {
        reject(error);
      } else {
        const newCandidato = {
          id: result.insertId,
          nombre,
          apellido,
          foto,
          profesion
        };
        resolve(newCandidato);
      }
    });
  });
};

// Actualizar un candidato existente
exports.updateCandidato = (candidatoId, candidatoData) => {
  return new Promise((resolve, reject) => {
    const { nombre, apellido, foto, profesion } = candidatoData;
    const query = 'UPDATE candidatos SET nombre = ?, apellido = ?, foto = ?, profesion = ? WHERE id = ?';
    connection.query(query, [nombre, apellido, foto, profesion, candidatoId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        const updatedCandidato = {
          id: candidatoId,
          nombre,
          apellido,
          foto,
          profesion
        };
        resolve(updatedCandidato);
      }
    });
  });
};

// Eliminar un candidato existente
exports.deleteCandidato = (candidatoId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM candidatos WHERE id = ?';
    connection.query(query, [candidatoId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
