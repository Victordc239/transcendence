const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const initDB = require('./initDb');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const friendsRoutes = require('./routes/friendsRoutes');
const gameRoutes = require('./routes/gameRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const { rollDice, movePiece, nextTurn } = require('./game/gameEngine');
const { createNewGame } = require('./game/gameState');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* -----------------------------
   HTTP ROUTES
------------------------------ */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/friends', friendsRoutes);
app.use('/games', gameRoutes);

app.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

/* -----------------------------
   HTTP SERVER + SOCKET IO
------------------------------ */
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

/* -----------------------------
   SOCKET AUTH MIDDLEWARE
------------------------------ */
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) return next(new Error("No token"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

/* -----------------------------
   SOCKET LOGIC
------------------------------ */
const games = {}; // compartido con sockets

io.on("connection", (socket) => {
  console.log("User connected:", socket.user.id);

  /* JOIN GAME ROOM */
  socket.on("join_game", (gameId) => {
    socket.join(gameId);
  });

  /* CREATE GAME */
  socket.on("create_game", () => {
    const game = createNewGame(socket.user.id);
    games[game.id] = game;

    socket.join(game.id);

    io.to(game.id).emit("game_update", game);
  });

  /* JOIN GAME */
  socket.on("join_game_action", ({ gameId }) => {
    const game = games[gameId];
    if (!game) return;

    if (game.players.length >= 4) return;

    if (game.players.find(p => p.id === socket.user.id)) return;

    const colors = ["red", "blue", "green", "yellow"];

    game.players.push({
      id: socket.user.id,
      color: colors[game.players.length],
      pieces: [
        { position: "base" },
        { position: "base" },
        { position: "base" },
        { position: "base" }
      ]
    });

    if (game.players.length >= 2) {
      game.status = "playing";
    }

    io.to(gameId).emit("game_update", game);
  });

  /* ROLL DICE */
  socket.on("roll_dice", ({ gameId }) => {
    const game = games[gameId];
    if (!game) return;

    if (game.turn !== socket.user.id) return;

    game.dice = rollDice();

    io.to(gameId).emit("game_update", game);
  });

  /* MOVE PIECE */
  socket.on("move_piece", ({ gameId, pieceIndex }) => {
    const game = games[gameId];
    if (!game) return;

    if (game.turn !== socket.user.id) return;

    if (game.dice === null) return;

    const moved = movePiece(game, socket.user.id, pieceIndex);
    if (!moved) return;

    nextTurn(game);
    game.dice = null;

    io.to(gameId).emit("game_update", game);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

/* -----------------------------
   START SERVER
------------------------------ */
async function start() {
  try {
    await initDB();

    httpServer.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
}

start();