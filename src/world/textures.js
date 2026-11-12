import * as THREE from 'three';

// All artwork in the game is generated at runtime. Nothing here is copied from
// a commercial game: the textures are procedural noise and pattern studies.

let seed = 0x9e3779b9;
const random = () => {
  seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
  return ((seed >>> 0) / 4294967296);
};

function canvasTexture(draw, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  draw(ctx, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function grain(ctx, size, color = '0,0,0', count = 2400, alpha = 0.1) {
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = `rgba(${color},${alpha * (0.25 + random())})`;
    const w = 1 + random() * 5;
    ctx.fillRect(random() * size, random() * size, w, w * (0.4 + random()));
  }
}

function stains(ctx, size, count = 8, color = '40,32,20') {
  for (let i = 0; i < count; i++) {
    const x = random() * size, y = random() * size, r = 6 + random() * 42;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${color},${0.06 + random() * 0.1})`);
    g.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
}

const textures = {
  plaster: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#ad9d80'; ctx.fillRect(0, 0, s, s);
    grain(ctx, s, '53,42,28', 2600, 0.08);
    stains(ctx, s, 12);
    // hairline cracks
    ctx.strokeStyle = 'rgba(50,40,26,.22)'; ctx.lineWidth = 1;
    for (let i = 0; i < 7; i++) {
      let x = random() * s, y = random() * s;
      ctx.beginPath(); ctx.moveTo(x, y);
      for (let j = 0; j < 5; j++) { x += (random() - 0.5) * 28; y += random() * 18; ctx.lineTo(x, y); }
      ctx.stroke();
    }
  }),

  brick: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#786a5b'; ctx.fillRect(0, 0, s, s);
    const bw = 62, bh = 26;
    for (let row = 0; row < Math.ceil(s / bh); row++) {
      const offset = (row % 2) * bw * 0.5;
      for (let col = -1; col < Math.ceil(s / bw) + 1; col++) {
        const x = col * bw + offset;
        const y = row * bh;
        const tone = 92 + Math.floor(random() * 32);
        ctx.fillStyle = `rgb(${tone + 20},${tone - 8},${tone - 24})`;
        ctx.fillRect(x + 2, y + 2, bw - 4, bh - 4);
        ctx.fillStyle = `rgba(255,236,205,${0.03 + random() * 0.06})`;
        ctx.fillRect(x + 3, y + 3, bw - 6, 4);
        if (random() > 0.8) {
          ctx.fillStyle = 'rgba(46,38,30,.15)';
          ctx.fillRect(x + 6 + random() * 28, y + 8, 12 + random() * 18, 8);
        }
      }
    }
    grain(ctx, s, '35,25,16', 1200, 0.11);
  }),

  concrete: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#818079'; ctx.fillRect(0, 0, s, s);
    grain(ctx, s, '24,26,22', 3000, 0.13);
    stains(ctx, s, 10, '24,24,20');
    ctx.strokeStyle = 'rgba(38,38,34,.25)'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 5; i++) {
      let x = random() * s, y = random() * s;
      ctx.beginPath(); ctx.moveTo(x, y);
      for (let j = 0; j < 4; j++) { x += (random() - 0.5) * 40; y += random() * 22; ctx.lineTo(x, y); }
      ctx.stroke();
    }
    // form seams
    ctx.strokeStyle = 'rgba(45,45,40,.16)';
    ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
  }),

  asphalt: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#4b4b47'; ctx.fillRect(0, 0, s, s);
    grain(ctx, s, '18,18,17', 5000, 0.22);
    grain(ctx, s, '190,186,170', 700, 0.07);
    stains(ctx, s, 8, '20,20,18');
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = 'rgba(28,28,26,.4)'; ctx.lineWidth = 1.2;
      let x = random() * s, y = random() * s;
      ctx.beginPath(); ctx.moveTo(x, y);
      for (let j = 0; j < 5; j++) { x += (random() - 0.5) * 55; y += 14 + random() * 20; ctx.lineTo(x, y); }
      ctx.stroke();
    }
  }),

  cobble: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#5f5b51'; ctx.fillRect(0, 0, s, s);
    const w = 40, h = 30;
    for (let row = 0; row < 9; row++) {
      const off = (row % 2) * 20;
      for (let col = -1; col < 8; col++) {
        const x = col * w + off, y = row * h;
        const tone = 90 + Math.floor(random() * 34);
        ctx.fillStyle = `rgb(${tone + 8},${tone + 2},${tone - 12})`;
        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, w - 4, h - 4, 6);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,240,210,.06)';
        ctx.fillRect(x + 6, y + 5, w - 16, 4);
      }
    }
    grain(ctx, s, '30,28,22', 1300, 0.12);
  }),

  stone: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#918a76'; ctx.fillRect(0, 0, s, s);
    for (let row = 0; row < 7; row++) {
      const off = (row % 2) * 22;
      for (let col = -1; col < 6; col++) {
        const x = col * 52 + off, y = row * 38;
        const tone = 130 + Math.floor(random() * 38);
        ctx.fillStyle = `rgb(${tone},${tone - 6},${tone - 24})`;
        ctx.fillRect(x + 2, y + 2, 48, 34);
        ctx.fillStyle = 'rgba(255,244,216,.08)';
        ctx.fillRect(x + 3, y + 3, 46, 3);
      }
    }
    grain(ctx, s, '34,30,22', 1600, 0.1);
  }),

  wood: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#806339'; ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 8; i++) {
      const y = i * 32;
      const tone = 88 + Math.floor(random() * 26);
      ctx.fillStyle = `rgb(${tone + 26},${tone - 4},${tone - 42})`;
      ctx.fillRect(0, y + 2, s, 28);
      ctx.strokeStyle = 'rgba(45,28,12,.32)'; ctx.lineWidth = 1;
      for (let j = 0; j < 5; j++) {
        const gy = y + 6 + random() * 20;
        ctx.beginPath(); ctx.moveTo(0, gy);
        ctx.bezierCurveTo(s * 0.3, gy + (random() - 0.5) * 7, s * 0.7, gy + (random() - 0.5) * 7, s, gy);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(25,16,8,.6)';
      ctx.fillRect(0, y, s, 2);
      ctx.fillStyle = 'rgba(230,200,150,.1)';
      ctx.fillRect(0, y + 3, s, 2);
      // nails
      ctx.fillStyle = 'rgba(25,24,20,.8)';
      ctx.fillRect(14 + random() * 20, y + 14, 3, 3);
      ctx.fillRect(s - 22 - random() * 20, y + 14, 3, 3);
    }
  }),

  woodDark: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#49341f'; ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 10; i++) {
      const tone = 54 + Math.floor(random() * 22);
      ctx.fillStyle = `rgb(${tone + 20},${tone + 4},${tone - 16})`;
      ctx.fillRect(i * 26, 0, 24, s);
      ctx.strokeStyle = 'rgba(20,12,6,.5)'; ctx.lineWidth = 1;
      for (let j = 0; j < 4; j++) {
        const gx = i * 26 + 4 + random() * 18;
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx + (random() - 0.5) * 8, s); ctx.stroke();
      }
      ctx.fillStyle = 'rgba(10,7,4,.6)'; ctx.fillRect(i * 26, 0, 2, s);
    }
    grain(ctx, s, '20,14,8', 600, 0.1);
  }),

  metal: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#656961'; ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 400; i++) {
      const y = random() * s;
      ctx.strokeStyle = `rgba(${random() > 0.5 ? '230,232,220' : '30,32,30'},${0.02 + random() * 0.07})`;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(s, y + (random() - 0.5) * 2); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(30,31,28,.5)';
    for (let x = 20; x < s; x += 64) for (let y = 20; y < s; y += 64) {
      ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill();
    }
    stains(ctx, s, 7, '50,30,20');
  }),

  rust: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#70472f'; ctx.fillRect(0, 0, s, s);
    grain(ctx, s, '42,24,14', 3200, 0.2);
    grain(ctx, s, '190,110,55', 900, 0.12);
    stains(ctx, s, 10, '45,25,14');
  }),

  roof: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#7c4c36'; ctx.fillRect(0, 0, s, s);
    for (let row = 0; row < 8; row++) {
      const y = row * 32;
      for (let col = 0; col < 8; col++) {
        const x = col * 32 + (row % 2) * 16;
        const tone = 106 + Math.floor(random() * 34);
        ctx.fillStyle = `rgb(${tone + 16},${tone - 24},${tone - 44})`;
        ctx.beginPath(); ctx.arc(x + 16, y + 30, 16, Math.PI, 0); ctx.fill();
        ctx.strokeStyle = 'rgba(40,20,12,.5)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(x + 16, y + 30, 15, Math.PI, 0); ctx.stroke();
      }
    }
    grain(ctx, s, '40,20,12', 1200, 0.13);
  }),

  container: (color = '#4e6a70') => canvasTexture((ctx, s) => {
    ctx.fillStyle = color; ctx.fillRect(0, 0, s, s);
    for (let x = 0; x < s; x += 16) {
      ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(x, 0, 5, s);
      ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.fillRect(x + 8, 0, 5, s);
    }
    grain(ctx, s, '20,24,24', 1400, 0.12);
    stains(ctx, s, 9, '70,36,18');
    ctx.strokeStyle = 'rgba(20,24,22,.5)'; ctx.strokeRect(1, 1, s - 2, s - 2);
  }),

  tarp: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#7c7a62'; ctx.fillRect(0, 0, s, s);
    grain(ctx, s, '35,34,28', 2400, 0.16);
    ctx.strokeStyle = 'rgba(235,232,210,.12)'; ctx.lineWidth = 2;
    for (let i = 0; i < s; i += 32) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(s, i); ctx.stroke(); }
    stains(ctx, s, 5, '40,38,28');
  }),

  sandbag: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#8a8064'; ctx.fillRect(0, 0, s, s);
    grain(ctx, s, '48,43,30', 3500, 0.18);
    ctx.strokeStyle = 'rgba(50,44,30,.3)'; ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath(); ctx.moveTo(0, random() * s); ctx.lineTo(s, random() * s); ctx.stroke();
    }
  }),

  dirt: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#5c513c'; ctx.fillRect(0, 0, s, s);
    grain(ctx, s, '32,27,18', 5000, 0.22);
    grain(ctx, s, '150,136,104', 600, 0.1);
  }),

  foliage: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#47523a'; ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 500; i++) {
      ctx.fillStyle = `rgba(${40 + random() * 50},${70 + random() * 55},${35 + random() * 30},${0.3 + random() * 0.4})`;
      ctx.beginPath(); ctx.ellipse(random() * s, random() * s, 1 + random() * 3, 2 + random() * 5, random() * 3, 0, Math.PI * 2); ctx.fill();
    }
  }),

  warning: () => canvasTexture((ctx, s) => {
    ctx.fillStyle = '#b39532'; ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = '#25241e';
    for (let i = -s; i < s * 2; i += 64) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 28, 0); ctx.lineTo(i - s + 28, s); ctx.lineTo(i - s, s); ctx.fill();
    }
    grain(ctx, s, '30,28,20', 1200, 0.16);
  }),
};

const materialDefs = {
  plaster: { texture: 'plaster', roughness: 0.96, uv: 0.3 },
  brick: { texture: 'brick', roughness: 0.95, uv: 0.45 },
  concrete: { texture: 'concrete', roughness: 0.98, uv: 0.3 },
  asphalt: { texture: 'asphalt', roughness: 1, uv: 0.12 },
  cobble: { texture: 'cobble', roughness: 0.96, uv: 0.24 },
  stone: { texture: 'stone', roughness: 0.92, uv: 0.32 },
  wood: { texture: 'wood', roughness: 0.9, uv: 0.45 },
  woodDark: { texture: 'woodDark', roughness: 0.9, uv: 0.5 },
  metal: { texture: 'metal', roughness: 0.55, metalness: 0.35, uv: 0.35 },
  rust: { texture: 'rust', roughness: 0.9, metalness: 0.1, uv: 0.35 },
  roof: { texture: 'roof', roughness: 0.95, uv: 0.4 },
  tarp: { texture: 'tarp', roughness: 0.96, uv: 0.35 },
  sandbag: { texture: 'sandbag', roughness: 1, uv: 0.7 },
  dirt: { texture: 'dirt', roughness: 1, uv: 0.2 },
  foliage: { texture: 'foliage', roughness: 1, uv: 1 },
  warning: { texture: 'warning', roughness: 0.9, uv: 0.4 },
  containerBlue: { texture: 'container', textureArgs: ['#4d6870'], roughness: 0.7, metalness: 0.2, uv: 0.35 },
  containerRed: { texture: 'container', textureArgs: ['#7c4537'], roughness: 0.72, metalness: 0.2, uv: 0.35 },
  containerGreen: { texture: 'container', textureArgs: ['#4f6045'], roughness: 0.72, metalness: 0.2, uv: 0.35 },
  glass: { color: 0x536865, roughness: 0.25, metalness: 0.35 },
  darkGlass: { color: 0x2b3434, roughness: 0.3, metalness: 0.3 },
  black: { color: 0x1d1e1b, roughness: 0.85 },
  steel: { color: 0x777b72, roughness: 0.4, metalness: 0.55 },
  brass: { color: 0xa58a4d, roughness: 0.35, metalness: 0.6 },
  fabric: { color: 0x6e6a55, roughness: 1 },
  redCloth: { color: 0x7d3d31, roughness: 1 },
  paintWhite: { color: 0xbebbaa, roughness: 0.9 },
  paintAmber: { color: 0xb08c4d, roughness: 0.9 },
  water: { color: 0x3f6963, roughness: 0.15, metalness: 0.2, transparent: true, opacity: 0.82 },
  emissiveLamp: { color: 0xc4a263, emissive: 0x8a5b22, emissiveIntensity: 1.4 },
  skin: { color: 0xaeb08f, roughness: 0.8 },
};

const materials = new Map();
const textureCache = new Map();

function getTexture(name, args) {
  const key = args ? `${name}:${args.join(',')}` : name;
  if (!textureCache.has(key)) {
    const factory = textures[name];
    textureCache.set(key, factory ? factory(...(args || [])) : null);
  }
  return textureCache.get(key);
}

export function getMaterial(name) {
  if (materials.has(name)) return materials.get(name);
  const def = materialDefs[name] || materialDefs.concrete;
  const options = { roughness: def.roughness ?? 0.9 };
  if (def.texture) options.map = getTexture(def.texture, def.textureArgs);
  if (def.color !== undefined) options.color = def.color;
  if (def.metalness !== undefined) options.metalness = def.metalness;
  if (def.emissive !== undefined) options.emissive = def.emissive;
  if (def.emissiveIntensity !== undefined) options.emissiveIntensity = def.emissiveIntensity;
  if (def.transparent) { options.transparent = true; options.opacity = def.opacity; }
  const material = new THREE.MeshStandardMaterial(options);
  material.userData.uv = def.uv ?? 0.35;
  materials.set(name, material);
  return material;
}

export function getMaterialUv(name) {
  const def = materialDefs[name];
  if (def?.uv) return def.uv;
  return getMaterial(name).userData.uv;
}

export function setTextureAnisotropy(value) {
  for (const texture of textureCache.values()) {
    if (texture) texture.anisotropy = value;
  }
}

export function getMaterialNames() {
  return Object.keys(materialDefs);
}

export { materialDefs };
