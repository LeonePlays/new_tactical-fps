# Test Report

## Environment

- Date: 2026-11-12
- Browser: Chromium (headless) launched by Playwright
- Renderer: SwiftShader CPU software rendering (`--use-gl=swiftshader --enable-unsafe-swiftshader`)
- Viewport: 1024×640 for the main suite, 900×560 for the stress suite
- App server: Vite development server on port 3002
- Operating system: Linux container

The software renderer is much slower than a real GPU. It reached roughly 20–25 FPS in screenshots, so it was not used to judge real-world performance. For deterministic physics and AI checks, the browser test held inputs and advanced the game's normal `update()` loop in fixed steps instead of relying on wall-clock frames. Keyboard delivery, UI clicks, browser storage, pointer lock, rendering, WebGL initialization and production-build loading were still exercised in the real browser.

## Commands run

```bash
npm run build
node /tmp/opencode/full-test.mjs
node /tmp/opencode/stress-test.mjs
node /tmp/opencode/edge-test.mjs
```

The Playwright test scripts are external QA harnesses and are not part of the shipped application. They use the in-page `window.__TACTICAL__` QA hook for deterministic placement and state inspection.

## Main gameplay suite

Result: **52/52 checks passed**, no runtime or page errors.

Covered:

- Boot without page errors; main menu and all menu actions present.
- Quick match starts with Old Quarter, Team Deathmatch and 8 bots.
- Nav graph is fully connected (63 nodes, 1 component for Old Quarter).
- Team sizes differ by at most one when the participant count is odd.
- HUD appears when a match starts.
- Keyboard events reach the player controller.
- WASD movement, sprint speed advantage, crouch eye-height change.
- Jump apex and gravity/ground return.
- Wall collision keeps the player inside the arena.
- Rifle/pistol switching, ammo consumption, reload from reserve, HUD ammo sync.
- Firing damages an enemy bot, awards a kill, increments the TDM score and adds a kill-feed row.
- Tab opens and closes the scoreboard.
- Pause panel and resume button.
- Lethal damage kills the player, shows the respawn overlay, and respawn restores full health.
- Match results screen, result stats and local career-stat recording.
- Play Again restarts a fresh match with reset kills and timer.
- Industrial Complex + Free For All setup loads the selected map, mode and 6 Hard bots.
- Industrial nav graph is fully connected (49 nodes, 1 component).
- All FFA spawns are distinct; FFA HUD shows rank.
- Bots move under their own navigation during simulation.
- Time-limit expiry ends the match.
- Settings save to `localStorage` and apply: render scale, quality, FPS counter.
- Profile save to `localStorage`.
- Settings and profile survive a full page reload; menu returns correctly.
- Online panel clearly says services are unavailable and does not show fake servers.
- Screenshots of both maps and the online information panel were captured and inspected.

## Stress and rules suite

Result: **15/15 checks passed**, no runtime errors.

Covered:

- Hard difficulty is assigned to all bots and uses Hard tuning.
- 20 seconds of simulated Industrial FFA with 8 bots:
  - 309.4 m total bot travel.
  - 23 kill/death events occurred.
  - No bot position became non-finite, fell below the world, or ended inside solid collision geometry.
  - The match remained active and stable.
- Free For All equal top scores produce a DRAW result.
- Team Deathmatch win shows VICTORY; loss shows DEFEAT.
- Easy difficulty uses its own damage tuning.
- Escape resumes a paused match.
- Abandon Match returns to the main menu.
- Six consecutive start/map-change/leave cycles returned to the same scene child count (17), geometry count (51) and texture count (18), indicating no obvious per-match GPU resource growth.

## Edge-case rules suite

Result: **8/8 checks passed**, no runtime errors.

Covered:

- Player bullets are blocked by the central fountain on Old Quarter.
- Friendly fire does not damage teammates or award kills.
- A bot with line of sight through a solid building cannot damage the player.
- Reaching the TDM score limit ends the match and shows VICTORY for the winning team.
- The pause-menu restart button begins a clean match (active, unpaused, kills reset, timer reset).
- Reset Settings restores the documented defaults (sensitivity, FOV, quality).
- The credits panel opens and includes build/technology information.

## Production build

`npm run build` completes successfully with Vite 6.4.6. Output:

- `dist/index.html`
- One CSS asset
- One JavaScript asset of about 638 kB minified (about 169 kB gzip)
- Vite warning that the JS chunk exceeds 500 kB; this is expected because Three.js is bundled with the game and is documented in the README.

The build was also served with `npm run preview` and loaded in Chromium. The menu initialized, the generated asset URLs resolved, a quick match started with Old Quarter/TDM/8 bots, the nav graph was connected, and no runtime errors were logged.

## Visual inspection

Screenshots were reviewed for the main menu, Old Quarter gameplay, Industrial Complex gameplay, the results screen and the online-status panel. The scenes showed textured architecture, props, lighting/fog, HUD, radar, weapon view model and match intro. The Industrial Complex view was visually distinct from Old Quarter (warehouse, containers, silos, asphalt yard and overcast palette).

Two visual issues found during inspection were fixed and rechecked:

- A lamp post stood directly on the Old Quarter spawn centreline; it was moved aside.
- The plaza gateway torus was rotated into the street, producing a large stone ring that crossed the camera. It now forms a proper arch above the gateway.

## Not tested / caveats

- No human-versus-human network play exists, so multiplayer was not tested.
- No objective modes exist, so bomb/hostage behavior was not tested.
- Automated tests used direct QA hooks for some placement and end-of-match setup. They do not replace extended manual playtesting for balance, difficulty feel or long-session performance on real GPUs.
- Performance was measured only under SwiftShader software rendering; the 20–25 FPS figure is not representative of hardware-accelerated desktop browsers.
- Audio was initialized and volume settings applied, but audio quality was not judged through automated listening.
