const express = require('express');
const path = require('path'); // Importar el módulo path
const app = express();

const PORT = process.env.PORT || 8000;

// Configurar las rutas del proyecto
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/formulario', (req, res) => {
  res.sendFile(path.join(__dirname, 'formulario.html'));
});

// Otros posibles endpoints...

// Configurar la escucha del servidor
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});