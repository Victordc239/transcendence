const express = require('express');
const initDB = require('./initDb');

const app = express();
app.use(express.json());

const PORT = 3000;

// Inicializar DB al arrancar
initDB();

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});