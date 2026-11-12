import { CONFIG, MAP_LIST, MODE_LIST, DIFFICULTY_LIST } from '../core/config.js';
import { settingsStore } from '../core/settings.js';
import { escapeHtml, formatTime } from '../core/utils.js';
import { audio } from '../audio/audio.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

export class UI {
  constructor(game) {
    this.game = game;
    this.menu = $('#menu-screen');
    this.panelScreen = $('#panel-screen');
    this.hud = $('#hud');
    this.toastEl = $('#toast');
    this.toastTimer = 0;
    this.bannerTimer = 0;
    this.introTimer = 0;
    this.introHideTimer = 0;
    this.damageTimer = 0;
    this.hitmarkerTimer = 0;
    this.scoreboardVisible = false;
    this.pointerLocked = false;
    this.fps = 0;
    this.fpsAccumulator = 0;
    this.fpsFrames = 0;
    this.radarBg = null;
    this.radarBounds = null;
    this.mapRuntime = null;
    this.lastRadar = 0;
    this.matchData = null;
    this.bind();
  }

  bind() {
    // Main menu
    this.menu.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      audio.init();
      audio.uiClick();
      const action = button.dataset.action;
      if (action === 'play') this.game.quickStart();
      else if (action === 'setup') this.openMatchSetup('OFFLINE MATCH');
      else if (action === 'servers') this.openOnlineInfo();
      else if (action === 'settings') this.openSettings();
      else if (action === 'profile') this.openProfile();
      else if (action === 'credits') this.openCredits();
    });

    this.panelScreen.addEventListener('click', (event) => {
      audio.init();
      const close = event.target.closest('[data-close]');
      if (close) {
        audio.uiClick();
        this.closePanel();
        return;
      }
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      audio.uiClick();
      const action = button.dataset.action;
      if (action === 'start-match') this.startFromSetup();
      else if (action === 'save-settings') this.saveSettings();
      else if (action === 'reset-settings') this.resetSettings();
      else if (action === 'fullscreen') this.toggleFullscreen();
      else if (action === 'save-profile') this.saveProfile();
      else if (action === 'reset-profile') this.resetProfile();
      else if (action === 'offline-setup') { this.closePanel(); this.openMatchSetup('OFFLINE MATCH'); }
      else if (action === 'credits') this.openCredits();
    });

    this.panelScreen.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { event.stopPropagation(); this.closePanel(); }
    });

    this.hud.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      audio.init();
      audio.uiClick();
      const action = button.dataset.action;
      if (action === 'resume') this.game.resume();
      else if (action === 'restart') this.game.restartMatch();
      else if (action === 'pause-settings') this.openSettings();
      else if (action === 'quit') this.game.leaveMatch();
      else if (action === 'play-again') this.game.restartMatch();
      else if (action === 'new-match') { this.hideResults(); this.game.leaveMatch(true); this.openMatchSetup('NEW MATCH'); }
      else if (action === 'main-menu') this.game.leaveMatch();
    });
  }

  // ---- menu and panels -----------------------------------------------------

  showMenu() {
    this.menu.classList.add('visible');
    this.hud.classList.add('hidden');
  }

  hideMenu() {
    this.menu.classList.remove('visible');
    this.hud.classList.remove('hidden');
  }

  showPanel(content, { wide = false } = {}) {
    this.panelScreen.innerHTML = `
      <div class="panel-backdrop" data-close></div>
      <div class="panel ${wide ? 'panel-wide' : ''}" role="dialog" aria-modal="true">
        <button class="panel-close" data-close aria-label="Close">&times;</button>
        ${content}
      </div>`;
    this.panelScreen.classList.add('visible');
    const first = this.panelScreen.querySelector('select, input, button:not(.panel-close)');
    if (first) setTimeout(() => first.focus(), 20);
  }

  closePanel() {
    this.panelScreen.classList.remove('visible');
    this.panelScreen.innerHTML = '';
  }

  openMatchSetup(title = 'OFFLINE MATCH') {
    audio.init();
    const previous = this.game.matchConfig || { mapId: 'old_quarter', mode: 'tdm', difficulty: 'Normal' };
    const team = settingsStore.profile.team || 'CT';
    const mapOptions = MAP_LIST.map((map) => `<option value="${map.id}" ${map.id === previous.mapId ? 'selected' : ''}>${map.name} — ${map.subtitle}</option>`).join('');
    const modeOptions = MODE_LIST.map((mode) => `<option value="${mode.id}" ${mode.id === previous.mode ? 'selected' : ''}>${mode.name}</option>`).join('');
    const difficultyOptions = DIFFICULTY_LIST.map((d) => `<option value="${d}" ${d === previous.difficulty ? 'selected' : ''}>${d.toUpperCase()}</option>`).join('');
    const map = CONFIG.maps[previous.mapId] || CONFIG.maps.old_quarter;
    this.showPanel(`
      <div class="panel-kicker">LOCAL OPERATIONS</div>
      <h2>${title}</h2>
      <p class="panel-sub">Offline match against map-aware bots. No connection required.</p>
      <div class="form-grid">
        <label class="field full">MAP
          <select id="cfg-map">${mapOptions}</select>
          <span class="field-hint" id="cfg-map-description">${map.description}</span>
        </label>
        <label class="field">GAME MODE<select id="cfg-mode">${modeOptions}</select></label>
        <label class="field">BOT DIFFICULTY<select id="cfg-difficulty">${difficultyOptions}</select></label>
        <label class="field">NUMBER OF BOTS<select id="cfg-bots">
          ${[4, 6, 8, 10, 12].map((n) => `<option value="${n}" ${n === (previous.botCount || 8) ? 'selected' : ''}>${n} bots</option>`).join('')}
        </select></label>
        <label class="field" id="team-field">YOUR TEAM<select id="cfg-team">
          <option value="CT" ${team === 'CT' ? 'selected' : ''}>Counter-Terrorists (CT)</option>
          <option value="T" ${team === 'T' ? 'selected' : ''}>Terrorists (T)</option>
        </select></label>
        <label class="field">MATCH LENGTH<select id="cfg-time">
          <option value="120" ${previous.timeLimit === 120 ? 'selected' : ''}>2 minutes</option>
          <option value="180" ${previous.timeLimit === 180 || !previous.timeLimit ? 'selected' : ''}>3 minutes</option>
          <option value="300" ${previous.timeLimit === 300 ? 'selected' : ''}>5 minutes</option>
        </select></label>
        <label class="field">SCORE LIMIT<select id="cfg-score">
          <option value="15" ${previous.scoreLimit === 15 ? 'selected' : ''}>15 kills</option>
          <option value="25" ${previous.scoreLimit === 25 || !previous.scoreLimit ? 'selected' : ''}>25 kills</option>
          <option value="40" ${previous.scoreLimit === 40 ? 'selected' : ''}>40 kills</option>
        </select></label>
      </div>
      <div class="mode-note" id="cfg-mode-note">First team to the score limit or the highest team score at time-up wins.</div>
      <div class="panel-actions">
        <button data-close>CANCEL</button>
        <button class="accent" data-action="start-match">START MATCH</button>
      </div>`);
    const mapSelect = $('#cfg-map');
    mapSelect.addEventListener('change', () => {
      const selected = CONFIG.maps[mapSelect.value];
      $('#cfg-map-description').textContent = selected.description;
    });
    const modeSelect = $('#cfg-mode');
    const updateMode = () => {
      const isFFA = modeSelect.value === 'ffa';
      $('#team-field').style.opacity = isFFA ? '0.4' : '1';
      $('#cfg-team').disabled = isFFA;
      $('#cfg-mode-note').textContent = isFFA
        ? 'Every participant competes independently. Highest individual score wins.'
        : 'First team to the score limit or the highest team score at time-up wins.';
    };
    modeSelect.addEventListener('change', updateMode);
    updateMode();
  }

  startFromSetup() {
    const mapId = $('#cfg-map')?.value || 'old_quarter';
    const mode = $('#cfg-mode')?.value || 'tdm';
    const difficulty = $('#cfg-difficulty')?.value || 'Normal';
    const botCount = Number($('#cfg-bots')?.value || 8);
    const team = mode === 'ffa' ? 'CT' : ($('#cfg-team')?.value || 'CT');
    const timeLimit = Number($('#cfg-time')?.value || 180);
    const scoreLimit = Number($('#cfg-score')?.value || 25);
    this.closePanel();
    this.game.startMatch({ mapId, mode, botCount, difficulty, team, timeLimit, scoreLimit });
  }

  openSettings() {
    audio.init();
    const s = settingsStore.get();
    this.showPanel(`
      <div class="panel-kicker">CONFIGURATION</div>
      <h2>SETTINGS</h2>
      <p class="panel-sub">Changes are applied immediately and saved on this device.</p>
      <div class="settings-section">
        <h3>CONTROLS</h3>
        <label class="field slider-field">MOUSE SENSITIVITY <output id="out-sensitivity">${s.sensitivity.toFixed(2)}</output>
          <input id="set-sensitivity" type="range" min="0.15" max="2.5" step="0.05" value="${s.sensitivity}">
        </label>
        <label class="field slider-field">FIELD OF VIEW <output id="out-fov">${Math.round(s.fov)}&deg;</output>
          <input id="set-fov" type="range" min="62" max="95" step="1" value="${s.fov}">
        </label>
        <label class="check-field"><input id="set-invert" type="checkbox" ${s.invertY ? 'checked' : ''}> INVERT MOUSE Y-AXIS</label>
      </div>
      <div class="settings-section">
        <h3>AUDIO</h3>
        <label class="field slider-field">MASTER VOLUME <output id="out-master">${Math.round(s.masterVolume * 100)}%</output>
          <input id="set-master" type="range" min="0" max="1" step="0.05" value="${s.masterVolume}">
        </label>
        <label class="field slider-field">EFFECTS VOLUME <output id="out-effects">${Math.round(s.effectsVolume * 100)}%</output>
          <input id="set-effects" type="range" min="0" max="1" step="0.05" value="${s.effectsVolume}">
        </label>
        <label class="field slider-field">MUSIC VOLUME <output id="out-music">${Math.round(s.musicVolume * 100)}%</output>
          <input id="set-music" type="range" min="0" max="1" step="0.05" value="${s.musicVolume}">
        </label>
      </div>
      <div class="settings-section">
        <h3>VIDEO</h3>
        <div class="form-grid compact">
          <label class="field">GRAPHICS QUALITY<select id="set-quality">
            ${['low', 'medium', 'high'].map((q) => `<option value="${q}" ${s.quality === q ? 'selected' : ''}>${q.toUpperCase()}</option>`).join('')}
          </select></label>
          <label class="field">SHADOWS<select id="set-shadows">
            <option value="on" ${s.shadows ? 'selected' : ''}>ENABLED</option>
            <option value="off" ${!s.shadows ? 'selected' : ''}>DISABLED</option>
          </select></label>
          <label class="field slider-field full">RENDER SCALE <output id="out-resolution">${Math.round(s.resolutionScale * 100)}%</output>
            <input id="set-resolution" type="range" min="0.6" max="1.25" step="0.05" value="${s.resolutionScale}">
          </label>
          <label class="field">CROSSHAIR COLOR<input id="set-crosshair" type="color" value="${s.crosshairColor}"></label>
          <label class="check-field"><input id="set-fps" type="checkbox" ${s.showFps ? 'checked' : ''}> SHOW FRAME-RATE COUNTER</label>
        </div>
        <button class="inline-button" data-action="fullscreen">TOGGLE FULLSCREEN</button>
      </div>
      <div class="panel-actions">
        <button data-close>CANCEL</button>
        <button data-action="reset-settings">RESET DEFAULTS</button>
        <button class="accent" data-action="save-settings">APPLY &amp; SAVE</button>
      </div>`);
    const bindOutput = (id, output, format = (v) => v) => {
      const input = $(id);
      input?.addEventListener('input', () => { if (output) $(output).textContent = format(input.value); });
    };
    bindOutput('#set-sensitivity', '#out-sensitivity', (v) => Number(v).toFixed(2));
    bindOutput('#set-fov', '#out-fov', (v) => `${Math.round(v)}°`);
    bindOutput('#set-master', '#out-master', (v) => `${Math.round(v * 100)}%`);
    bindOutput('#set-effects', '#out-effects', (v) => `${Math.round(v * 100)}%`);
    bindOutput('#set-music', '#out-music', (v) => `${Math.round(v * 100)}%`);
    bindOutput('#set-resolution', '#out-resolution', (v) => `${Math.round(v * 100)}%`);
  }

  saveSettings() {
    settingsStore.update({
      sensitivity: Number($('#set-sensitivity').value),
      fov: Number($('#set-fov').value),
      invertY: $('#set-invert').checked,
      masterVolume: Number($('#set-master').value),
      effectsVolume: Number($('#set-effects').value),
      musicVolume: Number($('#set-music').value),
      quality: $('#set-quality').value,
      shadows: $('#set-shadows').value === 'on',
      resolutionScale: Number($('#set-resolution').value),
      showFps: $('#set-fps').checked,
      crosshairColor: $('#set-crosshair').value,
    });
    audio.init();
    audio.setVolumes();
    this.game.applySettings();
    this.closePanel();
    this.toast('SETTINGS SAVED');
  }

  resetSettings() {
    settingsStore.reset();
    this.game.applySettings();
    this.toast('DEFAULTS RESTORED');
    this.openSettings();
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => this.toast('FULLSCREEN WAS BLOCKED BY THE BROWSER'));
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  openProfile() {
    const profile = settingsStore.profile;
    const kd = profile.deaths > 0 ? (profile.kills / profile.deaths).toFixed(2) : profile.kills.toFixed(2);
    const winRate = profile.matches > 0 ? Math.round((profile.wins / profile.matches) * 100) : 0;
    this.showPanel(`
      <div class="panel-kicker">OPERATOR DOSSIER</div>
      <h2>PLAYER PROFILE</h2>
      <p class="panel-sub">Career statistics are stored locally on this device.</p>
      <div class="profile-layout">
        <div class="profile-identity">
          <div class="profile-patch">${escapeHtml(profile.name.slice(0, 2).toUpperCase())}</div>
          <label class="field full">CALLSIGN<input id="profile-name" maxlength="18" value="${escapeHtml(profile.name)}"></label>
          <label class="field full">PREFERRED TEAM<select id="profile-team">
            <option value="CT" ${profile.team === 'CT' ? 'selected' : ''}>Counter-Terrorists</option>
            <option value="T" ${profile.team === 'T' ? 'selected' : ''}>Terrorists</option>
          </select></label>
          <div class="profile-rank">FIELD OPERATIVE <span>LOCAL RECORD</span></div>
        </div>
        <div class="profile-stats">
          <div><strong>${profile.matches}</strong><span>MATCHES</span></div>
          <div><strong>${profile.wins}</strong><span>WINS</span></div>
          <div><strong>${winRate}%</strong><span>WIN RATE</span></div>
          <div><strong>${profile.kills}</strong><span>TOTAL KILLS</span></div>
          <div><strong>${profile.deaths}</strong><span>DEATHS</span></div>
          <div><strong>${kd}</strong><span>K/D RATIO</span></div>
        </div>
      </div>
      <p class="profile-note">Callsigns and settings persist through browser reloads using local storage.</p>
      <div class="panel-actions">
        <button data-action="reset-profile" class="danger-quiet">RESET RECORD</button>
        <button data-action="save-profile" class="accent">SAVE PROFILE</button>
      </div>`);
  }

  saveProfile() {
    const name = ($('#profile-name').value.trim() || 'Operator').slice(0, 18);
    const team = $('#profile-team').value;
    settingsStore.updateProfile({ name, team });
    if (this.game.player) this.game.player.name = name;
    this.closePanel();
    this.toast('PROFILE SAVED');
  }

  resetProfile() {
    settingsStore.resetProfile();
    this.openProfile();
    this.toast('CAREER RECORD RESET');
  }

  openCredits() {
    this.showPanel(`
      <div class="panel-kicker">ABOUT THIS BUILD</div>
      <h2>CREDITS</h2>
      <div class="credits-body">
        <p><b>TACTICAL FPS — CLASSIC COMBAT</b><br>Build 2.0.0 &bull; Original browser game</p>
        <p>An offline-first tactical shooter inspired by the feel of early-2000s PC shooters. All maps, textures, models, animation, audio and interface artwork in this project are generated procedurally or authored specifically for it. No Counter-Strike, Combat Online or other commercial game assets are included.</p>
        <p><b>ENGINE</b><br>Three.js &bull; WebGL2 &bull; Vite</p>
        <p><b>SYSTEMS</b><br>Procedural map construction &bull; A* navigation graph &bull; finite-state tactical AI &bull; hit-scan ballistics &bull; procedural character animation &bull; generated WebAudio effects</p>
        <p class="muted">Third-party software: Three.js (MIT), Vite (MIT). See package licenses for details.</p>
      </div>
      <div class="panel-actions"><button data-close>CLOSE</button></div>`);
  }

  openOnlineInfo() {
    this.showPanel(`
      <div class="panel-kicker">NETWORK STATUS</div>
      <h2>ONLINE MULTIPLAYER</h2>
      <div class="status-banner unavailable"><span class="status-dot"></span> ONLINE SERVICES UNAVAILABLE</div>
      <div class="credits-body">
        <p>This build is a complete <b>offline</b> game. It does not contain a lobby server or an authoritative networking backend, so online matchmaking and remote players are not available.</p>
        <p>No fake server list is shown and no bots are presented as human players. Every opponent in a match is clearly a local computer-controlled bot.</p>
        <p>The offline game includes two maps, Team Deathmatch, Free For All, three bot difficulties, full match scoring and saved preferences.</p>
      </div>
      <div class="panel-actions">
        <button data-close>BACK</button>
        <button class="accent" data-action="offline-setup">PLAY OFFLINE</button>
      </div>`);
  }

  // ---- toast and notifications --------------------------------------------

  toast(message, duration = 2300) {
    this.toastEl.textContent = message;
    this.toastEl.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastEl.classList.remove('show'), duration);
  }

  banner(message, duration = 2400) {
    const el = $('#objective-banner');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(this.bannerTimer);
    this.bannerTimer = setTimeout(() => { el.textContent = ''; el.classList.remove('show'); }, duration);
  }

  showIntro(mapName, modeName) {
    const intro = $('#match-intro');
    $('#intro-map').textContent = mapName;
    $('#intro-mode').textContent = modeName;
    intro.classList.remove('hidden');
    intro.classList.add('show');
    clearTimeout(this.introTimer);
    clearTimeout(this.introHideTimer);
    this.introTimer = setTimeout(() => {
      intro.classList.remove('show');
      this.introHideTimer = setTimeout(() => intro.classList.add('hidden'), 350);
    }, 2400);
  }

  // ---- HUD -----------------------------------------------------------------

  setMap(mapRuntime) {
    this.mapRuntime = mapRuntime;
    this.buildRadarBackground();
  }

  buildRadarBackground() {
    if (!this.mapRuntime) return;
    const bounds = this.mapRuntime.world.bounds;
    this.radarBounds = bounds;
    const size = 200;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(8, 18, 14, 0.74)';
    ctx.fillRect(0, 0, size, size);
    const scale = 176 / Math.max(bounds.maxX - bounds.minX, bounds.maxZ - bounds.minZ);
    const cx = (bounds.minX + bounds.maxX) / 2;
    const cz = (bounds.minZ + bounds.maxZ) / 2;
    const tx = (x) => size / 2 + (x - cx) * scale;
    const tz = (z) => size / 2 + (z - cz) * scale;
    for (const c of this.mapRuntime.world.colliders) {
      if (c.minY > 3 || c.maxY < 0.3) continue;
      const w = (c.maxX - c.minX) * scale;
      const h = (c.maxZ - c.minZ) * scale;
      if (w < 0.5 && h < 0.5) continue;
      ctx.fillStyle = c.maxY > 2 ? 'rgba(128, 134, 115, 0.34)' : 'rgba(149, 137, 105, 0.26)';
      ctx.fillRect(tx(c.minX), tz(c.minZ), Math.max(0.7, w), Math.max(0.7, h));
    }
    ctx.strokeStyle = 'rgba(206, 199, 164, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(tx(bounds.minX), tz(bounds.minZ), (bounds.maxX - bounds.minX) * scale, (bounds.maxZ - bounds.minZ) * scale);
    this.radarBg = canvas;
  }

  updateRadar(game) {
    if (!this.radarBg || !this.mapRuntime) return;
    const canvas = $('#radar');
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(this.radarBg, 0, 0, size, size);
    const bounds = this.radarBounds;
    const scale = (176 / Math.max(bounds.maxX - bounds.minX, bounds.maxZ - bounds.minZ)) * (size / 200);
    const cx = (bounds.minX + bounds.maxX) / 2;
    const cz = (bounds.minZ + bounds.maxZ) / 2;
    const tx = (x) => size / 2 + (x - cx) * scale;
    const tz = (z) => size / 2 + (z - cz) * scale;
    const player = game.player;
    const px = tx(player.position.x);
    const py = tz(player.position.z);

    // View cone. Canvas +Y is south, matching world +Z.
    const yaw = player.yaw;
    const angle = Math.atan2(-Math.cos(yaw), -Math.sin(yaw));
    ctx.fillStyle = 'rgba(196, 207, 167, 0.12)';
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.arc(px, py, 26, angle - 0.48, angle + 0.48);
    ctx.closePath();
    ctx.fill();

    for (const bot of game.bots) {
      if (!bot.alive) continue;
      const enemy = game.isEnemy(player, bot);
      const x = tx(bot.position.x);
      const y = tz(bot.position.z);
      if (Math.hypot(x - size / 2, y - size / 2) > size / 2 - 7) continue;
      ctx.beginPath();
      ctx.fillStyle = enemy ? '#d2674f' : '#6ea4ba';
      ctx.shadowColor = enemy ? 'rgba(210,103,79,.8)' : 'rgba(110,164,186,.8)';
      ctx.shadowBlur = 5;
      ctx.arc(x, y, enemy ? 3.6 : 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    // Player arrow
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillStyle = '#e3d7aa';
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(4.2, 4.5);
    ctx.lineTo(0, 2.5);
    ctx.lineTo(-4.2, 4.5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.restore();
    ctx.strokeStyle = 'rgba(216, 207, 172, 0.34)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
    ctx.stroke();
  }

  updateHUD(game) {
    if (!game.active) return;
    const player = game.player;
    $('#round-mode').textContent = game.modeDef.name;
    $('#round-clock').textContent = formatTime(game.timeLeft);
    $('#round-state').textContent = game.matchPoint ? 'MATCH POINT' : 'LIVE';
    $('#round-state').classList.toggle('match-point', Boolean(game.matchPoint));
    $('#health-value').textContent = Math.max(0, Math.ceil(player.health));
    $('#armor-value').textContent = Math.max(0, Math.ceil(player.armor));
    $('#health-value').classList.toggle('critical', player.health <= 30);
    const weapon = player.weapon;
    $('#weapon-name').textContent = weapon ? weapon.name : '—';
    $('#ammo-value').textContent = player.currentAmmo.mag;
    $('#reserve-value').textContent = player.currentAmmo.reserve;
    $('#ammo-value').classList.toggle('empty', player.currentAmmo.mag === 0);
    $('#match-mode-label').textContent = game.modeDef.name;

    if (game.mode === 'tdm') {
      $('#left-team-label').textContent = 'CT';
      $('#right-team-label').textContent = 'T';
      $('#ct-score').textContent = game.scores.CT;
      $('#t-score').textContent = game.scores.T;
      $('#match-score-label').textContent = `${game.scores.CT} – ${game.scores.T}`;
    } else {
      const sorted = game.getSortedParticipants();
      const playerPlace = sorted.findIndex((p) => p.isPlayer) + 1;
      const leader = sorted[0];
      $('#left-team-label').textContent = 'YOU';
      $('#right-team-label').textContent = 'LEADER';
      $('#ct-score').textContent = game.player.stats.kills;
      $('#t-score').textContent = leader ? leader.kills : 0;
      $('#match-score-label').textContent = `RANK ${playerPlace} / ${sorted.length}`;
    }

    const respawn = $('#respawn-panel');
    if (!player.alive && game.active && !game.results) {
      respawn.classList.remove('hidden');
      $('#respawn-count').textContent = Math.max(0, Math.ceil(player.respawnTimer));
      $('#respawn-killer').textContent = game.lastDeathMessage || 'RESPAWNING';
    } else {
      respawn.classList.add('hidden');
    }

    const prompt = $('#pointer-prompt');
    const shouldPrompt = game.active && !game.paused && !game.results && !this.pointerLocked && player.alive;
    prompt.classList.toggle('hidden', !shouldPrompt);
  }

  updateCrosshair(game) {
    const crosshair = $('#crosshair');
    const spread = Math.min(26, 4 + (game.player.currentSpread || 0) * 260);
    crosshair.style.setProperty('--spread', `${spread.toFixed(1)}px`);
  }

  setPointerLocked(locked) {
    this.pointerLocked = locked;
    if (this.game.active) this.updatePrompt();
  }

  updatePrompt() {
    const game = this.game;
    const shouldPrompt = game.active && !game.paused && !game.results && !this.pointerLocked && game.player.alive;
    $('#pointer-prompt').classList.toggle('hidden', !shouldPrompt);
  }

  setFps(fps) {
    this.fps = fps;
    const el = $('#fps-counter');
    const show = settingsStore.get('showFps');
    el.classList.toggle('hidden', !show);
    if (show) el.textContent = `FPS ${Math.round(fps)}`;
  }

  feed(killer, victim, killerTeam, victimTeam, headshot) {
    const feed = $('#kill-feed');
    const row = document.createElement('div');
    row.className = 'kill-row';
    row.innerHTML = `<span class="killer team-${killerTeam}">${escapeHtml(killer)}</span><span class="weapon-mark">${headshot ? '&#10022;' : '&#9656;'}</span><span class="victim team-${victimTeam}">${escapeHtml(victim)}</span>`;
    feed.prepend(row);
    while (feed.children.length > 6) feed.lastChild.remove();
    setTimeout(() => row.remove(), 4800);
  }

  hitmarker(headshot = false) {
    const el = $('#hitmarker');
    el.classList.remove('show', 'headshot');
    void el.offsetWidth;
    el.classList.add('show');
    if (headshot) el.classList.add('headshot');
    clearTimeout(this.hitmarkerTimer);
    this.hitmarkerTimer = setTimeout(() => el.classList.remove('show'), 140);
  }

  damage(direction, intensity = 1) {
    const vignette = $('#damage-vignette');
    vignette.style.opacity = String(Math.min(0.85, 0.25 + intensity * 0.55));
    vignette.classList.add('show');
    clearTimeout(this.damageTimer);
    this.damageTimer = setTimeout(() => {
      vignette.classList.remove('show');
      vignette.style.opacity = '0';
    }, 220);

    if (direction) {
      const dir = $('#damage-direction');
      const angle = Math.atan2(direction.x, -direction.z) * (180 / Math.PI);
      dir.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      dir.classList.add('show');
      clearTimeout(this.directionTimer);
      this.directionTimer = setTimeout(() => dir.classList.remove('show'), 800);
    }
  }

  showScoreboard(game) {
    this.scoreboardVisible = true;
    const el = $('#scoreboard');
    el.innerHTML = this.scoreboardHtml(game);
    el.classList.remove('hidden');
  }

  hideScoreboard() {
    this.scoreboardVisible = false;
    $('#scoreboard').classList.add('hidden');
  }

  scoreboardHtml(game) {
    const participants = game.getSortedParticipants();
    if (game.mode === 'tdm') {
      const ct = participants.filter((p) => p.team === 'CT').sort((a, b) => b.kills - a.kills);
      const t = participants.filter((p) => p.team === 'T').sort((a, b) => b.kills - a.kills);
      return `
        <div class="scoreboard-head"><span>${escapeHtml(game.mapDef.name)}</span><b>${game.scores.CT} : ${game.scores.T}</b><span>${game.modeDef.name}</span></div>
        <div class="scoreboard-teams">
          ${this.teamTable('COUNTER-TERRORISTS', ct, 'ct')}
          ${this.teamTable('TERRORISTS', t, 't')}
        </div>
        <div class="scoreboard-foot">TAB HOLD TO VIEW &bull; ${formatTime(game.timeLeft)} REMAINING &bull; FIRST TO ${game.matchConfig.scoreLimit}</div>`;
    }
    return `
      <div class="scoreboard-head"><span>${escapeHtml(game.mapDef.name)}</span><b>FREE FOR ALL</b><span>${formatTime(game.timeLeft)}</span></div>
      <table class="score-table">
        <thead><tr><th>#</th><th>OPERATOR</th><th>KILLS</th><th>DEATHS</th><th>STATUS</th></tr></thead>
        <tbody>${participants.map((p, i) => `
          <tr class="${p.isPlayer ? 'you' : ''}">
            <td>${i + 1}</td>
            <td><span class="team-dot team-${p.team}"></span>${escapeHtml(p.name)}${p.isPlayer ? ' <em>YOU</em>' : ''}</td>
            <td><b>${p.kills}</b></td><td>${p.deaths}</td><td>${p.alive ? 'ACTIVE' : 'DOWN'}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div class="scoreboard-foot">TAB HOLD TO VIEW &bull; ${formatTime(game.timeLeft)} REMAINING &bull; FIRST TO ${game.matchConfig.scoreLimit} KILLS</div>`;
  }

  teamTable(title, players, team) {
    return `
      <div class="score-team team-${team}">
        <h3>${title}</h3>
        <table class="score-table">
          <thead><tr><th>OPERATOR</th><th>K</th><th>D</th><th>STATUS</th></tr></thead>
          <tbody>${players.map((p) => `
            <tr class="${p.isPlayer ? 'you' : ''}">
              <td>${escapeHtml(p.name)}${p.isPlayer ? ' <em>YOU</em>' : ''}</td>
              <td>${p.kills}</td><td>${p.deaths}</td><td>${p.alive ? 'ACTIVE' : 'DOWN'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  }

  showPause(show, game) {
    $('#pause-panel').classList.toggle('hidden', !show);
    if (show && game) {
      $('#pause-subtitle').textContent = `${game.mapDef.name} • ${game.modeDef.name} • ${formatTime(game.timeLeft)}`;
    }
  }

  hidePause() {
    $('#pause-panel').classList.add('hidden');
  }

  showResults(data) {
    this.matchData = data;
    const el = $('#results-content');
    const winnerClass = data.playerWon ? 'won' : data.draw ? 'draw' : 'lost';
    const title = data.draw ? 'DRAW' : data.playerWon ? 'VICTORY' : 'DEFEAT';
    const sub = data.mode === 'tdm'
      ? data.draw
        ? `Match drawn ${data.finalScore}`
        : `${data.winnerLabel} wins ${data.finalScore}`
      : data.draw
        ? `Top score ${data.winnerScore} kills — no outright winner`
        : `${escapeHtml(data.winnerName)} wins with ${data.winnerScore} kills`;
    el.className = `modal-frame results-frame ${winnerClass}`;
    el.innerHTML = `
      <div class="modal-kicker">MATCH COMPLETE &bull; ${escapeHtml(data.mapName)}</div>
      <h2>${title}</h2>
      <p class="result-sub">${sub}</p>
      <div class="result-scoreline">
        ${data.mode === 'tdm'
          ? `<div class="team-result ct"><span>CT</span><strong>${data.scores.CT}</strong></div><div class="vs">:</div><div class="team-result t"><span>T</span><strong>${data.scores.T}</strong></div>`
          : `<div class="ffa-result"><span>YOUR PLACEMENT</span><strong>#${data.playerPlace}</strong><small>${data.playerKills} KILLS &bull; ${data.playerDeaths} DEATHS</small></div>`}
      </div>
      <div class="result-stats">
        <div><strong>${data.playerKills}</strong><span>KILLS</span></div>
        <div><strong>${data.playerDeaths}</strong><span>DEATHS</span></div>
        <div><strong>${data.playerKd}</strong><span>K/D</span></div>
        <div><strong>${data.headshots}</strong><span>HEADSHOTS</span></div>
      </div>
      <div class="result-table">${data.table}</div>
      <div class="panel-actions">
        <button data-action="main-menu">MAIN MENU</button>
        <button data-action="new-match">NEW MATCH</button>
        <button class="accent" data-action="play-again">PLAY AGAIN</button>
      </div>`;
    $('#results-panel').classList.remove('hidden');
    this.hideScoreboard();
    this.hidePause();
  }

  hideResults() {
    $('#results-panel').classList.add('hidden');
  }

  showLoading(message = 'DEPLOYING TO MATCH…') {
    this.toast(message, 900);
  }
}
