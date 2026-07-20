*This project has been created as part of the 42 curriculum by sbolivar, sofernan, vdiez-cu, mcuesta-, afelicia.*

# ft_transcendence

## Description

**ft_transcendence** is a full-stack web application built around a real-time, multiplayer **Ludo/Parchís-style board game**, developed as the capstone "Surprise" project of the 42 common core.

The goal of the project is to design and ship a complete, production-style web platform from scratch: a persistent backend, a real-time game engine, a modern single-page frontend, user accounts and authentication, and a dedicated cybersecurity track — all packaged and deployed with Docker.

Key features:

- **Real-time multiplayer board game** (Parchís/Ludo rules engine) with pieces, dice rolls, blockades, captures, safe cells, bonus turns, and win conditions, synchronized live between players via WebSockets.
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
- A `.env` file at the project root (and/or inside `backend/` / `frontend/` as required by the compose configuration) containing the environment variables used by the stack, for example:

```env
# Backend
PORT=<backend_port>
JWT_SECRET=<your_jwt_secret>
DB_PATH=<path_to_database_file>

# Frontend
VITE_API_URL=<url_of_the_backend_api>

# Nginx / TLS
SSL_CERT_PATH=./nginx/certs/cert.pem
SSL_KEY_PATH=./nginx/certs/key.pem
```

> ⚠️ _The exact variable names above should be confirmed against `docker-compose.yml` and each service's configuration files before running the project. Update this list to match the real `.env` used by the team._

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
4. Once the containers are up, the application is served through Nginx (see `nginx/nginx.conf`) — typically at:
   ```
   https://localhost
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
docs/        Additional project documentation (accessibility, design system, game states, user flow)
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
- Classic Parchís/Ludo rule references (board layout, safe cells, blockades, captures) used to design the game engine logic

### Use of AI

AI assistance (Claude) was used throughout the project as a **coding and debugging aid**, not as a replacement for the team's own design and implementation work. Concretely, it was used for:

- **Backend rule fixes and refactoring**: iteratively debugging and adjusting the Parchís game rules engine (`applyMove`, `checkCapture`, `canMovePiece`, blockade/safe-cell logic, bonus-turn handling), based on rules the team defined and described in natural language.
- **General code review and parsing help**: spotting logic errors in existing modules and suggesting fixes that respected the existing code style and architecture, without introducing new dependencies or rewriting unrelated code.
- **Documentation**: help structuring this README.

The team relied on AI mainly to speed up debugging and iteration on backend game logic, while the game rules, architecture decisions, and overall feature set were designed and reviewed by the team members themselves. All AI-assisted code was reviewed, tested, and adapted by the team before being merged.

---

## Team Information

| Member | Role(s) | Responsibilities |
|---|---|---|
| **sbolivar** | Backend Developer | Bug fixing and general backend/game-logic debugging and parsing (mostly backend-focused work across the game engine and supporting modules). |
| **sofernan** | Frontend Developer | Design and implementation of most of the frontend UI/UX and its associated functionality. |
| **vdiez-cu** | Backend Developer / Tech Lead (backend) | Built the backend foundation (server structure, core services) and the integration/connection between backend and frontend. |
| **mcuesta-** | Backend Developer | Fixed multiple issues related to the dice mechanic and general backend logic/parsing. |
| **afelicia** | Security Developer | Led the cybersecurity module: hardening the platform against common web vulnerabilities. |

> _(Team members are encouraged to refine their own role titles and responsibility descriptions above for full accuracy.)_

---

## Project Management

- **Task distribution**: work was split mainly by domain — frontend UI/UX, backend core & integration, game-logic/rules fixes, dice mechanics, and cybersecurity — with each member owning their area while collaborating on integration points (e.g., backend↔frontend wiring, game-state synchronization).
- **Tools used**: _(to be completed by the team — e.g., GitHub Issues/Projects, Trello, Notion)_
- **Communication channels**: _(to be completed by the team — e.g., Discord, Slack, in-person meetings)_
- **Meetings/check-ins**: _(to be completed by the team — cadence and format of sync-ups, if any)_

> _(This section should be filled in with the team's actual workflow — issue tracker used, meeting cadence, and communication channel — before final submission.)_

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
- Access layer in `backend/db.js`, initialized via `backend/initDb.js`
- _(Specific engine — e.g., SQLite/PostgreSQL/MySQL — and the reasoning behind the choice should be confirmed by the team and added here.)_

### Other significant technologies
- **Docker** and **docker-compose** for containerized development and deployment (`backend/Dockerfile`, `frontend/Dockerfile`, `nginx/Dockerfile`, `docker-compose.yml`)
- **Nginx** as a reverse proxy / TLS termination point (`nginx/nginx.conf`, `nginx/certs/`)
- **ESLint** for frontend code quality (`frontend/eslint.config.js`)
- **PostCSS** for CSS processing (`frontend/postcss.config.js`)

---

## Database Schema

> _(To be completed by the team with the actual schema. Suggested structure below — update fields/types/relations to match `backend/db.js` / `backend/initDb.js`.)_

Core entities (inferred from the codebase, to be confirmed/detailed by the team):

- **users** — id, username, email, password hash, avatar path, created_at, ...
- **friends** — id, user_id, friend_id, status (pending/accepted), created_at
- **games** — id, status (waiting/playing/paused/finished), created_at, updated_at, winner_id
- **game_players** — game_id, user_id, color, connected, disconnected_at, abandoned
- **pieces** (in-memory during a live game; persisted results only) — steps, state (base/track/final/finished)
- **match_history** — game_id, user_id, result, ranking, played_at

```
users ──< friends >── users
users ──< game_players >── games
games ──< match_history
```

A visual ER diagram (e.g., drawn with dbdiagram.io or similar) should be added here or linked from `docs/`.

---

## Features List

| Feature | Implemented by | Description |
|---|---|---|
| Real-time Parchís/Ludo game engine (dice, moves, blockades, captures, safe cells, bonus turns, win detection) | sbolivar, mcuesta-, vdiez-cu | Core game rules and validators controlling legal moves, captures, and turn flow. |
| Dice mechanic fixes | mcuesta- | Fixed multiple bugs related to dice rolling and consumption of bonus/extra moves. |
| Backend/frontend integration | vdiez-cu | Connected the backend services (REST + sockets) to the frontend client. |
| Backend foundation | vdiez-cu | Core backend server structure, base services, and initial architecture. |
| Frontend UI/UX & game board rendering | sofernan | Board, pieces, HUD, animations, theming, and overall frontend functionality. |
| User authentication | _(team to confirm)_ | Login/registration, protected routes. |
| Friends system | _(team to confirm)_ | Friend requests and friend list management. |
| Lobby & invitations | _(team to confirm)_ | Game creation/joining, presence, invitations. |
| Live chat | _(team to confirm)_ | In-game and lobby chat. |
| Reconnection handling | _(team to confirm)_ | Disconnect and turn timers to preserve game state. |
| Cybersecurity hardening | afelicia | Security measures protecting the platform (see [Modules](#modules)). |

> _(Rows marked "team to confirm" should be filled in with the actual contributor(s) once confirmed.)_

---

## Modules

> _(This table should be completed with the exact modules chosen from the ft_transcendence subject, matching the official Major = 2 pts / Minor = 1 pt list.)_

| Module | Type | Points | Implemented by | Justification / How it was implemented |
|---|---|---|---|---|
| Cybersecurity (e.g., WAF/ModSecurity, hardened configuration, input validation, etc.) | Major | 2 | afelicia | Chosen to harden the platform against common web vulnerabilities (OWASP Top Ten-inspired checks); implemented as security middleware/configuration across the backend and infrastructure layer. |
| Backend framework / core backend | _(confirm)_ | _(confirm)_ | vdiez-cu, sbolivar, mcuesta- | _(describe)_ |
| Frontend framework | _(confirm)_ | _(confirm)_ | sofernan | _(describe)_ |
| Remote authentication / user management | _(confirm)_ | _(confirm)_ | _(confirm)_ | _(describe)_ |
| Live chat | _(confirm)_ | _(confirm)_ | _(confirm)_ | _(describe)_ |
| ... | ... | ... | ... | ... |

**Total points**: _(to be calculated once the module list above is finalized)_

---

## Individual Contributions

- **sbolivar** — Focused on backend bug fixing and general game-logic/parsing work: tracked down and fixed issues across the rules engine and supporting backend modules. Main challenge: untangling interdependent game-state bugs (e.g., move/capture edge cases) without breaking previously working rules; addressed by isolating each rule into its own testable function and validating changes against existing behavior before merging.

- **sofernan** — Designed and implemented the majority of the frontend: UI/UX for the board, pieces, HUD, theming, and associated interactive functionality. Main challenge: _(to be completed — e.g., syncing animated piece movement with real-time backend state)_.

- **vdiez-cu** — Built the backend foundation (core server structure and services) and the integration layer connecting backend and frontend (REST + real-time sockets). Main challenge: _(to be completed — e.g., keeping game state consistent between REST calls and socket events)_.

- **mcuesta-** — Solved several issues related to the dice mechanic and contributed to general backend parsing/bug fixing. Main challenge: _(to be completed — e.g., correctly handling bonus dice rolls after captures/goals without breaking turn order)_.

- **afelicia** — Led the cybersecurity effort for the platform, implementing the main security-related module. Main challenge: _(to be completed — e.g., balancing strict security hardening with keeping the real-time game usable)_.

> _(Each member is encouraged to expand their own entry above with concrete examples and challenges for a more complete and honest evaluation record.)_

---

## Known Limitations

- _(To be completed by the team — e.g., no matchmaking/ranking beyond basic history, limited spectator mode, etc.)_

## License / Credits

This project was developed as part of the 42 School common core curriculum, for educational purposes.
