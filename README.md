# Tactical FPS — Classic Combat

A complete offline-first browser FPS built with Three.js and Vite. It has an original low-poly visual style, first-person movement and gunplay, map-aware bot AI, two playable maps, two match modes, a classic HUD, saved settings and local career stats. No Counter-Strike or other commercial game assets are included.

## Requirements

- Node.js 18 or newer
- npm
- A current desktop browser with WebGL2 enabled

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). `npm start` is an alias for the development server.

To create and inspect the production build:

```bash
npm run build
npm run preview
```

`npm run preview` serves the generated `dist/` folder, normally at `http://localhost:4173`.

## Play

The main menu offers:

- **PLAY** — quick match: Old Quarter, Team Deathmatch, 8 bots.
- **PLAY OFFLINE** — choose map, mode, bot count, difficulty, team, match length and score limit.
- **FIND SERVERS** — opens an honest status panel explaining that online play is unavailable in this build.
- **SETTINGS** — mouse sensitivity, FOV, invert Y, master/effects/music volume, graphics quality, shadows, render scale, crosshair color and an FPS counter.
- **PLAYER PROFILE** — callsign, preferred team and locally stored career stats.
- **CREDITS** — build and technology information.

### Controls

| Input | Action |
| --- | --- |
| Click game view | Capture or recapture the mouse |
| Mouse | Aim |
| W / A / S / D | Move |
| Shift | Sprint |
| Ctrl or C | Crouch |
| Space | Jump |
| Left mouse button | Fire |
| R | Reload |
| 1 / 2 or mouse wheel | Switch rifle / pistol |
| Tab (hold) | Scoreboard |
| Esc | Pause; press again in the pause menu to resume |

The pause menu can resume, restart, open settings or abandon the match. The results screen can start a rematch, open match setup or return to the main menu.

## Implemented systems

- **Movement and collision** — frame-rate-independent acceleration, sprinting, crouching, jumping, gravity, axis-separated collision, step handling, arena bounds and a spawn safety net.
- **Gunplay** — automatic rifle and semi-automatic pistol, magazine/reserve ammo, reloads, recoil, movement/air spread, range falloff, head/body/leg hit zones and wall-impact effects.
- **Bot AI** — A* navigation over an authored nav graph, string-pulled routes, line-of-sight perception, limited FOV/range, reaction delays, target selection, team alerts, burst fire, strafing, retreat, regroup, patrol, investigate and stuck recovery. Easy, Normal and Hard change reaction time, aim spread, damage and perception.
- **Match rules** — Team Deathmatch with team scores and Free For All with individual ranking, configurable time/score limits, respawns, match point state, results, rematch and career recording.
- **Maps** — **Old Quarter** (walled urban courtyard, lanes, market props, raised arcade) and **Industrial Complex** (warehouse bays, container yard, silos, freight props). Both have separate geometry, themes, spawn sets, collision and nav data.
- **Presentation** — procedural textures and props, articulated low-poly characters, first-person weapon and hands, shadows/lighting presets, tracer/impact effects, synthesized WebAudio effects and music, and a responsive classic-style UI.
- **Persistence** — settings and career statistics are stored in `localStorage` and restored on reload.

## Current scope and limitations

- **Online multiplayer is not implemented.** There is no lobby server or authoritative networking backend in this repository. The game does not show fake servers or present bots as human players. Every opponent is a local computer-controlled bot.
- Only **Team Deathmatch** and **Free For All** are available. Bomb defusal, hostage rescue and other objective modes are not implemented.
- Bot AI is deliberately simple and readable rather than a competitive simulation. Friendly fire is disabled.
- There is no fall damage, progression system, cosmetics inventory or weapon shop.
- Display mode is handled through the browser fullscreen button; there is no exclusive/vsync selector.
- Pointer lock must be granted by the browser after a click. If it is blocked, click the game view again.
- The production build emits Vite's warning that the JavaScript chunk is larger than 500 kB. The bundle is about 638 kB minified (about 169 kB gzip) because Three.js is included in the application chunk.

## Validation

The build and gameplay were checked in Chromium with Playwright. The automated suite covered menu, match setup, both maps, both modes, movement, collision, jumping, crouching, sprinting, shooting, kills and team scoring, reloads, scoreboard, pause/resume, death/respawn, results, rematch, settings/profile persistence, map and mode selection, long bot simulations, FFA tie handling and repeated match cleanup. Results and test caveats are in [TESTING.md](TESTING.md).

## Technology

- [Three.js](https://threejs.org/) — rendering, scene graph and math
- [Vite](https://vite.dev/) — development server and production build
- Procedural canvas textures, geometry, character animation and WebAudio

All game content in this project is original or generated at runtime.
