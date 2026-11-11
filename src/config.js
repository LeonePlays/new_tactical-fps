// Central game configuration. All tunables live here so systems stay consistent.

export const STORAGE_KEY = 'tacticalfps.settings.v2';
export const PROFILE_KEY = 'tacticalfps.profile.v2';

export const DEFAULT_SETTINGS = Object.freeze({
  name: 'Operator',
  sensitivity: 1.0,
  invertY: false,
  fov: 76,
  masterVolume: 0.8,
  musicVolume: 0.35,
  sfxVolume: 0.85,
  quality: 'high',          // low | medium | high
  renderScale: 1.0,         // 0.5 .. 1.0
  shadows: 'high',          // off | low | high
  showFps: false,
  crosshairColor: '#dfe7d3',
  teamPreference: 'CT',
  difficulty: 'Normal',
  botCount: 8,
  mapId: 'old-quarter',
  modeId: 'tdm',
  scoreLimit: 50,
  timeLimit: 300,
});

export const QUALITY_PRESETS = {
  low:    { pixelRatio: 1.0, shadowMap: 0,    anisotropy: 2, fogNear: 30, fogFar: 85,  particles: 80 },
  medium: { pixelRatio: 1.25, shadowMap: 1024, anisotropy: 4, fogNear: 40, fogFar: 110, particles: 160 },
  high:   { pixelRatio: 1.6, shadowMap: 2048, anisotropy: 8, fogNear: 48, fogFar: 145, particles: 260 },
};

export const DIFFICULTIES = {
  Easy: {
    label: 'Easy',
    sight: 26,
    fov: 115,
    reaction: [0.55, 0.95],
    aimError: 0.15,
    turnSpeed: 2.6,
    accuracy: 0.44,
    fireDelay: [0.5, 0.85],
    damage: 8,
    burst: [2, 4],
    health: 90,
    strafe: 0.16,
  },
  Normal: {
    label: 'Normal',
    sight: 38,
    fov: 140,
    reaction: [0.3, 0.52],
    aimError: 0.085,
    turnSpeed: 4.6,
    accuracy: 0.63,
    fireDelay: [0.33, 0.55],
    damage: 11,
    burst: [3, 6],
    health: 100,
    strafe: 0.32,
  },
  Hard: {
    label: 'Hard',
    sight: 50,
    fov: 155,
    reaction: [0.16, 0.30],
    aimError: 0.045,
    turnSpeed: 7.2,
    accuracy: 0.79,
    fireDelay: [0.20, 0.34],
    damage: 14,
    burst: [4, 8],
    health: 100,
    strafe: 0.46,
  },
};

export const MODES = {
  tdm: {
    id: 'tdm',
    name: 'Team Deathmatch',
    short: 'TDM',
    teamBased: true,
    description: 'Two teams fight for map control. First team to the score limit wins. Respawning is automatic.',
  },
  ffa: {
    id: 'ffa',
    name: 'Free For All',
    short: 'FFA',
    teamBased: false,
    description: 'Every operator fights for themselves. Highest individual score when the limit or timer is reached wins.',
  },
};

export const MAPS = {
  'old-quarter': {
    id: 'old-quarter',
    name: 'Old Quarter',
    subtitle: 'Mediterranean old town',
    size: '72 × 72 m',
    description: 'Sun-bleached facades, a central fountain plaza and tight flanking alleys. Balanced for close-range duels.',
    palette: ['#b9a77e', '#8a6a4c', '#5b4a38'],
  },
  industrial: {
    id: 'industrial',
    name: 'Industrial Complex',
    subtitle: 'Freight yard and foundry',
    size: '80 × 70 m',
    description: 'Loading docks, container stacks and two enterable warehouses. Long sightlines broken by heavy machinery.',
    palette: ['#6c7780', '#4e5658', '#3d4140'],
  },
};

export const MODE_LIST = Object.values(MODES);
export const MAP_LIST = Object.values(MAPS);
export const DIFFICULTY_LIST = Object.keys(DIFFICULTIES);

export const WEAPONS = {
  rifle: {
    id: 'rifle',
    name: 'CV-47',
    slot: 'PRIMARY',
    damage: 28,
    headshot: 2.15,
    magSize: 30,
    reserve: 120,
    fireInterval: 0.105,
    reloadTime: 2.15,
    spread: 0.019,
    aimSpread: 0.006,
    recoil: 0.011,
    range: 120,
    auto: true,
    sound: 'rifle',
  },
  pistol: {
    id: 'pistol',
    name: 'P-9',
    slot: 'SIDEARM',
    damage: 24,
    headshot: 2.3,
    magSize: 12,
    reserve: 48,
    fireInterval: 0.16,
    reloadTime: 1.35,
    spread: 0.014,
    aimSpread: 0.004,
    recoil: 0.009,
    range: 90,
    auto: false,
    sound: 'pistol',
  },
};

export const PLAYER = {
  radius: 0.34,
  standHeight: 1.72,
  crouchHeight: 1.12,
  standSpeed: 5.3,
  crouchSpeed: 2.2,
  walkSpeed: 2.55,
  aimSpeed: 2.8,
  accel: 12,
  airAccel: 2.2,
  friction: 9,
  jumpSpeed: 5.35,
  gravity: 18.5,
  stepHeight: 0.42,
  eyeStand: 1.66,
  eyeCrouch: 1.12,
  respawnDelay: 3.2,
};

export const BOT_NAMES = [
  'Viper', 'Sasha', 'Maverick', 'Ghost', 'Rook', 'Kestrel', 'Bishop', 'Wraith',
  'Nomad', 'Hawk', 'Sable', 'Ranger', 'Fox', 'Mako', 'Cinder', 'Atlas',
  'Vandal', 'Echo', 'Grim', 'Moth', 'Talon', 'Brick', 'Cobalt', 'Dagger',
];

export function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { ...DEFAULT_SETTINGS, ...saved };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch { /* storage unavailable */ }
}

export function loadProfile() {
  try {
    return {
      name: 'Operator',
      matches: 0,
      wins: 0,
      kills: 0,
      deaths: 0,
      bestStreak: 0,
      ...JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}'),
    };
  } catch {
    return { name: 'Operator', matches: 0, wins: 0, kills: 0, deaths: 0, bestStreak: 0 };
  }
}

export function saveProfile(profile) {
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); } catch { /* storage unavailable */ }
}

export function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
export function lerp(a, b, t) { return a + (b - a) * t; }
export function damp(current, target, lambda, dt) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}
export function formatTime(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
