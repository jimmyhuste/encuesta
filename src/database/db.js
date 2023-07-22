const mysql = require('mysql2');
require('dotenv').config();

const data  = {
    HOST: process.env.DB_HOST,
    NAME: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
    PASSWORD: process.env.DB_PASSWORD,
    USER: process.env.DB_USER
}

// Configura los parámetros de conexión a la base de datos
const connection = mysql.createConnection({
  host: data.HOST,
  user: data.USER,
  password: data.PASSWORD,
  database: data.NAME,
  port: data.PORT
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos.');
  }
});

module.exports = connection;
