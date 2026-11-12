import * as THREE from 'three';
import { CONFIG } from '../core/config.js';
import { settingsStore } from '../core/settings.js';
import { clamp, distance2D, escapeHtml, formatTime, rand, randInt, shuffle } from '../core/utils.js';
import { audio } from '../audio/audio.js';
import { createMap } from '../world/maps.js';
import { Player } from '../entities/player.js';
import { Bot } from '../ai/bot.js';
import { UI } from '../ui/ui.js';

const $ = (selector, root = document) => root.querySelector(selector);

const DEFAULT_MATCH = {
  mapId: 'old_quarter',
  mode: 'tdm',
  botCount: 8,
  difficulty: 'Normal',
  team: 'CT',
  timeLimit: 180,
  scoreLimit: 25,
};

function raySphere(origin, direction, center, radius) {
  const ox = center.x - origin.x;
  const oy = center.y - origin.y;
  const oz = center.z - origin.z;
  const tca = ox * direction.x + oy * direction.y + oz * direction.z;
  if (tca < 0) return null;
  const d2 = ox * ox + oy * oy + oz * oz - tca * tca;
  const r2 = radius * radius;
  if (d2 > r2) return null;
  const thc = Math.sqrt(r2 - d2);
  const t0 = tca - thc;
  const t1 = tca + thc;
  if (t1 < 0) return null;
  return t0 >= 0 ? t0 : t1;
}

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.settings = settingsStore;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(74, window.innerWidth / window.innerHeight, 0.055, 240);
    this.menuCamera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.08, 260);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x9b9277, 1);

    this.clock = new THREE.Clock();
    this.active = false;
    this.paused = false;
    this.results = false;
    this.resultsRecorded = false;
    this.player = null;
    this.bots = [];
    this.mapRuntime = null;
    this.mapDef = CONFIG.maps.old_quarter;
    this.modeDef = CONFIG.modes.tdm;
    this.mode = 'tdm';
    this.matchConfig = { ...DEFAULT_MATCH, team: settingsStore.profile.team || 'CT' };
    this.scores = { CT: 0, T: 0 };
    this.timeLeft = 0;
    this.elapsed = 0;
    this.keys = {};
    this.mouseDown = false;
    this.wasPointerLocked = false;
    this.fps = 0;
    this.fpsFrames = 0;
    this.fpsTimer = 0;
    this.uiTimer = 0;
    this.radarTimer = 0;
    this.lastDeathMessage = '';
    this.matchPoint = false;
    this.alertCooldown = new Map();
    this.menuTime = 0;
    this.effectsGroup = null;
    this.tracers = [];
    this.sparks = [];
    this.dust = null;
    this.tracerIndex = 0;
    this.sparkIndex = 0;

    this.ui = new UI(this);
    this.applySettings();
    this.bindInput();
    this.bindResize();
    this.createMenuPreview();
    this.bindQaApi();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  // -------------------------------------------------------------------------
  // Boot / preview / cleanup
  // -------------------------------------------------------------------------

  get quality() {
    const base = CONFIG.quality[settingsStore.get('quality')] || CONFIG.quality.medium;
    return {
      ...base,
      shadows: base.shadows && settingsStore.get('shadows'),
    };
  }

  // Simulation clock used by entities and AI. Kept separate from the
  // three.js clock so pausing the match also pauses combat timers.
  get time() {
    return this.elapsed;
  }

  applySettings() {
    const quality = this.quality;
    const settings = settingsStore.get();
    const ratio = Math.min(window.devicePixelRatio || 1, quality.pixelRatio * settings.resolutionScale);
    this.renderer.setPixelRatio(Math.max(0.6, ratio));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = Boolean(quality.shadows);
    if (this.mapRuntime?.lights?.sun) {
      this.mapRuntime.lights.sun.castShadow = Boolean(quality.shadows);
      const size = Math.min(quality.shadowMap, this.renderer.capabilities.maxTextureSize);
      if (this.mapRuntime.lights.sun.shadow.mapSize.x !== size) {
        this.mapRuntime.lights.sun.shadow.mapSize.set(size, size);
        if (this.mapRuntime.lights.sun.shadow.map) {
          this.mapRuntime.lights.sun.shadow.map.dispose();
          this.mapRuntime.lights.sun.shadow.map = null;
        }
      }
    }
    if (this.player) {
      this.player.baseFov = settings.fov;
      this.player.camera.fov = settings.fov;
      this.player.camera.updateProjectionMatrix();
    }
    document.documentElement.style.setProperty('--crosshair-color', settings.crosshairColor);
    this.renderer.shadowMap.needsUpdate = true;
    this.ui.setFps(this.fps);
    audio.setVolumes();
  }

  createMenuPreview() {
    this.cleanupRuntime();
    const quality = this.quality;
    const runtime = createMap(this.scene, 'old_quarter', quality);
    this.mapRuntime = runtime;
    this.mapDef = runtime.definition;
    this.scene.add(this.menuCamera);
    this.menuCamera.aspect = window.innerWidth / window.innerHeight;
    this.menuCamera.updateProjectionMatrix();
    this.createEffects();
    this.menuTime = 0;
    this.active = false;
    this.paused = false;
    this.results = false;
    this.ui.setMap(runtime);
    this.ui.showMenu();
    this.ui.hideScoreboard();
    this.ui.hideResults();
    this.ui.hidePause();
    $('#respawn-panel')?.classList.add('hidden');
    document.title = 'TACTICAL FPS — Classic Combat';
  }

  cleanupRuntime() {
    for (const bot of this.bots) bot.dispose();
    this.bots.length = 0;
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
    if (this.mapRuntime) {
      this.mapRuntime.world.dispose();
      if (this.mapRuntime.sky) {
        const sun = this.mapRuntime.sky.userData.sun;
        if (sun) {
          this.scene.remove(sun);
          sun.material.map?.dispose();
          sun.material.dispose();
        }
        this.scene.remove(this.mapRuntime.sky);
        this.mapRuntime.sky.geometry.dispose();
        this.mapRuntime.sky.material.dispose();
      }
      if (this.mapRuntime.lights) {
        this.scene.remove(this.mapRuntime.lights.hemi, this.mapRuntime.lights.sun, this.mapRuntime.lights.sun.target);
      }
      this.mapRuntime = null;
    }
    if (this.effectsGroup) {
      this.effectsGroup.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      this.scene.remove(this.effectsGroup);
      this.effectsGroup = null;
    }
    this.tracers.length = 0;
    this.sparks.length = 0;
    this.dust = null;
    this.scene.clear();
    this.renderer.renderLists.dispose();
  }

  createEffects() {
    this.effectsGroup = new THREE.Group();
    this.effectsGroup.name = 'effects';
    this.scene.add(this.effectsGroup);
    const tracerMaterialColors = [0xffd79a, 0xffc07a];
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(6), 3));
      const material = new THREE.LineBasicMaterial({
        color: tracerMaterialColors[i % 2], transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geometry, material);
      line.visible = false;
      line.frustumCulled = false;
      this.effectsGroup.add(line);
      this.tracers.push({ line, life: 0, maxLife: 0.018 });
    }
    const sparkMaterial = new THREE.MeshBasicMaterial({ color: 0xffc27d, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending });
    const sparkGeometry = new THREE.SphereGeometry(0.035, 4, 3);
    for (let i = 0; i < 42; i++) {
      const mesh = new THREE.Mesh(sparkGeometry, sparkMaterial);
      mesh.visible = false;
      this.effectsGroup.add(mesh);
      this.sparks.push({ mesh, life: 0, velocity: new THREE.Vector3() });
    }
    const bounds = this.mapDef.bounds;
    const count = Math.round(260 * this.quality.particles);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = rand(bounds.minX, bounds.maxX);
      positions[i * 3 + 1] = rand(0.5, 13);
      positions[i * 3 + 2] = rand(bounds.minZ, bounds.maxZ);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: this.mapDef.id === 'industrial' ? 0xc8d0cc : 0xe0c899,
      size: 0.075,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      sizeAttenuation: true,
    });
    this.dust = new THREE.Points(geometry, material);
    this.effectsGroup.add(this.dust);
  }

  // -------------------------------------------------------------------------
  // Match lifecycle
  // -------------------------------------------------------------------------

  quickStart() {
    this.startMatch({
      ...DEFAULT_MATCH,
      team: settingsStore.profile.team || 'CT',
    });
  }

  startMatch(options = {}) {
    audio.init();
    audio.startMusic();
    const config = { ...DEFAULT_MATCH, ...this.matchConfig, ...options };
    if (!CONFIG.maps[config.mapId]) config.mapId = 'old_quarter';
    if (!CONFIG.modes[config.mode]) config.mode = 'tdm';
    if (!CONFIG.difficulties[config.difficulty]) config.difficulty = 'Normal';
    config.botCount = clamp(Number(config.botCount) || 0, 0, 12);
    config.timeLimit = Math.max(60, Number(config.timeLimit) || 180);
    config.scoreLimit = Math.max(5, Number(config.scoreLimit) || 25);
    this.matchConfig = config;
    this.mode = config.mode;
    this.modeDef = CONFIG.modes[config.mode];
    this.mapDef = CONFIG.maps[config.mapId];

    this.cleanupRuntime();
    this.ui.hideMenu();
    this.ui.hideResults();
    this.ui.hidePause();
    this.ui.hideScoreboard();
    this.ui.closePanel();
    $('#respawn-panel').classList.add('hidden');
    $('#match-intro').classList.add('hidden');
    const feed = $('#kill-feed');
    if (feed) feed.innerHTML = '';

    const runtime = createMap(this.scene, config.mapId, this.quality);
    this.mapRuntime = runtime;
    this.mapDef = runtime.definition;
    this.createEffects();

    this.player = new Player({
      scene: this.scene,
      camera: this.camera,
      world: runtime.world,
      audio,
      settings: settingsStore,
    });
    this.player.name = settingsStore.profile.name;
    this.player.team = config.mode === 'ffa' ? 'FFA' : config.team;
    this.player.stats = { kills: 0, deaths: 0, headshots: 0 };
    this.scene.add(this.camera);

    this.active = true;
    this.paused = false;
    this.results = false;
    this.resultsRecorded = false;
    this.scores.CT = 0;
    this.scores.T = 0;
    this.timeLeft = config.timeLimit;
    this.elapsed = 0;
    this.matchPoint = false;
    this.lastDeathMessage = '';
    this.mouseDown = false;
    this.keys = {};
    this.alertCooldown.clear();

    this.createBots(config);
    const playerSpawn = this.chooseSpawn(this.player.team, []);
    this.player.respawn(playerSpawn, this.playerYaw(playerSpawn));
    this.ui.setMap(runtime);
    this.ui.showIntro(runtime.definition.name, this.modeDef.name);
    this.ui.updateHUD(this);
    this.ui.setPointerLocked(false);
    document.title = `${runtime.definition.name} — TACTICAL FPS`;
    audio.matchStart();

    this.requestPointerLock();
    this.clock.getDelta();
  }

  createBots(config) {
    this.bots = [];
    const names = shuffle(CONFIG.botNames);
    let ctBots = 0;
    let tBots = 0;
    if (config.mode === 'tdm') {
      const totalPlayers = config.botCount + 1;
      const ctTotal = Math.ceil(totalPlayers / 2);
      ctBots = Math.max(0, ctTotal - (config.team === 'CT' ? 1 : 0));
      tBots = Math.max(0, config.botCount - ctBots);
      // Rebalance if the player's chosen side left an uneven count.
      const tTotal = totalPlayers - ctTotal;
      if (tBots > tTotal) { ctBots += tBots - tTotal; tBots = tTotal; }
      if (ctBots + tBots < config.botCount) ctBots += config.botCount - ctBots - tBots;
    }

    for (let i = 0; i < config.botCount; i++) {
      let team;
      let visualTeam;
      if (config.mode === 'tdm') {
        team = i < ctBots ? 'CT' : 'T';
        visualTeam = team;
      } else {
        team = 'FFA';
        visualTeam = i % 2 === 0 ? 'CT' : 'T';
      }
      const bot = new Bot({
        scene: this.scene,
        world: this.mapRuntime.world,
        nav: this.mapRuntime.nav,
        team,
        visualTeam,
        name: names[i % names.length] + (i >= names.length ? ` ${i + 1}` : ''),
        difficulty: config.difficulty,
        mode: config.mode,
        index: i,
        game: this,
      });
      const spawn = this.chooseSpawn(team, []);
      bot.spawn(spawn);
      this.bots.push(bot);
    }
  }

  chooseSpawn(team, enemies = []) {
    const pool = this.mode === 'ffa'
      ? this.mapDef.ffaSpawns
      : (this.mapDef.spawns[team] || this.mapDef.spawns.CT);
    if (!pool?.length) return { x: 0, z: 0, y: 0 };
    const allEnemies = enemies.length ? enemies : [
      ...this.bots.filter((b) => b.alive && (this.mode === 'ffa' || b.team !== team)),
      ...(this.player?.alive && (this.mode === 'ffa' || this.player.team !== team) ? [this.player] : []),
    ];
    const occupied = [
      ...this.bots.filter((b) => b.alive),
      ...(this.player?.alive ? [this.player] : []),
    ];
    let best = pool[0];
    let bestScore = -Infinity;
    for (const spawn of pool) {
      let nearestEnemy = 100;
      for (const enemy of allEnemies) {
        if (!enemy?.position) continue;
        nearestEnemy = Math.min(nearestEnemy, Math.hypot(spawn.x - enemy.position.x, spawn.z - enemy.position.z));
      }
      // Also avoid dropping a wave of respawns onto the same marker.
      let nearestOccupied = 100;
      for (const other of occupied) {
        if (!other?.position) continue;
        nearestOccupied = Math.min(nearestOccupied, Math.hypot(spawn.x - other.position.x, spawn.z - other.position.z));
      }
      const spacing = Math.min(8, nearestOccupied) * 0.9;
      const score = nearestEnemy + spacing + rand(0, 4);
      if (score > bestScore) { bestScore = score; best = spawn; }
    }
    return { x: best.x, z: best.z, y: best.y ?? 0 };
  }

  playerYaw(spawn) {
    return Math.atan2(spawn.x, spawn.z);
  }

  respawnPlayer() {
    if (!this.active || this.results) return;
    const spawn = this.chooseSpawn(this.player.team, []);
    this.player.respawn(spawn, this.playerYaw(spawn));
    this.lastDeathMessage = '';
    this.ui.banner('BACK IN THE FIGHT', 1400);
    this.requestPointerLock();
  }

  respawnBot(bot) {
    if (!this.active || this.results) return;
    const spawn = this.chooseSpawn(bot.team, []);
    bot.spawn(spawn);
  }

  getSortedParticipants() {
    if (!this.player) return [];
    const participants = [{
      name: this.player.name,
      team: this.mode === 'ffa' ? 'FFA' : this.player.team,
      kills: this.player.stats.kills,
      deaths: this.player.stats.deaths,
      alive: this.player.alive,
      isPlayer: true,
    }];
    for (const bot of this.bots) {
      participants.push({
        name: bot.name,
        team: this.mode === 'ffa' ? 'FFA' : bot.team,
        kills: bot.kills,
        deaths: bot.deaths,
        alive: bot.alive,
        isPlayer: false,
      });
    }
    participants.sort((a, b) => {
      if (this.mode === 'tdm' && a.team !== b.team) return a.team === 'CT' ? -1 : 1;
      if (b.kills !== a.kills) return b.kills - a.kills;
      return a.deaths - b.deaths;
    });
    return participants;
  }

  isEnemy(a, b) {
    if (!a || !b || a === b) return false;
    if (this.mode === 'ffa') return true;
    return a.team !== b.team;
  }

  registerKill(killer, victim, weaponId = 'rifle', headshot = false) {
    if (!killer || !victim) return;
    if (killer === victim) return;
    const killerName = killer.name || 'Unknown';
    const victimName = victim.name || 'Unknown';
    const killerTeam = killer.team === 'FFA' ? 'FFA' : killer.team;
    const victimTeam = victim.team === 'FFA' ? 'FFA' : victim.team;
    if (killer === this.player) {
      this.player.stats.kills++;
      if (headshot) this.player.stats.headshots++;
      this.ui.banner(headshot ? 'HEADSHOT KILL' : 'TARGET DOWN', 1100);
    } else {
      killer.kills = (killer.kills || 0) + 1;
      if (headshot) killer.headshots = (killer.headshots || 0) + 1;
    }
    if (victim === this.player) {
      this.lastDeathMessage = `KILLED BY ${killerName.toUpperCase()}`;
    } else {
      victim.deaths = (victim.deaths || 0) + 1;
    }
    if (this.mode === 'tdm' && killer.team !== victim.team) {
      this.scores[killer.team] = (this.scores[killer.team] || 0) + 1;
    }
    this.ui.feed(killerName, victimName, killerTeam, victimTeam, headshot);
    if (killer === this.player) {
      audio.hitmarker(headshot);
    }
    this.updateMatchPoint();
    if (this.uiTimer <= 0) this.ui.updateHUD(this);
  }

  updateMatchPoint() {
    const limit = this.matchConfig.scoreLimit;
    if (this.mode === 'tdm') {
      this.matchPoint = this.scores.CT === limit - 1 || this.scores.T === limit - 1;
    } else {
      const top = Math.max(this.player.stats.kills, ...this.bots.map((b) => b.kills));
      this.matchPoint = top === limit - 1;
    }
  }

  checkEndConditions() {
    if (!this.active || this.results) return false;
    const limit = this.matchConfig.scoreLimit;
    if (this.mode === 'tdm') {
      if (this.scores.CT >= limit || this.scores.T >= limit) { this.endMatch('score limit'); return true; }
    } else if (Math.max(this.player.stats.kills, ...this.bots.map((b) => b.kills)) >= limit) {
      this.endMatch('score limit'); return true;
    }
    return false;
  }

  endMatch(reason = 'time expired') {
    if (this.results || !this.active) return;
    this.results = true;
    this.paused = false;
    this.mouseDown = false;
    this.ui.hidePause();
    this.ui.hideScoreboard();
    if (document.pointerLockElement) document.exitPointerLock?.();
    const sorted = this.getSortedParticipants();
    const playerTeam = this.player.team;
    let playerWon = false;
    let draw = false;
    let winnerLabel = '';
    let winnerName = '';
    let winnerScore = 0;
    let finalScore = '';
    let playerPlace = sorted.findIndex((p) => p.isPlayer) + 1;

    if (this.mode === 'tdm') {
      if (this.scores.CT === this.scores.T) {
        draw = true;
        winnerLabel = 'DRAW';
        finalScore = `${this.scores.CT} : ${this.scores.T}`;
      } else {
        const winnerTeam = this.scores.CT > this.scores.T ? 'CT' : 'T';
        winnerLabel = winnerTeam === 'CT' ? 'COUNTER-TERRORISTS' : 'TERRORISTS';
        finalScore = winnerTeam === 'CT'
          ? `${this.scores.CT} : ${this.scores.T}`
          : `${this.scores.T} : ${this.scores.CT}`;
        playerWon = winnerTeam === playerTeam;
      }
    } else {
      const winner = sorted[0];
      if (winner) {
        winnerName = winner.name;
        winnerScore = winner.kills;
        draw = sorted.length > 1
          && winner.kills === sorted[1].kills
          && winner.deaths === sorted[1].deaths;
        playerWon = !draw && winner.isPlayer;
        if (draw) winnerLabel = 'DRAW';
      }
    }
    if (draw) playerWon = false;

    const playerKills = this.player.stats.kills;
    const playerDeaths = this.player.stats.deaths;
    const kd = playerDeaths > 0 ? (playerKills / playerDeaths).toFixed(2) : playerKills.toFixed(2);
    const rows = this.mode === 'tdm'
      ? sorted.map((p) => `<tr class="${p.isPlayer ? 'you' : ''}"><td><span class="team-dot team-${p.team}"></span>${escapeHtml(p.name)}${p.isPlayer ? ' <em>YOU</em>' : ''}</td><td>${p.team}</td><td>${p.kills}</td><td>${p.deaths}</td></tr>`).join('')
      : sorted.map((p, index) => `<tr class="${p.isPlayer ? 'you' : ''}"><td>${index + 1}</td><td>${escapeHtml(p.name)}${p.isPlayer ? ' <em>YOU</em>' : ''}</td><td>${p.kills}</td><td>${p.deaths}</td></tr>`).join('');
    const tableHead = this.mode === 'tdm'
      ? '<tr><th>OPERATOR</th><th>TEAM</th><th>K</th><th>D</th></tr>'
      : '<tr><th>#</th><th>OPERATOR</th><th>K</th><th>D</th></tr>';
    const table = `<table class="score-table"><thead>${tableHead}</thead><tbody>${rows}</tbody></table>`;

    if (!this.resultsRecorded) {
      settingsStore.recordMatch({ won: playerWon, kills: playerKills, deaths: playerDeaths });
      this.resultsRecorded = true;
    }
    this.ui.showResults({
      mode: this.mode,
      mapName: this.mapDef.name,
      scores: { ...this.scores },
      finalScore,
      winnerLabel,
      winnerName,
      winnerScore,
      draw,
      playerWon,
      playerPlace,
      playerKills,
      playerDeaths,
      playerKd: kd,
      headshots: this.player.stats.headshots,
      table,
      reason,
    });
    if (playerWon) audio.victory();
    else if (draw) audio.uiClick();
    else audio.defeat();
  }

  restartMatch() {
    if (!this.matchConfig) return;
    this.ui.hideResults();
    this.startMatch(this.matchConfig);
  }

  leaveMatch(showMenu = true) {
    this.active = false;
    this.paused = false;
    this.results = false;
    this.mouseDown = false;
    this.keys = {};
    if (document.pointerLockElement) document.exitPointerLock?.();
    this.ui.hideScoreboard();
    this.ui.hidePause();
    this.ui.hideResults();
    this.ui.closePanel();
    if (showMenu) {
      this.createMenuPreview();
      this.ui.toast('MATCH ENDED — RETURNED TO MENU');
    }
  }

  resume() {
    if (!this.active || this.results) return;
    this.paused = false;
    this.ui.hidePause();
    this.clock.getDelta();
    this.requestPointerLock();
  }

  pause() {
    if (!this.active || this.results || this.paused) return;
    this.paused = true;
    this.mouseDown = false;
    this.keys = {};
    this.ui.showPause(true, this);
    if (document.pointerLockElement) document.exitPointerLock?.();
  }

  requestPointerLock() {
    if (!this.active || this.paused || this.results) return;
    if (document.pointerLockElement === this.canvas) return;
    try {
      const result = this.canvas.requestPointerLock?.();
      if (result && typeof result.catch === 'function') result.catch(() => {});
    } catch { /* browsers may block pointer lock without a gesture */ }
  }

  // -------------------------------------------------------------------------
  // Input
  // -------------------------------------------------------------------------

  bindInput() {
    window.addEventListener('keydown', (event) => {
      if (this.ui.panelScreen.classList.contains('visible')) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) return;
      if (['Space', 'Tab'].includes(event.code)) event.preventDefault();
      if (event.repeat) {
        if (this.active && !this.paused && !this.results) this.keys[event.code] = true;
        return;
      }
      if (event.code === 'Escape' && this.active && this.paused && !this.results) {
        event.preventDefault();
        this.resume();
        return;
      }
      if (!this.active || this.paused || this.results) return;
      this.keys[event.code] = true;
      if (event.code === 'Escape') {
        this.pause();
      } else if (event.code === 'Tab') {
        this.ui.showScoreboard(this);
      } else if (event.code === 'KeyR') {
        this.player?.startReload();
      } else if (event.code === 'Digit1') {
        this.player?.switchWeapon('rifle');
      } else if (event.code === 'Digit2') {
        this.player?.switchWeapon('pistol');
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.code === 'Tab' && this.ui.scoreboardVisible) this.ui.hideScoreboard();
      this.keys[event.code] = false;
    });

    window.addEventListener('blur', () => {
      this.keys = {};
      this.mouseDown = false;
      if (this.active && !this.paused && !this.results) this.pause();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.active && !this.paused && !this.results) this.pause();
    });

    document.addEventListener('pointerlockchange', () => {
      const locked = document.pointerLockElement === this.canvas;
      this.ui.setPointerLocked(locked);
      if (!locked && this.wasPointerLocked && this.active && !this.paused && !this.results) {
        this.pause();
      }
      this.wasPointerLocked = locked;
    });

    document.addEventListener('pointerlockerror', () => {
      this.ui.toast('MOUSE CAPTURE WAS BLOCKED — CLICK THE GAME VIEW');
      this.ui.updatePrompt();
    });

    this.canvas.addEventListener('mousedown', (event) => {
      if (!this.active || this.paused || this.results) return;
      if (event.button !== 0) return;
      if (document.pointerLockElement !== this.canvas) {
        this.requestPointerLock();
        return;
      }
      this.mouseDown = true;
      this.player?.fire(this);
    });

    window.addEventListener('mouseup', (event) => {
      if (event.button === 0) {
        this.mouseDown = false;
        this.player?.releaseTrigger();
      }
    });

    document.addEventListener('mousemove', (event) => {
      if (document.pointerLockElement !== this.canvas || !this.active || this.paused || this.results) return;
      this.player?.look(event.movementX || 0, event.movementY || 0);
    });

    this.canvas.addEventListener('contextmenu', (event) => event.preventDefault());
    window.addEventListener('wheel', (event) => {
      if (!this.active || this.paused || this.results || !this.player?.alive) return;
      if (event.deltaY > 0) this.player.switchWeapon(this.player.weaponId === 'rifle' ? 'pistol' : 'rifle');
      else this.player.switchWeapon(this.player.weaponId === 'rifle' ? 'pistol' : 'rifle');
    }, { passive: true });

    window.addEventListener('resize', () => this.resize());
  }

  bindResize() {
    this.resize();
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.menuCamera.aspect = width / height;
    this.menuCamera.updateProjectionMatrix();
    this.applySettings();
  }

  // -------------------------------------------------------------------------
  // Frame loop
  // -------------------------------------------------------------------------

  animate() {
    requestAnimationFrame(this.animate);
    const dt = Math.min(0.05, this.clock.getDelta());
    this.fpsFrames++;
    this.fpsTimer += dt;
    if (this.fpsTimer >= 0.5) {
      this.fps = this.fpsFrames / this.fpsTimer;
      this.fpsFrames = 0;
      this.fpsTimer = 0;
      this.ui.setFps(this.fps);
    }

    if (!this.active) {
      this.updateMenu(dt);
      this.updateEffects(dt);
      this.renderer.render(this.scene, this.menuCamera);
      return;
    }

    if (!this.paused && !this.results) this.update(dt);
    else this.updateEffects(dt);
    if (this.player) {
      this.ui.updateCrosshair(this);
      if (!this.paused && !this.results) this.ui.updatePrompt();
    }
    this.renderer.render(this.scene, this.player?.camera || this.menuCamera);
  }

  updateMenu(dt) {
    this.menuTime += dt;
    const angle = this.menuTime * 0.055 + 0.8;
    const radius = 31;
    this.menuCamera.position.set(Math.cos(angle) * radius, 10.5 + Math.sin(this.menuTime * 0.13) * 1.2, Math.sin(angle) * radius);
    this.menuCamera.lookAt(0, 2.2, 0);
  }

  update(dt) {
    this.elapsed += dt;
    this.uiTimer -= dt;
    this.radarTimer -= dt;

    if (this.player) {
      const input = {
        forward: Boolean(this.keys.KeyW || this.keys.ArrowUp),
        back: Boolean(this.keys.KeyS || this.keys.ArrowDown),
        left: Boolean(this.keys.KeyA || this.keys.ArrowLeft),
        right: Boolean(this.keys.KeyD || this.keys.ArrowRight),
        sprint: Boolean(this.keys.ShiftLeft || this.keys.ShiftRight),
        crouch: Boolean(this.keys.ControlLeft || this.keys.ControlRight || this.keys.KeyC),
        jump: Boolean(this.keys.Space),
      };
      this.player.update(dt, input);
      if (this.mouseDown && this.player.alive && this.player.weapon.automatic) {
        this.player.fire(this);
      }
      if (!this.player.alive && this.player.respawnTimer <= 0) this.respawnPlayer();
    }

    const ctx = {
      player: this.player,
      bots: this.bots,
      time: this.elapsed,
      game: this,
    };
    for (const bot of this.bots) bot.update(dt, ctx);

    this.timeLeft -= dt;
    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      this.endMatch('time expired');
      return;
    }

    this.updateEffects(dt);
    this.checkEndConditions();

    if (this.uiTimer <= 0) {
      this.uiTimer = 0.1;
      this.ui.updateHUD(this);
    }
    if (this.radarTimer <= 0) {
      this.radarTimer = 0.08;
      this.ui.updateRadar(this);
    }
  }

  updateEffects(dt) {
    for (const tracer of this.tracers) {
      if (tracer.life > 0) {
        tracer.life -= dt;
        tracer.line.material.opacity = clamp(tracer.life / tracer.maxLife, 0, 1) * 0.85;
        if (tracer.life <= 0) tracer.line.visible = false;
      }
    }
    for (const spark of this.sparks) {
      if (spark.life > 0) {
        spark.life -= dt;
        spark.mesh.position.addScaledVector(spark.velocity, dt);
        spark.velocity.y -= 9 * dt;
        const scale = Math.max(0.05, spark.life * 4);
        spark.mesh.scale.setScalar(scale);
        if (spark.life <= 0) spark.mesh.visible = false;
      }
    }
    if (this.dust) {
      this.dust.rotation.y += dt * 0.003;
      const positions = this.dust.geometry.attributes.position;
      for (let i = 0; i < positions.count; i += 5) {
        positions.setY(i, positions.getY(i) + Math.sin(this.elapsed * 0.2 + i) * dt * 0.06);
      }
      positions.needsUpdate = true;
    }
  }

  addTracer(from, to, color = 0xffd79a) {
    const tracer = this.tracers[this.tracerIndex];
    if (!tracer) return;
    this.tracerIndex = (this.tracerIndex + 1) % this.tracers.length;
    const positions = tracer.line.geometry.attributes.position;
    positions.setXYZ(0, from.x, from.y, from.z);
    positions.setXYZ(1, to.x, to.y, to.z);
    positions.needsUpdate = true;
    tracer.line.geometry.computeBoundingSphere();
    tracer.line.material.color.setHex(color);
    tracer.line.material.opacity = 0.85;
    tracer.line.visible = true;
    tracer.life = 0.055;
    tracer.maxLife = 0.055;
  }

  spawnImpact(point, color = 0xffc27d, count = 5) {
    for (let i = 0; i < count; i++) {
      const spark = this.sparks[this.sparkIndex];
      this.sparkIndex = (this.sparkIndex + 1) % this.sparks.length;
      spark.mesh.position.copy(point);
      spark.mesh.visible = true;
      spark.mesh.scale.setScalar(1);
      spark.mesh.material.color.setHex(color);
      spark.life = rand(0.12, 0.28);
      spark.velocity.set(rand(-2.2, 2.2), rand(0.8, 3.4), rand(-2.2, 2.2));
    }
  }

  muzzlePosition(side = 0.18) {
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
    return this.camera.position.clone().addScaledVector(forward, 0.8).addScaledVector(right, side).addScaledVector(up, -0.18);
  }

  playerShoot(player, weapon, spread) {
    if (!this.active || this.results || !player.alive) return;
    const origin = this.camera.position.clone();
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion).normalize();
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
    const tangent = Math.tan(spread);
    const direction = forward.clone()
      .addScaledVector(right, rand(-1, 1) * tangent)
      .addScaledVector(up, rand(-1, 1) * tangent)
      .normalize();
    const maxRange = weapon.range;
    const end = origin.clone().addScaledVector(direction, maxRange);
    // segmentHitFraction returns a 0..1 fraction along the segment. Convert it
    // to a world distance before comparing against sphere hits.
    const wallT = this.mapRuntime.world.segmentHitFraction(origin, end);
    let wallDistance = wallT === null ? maxRange : Math.min(maxRange, wallT * maxRange);
    // Ground plane
    if (direction.y < -0.001) {
      const groundDistance = -origin.y / direction.y;
      if (groundDistance > 0 && groundDistance < wallDistance) wallDistance = groundDistance;
    }
    let hitBot = null;
    let hitPart = null;
    let hitT = wallDistance;
    for (const bot of this.bots) {
      if (!bot.alive || !this.isEnemy(player, bot)) continue;
      const px = bot.position.x, py = bot.position.y, pz = bot.position.z;
      const spheres = [
        { x: px, y: py + 1.72, z: pz, r: 0.23, part: 'head' },
        { x: px, y: py + 1.25, z: pz, r: 0.36, part: 'body' },
        { x: px, y: py + 0.75, z: pz, r: 0.33, part: 'legs' },
      ];
      for (const sphere of spheres) {
        const t = raySphere(origin, direction, { x: sphere.x, y: sphere.y, z: sphere.z }, sphere.r);
        if (t !== null && t < hitT) {
          hitT = t;
          hitBot = bot;
          hitPart = sphere.part;
        }
      }
    }
    const muzzle = this.muzzlePosition();
    const hitPoint = origin.clone().addScaledVector(direction, Math.min(hitT, maxRange));
    this.addTracer(muzzle, hitPoint);
    if (hitBot) {
      const headshot = hitPart === 'head';
      const legMultiplier = hitPart === 'legs' ? 0.72 : 1;
      const falloff = clamp(1 - (hitT / maxRange) * 0.3, 0.7, 1);
      const damage = weapon.damage * (headshot ? weapon.headMultiplier : legMultiplier) * falloff;
      const killed = hitBot.takeDamage(damage);
      this.spawnImpact(hitPoint, headshot ? 0xff9a6a : 0xc99a6b, 6);
      this.ui.hitmarker(headshot);
      audio.hitmarker(headshot);
      if (killed) {
        this.registerKill(player, hitBot, weapon.id, headshot);
      } else {
        // Being shot should alert the bot without giving it perfect knowledge.
        hitBot.hear(player.position, player.team);
      }
      this.makeNoise(player.position, player.team);
    } else {
      this.spawnImpact(hitPoint, 0xffc27d, 4);
      audio.impact();
      this.makeNoise(player.position, player.team);
    }
    const distance = this.player ? player.position.distanceTo(this.player.position) : 0;
    audio.gunshot(weapon.id, distance);
    this.checkEndConditions();
  }

  botShoot(bot, target, difficulty) {
    if (!this.active || this.results || !bot.alive || !target?.alive) return;
    const origin = new THREE.Vector3(bot.position.x, bot.position.y + 1.5, bot.position.z);
    const isPlayer = target === this.player;
    const targetY = target.position.y + (isPlayer ? (target.crouched ? 0.9 : 1.15) : 1.2);
    const targetPoint = new THREE.Vector3(target.position.x, targetY, target.position.z);
    const distance = origin.distanceTo(targetPoint);
    const baseDir = targetPoint.clone().sub(origin).normalize();
    const right = new THREE.Vector3().crossVectors(baseDir, new THREE.Vector3(0, 1, 0)).normalize();
    const up = new THREE.Vector3().crossVectors(right, baseDir).normalize();
    const movePenalty = bot.currentSpeed > 1 ? 1.35 : 1;
    const spread = (difficulty.aimSpread / Math.max(0.5, bot.skill.accuracy)) * movePenalty;
    const direction = baseDir.clone()
      .addScaledVector(right, rand(-1, 1) * spread)
      .addScaledVector(up, rand(-1, 1) * spread)
      .normalize();
    const maxRange = 80;
    const end = origin.clone().addScaledVector(direction, maxRange);
    const wallT = this.mapRuntime.world.segmentHitFraction(origin, end);
    let wallDistance = wallT === null ? maxRange : Math.min(maxRange, wallT * maxRange);
    if (direction.y < -0.001) {
      const groundDistance = -origin.y / direction.y;
      if (groundDistance > 0 && groundDistance < wallDistance) wallDistance = groundDistance;
    }
    let hitT = wallDistance;
    let hitPart = null;
    const spheres = isPlayer
      ? [
          { x: target.position.x, y: target.position.y + (target.crouched ? 1.1 : 1.62), z: target.position.z, r: 0.2, part: 'head' },
          { x: target.position.x, y: target.position.y + (target.crouched ? 0.7 : 1.1), z: target.position.z, r: 0.37, part: 'body' },
          { x: target.position.x, y: target.position.y + 0.43, z: target.position.z, r: 0.3, part: 'legs' },
        ]
      : [
          { x: target.position.x, y: target.position.y + 1.68, z: target.position.z, r: 0.22, part: 'head' },
          { x: target.position.x, y: target.position.y + 1.2, z: target.position.z, r: 0.36, part: 'body' },
          { x: target.position.x, y: target.position.y + 0.72, z: target.position.z, r: 0.32, part: 'legs' },
        ];
    for (const sphere of spheres) {
      const t = raySphere(origin, direction, sphere, sphere.r);
      if (t !== null && t < hitT) { hitT = t; hitPart = sphere.part; }
    }
    const hitPoint = origin.clone().addScaledVector(direction, Math.min(hitT, maxRange));
    this.addTracer(origin, hitPoint, 0xffb56e);
    const distToPlayer = this.player ? origin.distanceTo(this.player.position) : 0;
    audio.gunshot('rifle', distToPlayer);
    bot.character.muzzle();
    this.makeNoise(bot.position, bot.team);
    if (hitPart) {
      const damage = 8.6 * difficulty.damageScale * (hitPart === 'head' ? 1.4 : hitPart === 'legs' ? 0.8 : 1);
      if (isPlayer) {
        const killed = target.takeDamage(damage, bot.position, this);
        this.ui.damage(new THREE.Vector3().subVectors(bot.position, target.position), damage / 20);
        if (killed) {
          this.registerKill(bot, target, 'rifle', hitPart === 'head');
          this.ui.banner('YOU WERE ELIMINATED', 1800);
        }
      } else {
        const falloff = clamp(1 - distance / 130, 0.65, 1);
        const killed = target.takeDamage(damage * falloff);
        if (killed) this.registerKill(bot, target, 'rifle', hitPart === 'head');
      }
    } else {
      this.spawnImpact(hitPoint, 0xffc27d, 3);
    }
    this.checkEndConditions();
  }

  makeNoise(position, sourceTeam) {
    for (const bot of this.bots) {
      if (!bot.alive) continue;
      if (distance2D(bot.position, position) < 26) bot.hear(position, sourceTeam);
    }
  }

  alertTeam(source, target) {
    if (this.mode === 'ffa' || !target) return;
    const now = this.elapsed;
    const key = source.team;
    if ((this.alertCooldown.get(key) || 0) > now) return;
    this.alertCooldown.set(key, now + 1.2);
    for (const bot of this.bots) {
      if (bot === source || !bot.alive || bot.team !== source.team) continue;
      if (distance2D(bot.position, source.position) < 34) {
        bot.receiveAlert(target.position, source.team);
      }
    }
  }

  // -------------------------------------------------------------------------
  // QA hook (used by automated browser checks; harmless in normal play)
  // -------------------------------------------------------------------------

  bindQaApi() {
    window.__TACTICAL__ = {
      game: this,
      start: (options) => this.startMatch(options),
      leave: () => this.leaveMatch(),
      state: () => ({
        active: this.active,
        paused: this.paused,
        results: this.results,
        map: this.mapDef?.id,
        mode: this.mode,
        timeLeft: this.timeLeft,
        scores: { ...this.scores },
        player: this.player ? {
          name: this.player.name,
          team: this.player.team,
          health: this.player.health,
          armor: this.player.armor,
          alive: this.player.alive,
          pos: { x: this.player.position.x, y: this.player.position.y, z: this.player.position.z },
          kills: this.player.stats.kills,
          deaths: this.player.stats.deaths,
          ammo: this.player.currentAmmo,
          weapon: this.player.weaponId,
        } : null,
        bots: this.bots.map((b) => ({
          name: b.name,
          team: b.team,
          alive: b.alive,
          state: b.state,
          health: b.health,
          kills: b.kills,
          deaths: b.deaths,
          pos: { x: b.position.x, y: b.position.y, z: b.position.z },
          target: b.target ? (b.target === this.player ? 'player' : b.target.name) : null,
          visible: b.targetVisible,
        })),
        nav: this.mapRuntime ? { nodes: this.mapRuntime.nav.nodes.length, components: this.mapRuntime.nav.componentCount } : null,
        scoreboard: this.getSortedParticipants(),
      }),
      pause: () => this.pause(),
      resume: () => this.resume(),
      restart: () => this.restartMatch(),
      damagePlayer: (amount) => this.player?.takeDamage(amount, null, this),
      teleport: (x, z, y = 0) => {
        if (!this.player) return;
        this.player.position.set(x, y, z);
        this.player.velocity.set(0, 0, 0);
      },
      forceEnd: () => this.endMatch('qa'),
    };
  }
}
