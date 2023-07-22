const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/LoginModel');
require('dotenv').config();

const secret_key = process.env.SECRET_KEY;
const authController = {};

authController.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario en la base de datos por su nombre de usuario
    const user = await User.findByUsername(username);

    if (!user) {
      return res.status(401).json({ message: 'Usuario o Contraseña incorrecta' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Usuario o Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user.id }, secret_key, { expiresIn: '1h' });

    // Retornar el token como respuesta
    res.status(200).json({ token });
  } catch (err) {
    // Manejo de errores
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

authController.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findByUsername(username);

    if (existingUser) {
      return res.status(409).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Crear el nuevo usuario en la base de datos
    const newUser = { username, password };
    const userId = await User.create(newUser);

    // Generar el token JWT para el usuario registrado automáticamente
    const token = jwt.sign({ userId }, secret_key, { expiresIn: '1h' });

    // Retornar el token como respuesta
    res.status(201).json({ token });
  } catch (err) {
    // Manejo de errores
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = authController;
