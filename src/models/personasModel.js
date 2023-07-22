
const connection = require('../database/db');

// Obtener todas las personas
exports.getAllPersonas = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM personas';
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Obtener una persona por ID
exports.getPersonaById = (personaId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM personas WHERE id = ?';
    connection.query(query, [personaId], (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length === 0) {
        reject(new Error('Persona no encontrada'));
      } else {
        resolve(results[0]);
      }
    });
  });
};

// Crear una nueva persona
exports.createPersona = (personaData) => {
  return new Promise((resolve, reject) => {
    const { nombres, lugar } = personaData;
    const query = 'INSERT INTO personas (nombres, lugar) VALUES (?, ?)';
    connection.query(query, [nombres, lugar], (error, result) => {
      if (error) {
        reject(error);
      } else {
        const newPersona = {
          id: result.insertId,
          nombres,
          lugar
        };
        resolve(newPersona);
      }
    });
  });
};

// Actualizar una persona existente
exports.updatePersona = (personaId, personaData) => {
  return new Promise((resolve, reject) => {
    const { nombres, lugar } = personaData;
    const query = 'UPDATE personas SET nombres = ?, lugar = ? WHERE id = ?';
    connection.query(query, [nombres, lugar, personaId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        const updatedPersona = {
          id: personaId,
          nombres,
          lugar
        };
        resolve(updatedPersona);
      }
    });
  });
};

// Eliminar una persona existente
exports.deletePersona = (personaId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM personas WHERE id = ?';
    connection.query(query, [personaId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
