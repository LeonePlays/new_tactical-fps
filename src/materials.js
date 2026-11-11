// Procedural, self-contained texture and material library. No external assets required.
import * as THREE from 'three';

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function canvasTexture(size, painter, repeat = 1) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  painter(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function grain(ctx, size, rand, count, rgba) {
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = rgba(rand);
    const w = 1 + rand() * 5;
    ctx.fillRect(rand() * size, rand() * size, w, w * (0.4 + rand()));
  }
}

function plasterPainter(base, stain) {
  return (ctx, s) => {
    const rand = rng(17);
    ctx.fillStyle = base; ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 120; i++) {
      const r = 4 + rand() * 34;
      ctx.fillStyle = `rgba(${stain},${0.02 + rand() * 0.055})`;
      ctx.beginPath(); ctx.arc(rand() * s, rand() * s, r, 0, Math.PI * 2); ctx.fill();
    }
    // Hairline cracks
    ctx.strokeStyle = 'rgba(45,38,28,.20)'; ctx.lineWidth = 1;
    for (let i = 0; i < 7; i++) {
      let x = rand() * s, y = rand() * s;
      ctx.beginPath(); ctx.moveTo(x, y);
      for (let j = 0; j < 7; j++) { x += (rand() - 0.5) * 18; y += rand() * 14; ctx.lineTo(x, y); }
      ctx.stroke();
    }
    grain(ctx, s, rand, 2600, (r) => `rgba(60,50,36,${0.03 + r() * 0.09})`);
  };
}

function brickPainter(base, mortar) {
  return (ctx, s) => {
    const rand = rng(31);
    ctx.fillStyle = mortar; ctx.fillRect(0, 0, s, s);
    const bh = s / 12, bw = s / 6;
    for (let row = 0; row < 12; row++) {
      const off = row % 2 ? -bw / 2 : 0;
      for (let col = -1; col < 7; col++) {
        const x = col * bw + off + 2, y = row * bh + 2;
        const shade = 0.75 + rand() * 0.35;
        ctx.fillStyle = shadeColor(base, shade);
        ctx.fillRect(x, y, bw - 4, bh - 4);
        ctx.fillStyle = `rgba(255,240,210,${0.02 + rand() * 0.05})`;
        ctx.fillRect(x + 2, y + 2, bw - 8, 2);
      }
    }
    grain(ctx, s, rand, 1600, (r) => `rgba(30,20,14,${0.03 + r() * 0.1})`);
  };
}

function concretePainter(base) {
  return (ctx, s) => {
    const rand = rng(73);
    ctx.fillStyle = base; ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(250,250,245,${rand() * 0.055})`;
      ctx.beginPath(); ctx.arc(rand() * s, rand() * s, 4 + rand() * 20, 0, Math.PI * 2); ctx.fill();
    }
    for (let i = 0; i < 30; i++) {
      ctx.strokeStyle = `rgba(30,30,28,${0.06 + rand() * 0.12})`;
      ctx.lineWidth = 0.7 + rand();
      ctx.beginPath(); ctx.moveTo(rand() * s, rand() * s);
      ctx.lineTo(rand() * s, rand() * s); ctx.stroke();
    }
    grain(ctx, s, rand, 3000, (r) => `rgba(30,30,27,${0.02 + r() * 0.09})`);
  };
}

function cobblePainter(ctx, s) {
  const rand = rng(101);
  ctx.fillStyle = '#544f43'; ctx.fillRect(0, 0, s, s);
  const n = 10;
  const cell = s / n;
  for (let row = 0; row < n; row++) {
    const off = row % 2 ? cell / 2 : 0;
    for (let col = -1; col < n + 1; col++) {
      const x = col * cell + off + 2, y = row * cell + 2;
      const shade = 0.7 + rand() * 0.45;
      ctx.fillStyle = shadeColor('#8b8270', shade);
      ctx.beginPath();
      ctx.roundRect(x, y, cell - 4, cell - 4, 5 + rand() * 4);
      ctx.fill();
      ctx.strokeStyle = 'rgba(30,28,22,.25)'; ctx.stroke();
      ctx.fillStyle = `rgba(255,246,220,${rand() * 0.06})`;
      ctx.fillRect(x + 5, y + 4, cell * 0.45, 3);
    }
  }
  grain(ctx, s, rand, 1500, (r) => `rgba(25,23,18,${0.03 + r() * 0.08})`);
}

function asphaltPainter(ctx, s) {
  const rand = rng(211);
  ctx.fillStyle = '#4b4b47'; ctx.fillRect(0, 0, s, s);
  grain(ctx, s, rand, 9000, (r) => `rgba(${20 + r() * 80},${20 + r() * 80},${20 + r() * 70},${0.05 + r() * 0.28})`);
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = 'rgba(25,25,22,.5)'; ctx.lineWidth = 1.4;
    let x = rand() * s, y = rand() * s; ctx.beginPath(); ctx.moveTo(x, y);
    for (let j = 0; j < 9; j++) { x += (rand() - 0.5) * 28; y += (rand() - 0.5) * 28; ctx.lineTo(x, y); }
    ctx.stroke();
  }
}

function woodPainter(base) {
  return (ctx, s) => {
    const rand = rng(307);
    ctx.fillStyle = base; ctx.fillRect(0, 0, s, s);
    const planks = 6, pw = s / planks;
    for (let p = 0; p < planks; p++) {
      ctx.fillStyle = shadeColor(base, 0.78 + rand() * 0.4);
      ctx.fillRect(p * pw + 1, 0, pw - 2, s);
      ctx.fillStyle = 'rgba(25,16,9,.5)';
      ctx.fillRect(p * pw, 0, 1.5, s);
      for (let i = 0; i < 14; i++) {
        ctx.strokeStyle = `rgba(40,26,14,${0.06 + rand() * 0.13})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const x = p * pw + 4 + rand() * (pw - 9);
        ctx.moveTo(x, rand() * s);
        ctx.bezierCurveTo(x + rand() * 5, s * 0.3, x - rand() * 5, s * 0.6, x + rand() * 4, rand() * s);
        ctx.stroke();
      }
    }
    grain(ctx, s, rand, 900, (r) => `rgba(20,12,6,${r() * 0.12})`);
  };
}

function metalPainter(ctx, s) {
  const rand = rng(401);
  ctx.fillStyle = '#5c625f'; ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 26; i++) {
    ctx.fillStyle = `rgba(${190 + rand() * 40},${195 + rand() * 40},${190 + rand() * 40},${rand() * 0.09})`;
    ctx.fillRect(0, rand() * s, s, 1 + rand() * 3);
  }
  for (let i = 0; i < 25; i++) {
    const x = rand() * s, y = rand() * s;
    ctx.fillStyle = 'rgba(35,32,27,.35)';
    ctx.beginPath(); ctx.arc(x, y, 1.2 + rand() * 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(200,200,190,.22)'; ctx.beginPath(); ctx.arc(x - 1, y - 1, 1, 0, Math.PI * 2); ctx.fill();
  }
  grain(ctx, s, rand, 2200, (r) => `rgba(30,28,25,${r() * 0.08})`);
}

function rustPainter(ctx, s) {
  const rand = rng(509);
  ctx.fillStyle = '#6c5340'; ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 180; i++) {
    ctx.fillStyle = `rgba(${90 + rand() * 90},${45 + rand() * 40},${20 + rand() * 25},${0.1 + rand() * 0.35})`;
    ctx.beginPath(); ctx.arc(rand() * s, rand() * s, 2 + rand() * 16, 0, Math.PI * 2); ctx.fill();
  }
  grain(ctx, s, rand, 2400, (r) => `rgba(45,25,12,${r() * 0.2})`);
}

function roofPainter(ctx, s) {
  const rand = rng(607);
  ctx.fillStyle = '#6c4938'; ctx.fillRect(0, 0, s, s);
  const rows = 10, rh = s / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < 10; c++) {
      const x = c * (s / 10) + (r % 2 ? s / 20 : 0);
      ctx.fillStyle = shadeColor('#9a6048', 0.7 + rand() * 0.45);
      ctx.beginPath(); ctx.roundRect(x, r * rh, s / 10 - 2, rh - 2, 3); ctx.fill();
    }
  }
  grain(ctx, s, rand, 1000, (r) => `rgba(30,18,10,${r() * 0.12})`);
}

function hazardPainter(ctx, s) {
  const rand = rng(709);
  ctx.fillStyle = '#c9a73c'; ctx.fillRect(0, 0, s, s);
  ctx.fillStyle = '#25241f';
  for (let i = -s; i < s * 2; i += 48) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 24, 0); ctx.lineTo(i + 24 - s, s); ctx.lineTo(i - s, s); ctx.closePath(); ctx.fill();
  }
  grain(ctx, s, rand, 700, (r) => `rgba(20,18,12,${r() * 0.15})`);
}

function sandPainter(ctx, s) {
  const rand = rng(811);
  ctx.fillStyle = '#a69677'; ctx.fillRect(0, 0, s, s);
  grain(ctx, s, rand, 7000, (r) => `rgba(${70 + r() * 90},${60 + r() * 80},${40 + r() * 60},${r() * 0.26})`);
}

function tilePainter(ctx, s) {
  const rand = rng(907);
  ctx.fillStyle = '#777568'; ctx.fillRect(0, 0, s, s);
  const n = 4, cell = s / n;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    ctx.fillStyle = shadeColor('#9b988a', 0.86 + rand() * 0.22);
    ctx.fillRect(x * cell + 2, y * cell + 2, cell - 4, cell - 4);
  }
  grain(ctx, s, rand, 1000, (r) => `rgba(30,30,25,${r() * 0.08})`);
}

function shadeColor(hex, factor) {
  const c = new THREE.Color(hex);
  c.multiplyScalar(factor);
  return `rgb(${Math.min(255, c.r * 255) | 0},${Math.min(255, c.g * 255) | 0},${Math.min(255, c.b * 255) | 0})`;
}

export class MaterialLibrary {
  constructor(renderer) {
    this.renderer = renderer;
    this.textures = {};
    this.materials = {};
    this.build();
  }

  build() {
    const T = this.textures;
    T.plaster = canvasTexture(256, plasterPainter('#b8a67e', '74,62,44'), 2.2);
    T.plasterWarm = canvasTexture(256, plasterPainter('#c0a77d', '92,70,45'), 2.2);
    T.plasterCool = canvasTexture(256, plasterPainter('#9fa093', '50,53,45'), 2.4);
    T.brick = canvasTexture(256, brickPainter('#8e624c', '#766b59'), 2.1);
    T.brickDark = canvasTexture(256, brickPainter('#705041', '#5d5547'), 2.0);
    T.concrete = canvasTexture(256, concretePainter('#85857b'), 2.6);
    T.concreteDark = canvasTexture(256, concretePainter('#65675f'), 2.8);
    T.cobble = canvasTexture(256, cobblePainter, 6.5);
    T.asphalt = canvasTexture(256, asphaltPainter, 10);
    T.wood = canvasTexture(256, woodPainter('#765536'), 2.0);
    T.woodDark = canvasTexture(256, woodPainter('#59412b'), 1.8);
    T.metal = canvasTexture(256, metalPainter, 2.2);
    T.metalDark = canvasTexture(256, metalPainter, 3.2);
    T.rust = canvasTexture(256, rustPainter, 2.2);
    T.roof = canvasTexture(256, roofPainter, 3.2);
    T.hazard = canvasTexture(256, hazardPainter, 2.4);
    T.sand = canvasTexture(256, sandPainter, 7);
    T.tile = canvasTexture(256, tilePainter, 3.0);

    // Window texture: dark glass, timber frame and stone sill in one draw call.
    T.window = canvasTexture(256, (ctx, s) => {
      ctx.fillStyle = '#44443a'; ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = '#837963'; ctx.fillRect(8, 8, s - 16, 7);
      ctx.fillRect(8, s - 30, s - 16, 22);
      const g = ctx.createLinearGradient(0, 0, s, s);
      g.addColorStop(0, '#52666a'); g.addColorStop(0.45, '#26363a'); g.addColorStop(0.55, '#1b292d'); g.addColorStop(1, '#43565c');
      ctx.fillStyle = g; ctx.fillRect(20, 20, s - 40, s - 54);
      ctx.fillStyle = 'rgba(220,230,220,.15)';
      ctx.fillRect(s * 0.18, 20, s * 0.09, s - 54);
      ctx.fillStyle = 'rgba(255,240,210,.07)';
      ctx.fillRect(s * 0.58, 20, s * 0.045, s - 54);
      ctx.fillStyle = '#3b382f'; ctx.fillRect(s * 0.47, 18, 10, s - 52); ctx.fillRect(18, s * 0.45, s - 36, 10);
    }, 1);

    T.windowLit = canvasTexture(256, (ctx, s) => {
      ctx.fillStyle = '#3f3b30'; ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = '#85795f'; ctx.fillRect(8, 8, s - 16, 7);
      ctx.fillRect(8, s - 30, s - 16, 22);
      const g = ctx.createLinearGradient(0, 0, 0, s);
      g.addColorStop(0, '#e2c58b'); g.addColorStop(1, '#8a6739');
      ctx.fillStyle = g; ctx.fillRect(20, 20, s - 40, s - 54);
      ctx.fillStyle = 'rgba(40,30,20,.55)'; ctx.fillRect(s * 0.47, 18, 10, s - 52); ctx.fillRect(18, s * 0.45, s - 36, 10);
    }, 1);

    const std = (name, map, opts = {}) => {
      const m = new THREE.MeshStandardMaterial({ map, color: 0xffffff, ...opts });
      if (map) m.map.repeat.set(map.repeat.x, map.repeat.y);
      this.materials[name] = m;
      return m;
    };

    std('plaster', T.plaster, { roughness: 0.96 });
    std('plasterWarm', T.plasterWarm, { roughness: 0.96 });
    std('plasterCool', T.plasterCool, { roughness: 0.95 });
    std('brick', T.brick, { roughness: 0.95 });
    std('brickDark', T.brickDark, { roughness: 0.95 });
    std('concrete', T.concrete, { roughness: 0.98 });
    std('concreteDark', T.concreteDark, { roughness: 0.97 });
    std('cobble', T.cobble, { roughness: 0.94 });
    std('asphalt', T.asphalt, { roughness: 0.98 });
    std('wood', T.wood, { roughness: 0.84 });
    std('woodDark', T.woodDark, { roughness: 0.88 });
    std('metal', T.metal, { roughness: 0.55, metalness: 0.45 });
    std('metalDark', T.metalDark, { roughness: 0.62, metalness: 0.35 });
    std('rust', T.rust, { roughness: 0.9, metalness: 0.15 });
    std('roof', T.roof, { roughness: 0.93 });
    std('hazard', T.hazard, { roughness: 0.8 });
    std('sand', T.sand, { roughness: 1 });
    std('tile', T.tile, { roughness: 0.7 });
    std('window', T.window, { roughness: 0.18, metalness: 0.4 });
    std('windowLit', T.windowLit, { roughness: 0.4, emissive: 0x3b2a10, emissiveIntensity: 1.4 });

    const mats = this.materials;
    mats.dark = new THREE.MeshStandardMaterial({ color: 0x282a25, roughness: 0.85 });
    mats.black = new THREE.MeshStandardMaterial({ color: 0x171916, roughness: 0.9 });
    mats.white = new THREE.MeshStandardMaterial({ color: 0xc9c7b5, roughness: 0.85 });
    mats.cloth = new THREE.MeshStandardMaterial({ color: 0x5d5b4c, roughness: 1 });
    mats.canvasRed = new THREE.MeshStandardMaterial({ color: 0x8e4a37, roughness: 1, side: THREE.DoubleSide });
    mats.canvasCream = new THREE.MeshStandardMaterial({ color: 0xb9a782, roughness: 1, side: THREE.DoubleSide });
    mats.canvasGreen = new THREE.MeshStandardMaterial({ color: 0x51614b, roughness: 1, side: THREE.DoubleSide });
    mats.water = new THREE.MeshStandardMaterial({ color: 0x3b5b59, roughness: 0.18, metalness: 0.55, transparent: true, opacity: 0.82 });
    mats.leaf = new THREE.MeshStandardMaterial({ color: 0x4c5d3b, roughness: 1 });
    mats.leafDark = new THREE.MeshStandardMaterial({ color: 0x37462e, roughness: 1 });
    mats.skin = new THREE.MeshStandardMaterial({ color: 0xb08a6a, roughness: 0.85 });
    mats.skinDark = new THREE.MeshStandardMaterial({ color: 0x8a6549, roughness: 0.85 });
    mats.ctCloth = new THREE.MeshStandardMaterial({ color: 0x3d4b4b, roughness: 0.93 });
    mats.ctVest = new THREE.MeshStandardMaterial({ color: 0x293433, roughness: 0.8 });
    mats.tCloth = new THREE.MeshStandardMaterial({ color: 0x75654a, roughness: 0.95 });
    mats.tVest = new THREE.MeshStandardMaterial({ color: 0x4f4433, roughness: 0.82 });
    mats.helmet = new THREE.MeshStandardMaterial({ color: 0x36423f, roughness: 0.68, metalness: 0.15 });
    mats.helmetT = new THREE.MeshStandardMaterial({ color: 0x5a4e3a, roughness: 0.85 });
    mats.boots = new THREE.MeshStandardMaterial({ color: 0x24241f, roughness: 0.9 });
    mats.weapon = new THREE.MeshStandardMaterial({ color: 0x2e322e, roughness: 0.5, metalness: 0.45 });
    mats.weaponWood = new THREE.MeshStandardMaterial({ color: 0x60472f, roughness: 0.8 });
    mats.glassGreen = new THREE.MeshStandardMaterial({ color: 0x2e4644, roughness: 0.15, metalness: 0.5, transparent: true, opacity: 0.7 });
    mats.lamp = new THREE.MeshStandardMaterial({ color: 0xffe2a1, emissive: 0xffc766, emissiveIntensity: 2.4, roughness: 0.4 });
    mats.redLamp = new THREE.MeshStandardMaterial({ color: 0x8f2f24, emissive: 0xb8301e, emissiveIntensity: 1.4, roughness: 0.5 });
    mats.orange = new THREE.MeshStandardMaterial({ color: 0xcf6d2a, roughness: 0.78 });
    mats.yellow = new THREE.MeshStandardMaterial({ color: 0xc6a63f, roughness: 0.7 });
    mats.blue = new THREE.MeshStandardMaterial({ color: 0x3f5f79, roughness: 0.8 });
    mats.green = new THREE.MeshStandardMaterial({ color: 0x4f6448, roughness: 0.85 });
    mats.red = new THREE.MeshStandardMaterial({ color: 0x7e3f32, roughness: 0.8 });
    mats.metalBright = new THREE.MeshStandardMaterial({ color: 0x8a8d83, roughness: 0.4, metalness: 0.7 });
    mats.wire = new THREE.MeshBasicMaterial({ color: 0x25251f });

    // Add subtle bump detail using the color maps (cheap and stable).
    for (const [name, m] of Object.entries(mats)) {
      if (m.map && ['plaster', 'plasterWarm', 'plasterCool', 'brick', 'brickDark', 'concrete', 'concreteDark', 'cobble', 'asphalt', 'wood', 'woodDark', 'roof', 'metal', 'metalDark', 'rust', 'sand', 'tile'].includes(name)) {
        m.bumpMap = m.map;
        m.bumpScale = name === 'brick' || name === 'brickDark' ? 0.05 : 0.022;
      }
    }
  }

  get(name) {
    return this.materials[name] || this.materials.concrete;
  }

  setAnisotropy(amount) {
    for (const t of Object.values(this.textures)) {
      t.anisotropy = amount;
      t.needsUpdate = true;
    }
  }
}
