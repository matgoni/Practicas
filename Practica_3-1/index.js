const express = require('express');
const path = require('path'); 
const app = express();

const PORT = process.env.PORT || 8000;

app.get('/', (res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/formulario', (res) => {
  res.sendFile(path.join(__dirname, 'formulario.html'));
});

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});