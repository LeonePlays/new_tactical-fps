// Shared map-building toolkit. Produces optimized box/cylinder geometry, analytic
// colliders, navigation data, team spawn points and a top-down radar footprint.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { NavGraph } from '../nav.js';
import { supportHeight } from '../physics.js';

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const planeGeo = new THREE.PlaneGeometry(1, 1);
const cylGeo = new Map();
const sphereGeo = new Map();
const torusGeo = new Map();

function cylinderGeometry(segments = 10) {
  if (!cylGeo.has(segments)) cylGeo.set(segments, new THREE.CylinderGeometry(0.5, 0.5, 1, segments));
  return cylGeo.get(segments);
}
function sphereGeometry(segments = 8) {
  if (!sphereGeo.has(segments)) sphereGeo.set(segments, new THREE.SphereGeometry(0.5, segments, Math.max(4, segments - 2)));
  return sphereGeo.get(segments);
}
function torusGeometry(radius = 0.5, tube = 0.05, segments = 10) {
  const key = `${radius}:${tube}:${segments}`;
  if (!torusGeo.has(key)) torusGeo.set(key, new THREE.TorusGeometry(radius, tube, 5, segments));
  return torusGeo.get(key);
}

export class MapBuilder {
  constructor(scene, materials, id) {
    this.scene = scene;
    this.materials = materials;
    this.id = id;
    this.root = new THREE.Group();
    this.root.name = `map:${id}`;
    scene.add(this.root);
    this.colliders = [];
    this.spawns = { CT: [], T: [] };
    this.spawnsAny = [];
    this.extraNavNodes = [];
    this.lights = [];
    this.bounds = { minX: -36, maxX: 36, minZ: -36, maxZ: 36 };
    this.floorMesh = null;
    this.skyMesh = null;
    this._signCache = new Map();
  }

  mat(name) { return this.materials.get(name); }

  addMesh(mesh, opts = {}) {
    mesh.castShadow = opts.cast !== false;
    mesh.receiveShadow = opts.receive !== false;
    this.root.add(mesh);
    return mesh;
  }

  addCollider(minX, maxX, minY, maxY, minZ, maxZ, material = 'concrete', walkable = false) {
    this.colliders.push({ minX, maxX, minY, maxY, minZ, maxZ, material, walkable });
  }

  box(x, y, z, w, h, d, material, opts = {}) {
    const m = new THREE.Mesh(boxGeo, typeof material === 'string' ? this.mat(material) : material);
    m.position.set(x, y, z);
    m.scale.set(w, h, d);
    if (opts.rotY) m.rotation.y = opts.rotY;
    if (opts.rotX) m.rotation.x = opts.rotX;
    if (opts.rotZ) m.rotation.z = opts.rotZ;
    this.addMesh(m, opts);
    if (opts.solid !== false) {
      if (opts.rotY && Math.abs(Math.sin(opts.rotY)) > 0.05) {
        const sw = Math.abs(w * Math.cos(opts.rotY)) + Math.abs(d * Math.sin(opts.rotY));
        const sd = Math.abs(w * Math.sin(opts.rotY)) + Math.abs(d * Math.cos(opts.rotY));
        this.addCollider(x - sw / 2, x + sw / 2, y - h / 2, y + h / 2, z - sd / 2, z + sd / 2, opts.materialKey || 'concrete', !!opts.walkable);
      } else {
        this.addCollider(x - w / 2, x + w / 2, y - h / 2, y + h / 2, z - d / 2, z + d / 2, opts.materialKey || 'concrete', !!opts.walkable);
      }
    }
    return m;
  }

  boxBetween(x1, x2, y, z1, z2, h, material, opts = {}) {
    const w = Math.abs(x2 - x1), d = Math.abs(z2 - z1);
    return this.box((x1 + x2) / 2, y, (z1 + z2) / 2, Math.max(0.05, w), h, Math.max(0.05, d), material, opts);
  }

  cylinder(x, y, z, radius, height, material, opts = {}) {
    const m = new THREE.Mesh(cylinderGeometry(opts.segments || 10), typeof material === 'string' ? this.mat(material) : material);
    m.position.set(x, y, z);
    m.scale.set(radius * 2, height, radius * 2);
    if (opts.rotX) m.rotation.x = opts.rotX;
    if (opts.rotZ) m.rotation.z = opts.rotZ;
    this.addMesh(m, opts);
    if (opts.solid !== false) {
      this.addCollider(x - radius, x + radius, y - height / 2, y + height / 2, z - radius, z + radius, opts.materialKey || 'metal', false);
    }
    return m;
  }

  sphere(x, y, z, radius, material, opts = {}) {
    const m = new THREE.Mesh(sphereGeometry(opts.segments || 8), typeof material === 'string' ? this.mat(material) : material);
    m.position.set(x, y, z);
    m.scale.setScalar(radius * 2);
    this.addMesh(m, opts);
    return m;
  }

  torus(x, y, z, radius, tube, material, opts = {}) {
    const m = new THREE.Mesh(torusGeometry(radius, tube, opts.segments || 12), typeof material === 'string' ? this.mat(material) : material);
    m.position.set(x, y, z);
    if (opts.rotX) m.rotation.x = opts.rotX;
    if (opts.rotY) m.rotation.y = opts.rotY;
    if (opts.rotZ) m.rotation.z = opts.rotZ;
    this.addMesh(m, opts);
    return m;
  }

  ground(material, size = 160, y = 0, repeat = 1) {
    const m = new THREE.Mesh(planeGeo, typeof material === 'string' ? this.mat(material) : material);
    m.rotation.x = -Math.PI / 2;
    m.position.y = y;
    m.scale.set(size, size, 1);
    m.receiveShadow = true;
    m.castShadow = false;
    this.root.add(m);
    if (!this.floorMesh) this.floorMesh = m;
    return m;
  }

  surface(x, z, w, d, y, material, opts = {}) {
    return this.box(x, y - 0.03, z, w, 0.06, d, material, { solid: true, walkable: true, cast: false, ...opts });
  }

  addLight(color, intensity, distance, x, y, z, options = {}) {
    const light = new THREE.PointLight(color, intensity, distance, options.decay ?? 1.6);
    light.position.set(x, y, z);
    light.castShadow = !!options.castShadow;
    if (light.castShadow) {
      light.shadow.mapSize.set(512, 512);
      light.shadow.bias = -0.002;
    }
    this.root.add(light);
    this.lights.push(light);
    return light;
  }

  sky(top, horizon, bottom, sunColor, sunDir = new THREE.Vector3(-0.45, 0.28, -0.85)) {
    const geo = new THREE.SphereGeometry(320, 24, 16);
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        topColor: { value: new THREE.Color(top) },
        horizonColor: { value: new THREE.Color(horizon) },
        bottomColor: { value: new THREE.Color(bottom) },
        sunColor: { value: new THREE.Color(sunColor) },
        sunDir: { value: sunDir.clone().normalize() },
      },
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vDir;
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 bottomColor;
        uniform vec3 sunColor;
        uniform vec3 sunDir;
        void main() {
          float h = vDir.y;
          vec3 col = mix(horizonColor, topColor, smoothstep(0.0, 0.65, h));
          col = mix(bottomColor, col, smoothstep(-0.25, 0.02, h));
          float sun = pow(max(dot(vDir, sunDir), 0.0), 380.0);
          float glow = pow(max(dot(vDir, sunDir), 0.0), 8.0) * 0.20;
          col += sunColor * (sun * 1.8 + glow);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    this.skyMesh = new THREE.Mesh(geo, mat);
    this.skyMesh.frustumCulled = false;
    this.root.add(this.skyMesh);
    return this.skyMesh;
  }

  building({ x, z, w, d, h, material = 'plaster', roof = 'roof', style = 'classic', faces = ['n', 's', 'e', 'w'], sign, litChance = 0.22, balconyFace = null }) {
    const wall = this.box(x, h / 2, z, w, h, d, material, { materialKey: 'concrete' });
    // Plinth, cornice and roof cap.
    this.box(x, 0.28, z, w + 0.35, 0.56, d + 0.35, 'concreteDark', { cast: false, materialKey: 'concrete' });
    this.box(x, h + 0.12, z, w + 0.7, 0.28, d + 0.7, style === 'industrial' ? 'metalDark' : 'concrete', { cast: false });
    this.box(x, h + 0.28, z, w + 0.25, 0.12, d + 0.25, roof, { cast: false });
    // Roof silhouette / parapet.
    if (style !== 'industrial') {
      for (const [dx, dz, ww, dd] of [[0, -d / 2, w, 0.28], [0, d / 2, w, 0.28], [-w / 2, 0, 0.28, d], [w / 2, 0, 0.28, d]]) {
        this.box(x + dx, h + 0.45, z + dz, ww, 0.5, dd, material, { cast: false });
      }
    }
    const faceDefs = {
      n: { axis: 'x', span: w, fixed: z - d / 2, normal: -1, rot: Math.PI },
      s: { axis: 'x', span: w, fixed: z + d / 2, normal: 1, rot: 0 },
      w: { axis: 'z', span: d, fixed: x - w / 2, normal: -1, rot: -Math.PI / 2 },
      e: { axis: 'z', span: d, fixed: x + w / 2, normal: 1, rot: Math.PI / 2 },
    };
    for (const face of faces) {
      const f = faceDefs[face];
      if (!f) continue;
      const count = Math.max(1, Math.floor((f.span - 1.4) / 3.0));
      const spacing = f.span / count;
      const floors = Math.max(1, Math.floor((h - 1.4) / 3.0));
      for (let fl = 0; fl < floors; fl++) {
        const wy = 2.15 + fl * 3.0;
        if (wy + 1.2 > h) break;
        for (let i = 0; i < count; i++) {
          const off = -f.span / 2 + spacing * (i + 0.5);
          const lit = Math.random() < litChance;
          if (f.axis === 'x') {
            this.window(x + off, wy, f.fixed + f.normal * 0.055, 1.16, 1.62, f.rot, lit);
          } else {
            this.window(f.fixed + f.normal * 0.055, wy, z + off, 1.16, 1.62, f.rot, lit);
          }
        }
      }
      // Door / shopfront on the first face.
      if (face === faces[0]) {
        const dx = f.axis === 'x' ? x : f.fixed + f.normal * 0.06;
        const dz = f.axis === 'x' ? f.fixed + f.normal * 0.06 : z;
        this.door(dx, dz, f.rot, style, sign);
      }
      if (style !== 'industrial') {
        // Downpipe at one corner of each facade
        const px = f.axis === 'x' ? x - f.span / 2 + 0.65 : f.fixed + f.normal * 0.18;
        const pz = f.axis === 'x' ? f.fixed + f.normal * 0.18 : z - f.span / 2 + 0.65;
        this.cylinder(px, h / 2, pz, 0.075, h - 0.4, 'metalDark', { segments: 6, solid: false, cast: false });
      }
    }
    if (balconyFace) this.balcony(x, z, w, d, h, balconyFace);
    if (style === 'classic') this.roofDetails(x, z, w, d, h);
    return wall;
  }

  window(x, y, z, w, h, rotY, lit) {
    // The frame, glazing and sill are baked into one texture to keep draw calls low.
    this.box(x, y, z, w, h, 0.09, lit ? 'windowLit' : 'window', { solid: false, cast: false, rotY });
  }

  door(x, z, rotY, style, sign) {
    const dw = style === 'industrial' ? 3.2 : 1.28;
    const dh = style === 'industrial' ? 3.8 : 2.35;
    this.box(x, dh / 2, z, dw, dh, 0.12, style === 'industrial' ? 'metalDark' : 'woodDark', { solid: false, cast: false, rotY });
    this.box(x, dh / 2 + 0.04, z, dw - 0.24, dh - 0.2, 0.15, style === 'industrial' ? 'metal' : 'wood', { solid: false, cast: false, rotY });
    this.box(x, dh + 0.12, z, dw + 0.55, 0.2, 0.22, 'concrete', { solid: false, cast: false, rotY });
    this.box(x, 0.12, z, dw + 0.6, 0.24, 0.7, 'concrete', { solid: false, cast: false, rotY, walkable: false });
    if (sign) this.sign(sign, x, dh + 0.65, z, 2.8, 0.62, rotY);
    if (style !== 'industrial') {
      // Awning
      this.box(x, dh + 0.42, z + (Math.abs(Math.sin(rotY)) < 0.5 ? (Math.cos(rotY) > 0 ? 0.65 : -0.65) : 0),
        2.4, 0.09, 1.2, 'canvasCream', { solid: false, cast: true, rotX: 0.18, rotY, receive: true });
    }
  }

  balcony(x, z, w, d, h, face) {
    const y = Math.min(h - 1.7, 3.35);
    if (face === 'n' || face === 's') {
      const zz = z + (face === 'n' ? -d / 2 - 0.7 : d / 2 + 0.7);
      this.box(x, y, zz, w * 0.56, 0.18, 1.5, 'concrete', { solid: false, cast: true });
      for (let i = -3; i <= 3; i++) {
        this.box(x + i * w * 0.075, y + 0.52, zz + (face === 'n' ? -0.7 : 0.7), 0.055, 1.0, 0.055, 'metalDark', { solid: false, cast: false });
      }
      this.box(x, y + 1.02, zz + (face === 'n' ? -0.7 : 0.7), w * 0.56, 0.07, 0.08, 'metalDark', { solid: false, cast: false });
      for (let i = -1; i <= 1; i++) this.box(x + i * 1.1, y + 0.24, zz, 0.36, 0.3, 0.3, 'green', { solid: false, cast: false });
    } else {
      const xx = x + (face === 'w' ? -w / 2 - 0.7 : w / 2 + 0.7);
      this.box(xx, y, z, 1.5, 0.18, d * 0.56, 'concrete', { solid: false, cast: true });
      for (let i = -3; i <= 3; i++) {
        this.box(xx + (face === 'w' ? -0.7 : 0.7), y + 0.52, z + i * d * 0.075, 0.055, 1.0, 0.055, 'metalDark', { solid: false, cast: false });
      }
      this.box(xx + (face === 'w' ? -0.7 : 0.7), y + 1.02, z, d * 0.56, 0.07, 0.08, 'metalDark', { solid: false, cast: false });
    }
  }

  roofDetails(x, z, w, d, h) {
    // Chimneys and roof clutter give the skyline a believable silhouette.
    this.box(x - w * 0.28, h + 1.05, z + d * 0.2, 0.8, 1.7, 0.8, 'brickDark', { cast: true });
    this.box(x - w * 0.28, h + 1.95, z + d * 0.2, 1.05, 0.16, 1.05, 'concrete', { cast: false });
    if (Math.random() > 0.35) {
      this.box(x + w * 0.25, h + 0.75, z - d * 0.2, 1.1, 1.0, 0.75, 'metalDark', { cast: true });
      this.box(x + w * 0.25, h + 0.38, z - d * 0.2, 1.2, 0.22, 0.85, 'metal', { cast: false });
    }
    this.box(x + w * 0.12, h + 0.52, z + d * 0.18, 1.4, 0.22, 0.22, 'metalDark', { solid: false, cast: false });
    this.box(x + w * 0.12, h + 0.75, z + d * 0.18, 0.08, 0.6, 0.08, 'metalDark', { solid: false, cast: false });
  }

  sign(text, x, y, z, w = 2.4, h = 0.6, rotY = 0) {
    let tex = this._signCache.get(text);
    if (!tex) {
      const c = document.createElement('canvas'); c.width = 256; c.height = 64;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#2b2a24'; ctx.fillRect(0, 0, 256, 64);
      ctx.strokeStyle = '#8f7a50'; ctx.lineWidth = 4; ctx.strokeRect(2, 2, 252, 60);
      ctx.fillStyle = '#d8bd7b'; ctx.font = 'bold 29px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.letterSpacing = '2px';
      ctx.fillText(text.toUpperCase(), 128, 35);
      tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      this._signCache.set(text, tex);
    }
    const m = new THREE.Mesh(planeGeo, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, emissive: 0x221b0e, emissiveIntensity: 0.4 }));
    m.position.set(x, y, z); m.scale.set(w, h, 1); m.rotation.y = rotY;
    this.addMesh(m, { cast: false, receive: false });
    return m;
  }

  crate(x, z, size = 1.1, y = null, rotY = 0) {
    const baseY = y ?? size / 2;
    this.box(x, baseY, z, size, size, size, 'wood', { rotY, materialKey: 'wood' });
    this.box(x, baseY + size * 0.32, z, size + 0.04, 0.1, size + 0.04, 'woodDark', { solid: false, cast: false, rotY });
    this.box(x, baseY - size * 0.32, z, size + 0.04, 0.1, size + 0.04, 'woodDark', { solid: false, cast: false, rotY });
    this.box(x - size * 0.3, baseY, z, 0.09, size * 0.9, size + 0.02, 'woodDark', { solid: false, cast: false, rotY });
    this.box(x + size * 0.3, baseY, z, 0.09, size * 0.9, size + 0.02, 'woodDark', { solid: false, cast: false, rotY });
  }

  barrel(x, z, color = 'rust', y = 0) {
    this.cylinder(x, y + 0.62, z, 0.43, 1.24, color, { segments: 12, cast: true });
    this.cylinder(x, y + 1.25, z, 0.44, 0.06, 'metalDark', { segments: 12, cast: false });
    this.cylinder(x, y + 0.2, z, 0.445, 0.05, 'metalDark', { segments: 12, cast: false });
    this.cylinder(x, y + 1.12, z, 0.445, 0.05, 'metalDark', { segments: 12, cast: false });
  }

  sandbag(x, z, rows = 3, length = 2.4, rotY = 0) {
    for (let r = 0; r < rows; r++) {
      for (let i = 0; i < Math.ceil(length / 0.55); i++) {
        const off = -length / 2 + 0.3 + i * 0.55 + (r % 2 ? 0.15 : 0);
        const dx = Math.cos(rotY) * off, dz = Math.sin(rotY) * off;
        this.box(x + dx, 0.22 + r * 0.34, z + dz, 0.64, 0.36, 0.42, 'sand', { rotY, cast: true, materialKey: 'sand' });
      }
    }
  }

  streetLamp(x, z, color = 0xffd28a, height = 4.4) {
    this.cylinder(x, 0.16, z, 0.34, 0.32, 'concreteDark', { segments: 10 });
    this.cylinder(x, height / 2, z, 0.055, height, 'metalDark', { segments: 6, solid: false, cast: false });
    this.box(x, height, z, 0.08, 0.08, 0.8, 'metalDark', { solid: false, cast: false });
    this.box(x, height - 0.16, z - 0.36, 0.34, 0.18, 0.42, 'metalDark', { solid: false });
    this.box(x, height - 0.28, z - 0.36, 0.22, 0.22, 0.28, 'lamp', { solid: false, cast: false });
    this.addLight(color, 7.5, 11, x, height - 0.3, z - 0.36);
  }

  cables(points, sag = 0.7) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p[0], p[1], p[2])));
    const geo = new THREE.TubeGeometry(curve, 28, 0.025, 4, false);
    const mesh = new THREE.Mesh(geo, this.mat('wire'));
    mesh.castShadow = false;
    this.root.add(mesh);
    // A couple of dangling lamps.
    for (const t of [0.32, 0.66]) {
      const p = curve.getPoint(t);
      this.cylinder(p.x, p.y - 0.25, p.z, 0.025, 0.5, 'metalDark', { segments: 4, solid: false, cast: false });
      this.box(p.x, p.y - 0.55, p.z, 0.2, 0.25, 0.2, 'lamp', { solid: false, cast: false });
    }
  }

  planter(x, z, size = 1.3) {
    this.box(x, 0.34, z, size, 0.68, size, 'concrete', { materialKey: 'concrete' });
    this.box(x, 0.68, z, size - 0.15, 0.08, size - 0.15, 'woodDark', { solid: false, cast: false });
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      this.box(x + Math.cos(a) * size * 0.18, 1.05, z + Math.sin(a) * size * 0.18, 0.42, 0.65, 0.42, i % 2 ? 'leaf' : 'leafDark', { solid: false, cast: true, rotY: a, rotZ: 0.18 });
    }
  }

  marketStall(x, z, rotY = 0, color = 'canvasRed') {
    // Table, legs and a sloped canvas roof.
    this.box(x, 0.78, z, 3.0, 0.14, 1.3, 'wood', { rotY });
    this.box(x, 0.38, z, 2.7, 0.7, 1.0, 'woodDark', { solid: false, cast: false, rotY });
    for (const dx of [-1.35, 1.35]) for (const dz of [-0.55, 0.55]) {
      this.box(x + Math.cos(rotY) * dx - Math.sin(rotY) * dz, 1.55, z + Math.sin(rotY) * dx + Math.cos(rotY) * dz, 0.08, 2.4, 0.08, 'metalDark', { solid: false, cast: false, rotY });
    }
    this.box(x, 2.72, z, 3.3, 0.09, 2.2, color, { solid: false, cast: true, rotX: 0.12, rotY, receive: true });
    this.box(x, 2.55, z, 3.15, 0.16, 0.5, color, { solid: false, cast: false, rotY });
    for (let i = -1; i <= 1; i++) this.crate(x + i * 0.84, z + 0.15, 0.42, 1.08, rotY);
  }

  arch(x, z, rotY = 0, width = 4.2, height = 3.8) {
    const half = width / 2;
    for (const s of [-1, 1]) {
      const dx = Math.cos(rotY) * half * s;
      const dz = Math.sin(rotY) * half * s;
      this.box(x + dx, height / 2, z + dz, 0.72, height, 0.9, 'brick', { rotY });
      this.box(x + dx, height + 0.1, z + dz, 0.95, 0.25, 1.1, 'concrete', { rotY, cast: false });
    }
    const curve = new THREE.Mesh(new THREE.TorusGeometry(half, 0.35, 6, 16, Math.PI), this.mat('brick'));
    curve.position.set(x, height, z);
    curve.rotation.z = Math.PI;
    curve.rotation.y = rotY;
    curve.castShadow = true;
    this.root.add(curve);
    // Colliders for the supports only.
    for (const s of [-1, 1]) {
      const dx = Math.cos(rotY) * half * s, dz = Math.sin(rotY) * half * s;
      this.addCollider(x + dx - 0.55, x + dx + 0.55, 0, height, z + dz - 0.55, z + dz + 0.55, 'brick', false);
    }
  }

  fountain(x, z, radius = 2.8) {
    // Octagonal basin with water and a central pedestal.
    const basin = this.cylinder(x, 0.38, z, radius, 0.76, 'concrete', { segments: 8, materialKey: 'concrete' });
    basin.receiveShadow = true;
    this.cylinder(x, 0.7, z, radius - 0.22, 0.1, 'water', { segments: 16, solid: false, cast: false });
    this.cylinder(x, 4.5, z, 0.34, 1.35, 'concrete', { segments: 8, cast: false });
    this.cylinder(x, 3.2, z, 0.86, 0.24, 'concrete', { segments: 10, solid: false, cast: true });
    this.cylinder(x, 3.75, z, 0.24, 1.1, 'concrete', { segments: 8, solid: false, cast: false });
    this.sphere(x, 5.25, z, 0.22, 'metalDark', { segments: 8 });
    // Water jets represented as thin transparent columns.
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      this.cylinder(x + Math.cos(a) * 1.1, 3.45, z + Math.sin(a) * 1.1, 0.035, 0.55, 'water', { segments: 5, solid: false, cast: false });
    }
    this.addLight(0x8fb7bd, 3.2, 9, x, 2.7, z);
  }

  rubbleField(minX, maxX, minZ, maxZ, count = 30, materials = ['concrete', 'brickDark', 'sand']) {
    const geo = new THREE.DodecahedronGeometry(1, 0);
    const inst = new THREE.InstancedMesh(geo, this.mat(materials[0]), count);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const x = minX + Math.random() * (maxX - minX);
      const z = minZ + Math.random() * (maxZ - minZ);
      dummy.position.set(x, Math.random() * 0.15, z);
      dummy.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      dummy.scale.set(0.25 + Math.random() * 0.65, 0.12 + Math.random() * 0.32, 0.25 + Math.random() * 0.65);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.receiveShadow = true;
    inst.castShadow = false;
    this.root.add(inst);
  }

  // Static geometry is batched per material so the whole map draws in a few dozen
  // calls instead of hundreds. Collision and navigation data are already analytic.
  mergeStaticGeometry() {
    this.root.updateMatrixWorld(true);
    const rootInverse = new THREE.Matrix4().copy(this.root.matrixWorld).invert();
    const relative = new THREE.Matrix4();
    const groups = new Map();

    for (const child of [...this.root.children]) {
      if (!child.isMesh || child.isInstancedMesh || child.isSkinnedMesh) continue;
      if (!child.geometry || Array.isArray(child.material)) continue;
      if (child.material?.isShaderMaterial) continue;
      const key = `${child.material.uuid}|${child.castShadow ? 1 : 0}|${child.receiveShadow ? 1 : 0}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(child);
    }

    for (const meshes of groups.values()) {
      if (meshes.length < 2) continue;
      const geometries = [];
      for (const mesh of meshes) {
        const geo = mesh.geometry.clone();
        relative.multiplyMatrices(rootInverse, mesh.matrixWorld);
        geo.applyMatrix4(relative);
        geometries.push(geo);
      }
      const merged = mergeGeometries(geometries, false);
      for (const geo of geometries) geo.dispose();
      if (!merged) continue;
      const batched = new THREE.Mesh(merged, meshes[0].material);
      batched.castShadow = meshes[0].castShadow;
      batched.receiveShadow = meshes[0].receiveShadow;
      for (const mesh of meshes) mesh.removeFromParent();
      this.root.add(batched);
    }
  }

  finalize({ navSpacing = 4.7, fog } = {}) {
    const graph = NavGraph.build(this, { spacing: navSpacing });
    this.nav = graph;
    // Radar footprint from tall solid geometry.
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#202a22'; ctx.fillRect(0, 0, 256, 256);
    const b = this.bounds;
    const sx = 256 / (b.maxX - b.minX), sz = 256 / (b.maxZ - b.minZ);
    ctx.fillStyle = '#455045';
    for (const c of this.colliders) {
      if (c.maxY < 1.5) continue;
      const x = (c.minX - b.minX) * sx, y = (c.minZ - b.minZ) * sz;
      ctx.fillRect(x, y, Math.max(1, (c.maxX - c.minX) * sx), Math.max(1, (c.maxZ - c.minZ) * sz));
    }
    ctx.strokeStyle = '#77816d'; ctx.lineWidth = 2; ctx.strokeRect(1, 1, 254, 254);
    this.radarTexture = canvas;
    this.mergeStaticGeometry();
    return this;
  }

  spawn(team, x, z) {
    const y = supportHeight({ colliders: this.colliders }, x, z, 0.3, 0.3, 0.6);
    this.spawns[team].push(new THREE.Vector3(x, y, z));
    return this;
  }

  spawnAny(x, z) {
    const y = supportHeight({ colliders: this.colliders }, x, z, 0.3, 0.3, 0.6);
    this.spawnsAny.push(new THREE.Vector3(x, y, z));
  }
}
