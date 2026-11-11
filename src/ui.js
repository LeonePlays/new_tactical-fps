// DOM interface: main menu, match setup, settings, HUD, scoreboard, pause and results.
import * as THREE from 'three';
import { DEFAULT_SETTINGS, MAP_LIST, MODE_LIST, DIFFICULTY_LIST, MAPS, MODES, DIFFICULTIES, formatTime, clamp } from './config.js';
import { rayBlocked } from './physics.js';

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export class UI {
  constructor({ settings, profile }) {
    this.settings = settings;
    this.profile = profile;
    this.game = null;
    this.world = null;
    this.modalOpen = false;
    this.lastHudUpdate = 0;
    this.hintTimer = 0;
    this.respawnShown = false;
    this.killRows = [];
    this.radarCtx = $('#radar')?.getContext('2d');
    this.toastTimer = 0;
    this.announceTimer = 0;
    this.fpsFrames = 0;
    this.fpsLast = performance.now();
    this.onStart = () => {};
    this.onQuickPlay = () => {};
    this.onResume = () => {};
    this.onRestart = () => {};
    this.onExit = () => {};
    this.onPlayAgain = () => {};
    this.onChangeMatch = () => {};
    this.onSettingsChange = () => {};
    this.onProfileSave = () => {};
    this.onPreviewMap = () => {};
  }

  init() {
    this.updateMenuBriefing();
    this.updateProfileLine();
    $('#main-menu').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      this.click();
      this.handleMenuAction(btn.dataset.action);
    });
    $$('.briefing-actions button[data-action]').forEach(btn => {
      btn.addEventListener('click', () => { this.click(); this.handleMenuAction(btn.dataset.action); });
    });
    $('#modal-root').addEventListener('click', (e) => {
      if (e.target.closest('[data-modal-close]')) this.closeModal();
    });
    $('#pause-screen').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-pause]');
      if (!btn) return;
      this.click();
      const action = btn.dataset.pause;
      if (action === 'resume') this.onResume();
      else if (action === 'settings') this.openSettings(true);
      else if (action === 'restart') this.onRestart();
      else if (action === 'exit') this.onExit();
    });
    $('#result-again').addEventListener('click', () => { this.click(); this.onPlayAgain(); });
    $('#result-change').addEventListener('click', () => { this.click(); this.onChangeMatch(); });
    $('#result-menu').addEventListener('click', () => { this.click(); this.onExit(); });
    document.addEventListener('fullscreenchange', () => {
      const b = $('#fullscreen-toggle');
      if (b) b.textContent = document.fullscreenElement ? 'EXIT FULLSCREEN' : 'ENTER FULLSCREEN';
    });
  }

  click() { this.onUiSound?.(); }

  handleMenuAction(action) {
    if (action === 'quick') { this.closeModal(); this.onQuickPlay(); }
    else if (action === 'offline') this.openSetup('PLAY OFFLINE');
    else if (action === 'create') this.openSetup('CREATE GAME');
    else if (action === 'servers') this.openServers();
    else if (action === 'settings') this.openSettings(false);
    else if (action === 'profile') this.openProfile();
    else if (action === 'credits') this.openCredits();
  }

  updateMenuBriefing() {
    const map = MAPS[this.settings.mapId] || MAPS['old-quarter'];
    const mode = MODES[this.settings.modeId] || MODES.tdm;
    const preview = $('#map-preview');
    preview?.classList.toggle('industrial', map.id === 'industrial');
    $('#briefing-map-id').textContent = map.name.toUpperCase();
    $('#briefing-title').innerHTML = map.id === 'industrial' ? 'Cold steel.<br /><span>Long shadows.</span>' : 'Fine dust.<br /><span>Short fuses.</span>';
    $('#briefing-desc').textContent = map.description;
    $('#briefing-subtitle').textContent = map.subtitle;
    $('#briefing-size').textContent = map.size.toUpperCase();
    $('#briefing-mode').textContent = mode.name.toUpperCase();
    $('#briefing-skill').textContent = (this.settings.difficulty || 'Normal').toUpperCase();
  }

  updateProfileLine() {
    const line = $('#menu-profile-line');
    if (line) line.textContent = `${(this.profile.name || 'OPERATOR').toUpperCase()} · ${this.profile.matches || 0} MATCHES · ${this.profile.wins || 0} WINS`;
    const nameEl = $('#hud-player-name');
    if (nameEl) nameEl.textContent = (this.profile.name || 'OPERATOR').toUpperCase();
  }

  /* ── Modal shell ───────────────────────────────────────────────────── */
  openModal(html, onReady) {
    const root = $('#modal-root');
    const card = $('#modal-card');
    card.innerHTML = html;
    root.classList.remove('hidden');
    this.modalOpen = true;
    card.querySelectorAll('[data-modal-close]').forEach(b => b.addEventListener('click', () => this.closeModal()));
    onReady?.(card);
    // Keep focus inside the dialog for keyboard users.
    setTimeout(() => card.querySelector('button, input, select')?.focus(), 30);
  }

  closeModal() {
    $('#modal-root').classList.add('hidden');
    this.modalOpen = false;
    $('#modal-card').innerHTML = '';
  }

  modalHeader(title, subtitle) {
    return `<div class="modal-head"><div><h2>${esc(title)}</h2><p>${subtitle}</p></div><button class="modal-close" data-modal-close>CLOSE ✕</button></div>`;
  }

  /* ── Match setup ───────────────────────────────────────────────────── */
  openSetup(title = 'PLAY OFFLINE') {
    const s = this.settings;
    const state = {
      mapId: s.mapId || 'old-quarter',
      modeId: s.modeId || 'tdm',
      team: s.teamPreference || 'CT',
      bots: clamp(+(s.botCount ?? 8), 1, 15),
      difficulty: s.difficulty || 'Normal',
      scoreLimit: +(s.scoreLimit ?? 50),
      timeLimit: +(s.timeLimit ?? 300),
    };
    const build = () => {
      const mode = MODES[state.modeId] || MODES.tdm;
      const mapChoices = MAP_LIST.map(m => `
        <button data-setup-map="${m.id}" class="${state.mapId === m.id ? 'active' : ''}">
          <div class="mini-map"><i></i><i></i><i></i><i></i></div>
          <b>${esc(m.name)}</b><small>${esc(m.description)}</small>
        </button>`).join('');
      const modeChoices = MODE_LIST.map(m => `<button data-setup-mode="${m.id}" class="${state.modeId === m.id ? 'active' : ''}">${esc(m.name.toUpperCase())}</button>`).join('');
      const diffChoices = DIFFICULTY_LIST.map(d => `<button data-setup-diff="${d}" class="${state.difficulty === d ? 'active' : ''}">${esc(d.toUpperCase())}</button>`).join('');
      const teamChoices = ['CT', 'T'].map(t => `<button data-setup-team="${t}" class="${state.team === t ? 'active' : ''}">${t === 'CT' ? 'COUNTER-TERRORISTS' : 'TERRORISTS'}</button>`).join('');
      const scoreOpts = [15, 25, 50, 75].map(n => `<option value="${n}" ${state.scoreLimit === n ? 'selected' : ''}>${n} kills</option>`).join('');
      const timeOpts = [[120, '2 minutes'], [300, '5 minutes'], [600, '10 minutes']].map(([v, l]) => `<option value="${v}" ${state.timeLimit === v ? 'selected' : ''}>${l}</option>`).join('');
      return `${this.modalHeader(title, 'ALL MATCHES RUN LOCALLY AGAINST BOTS · NO ACCOUNT REQUIRED')}
        <div class="form-grid">
          <div class="field full"><label>GAME MODE</label><div class="segmented">${modeChoices}</div><div class="field-note" style="margin-top:8px">${esc(mode.description)}</div></div>
          <div class="field full"><label>MAP</label><div class="map-choice">${mapChoices}</div></div>
          <div class="field"><label>BOTS <span id="bot-count-label">${state.bots}</span></label><input id="setup-bots" type="range" min="1" max="15" step="1" value="${state.bots}" /><div class="field-note" style="border:0;padding:0">${mode.teamBased ? 'Bots are split across both teams.' : 'Every bot is an independent rival.'}</div></div>
          <div class="field"><label>BOT DIFFICULTY</label><div class="segmented">${diffChoices}</div></div>
          <div class="field"><label>TEAM PREFERENCE</label><div class="segmented">${teamChoices}</div><div class="field-note" style="border:0;padding:0">Used in Team Deathmatch.</div></div>
          <div class="field"><label>SCORE LIMIT</label><select id="setup-score">${scoreOpts}</select></div>
          <div class="field"><label>MATCH TIME</label><select id="setup-time">${timeOpts}</select></div>
          <div class="field"><label>YOUR CALLSIGN</label><input id="setup-name" value="${esc(this.profile.name || 'Operator')}" maxlength="18" /></div>
        </div>
        <div class="modal-actions"><button class="btn" data-modal-close>CANCEL</button><button class="btn primary" id="setup-start">START MATCH</button></div>`;
    };

    const attach = (card) => {
      card.querySelectorAll('[data-setup-map]').forEach(b => b.addEventListener('click', () => {
        state.mapId = b.dataset.setupMap;
        card.querySelectorAll('[data-setup-map]').forEach(x => x.classList.toggle('active', x === b));
        this.onPreviewMap(state.mapId);
      }));
      card.querySelectorAll('[data-setup-mode]').forEach(b => b.addEventListener('click', () => {
        state.modeId = b.dataset.setupMode;
        this.refreshSetup(card, state, build);
      }));
      card.querySelectorAll('[data-setup-diff]').forEach(b => b.addEventListener('click', () => {
        state.difficulty = b.dataset.setupDiff;
        card.querySelectorAll('[data-setup-diff]').forEach(x => x.classList.toggle('active', x === b));
      }));
      card.querySelectorAll('[data-setup-team]').forEach(b => b.addEventListener('click', () => {
        state.team = b.dataset.setupTeam;
        card.querySelectorAll('[data-setup-team]').forEach(x => x.classList.toggle('active', x === b));
      }));
      const bots = $('#setup-bots', card);
      bots?.addEventListener('input', () => { state.bots = +bots.value; $('#bot-count-label', card).textContent = bots.value; });
      $('#setup-score', card)?.addEventListener('change', (e) => { state.scoreLimit = +e.target.value; });
      $('#setup-time', card)?.addEventListener('change', (e) => { state.timeLimit = +e.target.value; });
      $('#setup-start', card)?.addEventListener('click', () => {
        this.click();
        const name = ($('#setup-name', card)?.value || 'Operator').trim().slice(0, 18) || 'Operator';
        this.onProfileSave({ ...this.profile, name });
        this.profile.name = name;
        this.settings.name = name;
        this.settings.mapId = state.mapId;
        this.settings.modeId = state.modeId;
        this.settings.teamPreference = state.team;
        this.settings.botCount = state.bots;
        this.settings.difficulty = state.difficulty;
        this.settings.scoreLimit = state.scoreLimit;
        this.settings.timeLimit = state.timeLimit;
        this.onSettingsChange(this.settings, { save: true });
        this.closeModal();
        this.onStart({
          mapId: state.mapId,
          modeId: state.modeId,
          team: state.team,
          botCount: state.bots,
          difficulty: state.difficulty,
          scoreLimit: state.scoreLimit,
          timeLimit: state.timeLimit,
          playerName: name,
        });
      });
    };

    this.openModal(build(), attach);
  }

  refreshSetup(card, state, build) {
    const scroll = $('.modal-card')?.scrollTop || 0;
    card.innerHTML = build();
    card.querySelectorAll('[data-modal-close]').forEach(b => b.addEventListener('click', () => this.closeModal()));
    this.attachSetup(card, state, build);
    card.scrollTop = scroll;
  }

  // Re-attach after a re-render. Kept separate from the closure above.
  attachSetup(card, state, build) {
    card.querySelectorAll('[data-setup-map]').forEach(b => b.addEventListener('click', () => {
      state.mapId = b.dataset.setupMap;
      card.querySelectorAll('[data-setup-map]').forEach(x => x.classList.toggle('active', x === b));
      this.onPreviewMap(state.mapId);
    }));
    card.querySelectorAll('[data-setup-mode]').forEach(b => b.addEventListener('click', () => {
      state.modeId = b.dataset.setupMode;
      this.refreshSetup(card, state, build);
    }));
    card.querySelectorAll('[data-setup-diff]').forEach(b => b.addEventListener('click', () => {
      state.difficulty = b.dataset.setupDiff;
      card.querySelectorAll('[data-setup-diff]').forEach(x => x.classList.toggle('active', x === b));
    }));
    card.querySelectorAll('[data-setup-team]').forEach(b => b.addEventListener('click', () => {
      state.team = b.dataset.setupTeam;
      card.querySelectorAll('[data-setup-team]').forEach(x => x.classList.toggle('active', x === b));
    }));
    const bots = $('#setup-bots', card);
    bots?.addEventListener('input', () => { state.bots = +bots.value; $('#bot-count-label', card).textContent = bots.value; });
    $('#setup-score', card)?.addEventListener('change', (e) => { state.scoreLimit = +e.target.value; });
    $('#setup-time', card)?.addEventListener('change', (e) => { state.timeLimit = +e.target.value; });
    $('#setup-start', card)?.addEventListener('click', () => {
      this.click();
      const name = ($('#setup-name', card)?.value || 'Operator').trim().slice(0, 18) || 'Operator';
      this.profile.name = name;
      this.settings.name = name;
      this.settings.mapId = state.mapId;
      this.settings.modeId = state.modeId;
      this.settings.teamPreference = state.team;
      this.settings.botCount = state.bots;
      this.settings.difficulty = state.difficulty;
      this.settings.scoreLimit = state.scoreLimit;
      this.settings.timeLimit = state.timeLimit;
      this.onProfileSave(this.profile);
      this.onSettingsChange(this.settings, { save: true });
      this.closeModal();
      this.onStart({
        mapId: state.mapId, modeId: state.modeId, team: state.team, botCount: state.bots,
        difficulty: state.difficulty, scoreLimit: state.scoreLimit, timeLimit: state.timeLimit, playerName: name,
      });
    });
  }

  /* ── Settings ──────────────────────────────────────────────────────── */
  openSettings(fromPause = false) {
    const s = { ...this.settings };
    const mk = () => `${this.modalHeader('SETTINGS', 'CHANGES ARE SAVED ON THIS DEVICE')}
      <div class="settings-tabs"><button class="active" data-tab="controls">CONTROLS</button><button data-tab="audio">AUDIO</button><button data-tab="video">VIDEO</button><button data-tab="game">GAME</button></div>
      <div class="settings-section active" data-section="controls">
        <div class="form-grid">
          <label class="field full">MOUSE SENSITIVITY<div class="range-row"><input id="set-sens" type="range" min="0.2" max="2.6" step="0.05" value="${s.sensitivity}" /><output id="out-sens">${(+s.sensitivity).toFixed(2)}</output></div></label>
          <label class="field full">FIELD OF VIEW<div class="range-row"><input id="set-fov" type="range" min="65" max="100" step="1" value="${s.fov}" /><output id="out-fov">${s.fov}°</output></div></label>
          <label class="field full"><span class="toggle-row"><input id="set-invert" type="checkbox" ${s.invertY ? 'checked' : ''}/> INVERT VERTICAL LOOK</span></label>
          <div class="field-note">WASD move · Shift walk · Ctrl crouch · Space jump · LMB fire · RMB aim · R reload · 1/2 or wheel switch · Tab scores · Esc pause.</div>
        </div>
      </div>
      <div class="settings-section" data-section="audio">
        <div class="form-grid">
          <label class="field full">MASTER VOLUME<div class="range-row"><input id="set-master" type="range" min="0" max="1" step="0.05" value="${s.masterVolume}" /><output id="out-master">${Math.round(s.masterVolume * 100)}%</output></div></label>
          <label class="field full">MUSIC & AMBIENCE<div class="range-row"><input id="set-music" type="range" min="0" max="1" step="0.05" value="${s.musicVolume}" /><output id="out-music">${Math.round(s.musicVolume * 100)}%</output></div></label>
          <label class="field full">WEAPONS & EFFECTS<div class="range-row"><input id="set-sfx" type="range" min="0" max="1" step="0.05" value="${s.sfxVolume}" /><output id="out-sfx">${Math.round(s.sfxVolume * 100)}%</output></div></label>
          <div class="field-note">Audio is synthesized in the browser. Browsers require one click before sound can start.</div>
        </div>
      </div>
      <div class="settings-section" data-section="video">
        <div class="form-grid">
          <label class="field">GRAPHICS QUALITY<select id="set-quality"><option value="low">Performance</option><option value="medium">Balanced</option><option value="high">High</option></select></label>
          <label class="field">SHADOWS<select id="set-shadows"><option value="off">Off</option><option value="low">Low</option><option value="high">High</option></select></label>
          <label class="field full">RENDER SCALE<div class="range-row"><input id="set-scale" type="range" min="0.5" max="1" step="0.05" value="${s.renderScale}" /><output id="out-scale">${Math.round(s.renderScale * 100)}%</output></div></label>
          <div class="field"><label>DISPLAY</label><button class="btn" id="fullscreen-toggle">${document.fullscreenElement ? 'EXIT FULLSCREEN' : 'ENTER FULLSCREEN'}</button></div>
          <label class="field"><span class="toggle-row"><input id="set-fps" type="checkbox" ${s.showFps ? 'checked' : ''}/> SHOW FRAME RATE</span></label>
          <div class="field-note">Lower render scale and quality improve performance on integrated graphics. Resolution scaling affects the 3D renderer immediately.</div>
        </div>
      </div>
      <div class="settings-section" data-section="game">
        <div class="form-grid">
          <label class="field full">CROSSHAIR COLOR<div class="range-row"><input id="set-crosshair" type="color" value="${s.crosshairColor}" style="height:32px;padding:2px;width:90px;flex:0 0 90px" /><span style="font-size:9px;color:#8e8a7c">High-contrast default: pale green</span></div></label>
          <label class="field">BOT DIFFICULTY<select id="set-difficulty">${DIFFICULTY_LIST.map(d => `<option ${s.difficulty === d ? 'selected' : ''}>${d}</option>`).join('')}</select></label>
          <label class="field">DEFAULT BOTS<select id="set-bots">${[2, 4, 6, 8, 10, 12, 15].map(n => `<option ${s.botCount === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
          <div class="field-note">Preferences are stored in this browser's local storage and restored on the next visit.</div>
        </div>
      </div>
      <div class="modal-actions"><button class="btn" id="settings-reset">RESTORE DEFAULTS</button><button class="btn" data-modal-close>CANCEL</button><button class="btn primary" id="settings-save">APPLY SETTINGS</button></div>`;

    this.openModal(mk(), (card) => {
      $('#set-quality', card).value = s.quality;
      $('#set-shadows', card).value = s.shadows;
      $$('.settings-tabs button', card).forEach(b => b.addEventListener('click', () => {
        $$('.settings-tabs button', card).forEach(x => x.classList.toggle('active', x === b));
        $$('.settings-section', card).forEach(x => x.classList.toggle('active', x.dataset.section === b.dataset.tab));
      }));
      const updateOut = (id, out, fmt) => {
        const el = $(id, card); const o = $(out, card);
        el?.addEventListener('input', () => { o.textContent = fmt(el.value); });
      };
      updateOut('#set-sens', '#out-sens', v => (+v).toFixed(2));
      updateOut('#set-fov', '#out-fov', v => `${v}°`);
      updateOut('#set-master', '#out-master', v => `${Math.round(v * 100)}%`);
      updateOut('#set-music', '#out-music', v => `${Math.round(v * 100)}%`);
      updateOut('#set-sfx', '#out-sfx', v => `${Math.round(v * 100)}%`);
      updateOut('#set-scale', '#out-scale', v => `${Math.round(v * 100)}%`);
      $('#fullscreen-toggle', card).addEventListener('click', () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch?.(() => {});
        else document.exitFullscreen?.();
      });
      $('#settings-reset', card).addEventListener('click', () => {
        // Apply the defaults to the live settings object, not just the modal copy,
        // then persist and rebuild the dialog with the restored values.
        Object.assign(this.settings, DEFAULT_SETTINGS, {
          name: this.profile.name,
          teamPreference: this.settings.teamPreference,
        });
        this.onSettingsChange(this.settings, { save: true });
        this.applyCrosshair();
        this.closeModal();
        this.openSettings(fromPause);
        this.toast('DEFAULTS RESTORED');
      });
      $('#settings-save', card).addEventListener('click', () => {
        this.click();
        s.sensitivity = +$('#set-sens', card).value;
        s.fov = +$('#set-fov', card).value;
        s.invertY = $('#set-invert', card).checked;
        s.masterVolume = +$('#set-master', card).value;
        s.musicVolume = +$('#set-music', card).value;
        s.sfxVolume = +$('#set-sfx', card).value;
        s.quality = $('#set-quality', card).value;
        s.shadows = $('#set-shadows', card).value;
        s.renderScale = +$('#set-scale', card).value;
        s.showFps = $('#set-fps', card).checked;
        s.crosshairColor = $('#set-crosshair', card).value;
        s.difficulty = $('#set-difficulty', card).value;
        s.botCount = +$('#set-bots', card).value;
        Object.assign(this.settings, s);
        this.onSettingsChange(this.settings, { save: true });
        this.applyCrosshair();
        this.closeModal();
        this.toast('SETTINGS SAVED');
      });
    });
    // Restore quality/shadow values to selects after modal DOM is live.
    setTimeout(() => {
      const q = $('#set-quality'); if (q) q.value = s.quality;
      const sh = $('#set-shadows'); if (sh) sh.value = s.shadows;
    }, 0);
  }

  applyCrosshair() {
    const ch = $('#crosshair');
    if (ch) ch.style.setProperty('--ch', this.settings.crosshairColor || '#dfe7d3');
    $('#fps-counter')?.classList.toggle('hidden', !this.settings.showFps);
  }

  /* ── Profile / servers / credits ───────────────────────────────────── */
  openProfile() {
    const p = this.profile;
    const kd = p.deaths ? (p.kills / p.deaths).toFixed(2) : (p.kills || 0).toFixed(2);
    const winRate = p.matches ? Math.round((p.wins / p.matches) * 100) : 0;
    this.openModal(`${this.modalHeader('PLAYER PROFILE', 'LOCAL SERVICE RECORD')}
      <div class="form-grid">
        <label class="field full">CALLSIGN<input id="profile-name" maxlength="18" value="${esc(p.name || 'Operator')}" /></label>
        <label class="field">PREFERRED TEAM<select id="profile-team"><option value="CT" ${this.settings.teamPreference === 'CT' ? 'selected' : ''}>Counter-Terrorists</option><option value="T" ${this.settings.teamPreference === 'T' ? 'selected' : ''}>Terrorists</option></select></label>
        <div class="field">WIN RATE<div style="padding:9px;color:#d4bd7f">${winRate}% <span style="color:#89836e">· ${p.wins || 0}W / ${Math.max(0, (p.matches || 0) - (p.wins || 0))}L</span></div></div>
        <div class="field">KILLS / DEATHS<div style="padding:9px;color:#d4bd7f">${p.kills || 0} / ${p.deaths || 0} <span style="color:#89836e">· K/D ${kd}</span></div></div>
        <div class="field">BEST STREAK<div style="padding:9px;color:#d4bd7f">${p.bestStreak || 0}</div></div>
        <div class="field full field-note">The profile and all settings are stored locally. No account, telemetry or external service is used.</div>
      </div>
      <div class="modal-actions"><button class="btn" data-modal-close>CANCEL</button><button class="btn primary" id="profile-save">SAVE PROFILE</button></div>`, (card) => {
      $('#profile-save', card).addEventListener('click', () => {
        this.click();
        const name = ($('#profile-name', card).value || 'Operator').trim().slice(0, 18) || 'Operator';
        this.profile.name = name;
        this.settings.name = name;
        this.settings.teamPreference = $('#profile-team', card).value;
        this.onProfileSave(this.profile);
        this.onSettingsChange(this.settings, { save: true });
        this.updateProfileLine();
        this.toast('PROFILE SAVED');
        this.closeModal();
      });
    });
  }

  openServers() {
    this.openModal(`${this.modalHeader('FIND SERVERS', 'NETWORK STATUS')}
      <div class="server-status">
        <div class="status-line"><i></i> NO ONLINE SERVICE IN THIS BUILD</div>
        <p>This repository ships as a complete offline game. The server browser is intentionally not populated with simulated servers or fake players. A real online backend is not bundled, so online matchmaking is unavailable here.</p>
        <p>Everything needed for a complete match — maps, bots, scoring, settings and results — runs locally in your browser.</p>
        <code>Offline mode: available · Online matchmaking: unavailable · Local bot matches: fully operational</code>
      </div>
      <div class="modal-actions"><button class="btn" id="servers-refresh">CHECK AGAIN</button><button class="btn primary" data-action-local="offline">PLAY OFFLINE</button></div>`, (card) => {
      $('#servers-refresh', card).addEventListener('click', () => this.toast('OFFLINE BUILD — NO LIVE SERVERS AVAILABLE'));
      $('[data-action-local="offline"]', card).addEventListener('click', () => { this.closeModal(); this.openSetup('PLAY OFFLINE'); });
    });
  }

  openCredits() {
    this.openModal(`${this.modalHeader('CREDITS', 'ORIGINAL CONTENT · CLASSIC INSPIRATION')}
      <div class="credit-list">
        <div class="credit-row"><b>GAME DESIGN / CODE</b><span>TACTICAL FPS development team. All gameplay systems implemented for this project.</span></div>
        <div class="credit-row"><b>ENGINE</b><span>Three.js (MIT license) — WebGL rendering, geometry and scene graph.</span></div>
        <div class="credit-row"><b>BUILD TOOLING</b><span>Vite (MIT license), Node.js.</span></div>
        <div class="credit-row"><b>ART &amp; AUDIO</b><span>100% original procedural content generated at runtime: canvas textures, low-poly models, synthesized audio. No Counter-Strike, Combat Online or other copyrighted game assets, maps, models, sounds or textures are included.</span></div>
        <div class="credit-row"><b>INSPIRATION</b><span>Classic 2000s tactical shooters and browser FPS games. This is an original tribute, not a clone using extracted content.</span></div>
        <div class="credit-row"><b>BUILD</b><span>v2.0 — offline-first, modular Three.js/Vite build.</span></div>
      </div>
      <div class="modal-actions"><button class="btn primary" data-modal-close>CLOSE</button></div>`);
  }

  /* ── Match lifecycle UI ────────────────────────────────────────────── */
  showMatch(config) {
    $('#menu-screen').classList.remove('visible');
    $('#modal-root').classList.add('hidden');
    this.modalOpen = false;
    $('#hud').classList.remove('hidden');
    $('#pause-screen').classList.add('hidden');
    $('#results-screen').classList.add('hidden');
    $('#pointer-hint').classList.remove('hidden');
    $('#hint-bar').classList.remove('fade');
    this.hintTimer = 0;
    this.respawnShown = false;
    $('#respawn-overlay').classList.add('hidden');
    this.killRows.forEach(r => r.element?.remove());
    this.killRows = [];
    $('#hud-player-name').textContent = (this.profile.name || 'OPERATOR').toUpperCase();
    $('#radar-map').textContent = (MAPS[config.mapId]?.name || 'MAP').toUpperCase();
    this.applyCrosshair();
  }

  showMenu() {
    $('#hud').classList.add('hidden');
    $('#pause-screen').classList.add('hidden');
    $('#results-screen').classList.add('hidden');
    $('#menu-screen').classList.add('visible');
    $('#modal-root').classList.add('hidden');
    this.modalOpen = false;
    this.updateMenuBriefing();
    this.updateProfileLine();
  }

  showPause(config) {
    $('#pause-screen').classList.remove('hidden');
    const map = MAPS[config?.mapId]?.name || 'OLD QUARTER';
    const mode = MODES[config?.modeId]?.name || 'TEAM DEATHMATCH';
    $('#pause-subtitle').textContent = `${map.toUpperCase()} · ${mode.toUpperCase()}`;
  }

  hidePause() { $('#pause-screen').classList.add('hidden'); }

  showResults(result) {
    $('#results-screen').classList.remove('hidden');
    $('#pause-screen').classList.add('hidden');
    $('#hud').classList.add('hidden');
    document.exitPointerLock?.();
    const title = result.draw ? 'DRAW' : result.playerWon ? 'VICTORY' : 'DEFEAT';
    const titleEl = $('#results-title');
    titleEl.textContent = title;
    titleEl.className = result.draw ? 'draw' : result.playerWon ? '' : 'loss';
    $('#results-kicker').textContent = result.draw ? 'MATCH COMPLETE' : result.playerWon ? 'MISSION ACCOMPLISHED' : 'MISSION FAILED';
    $('#results-subtitle').textContent = `${(MAPS[result.mapId]?.name || 'OLD QUARTER').toUpperCase()} · ${result.mode.name.toUpperCase()} · ${result.reason}`;
    $('#results-score').textContent = result.mode.teamBased
      ? `CT ${result.teamScores.CT} : ${result.teamScores.T} T`
      : `YOUR SCORE ${result.playerScore}`;
    const rows = result.rows.map((r, i) => `<tr class="${r.isPlayer ? 'me' : ''}"><td class="${r.team === 'CT' ? 'ct' : r.team === 'T' ? 't' : ''}">${result.mode.teamBased ? esc(r.team) : `#${i + 1}`}</td><td>${esc(r.name)}</td><td class="num">${r.score}</td><td class="num">${r.kills}</td><td class="num">${r.deaths}</td></tr>`).join('');
    $('#results-table').innerHTML = `<table><thead><tr><th>${result.mode.teamBased ? 'TEAM' : 'RANK'}</th><th>OPERATOR</th><th class="num">SCORE</th><th class="num">K</th><th class="num">D</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  hideResults() { $('#results-screen').classList.add('hidden'); }

  /* ── HUD ───────────────────────────────────────────────────────────── */
  updateHUD(game, dt) {
    if (!game || !game.player) return;
    const p = game.player;
    const mode = game.mode;
    const now = performance.now();
    this.game = game;
    this.world = game.world;
    if (now - this.lastHudUpdate < 90) {
      this.updateFps(now);
      return;
    }
    this.lastHudUpdate = now;

    $('#health-value').textContent = Math.ceil(p.health);
    $('#armor-value').textContent = Math.ceil(p.armor);
    $('#health-bar').style.width = `${clamp(p.health, 0, 100)}%`;
    $('#armor-bar').style.width = `${clamp(p.armor, 0, 100)}%`;
    $('#health-value').style.color = p.health < 30 ? '#d4836a' : '';
    $('#ammo-value').textContent = p.ammo;
    $('#reserve-value').textContent = p.reserve;
    $('#weapon-name').textContent = p.weapon.name;
    $('#weapon-kind').textContent = p.weapon.slot === 'PRIMARY' ? 'ASSAULT RIFLE' : 'SIDEARM';
    $('#weapon-slot').textContent = p.weapon.slot;
    $('#mode-name').textContent = mode.name.toUpperCase();
    $('#match-clock').textContent = formatTime(game.timeRemaining);
    $('#match-clock').style.color = game.timeRemaining < 30 ? '#d8896f' : '';
    $('#radar-map').textContent = (MAPS[game.config?.mapId]?.name || 'MAP').toUpperCase();
    $('#hud-player-team').textContent = `${mode.teamBased ? game.playerTeam : 'FFA'} · ${game.difficulty.toUpperCase()}`;
    $('#hud-player-name').textContent = (this.profile.name || p.displayName || 'OPERATOR').toUpperCase();

    if (mode.teamBased) {
      $('#score-ct').textContent = game.teamScores.CT;
      $('#score-t').textContent = game.teamScores.T;
      $('#hud-team-ct .team-label').textContent = 'CT';
      $('#hud-team-t .team-label').textContent = 'T';
      $('#objective-line').textContent = `FIRST TO ${game.scoreLimit} ELIMINATIONS`;
    } else {
      const board = game.scoreboard();
      const leader = board[0];
      const rivalScore = game.bots.reduce((top, b) => Math.max(top, b.score || 0), 0);
      $('#score-ct').textContent = p.score || 0;
      $('#score-t').textContent = rivalScore;
      $('#hud-team-ct .team-label').textContent = 'YOU';
      $('#hud-team-t .team-label').textContent = 'RIVAL';
      $('#objective-line').textContent = `FIRST TO ${game.scoreLimit} KILLS · ${leader ? leader.name.toUpperCase() : 'NO SCORE'} LEADS`;
    }

    const reloadLine = $('#reload-line');
    if (p.reloading) {
      reloadLine.classList.add('show');
      reloadLine.style.setProperty('--reload', `${p.weapon.reloadTime}s`);
    } else reloadLine.classList.remove('show');

    if (!p.alive) {
      if (!this.respawnShown) {
        this.respawnShown = true;
        $('#respawn-overlay').classList.remove('hidden');
      }
      $('#respawn-clock').textContent = Math.max(0, p.respawnTimer).toFixed(1);
    } else if (this.respawnShown) {
      this.respawnShown = false;
      $('#respawn-overlay').classList.add('hidden');
    }

    if (p.streak >= 2) {
      $('#streak-line').textContent = `${p.streak} KILL STREAK`;
      $('#streak-line').classList.add('show');
    } else $('#streak-line').classList.remove('show');

    this.hintTimer += dt || 0;
    if (this.hintTimer > 14) $('#hint-bar').classList.add('fade');
    this.updateFps(now);
    this.updateRadar(game);
  }

  updateFps(now = performance.now()) {
    this.fpsFrames++;
    if (now - this.fpsLast > 500) {
      const fps = Math.round((this.fpsFrames * 1000) / (now - this.fpsLast));
      this.fpsFrames = 0; this.fpsLast = now;
      const el = $('#fps-counter');
      el.classList.toggle('hidden', !this.settings.showFps);
      if (this.settings.showFps) $('b', el).textContent = fps;
    }
  }

  updateRadar(game) {
    const ctx = this.radarCtx;
    if (!ctx || !game?.world) return;
    const canvas = $('#radar');
    const w = canvas.width, h = canvas.height;
    const world = game.world;
    const b = world.bounds;
    const sx = w / (b.maxX - b.minX), sz = h / (b.maxZ - b.minZ);
    const toX = (x) => (x - b.minX) * sx;
    const toZ = (z) => (z - b.minZ) * sz;
    ctx.clearRect(0, 0, w, h);
    // Map footprint.
    if (world.radarTexture) ctx.drawImage(world.radarTexture, 0, 0, w, h);
    ctx.fillStyle = 'rgba(7, 15, 12, 0.36)'; ctx.fillRect(0, 0, w, h);
    // Radar rings and sweep.
    ctx.strokeStyle = 'rgba(189, 201, 176, 0.18)'; ctx.lineWidth = 1;
    for (const r of [w * 0.2, w * 0.34, w * 0.48]) { ctx.beginPath(); ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(189, 201, 176, 0.11)';
    ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();

    const p = game.player;
    const pv = p.eyePosition();
    for (const bot of game.bots) {
      if (!bot.alive) continue;
      const ally = game.mode.teamBased && bot.team === game.playerTeam;
      if (!ally) {
        // Only reveal enemies the player currently has line of sight to.
        const visible = Math.hypot(bot.pos.x - p.pos.x, bot.pos.z - p.pos.z) < 42 && !rayBlocked(world, pv, new THREE.Vector3(bot.pos.x, bot.pos.y + 1.25, bot.pos.z), 0.1);
        if (!visible) continue;
      }
      const x = toX(bot.pos.x), y = toZ(bot.pos.z);
      ctx.beginPath();
      ctx.fillStyle = ally ? '#79a9ba' : '#d3795d';
      ctx.arc(x, y, 3.1, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1; ctx.stroke();
    }
    // Player arrow.
    const px = toX(p.pos.x), py = toZ(p.pos.z);
    ctx.save();
    ctx.translate(px, py);
    // yaw forward in world is (-sin, -cos); canvas is x/z.
    ctx.rotate(-p.yaw + Math.PI);
    ctx.fillStyle = '#f0dfa9';
    ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(4.8, 5); ctx.lineTo(0, 2.5); ctx.lineTo(-4.8, 5); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#1a1a13'; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
  }

  killFeed(data) {
    if (!data) return;
    const feed = $('#kill-feed');
    const row = document.createElement('div');
    row.className = `kill-row ${data.playerKill || data.playerDeath ? 'player' : ''}`;
    row.innerHTML = `<span class="k ${data.killerTeam === 'CT' ? 'ct' : data.killerTeam === 'T' ? 't' : ''}">${esc(data.killer)}</span><span class="wpn">[${esc(data.weapon)}${data.headshot ? ' · HS' : ''}]</span><span class="v ${data.victimTeam === 'CT' ? 'ct' : data.victimTeam === 'T' ? 't' : ''}">${esc(data.victim)}</span>`;
    feed.prepend(row);
    this.killRows.push({ element: row, time: performance.now() });
    while (this.killRows.length > 6) {
      const old = this.killRows.shift();
      old.element.remove();
    }
    setTimeout(() => { row.remove(); this.killRows = this.killRows.filter(r => r.element !== row); }, 5200);
  }

  announce(text, sub = '', duration = 1900) {
    const el = $('#announcer');
    el.innerHTML = `${esc(text)}${sub ? `<small>${esc(sub)}</small>` : ''}`;
    el.classList.add('show');
    clearTimeout(this.announceTimer);
    this.announceTimer = setTimeout(() => el.classList.remove('show'), duration);
  }

  hitmarker(head = false) {
    const el = $('#hitmarker');
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.toggle('head', head);
    el.classList.add('show');
  }

  damage(direction, playerYaw) {
    const vig = $('#damage-vignette');
    vig.classList.add('show');
    clearTimeout(this.damageTimer);
    this.damageTimer = setTimeout(() => vig.classList.remove('show'), 260);
    if (!direction) return;
    const angle = Math.atan2(direction.x, direction.z);
    // Relative angle between source and the player's facing direction.
    const facing = Math.atan2(-Math.sin(playerYaw), -Math.cos(playerYaw));
    let rel = angle - facing;
    while (rel > Math.PI) rel -= Math.PI * 2;
    while (rel < -Math.PI) rel += Math.PI * 2;
    const a = Math.abs(rel);
    let arc = 'front';
    if (a > Math.PI * 0.25 && a <= Math.PI * 0.75) arc = rel > 0 ? 'right' : 'left';
    else if (a > Math.PI * 0.75) arc = 'back';
    const el = $(`[data-arc="${arc}"]`);
    if (el) {
      el.classList.add('show');
      setTimeout(() => el.classList.remove('show'), 260);
    }
  }

  showScoreboard(game) {
    if (!game || game.state === 'idle') return;
    const el = $('#scoreboard');
    const rows = game.scoreboard();
    const mode = game.mode;
    const header = mode.teamBased
      ? `<h3>${(MAPS[game.config?.mapId]?.name || 'MAP').toUpperCase()} <span>CT ${game.teamScores.CT} : ${game.teamScores.T} T · FIRST TO ${game.scoreLimit}</span></h3>`
      : `<h3>${(MAPS[game.config?.mapId]?.name || 'MAP').toUpperCase()} <span>FREE FOR ALL · FIRST TO ${game.scoreLimit}</span></h3>`;
    const table = `<table><thead><tr><th>${mode.teamBased ? 'TEAM' : 'RANK'}</th><th>OPERATOR</th><th>STATUS</th><th class="num">SCORE</th><th class="num">K</th><th class="num">D</th></tr></thead><tbody>${rows.map((r, i) => `<tr class="${r.isPlayer ? 'me' : ''}"><td class="${r.team === 'CT' ? 'ct' : r.team === 'T' ? 't' : ''}">${mode.teamBased ? esc(r.team) : `#${i + 1}`}</td><td>${esc(r.name)}${r.isPlayer ? ' ◂' : ''}</td><td>${esc(r.state)}</td><td class="num">${r.score}</td><td class="num">${r.kills}</td><td class="num">${r.deaths}</td></tr>`).join('')}</tbody></table>`;
    el.innerHTML = header + table;
    el.classList.remove('hidden');
  }

  hideScoreboard() { $('#scoreboard').classList.add('hidden'); }

  setPointerHint(visible) { $('#pointer-hint').classList.toggle('hidden', !visible); }

  toast(text, duration = 2600) {
    const el = $('#toast');
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => el.classList.remove('show'), duration);
  }

  showLoading(show) { $('#loading').classList.toggle('hidden', !show); }
}
