const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Puedes cambiar el puerto según tu preferencia

// Middleware para manejar datos JSON en las solicitudes POST
app.use(bodyParser.json());

// Almacena los datos de estudiantes y notas en memoria
const estudiantes = {};

// Ruta para ingresar estudiantes y notas
app.post('/ingresar-notas', (req, res) => {
  const { carnet, nombre, tarea, nota } = req.body;
  if (!estudiantes[carnet]) {
    estudiantes[carnet] = { nombre, notas: [] };
  }
  estudiantes[carnet].notas.push({ tarea, nota });
  res.send('Notas ingresadas con éxito.');
});

// Ruta para buscar un estudiante por carnet
app.get('/buscar/:carnet', (req, res) => {
  const carnet = req.params.carnet;
  const estudiante = estudiantes[carnet];
  if (estudiante) {
    res.json(estudiante);
  } else {
    res.status(404).send('Estudiante no encontrado.');
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
