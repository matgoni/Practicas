const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8000;
function enviarArchivo(res, ruta) {
  res.sendFile(path.join(__dirname, ruta), (error) => {
    if (error) {
      console.error(`Error al enviar el archivo ${ruta}: ${error.message}`);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log(`Archivo ${ruta} enviado correctamente`);
    }
  });
}

app.get('/', (req, res) => {
  enviarArchivo(res, 'index.html');
});

app.get('/formulario', (req, res) => {
  enviarArchivo(res, 'formulario.html');
});

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
