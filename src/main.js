// Application entry point. Wires the renderer, menu, match systems and input together.
import * as THREE from 'three';
import '@fontsource/barlow-condensed/400.css';
import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import {
  loadSettings, saveSettings, loadProfile, saveProfile,
  QUALITY_PRESETS, MAPS, MODES, clamp,
} from './config.js';
import { MaterialLibrary } from './materials.js';
import { buildMap } from './maps/index.js';
import { Player } from './player.js';
import { Game } from './game.js';
import { UI } from './ui.js';
import { ViewModel } from './viewmodel.js';
import { Effects } from './effects.js';
import { AudioSystem } from './audio.js';

const MENU_FOV = 58;

/* ── Core objects ──────────────────────────────────────────────────────── */
const canvas = document.querySelector('#game-canvas');

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.06;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(MENU_FOV, window.innerWidth / window.innerHeight, 0.06, 420);
camera.rotation.order = 'YXZ';
scene.add(camera);

const settings = loadSettings();
const profile = loadProfile();
if (!profile.name || profile.name === 'Operator') profile.name = settings.name || 'Operator';
settings.name = profile.name;

const materials = new MaterialLibrary(renderer);
const effects = new Effects(scene);
const audio = new AudioSystem(settings);
const player = new Player();
const viewModel = new ViewModel(camera, materials.materials);
// Dedicated weapon light on its own render layer, so the view model stays readable
// without brightening the world around the player.
const viewLight = new THREE.PointLight(0xffdfb6, 4.2, 2.6, 2);
viewLight.position.set(0.24, 0.18, -0.18);
viewLight.layers.set(1);
camera.layers.enable(1);
viewModel.root.traverse((obj) => obj.layers.set(1));
camera.add(viewLight);

const ui = new UI({ settings, profile });
const game = new Game({ scene, player, world: null, effects, audio, materials: materials.materials, ui });
game.viewModel = viewModel;

let mapBuilder = null;
let currentConfig = null;
let menuAngle = 0.85;

/* ── Settings and renderer quality ─────────────────────────────────────── */
function deviceScale() {
  const preset = QUALITY_PRESETS[settings.quality] || QUALITY_PRESETS.high;
  const base = Math.min(window.devicePixelRatio || 1, preset.pixelRatio);
  return clamp(base * (settings.renderScale || 1), 0.5, 2);
}

function applyGraphics() {
  const preset = QUALITY_PRESETS[settings.quality] || QUALITY_PRESETS.high;
  renderer.setPixelRatio(deviceScale());
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = settings.shadows !== 'off';
  renderer.shadowMap.type = settings.shadows === 'high' ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
  materials.setAnisotropy(preset.anisotropy);

  if (mapBuilder?.sun) {
    const sun = mapBuilder.sun;
    sun.castShadow = settings.shadows !== 'off';
    if (settings.shadows !== 'off') {
      const size = settings.shadows === 'high' ? 2048 : 1024;
      if (sun.shadow.mapSize.x !== size) {
        sun.shadow.mapSize.set(size, size);
        if (sun.shadow.map) {
          sun.shadow.map.dispose();
          sun.shadow.map = null;
        }
      }
    }
  }
  if (renderer.shadowMap.enabled) renderer.shadowMap.needsUpdate = true;
}

function setCameraFov(fov) {
  if (Math.abs(camera.fov - fov) > 0.01) {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }
}

function applySettings({ save = false } = {}) {
  audio.setSettings(settings);
  applyGraphics();
  ui.applyCrosshair();
  if (game.state !== 'playing') setCameraFov(MENU_FOV);
  if (save) saveSettings(settings);
}

/* ── Map lifecycle ─────────────────────────────────────────────────────── */
function loadMap(id) {
  const resolved = MAPS[id] ? id : 'old-quarter';
  if (mapBuilder?.id === resolved) {
    game.world = mapBuilder;
    applyGraphics();
    return mapBuilder;
  }
  if (mapBuilder) mapBuilder.root.removeFromParent();
  mapBuilder = buildMap(resolved, scene, materials);
  game.world = mapBuilder;
  if (mapBuilder.fog) {
    scene.fog = new THREE.Fog(mapBuilder.fog.color, mapBuilder.fog.near, mapBuilder.fog.far);
    scene.background = new THREE.Color(mapBuilder.fog.color);
  }
  menuAngle = 0.85;
  applyGraphics();
  return mapBuilder;
}

/* ── Menu camera ───────────────────────────────────────────────────────── */
function updateMenuCamera(dt) {
  if (!mapBuilder) return;
  const cine = mapBuilder.cinematic || { center: new THREE.Vector3(0, 1.5, 0), radius: 30, height: 16, speed: 0.03 };
  menuAngle += dt * (cine.speed || 0.03);
  const radius = Math.max(18, (cine.radius || 30) * 0.82);
  camera.position.set(
    cine.center.x + Math.cos(menuAngle) * radius,
    Math.max(16, (cine.height || 10) + 8),
    cine.center.z + Math.sin(menuAngle) * radius,
  );
  camera.lookAt(cine.center.x, cine.center.y + 1.5, cine.center.z);
  setCameraFov(MENU_FOV);
}

function syncPlayerCamera() {
  camera.position.copy(player.eyePosition());
  camera.rotation.set(player.pitch + player.recoilPitch, player.yaw + player.recoilYaw, 0, 'YXZ');
  setCameraFov(settings.fov - player.aimFactor * 10);
}

/* ── Match lifecycle ───────────────────────────────────────────────────── */
function normaliseConfig(config) {
  const mapId = MAPS[config.mapId] ? config.mapId : 'old-quarter';
  const modeId = MODES[config.modeId] ? config.modeId : 'tdm';
  return {
    mapId,
    modeId,
    team: config.team === 'T' ? 'T' : 'CT',
    botCount: clamp(Number(config.botCount) || 8, 1, 15),
    difficulty: ['Easy', 'Normal', 'Hard'].includes(config.difficulty) ? config.difficulty : 'Normal',
    scoreLimit: clamp(Number(config.scoreLimit) || 50, 5, 200),
    timeLimit: clamp(Number(config.timeLimit) || 300, 60, 1800),
    playerName: (config.playerName || profile.name || 'Operator').slice(0, 18),
  };
}

function prepareMatch(config) {
  const matchConfig = normaliseConfig(config);
  currentConfig = matchConfig;
  player.displayName = matchConfig.playerName;
  profile.name = matchConfig.playerName;
  settings.name = matchConfig.playerName;
  settings.mapId = matchConfig.mapId;
  settings.modeId = matchConfig.modeId;
  settings.teamPreference = matchConfig.team;
  settings.botCount = matchConfig.botCount;
  settings.difficulty = matchConfig.difficulty;
  settings.scoreLimit = matchConfig.scoreLimit;
  settings.timeLimit = matchConfig.timeLimit;
  saveSettings(settings);
  saveProfile(profile);

  if (game.state !== 'idle') game.stop();
  loadMap(matchConfig.mapId);
  ui.hidePause();
  ui.hideResults();
  ui.hideScoreboard();
  ui.closeModal();
  game.world = mapBuilder;
  game.start(matchConfig, mapBuilder);
  ui.showMatch(matchConfig);
  ui.updateProfileLine();
  viewModel.root.visible = true;
  setCameraFov(settings.fov);
  ui.setPointerHint(true);
  requestLock();
  return matchConfig;
}

function startMatch(config) {
  audio.unlock();
  prepareMatch(config);
  ui.announce('OPERATION STARTED', `${MAPS[currentConfig.mapId].name.toUpperCase()} · ${MODES[currentConfig.modeId].name.toUpperCase()}`, 2400);
}

function restartMatch() {
  if (!currentConfig) { exitToMenu(); return; }
  audio.unlock();
  ui.hideResults();
  ui.hidePause();
  if (game.state !== 'idle') game.stop();
  game.world = mapBuilder;
  game.start(currentConfig, mapBuilder);
  ui.showMatch(currentConfig);
  viewModel.root.visible = true;
  setCameraFov(settings.fov);
  requestLock();
  ui.announce('MATCH RESTARTED', `${MAPS[currentConfig.mapId].name.toUpperCase()}`, 1600);
}

function exitToMenu() {
  game.stop();
  clearInputState();
  document.exitPointerLock?.();
  ui.hidePause();
  ui.hideResults();
  ui.hideScoreboard();
  ui.setPointerHint(false);
  loadMap(settings.mapId);
  ui.showMenu();
  viewModel.root.visible = false;
  setCameraFov(MENU_FOV);
}

function pauseGame() {
  if (game.state !== 'playing' || game.paused) return;
  game.paused = true;
  clearInputState();
  ui.showPause(currentConfig);
  ui.setPointerHint(false);
  ui.hideScoreboard();
  if (document.pointerLockElement === canvas) document.exitPointerLock?.();
}

function resumeGame() {
  if (game.state !== 'playing') return;
  ui.hidePause();
  game.paused = false;
  requestLock();
}

function requestLock() {
  if (game.state !== 'playing' || game.paused || ui.modalOpen) return;
  const lock = canvas.requestPointerLock?.();
  if (lock?.catch) lock.catch(() => {});
}

function recordResult(result) {
  profile.matches = (profile.matches || 0) + 1;
  if (result.playerWon) profile.wins = (profile.wins || 0) + 1;
  profile.kills = (profile.kills || 0) + result.playerKills;
  profile.deaths = (profile.deaths || 0) + result.playerDeaths;
  profile.bestStreak = Math.max(profile.bestStreak || 0, player.streak || 0);
  saveProfile(profile);
  ui.profile = profile;
  ui.updateProfileLine();
}

/* ── Input ─────────────────────────────────────────────────────────────── */
const keys = Object.create(null);
let mouseDown = false;
let rightDown = false;
let firePressed = false;
let jumpPressed = false;
let reloadPressed = false;
let switchPressed = false;
let hadLock = false;

function clearInputState() {
  for (const key of Object.keys(keys)) keys[key] = false;
  mouseDown = false;
  rightDown = false;
  firePressed = false;
  jumpPressed = false;
  reloadPressed = false;
  switchPressed = false;
}

function switchWeapon(id) {
  if (game.state !== 'playing' || game.paused || ui.modalOpen) return;
  if (player.setWeapon(id)) viewModel.switchWeapon(id);
}

function buildInput() {
  const locked = document.pointerLockElement === canvas;
  const input = {
    forward: !!keys.KeyW,
    back: !!keys.KeyS,
    left: !!keys.KeyA,
    right: !!keys.KeyD,
    crouch: !!(keys.ControlLeft || keys.ControlRight),
    walk: !!(keys.ShiftLeft || keys.ShiftRight),
    jumpPressed,
    fire: mouseDown && locked,
    firePressed: firePressed && locked,
    aim: rightDown && locked,
    reload: reloadPressed,
    switchWeapon: switchPressed,
  };
  jumpPressed = false;
  firePressed = false;
  reloadPressed = false;
  switchPressed = false;
  return input;
}

document.addEventListener('keydown', (event) => {
  const playing = game.state === 'playing';
  if (playing && event.code === 'Tab') event.preventDefault();
  if (playing && event.code === 'Space') event.preventDefault();

  if (event.code === 'Escape') {
    if (ui.modalOpen) { ui.closeModal(); return; }
    if (playing && !game.paused) pauseGame();
    return;
  }
  if (!playing || game.paused || ui.modalOpen) return;

  if (event.code === 'Tab') {
    if (!event.repeat) ui.showScoreboard(game);
    return;
  }

  keys[event.code] = true;
  if (event.repeat) return;

  if (event.code === 'KeyR') reloadPressed = true;
  if (event.code === 'KeyQ') switchPressed = true;
  if (event.code === 'Space') jumpPressed = true;
  if (event.code === 'Digit1') switchWeapon('rifle');
  if (event.code === 'Digit2') switchWeapon('pistol');
});

document.addEventListener('keyup', (event) => {
  keys[event.code] = false;
  if (event.code === 'Tab') ui.hideScoreboard();
});

window.addEventListener('blur', clearInputState);

document.addEventListener('mousemove', (event) => {
  if (document.pointerLockElement !== canvas || game.state !== 'playing' || game.paused) return;
  const sensitivity = 0.0022 * (settings.sensitivity || 1);
  const invert = settings.invertY ? -1 : 1;
  player.yaw -= event.movementX * sensitivity;
  player.pitch = clamp(player.pitch - event.movementY * sensitivity * invert, -1.45, 1.45);
  viewModel.addSway(event.movementX, event.movementY);
});

document.addEventListener('mousedown', (event) => {
  audio.unlock();
  if (game.state !== 'playing' || game.paused || ui.modalOpen) return;
  if (event.button === 0) {
    if (document.pointerLockElement !== canvas) { requestLock(); return; }
    mouseDown = true;
    firePressed = true;
  } else if (event.button === 2) {
    rightDown = true;
  }
});

document.addEventListener('mouseup', (event) => {
  if (event.button === 0) mouseDown = false;
  if (event.button === 2) rightDown = false;
});

document.addEventListener('contextmenu', (event) => {
  if (event.target === canvas) event.preventDefault();
});

canvas.addEventListener('click', () => {
  audio.unlock();
  if (document.pointerLockElement !== canvas) requestLock();
});

canvas.addEventListener('wheel', (event) => {
  if (game.state !== 'playing' || game.paused || ui.modalOpen) return;
  event.preventDefault();
  switchWeapon(player.weaponId === 'rifle' ? 'pistol' : 'rifle');
}, { passive: false });

document.addEventListener('pointerlockchange', () => {
  const locked = document.pointerLockElement === canvas;
  if (locked) {
    hadLock = true;
    ui.setPointerHint(false);
  } else {
    ui.setPointerHint(game.state === 'playing' && !game.paused && !ui.modalOpen);
    if (hadLock && game.state === 'playing' && !game.paused && !ui.modalOpen) pauseGame();
  }
});

/* ── UI wiring ─────────────────────────────────────────────────────────── */
ui.onUiSound = () => { audio.unlock(); audio.uiClick(); };
ui.onStart = (config) => startMatch(config);
ui.onQuickPlay = () => startMatch({
  mapId: settings.mapId,
  modeId: settings.modeId,
  team: settings.teamPreference,
  botCount: settings.botCount,
  difficulty: settings.difficulty,
  scoreLimit: settings.scoreLimit,
  timeLimit: settings.timeLimit,
  playerName: profile.name,
});
ui.onResume = () => resumeGame();
ui.onRestart = () => restartMatch();
ui.onExit = () => exitToMenu();
ui.onPlayAgain = () => restartMatch();
ui.onChangeMatch = () => { exitToMenu(); ui.openSetup('CHANGE MATCH'); };
ui.onSettingsChange = (next, options = {}) => {
  Object.assign(settings, next);
  applySettings({ save: !!options.save });
  ui.updateMenuBriefing();
};
ui.onProfileSave = (nextProfile) => {
  if (nextProfile?.name) {
    profile.name = nextProfile.name;
    settings.name = nextProfile.name;
  }
  saveProfile(profile);
  saveSettings(settings);
  ui.updateProfileLine();
};
ui.onPreviewMap = (mapId) => {
  settings.mapId = mapId;
  if (game.state === 'idle') {
    loadMap(mapId);
    ui.updateMenuBriefing();
  }
};

game.on('start', () => {
  // A new match always starts with the rifle, so keep the first-person model
  // in sync even if the previous match ended with the sidearm equipped.
  viewModel.switchWeapon(player.weaponId);
  ui.setPointerHint(true);
});
// The player controller can also change weapons itself (Q toggle). Mirror every
// change into the view model instead of relying on individual input handlers.
game.onWeaponChanged = (p) => {
  viewModel.switchWeapon(p.weaponId);
};
game.on('kill', (data) => {
  ui.killFeed(data);
  if (data?.playerKill && data.headshot) ui.announce('HEADSHOT', 'CLEAN KILL', 900);
  if (data?.playerKill && player.streak === 3) ui.announce('DOMINATING', '3 KILL STREAK', 1300);
  if (data?.playerKill && player.streak === 5) ui.announce('UNSTOPPABLE', '5 KILL STREAK', 1500);
});
game.on('playerDamaged', (data) => ui.damage(data.direction, player.yaw));
game.on('playerKilled', () => {
  ui.announce('ELIMINATED', 'REDEPLOYING', 1500);
});
game.on('respawned', () => {
  viewModel.switchWeapon(player.weaponId);
  ui.announce('REDEPLOYED', 'STAY SHARP', 900);
});
game.on('end', (result) => {
  recordResult(result);
  clearInputState();
  ui.showResults(result);
  ui.setPointerHint(false);
  document.exitPointerLock?.();
});

/* ── Resize ────────────────────────────────────────────────────────────── */
window.addEventListener('resize', () => {
  renderer.setPixelRatio(deviceScale());
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

/* ── Boot ──────────────────────────────────────────────────────────────── */
loadMap(settings.mapId);
ui.init();
applySettings();
viewModel.root.visible = false;
setCameraFov(MENU_FOV);
ui.updateProfileLine();
ui.updateMenuBriefing();
ui.showMenu();

/* ── Frame loop ────────────────────────────────────────────────────────── */
// Development/debug handle used by the automated browser checks.
window.__tactical = {
  game, player, ui, settings, profile, audio, effects,
  scene, camera, renderer, viewModel,
  startMatch, restartMatch, exitToMenu, pauseGame, resumeGame,
  get map() { return mapBuilder; },
};

const clock = new THREE.Clock();

function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, clock.getDelta());
  const playing = game.state === 'playing';
  viewModel.root.visible = playing;

  if (playing && !game.paused) {
    const input = buildInput();
    game.update(dt, input);
    syncPlayerCamera();
    viewModel.update(dt, {
      speed: Math.hypot(player.vel.x, player.vel.z),
      aiming: player.aiming,
      grounded: player.grounded,
      crouching: player.crouching,
    });
    effects.update(dt);
    ui.updateHUD(game, dt);
  } else if (!playing) {
    updateMenuCamera(dt);
    effects.update(dt);
  }

  renderer.render(scene, camera);
}

frame();
