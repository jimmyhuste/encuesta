const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.post('/login', LoginController.login);
router.post('/register', LoginController.register);
router.get('/', (req, res) => {
    res.json({ message: "Api is running!", status: "ok" })
  });
  
module.exports = router;
