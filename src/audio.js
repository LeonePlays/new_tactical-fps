// Lightweight synthesized audio. No external audio files or licensing dependencies.
export class AudioSystem {
  constructor(settings) {
    this.settings = settings;
    this.ctx = null;
    this.ready = false;
    this.lastStep = 0;
  }

  unlock() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.sfx = this.ctx.createGain();
      this.music = this.ctx.createGain();
      this.music.connect(this.master);
      this.sfx.connect(this.master);
      this.master.connect(this.ctx.destination);
      this.applyVolumes();
      this.buildNoise();
      this.startAmbience();
      this.ready = true;
    } catch { /* audio is optional */ }
  }

  applyVolumes() {
    if (!this.ctx) return;
    const s = this.settings;
    this.master.gain.value = Math.max(0, Math.min(1, s.masterVolume));
    this.sfx.gain.value = Math.max(0, Math.min(1, s.sfxVolume));
    this.music.gain.value = Math.max(0, Math.min(1, s.musicVolume));
  }

  setSettings(settings) {
    this.settings = settings;
    this.applyVolumes();
  }

  buildNoise() {
    const len = this.ctx.sampleRate * 1.2;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noise = buf;
  }

  startAmbience() {
    try {
      // Low wind bed.
      const src = this.ctx.createBufferSource();
      src.buffer = this.noise; src.loop = true;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass'; filter.frequency.value = 420; filter.Q.value = 0.6;
      const gain = this.ctx.createGain(); gain.gain.value = 0.045;
      src.connect(filter); filter.connect(gain); gain.connect(this.music);
      src.start();
      this.windGain = gain;

      // Sparse tense drone.
      const drone = this.ctx.createGain(); drone.gain.value = 0.022;
      drone.connect(this.music);
      for (const [f, type] of [[55, 'sine'], [82.4, 'triangle'], [110, 'sine']]) {
        const osc = this.ctx.createOscillator();
        osc.type = type; osc.frequency.value = f;
        osc.detune.value = (Math.random() - 0.5) * 8;
        osc.connect(drone); osc.start();
      }
      const lfo = this.ctx.createOscillator(); lfo.frequency.value = 0.05;
      const lfoGain = this.ctx.createGain(); lfoGain.gain.value = 0.012;
      lfo.connect(lfoGain); lfoGain.connect(drone.gain); lfo.start();
      this.droneGain = drone;
    } catch { /* optional */ }
  }

  noiseBurst(duration, frequency, q, volume, type = 'bandpass', destination = this.sfx) {
    if (!this.ready) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    src.playbackRate.value = 0.9 + Math.random() * 0.25;
    const filter = this.ctx.createBiquadFilter();
    filter.type = type; filter.frequency.value = frequency; filter.Q.value = q;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0008, t + duration);
    src.connect(filter); filter.connect(gain); gain.connect(destination);
    src.start(t); src.stop(t + duration + 0.02);
  }

  tone(freq, duration, type, volume, slide = 0) {
    if (!this.ready) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = type; osc.frequency.setValueAtTime(freq, t);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + duration);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0008, t + duration);
    osc.connect(gain); gain.connect(this.sfx);
    osc.start(t); osc.stop(t + duration + 0.02);
  }

  shot(kind = 'rifle', distance = 0) {
    if (!this.ready) return;
    const atten = Math.max(0.16, 1 - distance / 70);
    if (kind === 'rifle') {
      this.noiseBurst(0.13, 1050, 1.1, 0.22 * atten, 'bandpass');
      this.noiseBurst(0.08, 260, 0.8, 0.13 * atten, 'lowpass');
      this.tone(95, 0.1, 'square', 0.1 * atten, -55);
    } else if (kind === 'pistol') {
      this.noiseBurst(0.09, 1650, 1.3, 0.14 * atten, 'bandpass');
      this.tone(155, 0.07, 'square', 0.07 * atten, -75);
    } else {
      this.noiseBurst(0.1, 780, 0.8, 0.12 * atten, 'bandpass');
    }
  }

  footstep(running = true) {
    const now = performance.now();
    if (now - this.lastStep < 120) return;
    this.lastStep = now;
    this.noiseBurst(0.06, running ? 680 : 420, 0.7, running ? 0.045 : 0.025, 'lowpass');
  }

  jump() { this.noiseBurst(0.09, 380, 0.8, 0.035, 'lowpass'); }
  land(hard = false) {
    this.noiseBurst(0.12, hard ? 220 : 320, 0.8, hard ? 0.075 : 0.04, 'lowpass');
    this.tone(70, 0.08, 'sine', hard ? 0.05 : 0.025, -15);
  }
  reload() {
    this.tone(360, 0.04, 'triangle', 0.035);
    setTimeout(() => this.tone(260, 0.05, 'triangle', 0.03), 280);
    setTimeout(() => this.tone(520, 0.035, 'triangle', 0.03), 720);
  }
  dryFire() { this.tone(180, 0.035, 'square', 0.025); }
  hitmarker(head = false) { this.tone(head ? 920 : 720, 0.045, 'triangle', head ? 0.05 : 0.035); }
  kill() {
    this.tone(520, 0.06, 'triangle', 0.045);
    setTimeout(() => this.tone(780, 0.08, 'triangle', 0.04), 55);
  }
  hurt() {
    this.noiseBurst(0.14, 240, 0.7, 0.07, 'lowpass');
    this.tone(90, 0.12, 'sine', 0.05, -20);
  }
  uiClick() { this.tone(420, 0.025, 'square', 0.018); }
  uiBack() { this.tone(260, 0.03, 'square', 0.018); }
  countdown() { this.tone(480, 0.07, 'triangle', 0.035); }
  matchEnd(win = true) {
    const notes = win ? [392, 523, 659, 784] : [330, 262, 220];
    notes.forEach((f, i) => setTimeout(() => this.tone(f, 0.18, 'triangle', 0.05), i * 130));
  }
  setMatchActive(active) {
    if (!this.ready) return;
    const target = active ? 0.028 : 0.045;
    this.windGain?.gain.setTargetAtTime(target, this.ctx.currentTime, 0.3);
    this.droneGain?.gain.setTargetAtTime(active ? 0.012 : 0.022, this.ctx.currentTime, 0.3);
  }
}
