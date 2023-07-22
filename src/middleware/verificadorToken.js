const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret_key = process.env.SECRET_KEY;

function verifyToken() {
  return function (req, res, next) {
    try {
      const tokenCookie = req.cookies.token;
      // console.log(req.cookies)
      if (!tokenCookie) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
      }

      // console.log('Verificando el token...');
      const decoded = jwt.verify(tokenCookie, secret_key);
      // console.log(decoded.exp)
      const expiracion = decoded.exp * 1000; // La fecha de expiración se almacena en segundos, se convierte a milisegundos
      const ahora = Date.now(); // Fecha y hora actual en milisegundos
    


      if (expiracion <= ahora) {
        console.log("El token ha expirado");
        return res.status(403).json({ message: "El token ha expirado" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token inválido' });
    }
  };
}

module.exports = verifyToken;
