// Persistent, validated user preferences and local career statistics.

const SETTINGS_KEY = 'tacticalfps.settings.v2';
const PROFILE_KEY = 'tacticalfps.profile.v2';

export const DEFAULT_SETTINGS = Object.freeze({
  sensitivity: 1.0,
  masterVolume: 0.7,
  effectsVolume: 0.8,
  musicVolume: 0.35,
  quality: 'medium',
  resolutionScale: 1.0,
  shadows: true,
  fov: 74,
  showFps: false,
  invertY: false,
  crosshairColor: '#d9e2c4',
});

const DEFAULT_PROFILE = Object.freeze({
  name: 'Operator',
  team: 'CT',
  matches: 0,
  wins: 0,
  kills: 0,
  deaths: 0,
});

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { ...fallback };
    const parsed = JSON.parse(raw);
    return { ...fallback, ...(parsed && typeof parsed === 'object' ? parsed : {}) };
  } catch {
    return { ...fallback };
  }
}

function sanitize(settings) {
  const s = { ...DEFAULT_SETTINGS, ...settings };
  s.sensitivity = Math.min(2.5, Math.max(0.15, Number(s.sensitivity) || 1));
  s.masterVolume = Math.min(1, Math.max(0, Number(s.masterVolume) || 0));
  s.effectsVolume = Math.min(1, Math.max(0, Number(s.effectsVolume) || 0));
  s.musicVolume = Math.min(1, Math.max(0, Number(s.musicVolume) || 0));
  s.resolutionScale = Math.min(1.25, Math.max(0.6, Number(s.resolutionScale) || 1));
  s.fov = Math.min(95, Math.max(62, Number(s.fov) || 74));
  if (!['low', 'medium', 'high'].includes(s.quality)) s.quality = 'medium';
  s.shadows = Boolean(s.shadows);
  s.showFps = Boolean(s.showFps);
  s.invertY = Boolean(s.invertY);
  if (!/^#[0-9a-f]{6}$/i.test(s.crosshairColor)) s.crosshairColor = DEFAULT_SETTINGS.crosshairColor;
  return s;
}

class SettingsStore {
  constructor() {
    this.settings = sanitize(read(SETTINGS_KEY, DEFAULT_SETTINGS));
    const profile = read(PROFILE_KEY, DEFAULT_PROFILE);
    this.profile = {
      ...DEFAULT_PROFILE,
      ...profile,
      name: String(profile.name || 'Operator').slice(0, 18),
      team: profile.team === 'T' ? 'T' : 'CT',
      matches: Number(profile.matches) || 0,
      wins: Number(profile.wins) || 0,
      kills: Number(profile.kills) || 0,
      deaths: Number(profile.deaths) || 0,
    };
    this.listeners = new Set();
  }

  get(key) {
    return key ? this.settings[key] : this.settings;
  }

  update(patch) {
    this.settings = sanitize({ ...this.settings, ...patch });
    this.save();
    this.listeners.forEach((fn) => fn(this.settings));
    return this.settings;
  }

  reset() {
    this.settings = { ...DEFAULT_SETTINGS };
    this.save();
    this.listeners.forEach((fn) => fn(this.settings));
    return this.settings;
  }

  save() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings)); } catch { /* storage may be disabled */ }
  }

  onChange(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  updateProfile(patch) {
    this.profile = { ...this.profile, ...patch };
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(this.profile)); } catch { /* ignore */ }
    return this.profile;
  }

  recordMatch({ won, kills, deaths }) {
    return this.updateProfile({
      matches: this.profile.matches + 1,
      wins: this.profile.wins + (won ? 1 : 0),
      kills: this.profile.kills + kills,
      deaths: this.profile.deaths + deaths,
    });
  }

  resetProfile() {
    this.profile = { ...DEFAULT_PROFILE, name: this.profile.name };
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(this.profile)); } catch { /* ignore */ }
    return this.profile;
  }
}

export const settingsStore = new SettingsStore();
