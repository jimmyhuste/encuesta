const db = require('../database/db');
const bcrypt = require('bcrypt');

const User = {};

User.findByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM login WHERE user = ?';
    db.query(query, [username], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return resolve(null);
      }
      const user = results[0];
      return resolve(user);
    });
  });
};

User.create = (user) => {
  return new Promise((resolve, reject) => {
    const { username, password } = user;
    const query = 'INSERT INTO login (user, password) VALUES (?, ?)';
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return reject(err);
      }
      db.query(query, [username, hashedPassword], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results.insertId);
      });
    });
  });
};

User.findById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM login WHERE id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return resolve(null);
      }
      const user = results[0];
      return resolve(user);
    });
  });
};

module.exports = User;
