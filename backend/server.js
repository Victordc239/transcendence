const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const initDB = require('./initDb');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const friendsRoutes = require('./routes/friendsRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/friends', friendsRoutes);

app.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

async function start() {
  try {
    await initDB();

    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
}

start();