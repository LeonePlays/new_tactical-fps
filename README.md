# Tactical FPS — Classic Combat

A browser-based, offline-first tactical FPS prototype built with Three.js and Vite. It features two original low-poly arenas, a first-person weapon view, AI opponents, Team Deathmatch and Free For All modes, a classic-style HUD, and local player settings. It is inspired by the era and feel of classic tactical shooters; it does not include Counter-Strike assets or maps.

## Run locally

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). To create a production build:

```bash
npm run build
```

## Play

- **New Game** starts an offline match against bots. **Create Server** offers additional match setup options.
- Click the game view to capture the mouse; use **W/A/S/D** to move and the mouse to aim.
- **Left mouse button** fires, **R** reloads, **1/2** or the mouse wheel switches weapons, and **B** opens the equipment menu.
- **Shift** moves slowly, **Ctrl** crouches, **Space** jumps, and **Tab** shows the scoreboard.
- **Esc** opens the pause menu. Use the pause menu to resume or leave the match.

The player name and mouse sensitivity are stored locally in the browser.

## Current scope and limitations

This is a playable prototype, not a complete or balanced competitive game. The implemented maps are **Old Quarter** and **Industrial Complex**. The available modes are Team Deathmatch and Free For All; bomb and hostage objectives are not implemented. Bot navigation and combat are intentionally simple, and the modes are not tuned for competitive balance.

**Online multiplayer is not available.** The server browser does not show simulated servers or fake players, and this repository does not include a matchmaking or game-server backend. Matches started from the offline controls run locally against bots. Player joining, server discovery, and networked combat are not implemented. The `npm run server` package script references a `server.js` file that is not included in this project.

The production build succeeds and splits Three.js into its own JavaScript chunk. Performance depends on the user's browser and graphics hardware; the settings include quality, shadow, and render-scale controls.

## Technology

- [Three.js](https://threejs.org/) for rendering and gameplay
- [Vite](https://vite.dev/) for local development and production builds
