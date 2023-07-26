const express = require("express");
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
const routePersonas = require('./src/router/personas.routes')
const routeCandidatos = require('./src/router/candidatos.routes')
const routeVotos = require('./src/router/votos.routes')
const routeLogin = require('./src/router/login.routes')
require('dotenv').config();
require("./src/database/db")
const app = express()
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PUERTO = process.env.PORT || 3000;
const rutas = app.use(routeCandidatos, routePersonas, routeVotos, routeLogin);
app.use(cors)
app.use(express.static(path.join(__dirname, 'public/images')));


app.get('/', (req, res) => {
  res.json({ message: "Api is running!", status: "ok" })
});

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  res.json({ message: "Api is running!", status: "ok" })
}





app.listen(PUERTO, () => {
  console.log("App is runing on port: ", PUERTO)
});

module.exports = allowCors(rutas)