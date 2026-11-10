# Tactical FPS — Classic Combat

A browser-based, offline-first tactical FPS prototype built with Three.js and Vite. It features an original low-poly urban arena, first-person weapon view, AI opponents, round-based combat, a classic-style HUD, and local player settings. It is inspired by the era and feel of classic tactical shooters; it does not include Counter-Strike assets or maps.

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

This is a playable prototype, not a complete or balanced competitive game. The implemented arena is **Old Quarter**; map names in setup are not yet backed by separate map layouts. Game modes currently share much of the same round and bot logic, and bomb/hostage objectives are not fully implemented. Bot navigation and combat are intentionally simple.

**Online multiplayer is not currently available.** The server browser and public-host controls expect a separate lobby service on port `3001`, but this repository does not include that service. The `npm run server` script therefore cannot run yet. Matches started through the offline controls run locally against bots; joining players, server discovery, and authoritative networked combat are not implemented.

Some options are presentation-only or incomplete, including display mode, graphics quality, and the volume slider. The production build currently emits a Vite warning that the bundled JavaScript exceeds 500 kB.

## Technology

- [Three.js](https://threejs.org/) for rendering and gameplay
- [Vite](https://vite.dev/) for local development and production builds
