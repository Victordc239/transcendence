const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const initDB = require('./initDb');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const friendsRoutes = require('./routes/friendsRoutes');
const gameRoutes = require('./routes/gameRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/friends', friendsRoutes);
app.use('/games', gameRoutes);

app.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.get('/', (req, res) => {gameRoutes
  res.send('Servidor funcionando 🚀');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
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