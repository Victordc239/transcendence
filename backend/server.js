const express = require('express');
const path = require('path');
try {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
} catch {
  // dotenv es opcional; si no está instalado, usa variables de entorno del proceso.
}
const initDB = require('./initDb');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/auth', authRoutes);

app.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

async function start() {
  await initDB();

  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}

start();