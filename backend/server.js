const express = require('express');
const cors = require('cors');
const http = require('http');

const initDB = require('./initDb');
const initSockets = require('./sockets');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const friendsRoutes = require('./routes/friendsRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/friends', friendsRoutes);
app.use('/games', gameRoutes);

const httpServer = http.createServer(app);

initSockets(httpServer);

const PORT = process.env.PORT || 3000;

initDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB init failed:', err);
    process.exit(1);
  });