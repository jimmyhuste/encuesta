const express = require("express");
const cors = require("cors"); 
const path = require('path');
const bodyParser =  require("body-parser");
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
 app.use( routeCandidatos, routePersonas, routeVotos, routeLogin);
app.use(cors)
app.use(express.static(path.join(__dirname, 'public/images')));


app.get('/', (req, res) => {
  res.json({message: "Api is running!", status: "ok"})
});

// Configura opciones para CORS
const corsOptions = {
    origin: 'https://encuesta-front.vercel.app/', // Reemplaza con la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  };
  
  // Habilita CORS con opciones personalizadas
  app.use(cors(corsOptions));

app.listen(PUERTO, ()=>{
    console.log("App is runing on port: ", PUERTO)
});