*This project has been created as part of the 42 curriculum by sbolivar, sofernan, vdiez-cu, mcuesta-, afelicia.*

# ft_transcendence

## Description

**ft_transcendence** is a full-stack web application built around a real-time, multiplayer **Parchís-style board game**, developed as the capstone "ft_transcendence" project of the 42 common core.

The goal of the project is to design and ship a complete, production-style web platform from scratch: a persistent backend, a real-time game engine, a modern single-page frontend, user accounts and authentication, and a dedicated cybersecurity track — all packaged and deployed with Docker.

Key features:

- **Real-time multiplayer board game** (Parchís rules engine) with pieces, dice rolls, blockades, captures, safe cells, bonus turns, and win conditions, synchronized live between players via WebSockets.
- **User accounts and authentication** (login/registration, protected routes, session/token-based auth).
- **Friends system** (friend requests, friend list) and **user profiles** with avatars and match history.
- **Lobby system** for creating/joining games, with live presence and invitations.
- **In-game and lobby chat**.
- **Reconnection handling**: disconnect timers and turn timers so games can survive temporary disconnections without breaking the game state.
- **Cybersecurity hardening** of the platform (see the [Modules](#modules) section).
- **Responsive, themeable UI** (light/dark themes) built as a single-page application.
- **Fully containerized** deployment via Docker Compose, served behind an Nginx reverse proxy with TLS certificates.

---

## Instructions

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/)
- `make` (a `Makefile` is provided at the project root)
- A `.env` file at the project root containing the environment variables used by the stack, for example:

```env
PORT=3000
DB_HOST=db
DB_USER=user_transcendence
DB_PASSWORD=password_transcendence
DB_NAME=transcendence
DB_PORT=5432
JWT_SECRET=jwtsecret_transcendence
```

> ⚠️ _The exact variable names above should be confirmed against `docker-compose.yml` and each service's configuration files before running the project.

### Running the project

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd trascendence
   ```
2. Create the `.env` file(s) as described above.
3. Build and start all services:
   ```bash
   make
   ```
   or, directly with Docker Compose:
   ```bash
   docker-compose up --build
   ```
4. Once the containers are up, the application is served through Nginx:
   ```
   https://localhost:8443
   ```
5. To stop the stack:
   ```bash
   make clean
   ```
   or
   ```bash
   docker-compose down
   ```

### Project structure (high level)

```
backend/     Node.js backend: REST controllers, routes, sockets, game engine, DB access
frontend/    React + TypeScript + Vite single-page application
nginx/       Reverse proxy configuration and TLS certificates
docker-compose.yml, Makefile   Build/orchestration
```

For a deeper technical breakdown, see the [Technical Stack](#technical-stack) and [Database Schema](#database-schema) sections below, and the extra documents in `docs/`.

---

## Resources

Classic references used while working on this project:

- [42 ft_transcendence subject PDF](./ft_transcendence.pdf) (project subject, included in this repository)
- [MDN Web Docs — WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Socket.IO documentation](https://socket.io/docs/v4/)
- [React documentation](https://react.dev/)
- [Vite documentation](https://vitejs.dev/)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [Node.js documentation](https://nodejs.org/en/docs)
- [JWT.io — Introduction to JSON Web Tokens](https://jwt.io/introduction)
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/) (used as a reference for the cybersecurity module)
- Classic Parchís rule references (board layout, safe cells, blockades, captures) used to design the game engine logic

### Use of AI

Artificial intelligence tools were used to:

- Structure and draft the README file.
- Understand the rules of Parchis for subsequent implementation.
- Provide guidance on best practices for programming and project organization.

AI was not used to implement the project's core logic.

---

## Team Information

| Member | Role(s) | Responsibilities |
|---|---|---|
| **sbolivar** | Backend Developer | Bug fixing and general backend/game-logic debugging and parsing (mostly backend-focused work across the game engine and supporting modules). |
| **sofernan** | Frontend Developer | Design and implementation of most of the frontend UI/UX and its associated functionality. |
| **vdiez-cu** | Backend Developer / Tech Lead (backend) | Built the backend foundation (server structure, core services) and the integration/connection between backend and frontend. |
| **mcuesta-** | Backend Developer | Fixed multiple issues related to the dice mechanic and general backend logic/parsing. |
| **afelicia** | Security Developer | Cybersecurity module: hardening the platform against common web vulnerabilities. |

---

## Project Management

- **Task distribution**: work was split mainly by domain — frontend UI/UX, backend core & integration, game-logic/rules fixes, dice mechanics, and cybersecurity — with each member owning their area while collaborating on integration points (e.g., backend↔frontend wiring, game-state synchronization).
- **Tools used**: Web documentation
- **Communication channels**: Slack
- **Meetings/check-ins**

---

## Technical Stack

### Frontend
- **React** with **TypeScript**, bundled with **Vite**
- **Tailwind CSS** for styling, with a custom theme system (`theme/themes/dark.ts`, `theme/themes/light.ts`) and design tokens (`styles/tokens.ts`)
- Client-side routing (`router.tsx`), protected routes (`auth/ProtectedRoute.tsx`)
- State management via dedicated stores (`store/gameStore.ts`, `store/friendsStore.ts`, `store/socketStore.ts`)
- Real-time communication via WebSockets (`socket/socket.ts`, `game/realtime/useGameRealtime.ts`)
- Custom game board rendering, piece animations, and dice/HUD components (`game/board`, `game/pieces`, `game/animations`, `game/hud`)

**Why**: React + TypeScript + Vite was chosen for fast local iteration, strong typing across a fairly complex, stateful game UI, and a component-driven architecture well suited to the board/pieces/HUD structure of the game.

### Backend
- **Node.js**, organized in a modular structure: `controllers/` (HTTP request handlers), `routes/` (REST endpoints), `middleware/` (auth middleware), `sockets/` (real-time events), and a dedicated `game/` module containing:
  - `game/rules/` — game rule functions (`applyMove`, `checkCapture`, `isBlockade`, `isPositionBlocked`, `checkWin`, `nextTurn`, etc.)
  - `game/validators/` — move/turn/dice validation (`canMovePiece`, `canRollDice`, `validateTurn`)
  - `game/utils/` — board/position utilities (`getRealBoardPosition`, `getGlobalPosition`, `getDistanceToHomeEntry`, etc.)
  - `gameEngine.js` / `gameManager.js` / `gameState.js` — orchestration of turns, dice rolls, bonus moves, and overall game lifecycle
  - `disconnectTimers.js` / `turnTimer.js` — reconnection grace periods and per-turn timeouts
- **Socket-based real-time layer** for game moves, chat, presence, and invitations (`sockets/gameSocket.js`, `sockets/lobbySocket.js`, `sockets/presence.js`, `sockets/invitations.js`, `sockets/authSocket.js`)
- **Authentication middleware** (`middleware/authMiddleware.js`) protecting REST and socket routes

**Why**: A modular, rules/validators/utils separation was chosen so that the game engine logic stays independent, unit-testable, and easy to extend rule-by-rule (each rule — blockades, captures, safe cells, bonus turns — lives in its own file), while the engine (`gameEngine.js`) purely orchestrates them.

### Database

The project uses **PostgreSQL 15** as its relational database management system.

The database connection is managed through `backend/db.js`, while the schema is automatically initialized by `backend/initDb.js` when the backend starts.

PostgreSQL was chosen because it provides:

- **ACID-compliant transactions**, ensuring consistency during concurrent multiplayer games.
- Excellent support for **concurrent connections**, which is essential for a real-time multiplayer application.
- Native **JSON/JSONB** support, allowing efficient storage of complex game states when required.
- High reliability, scalability, and mature tooling.
- Seamless integration with Node.js through the `pg` driver.

The database stores persistent application data, including:

- User accounts
- Authentication data
- Friend relationships
- Game metadata
- Persistent game state
- Match history
- Lobby chat history
- Blocked users

### Other significant technologies
- **Docker** and **docker-compose** for containerized development and deployment (`backend/Dockerfile`, `frontend/Dockerfile`, `nginx/Dockerfile`, `docker-compose.yml`)
- **Nginx** as a reverse proxy / TLS termination point (`nginx/nginx.conf`, `nginx/certs/`)
- **ESLint** for frontend code quality (`frontend/eslint.config.js`)
- **PostCSS** for CSS processing (`frontend/postcss.config.js`)

---

## Features List

| Feature | Implemented by | Description |
|---|---|---|
| Real-time Parchís game engine (dice, moves, blockades, captures, safe cells, bonus turns, win detection) | sbolivar, mcuesta-, vdiez-cu | Core game rules and validators controlling legal moves, captures, and turn flow. |
| Dice mechanic fixes | mcuesta- | Fixed multiple bugs related to dice rolling and consumption of bonus/extra moves. |
| Backend/frontend integration | vdiez-cu | Connected the backend services (REST + sockets) to the frontend client. |
| Backend foundation | vdiez-cu | Core backend server structure, base services, and initial architecture. |
| Frontend UI/UX & game board rendering | sofernan | Board, pieces, HUD, animations, theming, and overall frontend functionality. |
| User authentication | vdiez-cu, sofernan, mcuesta-| Login/registration, protected routes. |
| Friends system | sofernan, sbolivar- | Friend requests and friend list management. |
| Lobby & invitations | sofernan | Game creation/joining, presence, invitations. |
| Live chat | vdiez-cu | In-game and lobby chat. |
| Reconnection handling | vdiez-cu, sofernan | Disconnect and turn timers to preserve game state. |
| Cybersecurity hardening | afelicia | Security measures protecting the platform (see [Modules](#modules)). |


---

## Modules

The project implements the following bonus modules from the **ft_transcendence** subject:

| Module | Type | Points | Implemented by | Justification / How it was implemented |
|---|---:|---:|---|---|
| **Frontend & Backend Frameworks** | Major | 2 | sofernan, vdiez-cu | Built using **React + TypeScript** for the frontend and **Express.js** for the backend, providing a modern, modular and maintainable full-stack architecture. |
| **Frontend Framework (React)** | Minor | 1 | sofernan | The frontend is developed as a Single Page Application using **React**, Vite and Tailwind CSS, with reusable components, routing and state management. |
| **Backend Framework (Express.js)** | Minor | 1 | vdiez-cu, sbolivar, mcuesta- | The backend is built with **Express.js**, exposing REST APIs, Socket.IO services, authentication middleware and the game engine. |
| **Real-time Features (WebSockets)** | Major | 2 | vdiez-cu, sofernan | Implemented using **Socket.IO** for real-time game synchronization, lobby updates, live chat, invitations, player presence and spectator updates. |
| **User Interaction** | Major | 2 | sofernan, vdiez-cu | Includes user profiles, friends management, invitations, online presence and a real-time chat system allowing players to interact before and during games. |
| **Multiple Languages (i18n)** | Minor | 1 | sofernan | Implemented an internationalization system supporting **English, Spanish and French**, with a language switcher and fully translatable interface. |
| **Standard User Management & Authentication** | Major | 2 | vdiez-cu, sofernan | Secure user registration and login using JWT authentication, editable profiles, avatar uploads, protected routes and friend management. |
| **Cybersecurity (ModSecurity + HashiCorp Vault)** | Major | 2 | afelicia | Hardened the application using **ModSecurity** as a Web Application Firewall together with **HashiCorp Vault** for secure secret management. Input validation and protected endpoints were also implemented. |
| **Complete Multiplayer Web Game** | Major | 2 | sbolivar, mcuesta-, vdiez-cu, sofernan | Developed a complete online **Parchís** game with all core rules, animations, dice mechanics, captures, blockades, safe cells, victory conditions and persistent game state. |
| **Remote Multiplayer** | Major | 2 | vdiez-cu, sbolivar | Allows players on different computers to play together in real time, including synchronization, reconnection handling, disconnect timers and latency tolerance. |
| **Multiplayer Game (>2 Players)** | Major | 2 | sbolivar, vdiez-cu | Supports up to **four simultaneous players**, synchronized in real time with fair turn management and game-state consistency. |
| **Advanced Chat Features** | Minor | 1 | vdiez-cu | Extended the chat with user blocking, game invitations, notifications, chat history, typing indicators, read receipts and profile access directly from the chat. |
| **Spectator Mode** | Minor | 1 | sofernan, vdiez-cu | Allows users to join ongoing matches as spectators and receive live updates of the game without participating. |

### Module Score

| Type | Count | Points |
|------|------:|------:|
| Major modules | 8 | 16 |
| Minor modules | 5 | 5 |
| **Total** | **13 modules** | **21 points** |

---

## Individual Contributions

- **sbolivar** — Focused on backend bug fixing and general game-logic/parsing work: tracked down and fixed issues across the rules engine and supporting backend modules.

- **sofernan** — Designed and implemented the majority of the frontend: UI/UX for the board, pieces, HUD, theming, and associated interactive functionality.

- **vdiez-cu** — Built the backend foundation (core server structure and services) and the integration layer connecting backend and frontend (REST + real-time sockets).

- **mcuesta-** — Solved several issues related to the dice mechanic and contributed to general backend parsing/bug fixing.

- **afelicia** — Led the cybersecurity effort for the platform, implementing the main security-related module.

---

## License / Credits

This project was developed as part of the 42 School common core curriculum, for educational purposes.
