import { settingsStore } from '../core/settings.js';
import { rand } from '../core/utils.js';

// Small procedural audio engine. Every sound is synthesized, so the project
// ships no third-party audio. The context is unlocked on the first user input.

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.effects = null;
    this.music = null;
    this.noiseBuffer = null;
    this.musicNodes = [];
    this.enabled = false;
    this.lastStep = 0;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    try {
      this.ctx = new AudioCtx();
      this.master = this.ctx.createGain();
      this.effects = this.ctx.createGain();
      this.music = this.ctx.createGain();
      this.effects.connect(this.master);
      this.music.connect(this.master);
      this.master.connect(this.ctx.destination);
      const length = this.ctx.sampleRate * 1.5;
      this.noiseBuffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
      this.enabled = true;
      this.setVolumes();
    } catch {
      this.enabled = false;
    }
  }

  setVolumes() {
    if (!this.ctx) return;
    const { masterVolume, effectsVolume, musicVolume } = settingsStore.get();
    const now = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(masterVolume, now, 0.02);
    this.effects.gain.setTargetAtTime(effectsVolume, now, 0.02);
    this.music.gain.setTargetAtTime(musicVolume * 0.22, now, 0.05);
  }

  get ready() {
    return Boolean(this.ctx && this.enabled && this.ctx.state === 'running');
  }

  noiseBurst({ duration = 0.1, volume = 0.2, filter = 1200, type = 'lowpass', when = 0, q = 1 }) {
    if (!this.ready || volume <= 0.0001) return;
    const ctx = this.ctx;
    const source = ctx.createBufferSource();
    source.buffer = this.noiseBuffer;
    const filterNode = ctx.createBiquadFilter();
    filterNode.type = type;
    filterNode.frequency.value = filter;
    filterNode.Q.value = q;
    const gain = ctx.createGain();
    const t = ctx.currentTime + when;
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    source.connect(filterNode).connect(gain).connect(this.effects);
    source.start(t);
    source.stop(t + duration + 0.02);
  }

  tone({ freq = 440, end = freq, duration = 0.08, volume = 0.1, type = 'sine', when = 0 }) {
    if (!this.ready || volume <= 0.0001) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const t = ctx.currentTime + when;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, end), t + duration);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain).connect(this.effects);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  gunshot(weapon = 'rifle', distance = 0) {
    const attenuation = Math.max(0, 1 - distance / 90);
    if (attenuation <= 0.02) return;
    if (weapon === 'pistol') {
      this.noiseBurst({ duration: 0.09, volume: 0.32 * attenuation, filter: 2300, q: 0.7 });
      this.tone({ freq: 155, end: 55, duration: 0.09, volume: 0.18 * attenuation, type: 'triangle' });
    } else {
      this.noiseBurst({ duration: 0.16, volume: 0.42 * attenuation, filter: 1700, q: 0.6 });
      this.tone({ freq: 105, end: 38, duration: 0.14, volume: 0.28 * attenuation, type: 'sawtooth' });
      this.noiseBurst({ duration: 0.3, volume: 0.1 * attenuation, filter: 500, when: 0.015 });
    }
  }

  reload() {
    this.noiseBurst({ duration: 0.05, volume: 0.13, filter: 2800, type: 'bandpass', q: 2 });
    this.tone({ freq: 480, end: 260, duration: 0.05, volume: 0.06, type: 'square', when: 0.08 });
    this.noiseBurst({ duration: 0.06, volume: 0.14, filter: 2100, type: 'bandpass', q: 2, when: 0.34 });
  }

  hitmarker(headshot = false) {
    this.tone({ freq: headshot ? 980 : 760, end: headshot ? 760 : 600, duration: 0.055, volume: 0.12, type: 'triangle' });
  }

  impact() {
    this.noiseBurst({ duration: 0.04, volume: 0.07, filter: 2600, type: 'bandpass', q: 1.4 });
  }

  footstep(running = false) {
    const now = performance.now();
    if (now - this.lastStep < (running ? 210 : 300)) return;
    this.lastStep = now;
    this.noiseBurst({ duration: 0.055, volume: running ? 0.075 : 0.045, filter: 420, q: 0.8 });
  }

  hurt() {
    this.tone({ freq: 170, end: 90, duration: 0.12, volume: 0.14, type: 'sawtooth' });
    this.noiseBurst({ duration: 0.12, volume: 0.1, filter: 700 });
  }

  death() {
    this.tone({ freq: 160, end: 40, duration: 0.7, volume: 0.16, type: 'sawtooth' });
    this.noiseBurst({ duration: 0.4, volume: 0.12, filter: 300 });
  }

  uiClick() {
    this.tone({ freq: 320, end: 280, duration: 0.035, volume: 0.05, type: 'square' });
  }

  matchStart() {
    this.tone({ freq: 220, end: 330, duration: 0.18, volume: 0.1, type: 'triangle' });
    this.tone({ freq: 330, end: 440, duration: 0.2, volume: 0.08, type: 'triangle', when: 0.16 });
  }

  victory() {
    const notes = [392, 523, 659, 784];
    notes.forEach((freq, i) => this.tone({ freq, end: freq, duration: 0.28, volume: 0.09, type: 'triangle', when: i * 0.15 }));
  }

  defeat() {
    const notes = [330, 294, 247, 196];
    notes.forEach((freq, i) => this.tone({ freq, end: freq * 0.98, duration: 0.3, volume: 0.08, type: 'triangle', when: i * 0.17 }));
  }

  startMusic() {
    if (!this.ctx || this.musicNodes.length) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 420;
    filter.Q.value = 0.7;
    const bus = ctx.createGain();
    bus.gain.value = 0.5;
    bus.connect(filter).connect(this.music);
    const frequencies = [55, 82.5, 110, 164.8];
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      gain.gain.value = 0.05 / (i * 0.4 + 1);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.013;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.025 / (i + 1);
      lfo.connect(lfoGain).connect(gain.gain);
      osc.connect(gain).connect(bus);
      osc.start(now);
      lfo.start(now);
      this.musicNodes.push(osc, lfo);
    });
    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 280;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.025;
    noise.connect(noiseFilter).connect(noiseGain).connect(bus);
    noise.start(now);
    this.musicNodes.push(noise);
  }

  stopMusic() {
    for (const node of this.musicNodes) {
      try { node.stop(); } catch { /* already stopped */ }
    }
    this.musicNodes.length = 0;
  }

  randomStepPitch() {
    return rand(-20, 20);
  }
}

export const audio = new AudioEngine();
