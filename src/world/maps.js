import * as THREE from 'three';
import { World } from './world.js';
import { NavGraph } from './nav.js';
import { getMaterial, setTextureAnisotropy } from './textures.js';
import { CONFIG } from '../core/config.js';

// ---------------------------------------------------------------------------
// Map definitions. Two complete, genuinely different arenas share the same
// runtime contract: bounds, collision world, nav graph and spawn sets.
// ---------------------------------------------------------------------------

function createSky(scene, theme) {
  const geo = new THREE.SphereGeometry(190, 28, 16);
  const top = new THREE.Color(theme.skyTop);
  const bottom = new THREE.Color(theme.skyBottom);
  const colors = [];
  const position = geo.attributes.position;
  const color = new THREE.Color();
  for (let i = 0; i < position.count; i++) {
    const y = position.getY(i) / 190;
    const t = Math.max(0, Math.min(1, (y + 0.15) / 0.9));
    color.copy(bottom).lerp(top, Math.pow(t, 0.72));
    colors.push(color.r, color.g, color.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false });
  const sky = new THREE.Mesh(geo, material);
  sky.renderOrder = -10;
  scene.add(sky);

  // A soft, static sun disc drawn into a canvas sprite.
  if (theme.sunDisc) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255,245,215,1)');
    grad.addColorStop(0.18, 'rgba(255,225,165,.95)');
    grad.addColorStop(0.45, 'rgba(255,200,120,.26)');
    grad.addColorStop(1, 'rgba(255,190,110,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending });
    const sprite = new THREE.Sprite(material);
    sprite.scale.setScalar(42);
    const dir = new THREE.Vector3(...theme.sunDirection).normalize().multiplyScalar(160);
    sprite.position.copy(dir);
    scene.add(sprite);
    sky.userData.sun = sprite;
  }
  return sky;
}

function createLighting(scene, theme, quality) {
  scene.background = new THREE.Color(theme.fogColor);
  scene.fog = new THREE.Fog(theme.fogColor, theme.fogNear, theme.fogFar);
  const hemi = new THREE.HemisphereLight(theme.hemiSky, theme.hemiGround, theme.hemiIntensity);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(theme.sunColor, theme.sunIntensity);
  sun.position.set(...theme.sunPosition);
  sun.target.position.set(0, 0, 0);
  scene.add(sun, sun.target);
  sun.castShadow = Boolean(quality.shadows);
  sun.shadow.mapSize.set(quality.shadowMap, quality.shadowMap);
  const extent = theme.shadowExtent;
  sun.shadow.camera.left = -extent;
  sun.shadow.camera.right = extent;
  sun.shadow.camera.top = extent;
  sun.shadow.camera.bottom = -extent;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 160;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.035;
  scene.add(new THREE.AmbientLight(theme.ambientColor, theme.ambientIntensity));
  return { hemi, sun };
}

// ---------------------------------------------------------------------------
// OLD QUARTER
// ---------------------------------------------------------------------------

const OLD_QUARTER_NAV = [
  // North spawn corridor
  { x: 0, z: -38 }, { x: -5, z: -38 }, { x: 5, z: -38 },
  { x: -7, z: -31 }, { x: 7, z: -31 }, { x: -7, z: -23 }, { x: 7, z: -23 },
  { x: -7, z: -16 }, { x: 7, z: -16 }, { x: -5, z: -10 }, { x: 5, z: -10 },
  // Around the central well
  { x: -6, z: -6 }, { x: 0, z: -8 }, { x: 6, z: -6 }, { x: 8, z: 0 },
  { x: 6, z: 6 }, { x: 0, z: 8 }, { x: -6, z: 6 }, { x: -8, z: 0 },
  // West and east market lanes. The middle nodes are nudged clear of the
  // barrels/cart so the graph is not disconnected by a single prop.
  { x: -14, z: -10 }, { x: -14, z: 0 }, { x: -14, z: 10 },
  { x: -22, z: -10 }, { x: -22, z: -2 }, { x: -22, z: 10 },
  { x: 14, z: -10 }, { x: 14, z: 0 }, { x: 14, z: 10 },
  { x: 22, z: -10 }, { x: 22, z: 2 }, { x: 23, z: 12 },
  // Plaza gateways and south corridor
  { x: 0, z: -16 }, { x: 0, z: 16 }, { x: -7, z: 16 }, { x: 7, z: 16 },
  { x: -7, z: 23 }, { x: 7, z: 23 }, { x: -7, z: 31 }, { x: 7, z: 31 },
  { x: 0, z: 38 }, { x: -5, z: 38 }, { x: 5, z: 38 },
  // West terrace and its steps
  { x: -37, z: -4, y: 1.2 }, { x: -37, z: 0, y: 1.2 }, { x: -37, z: 4, y: 1.2 },
  { x: -37, z: 6.4, y: 0.9 }, { x: -37, z: 7.0, y: 0.6 }, { x: -37, z: 7.6, y: 0.3 }, { x: -37, z: 8.4, y: 0 },
  { x: -37, z: -6.4, y: 0.9 }, { x: -37, z: -7.0, y: 0.6 }, { x: -37, z: -7.6, y: 0.3 }, { x: -37, z: -8.4, y: 0 },
  // Narrow side lanes behind the corner buildings
  { x: -37, z: -28 }, { x: -37, z: -16 }, { x: -37, z: 12 }, { x: -37, z: 22 }, { x: -37, z: 32 },
  { x: 37, z: -28 }, { x: 37, z: -16 }, { x: 37, z: 12 }, { x: 37, z: 22 }, { x: 37, z: 32 },
];

const OLD_QUARTER_FFA = [
  { x: -5, z: -38 }, { x: 5, z: -38 }, { x: -22, z: -10 }, { x: 23, z: 13 },
  { x: 0, z: -16 }, { x: 0, z: 16 }, { x: -22, z: 10 }, { x: 22, z: -10 },
  { x: -37, z: 22 }, { x: 37, z: -22 }, { x: -37, z: 0, y: 1.2 }, { x: 5, z: 38 },
  { x: -5, z: 38 }, { x: -14, z: 10 }, { x: 14, z: -10 }, { x: 0, z: 31 },
];

export const MAPS = {
  old_quarter: {
    id: 'old_quarter',
    name: 'OLD QUARTER',
    subtitle: 'URBAN COURTYARD • DUSK',
    description: 'A walled old-town quarter of plaster facades, market lanes and a central well.',
    bounds: { minX: -40, maxX: 40, minZ: -42, maxZ: 42 },
    theme: {
      skyTop: 0x667d96,
      skyBottom: 0xd6b785,
      fogColor: 0xc3b18d,
      fogNear: 48,
      fogFar: 150,
      hemiSky: 0xcfd6d4,
      hemiGround: 0x5a4f3d,
      hemiIntensity: 1.55,
      sunColor: 0xffd2a0,
      sunIntensity: 2.65,
      sunPosition: [-36, 48, 21],
      sunDirection: [-0.62, 0.56, 0.36],
      sunDisc: true,
      shadowExtent: 58,
      ambientColor: 0x7d7462,
      ambientIntensity: 0.35,
    },
    spawns: {
      CT: [{ x: 0, z: 38 }, { x: -5, z: 38 }, { x: 5, z: 38 }, { x: -10, z: 34 }, { x: 10, z: 34 }],
      T: [{ x: 0, z: -38 }, { x: -5, z: -38 }, { x: 5, z: -38 }, { x: -10, z: -34 }, { x: 10, z: -34 }],
    },
    ffaSpawns: OLD_QUARTER_FFA,
    navNodes: OLD_QUARTER_NAV,
    build(world) {
      const { minX, maxX, minZ, maxZ } = { minX: -40, maxX: 40, minZ: -42, maxZ: 42 };

      // Cobbled ground and a lighter central plaza.
      world.addBox({ x: 0, z: 0, y: -0.1, w: 80, h: 0.1, d: 84, material: 'cobble', collide: false, shadow: false });
      world.addBox({ x: 0, z: 0, y: 0.002, w: 30, h: 0.01, d: 34, material: 'stone', collide: false, shadow: false });
      world.addBox({ x: 0, z: 0, y: 0.013, w: 2.6, h: 0.008, d: 30, material: 'stone', collide: false, shadow: false });

      // City wall perimeter.
      for (const [x, z, w, d] of [[0, -42, 82, 2], [0, 42, 82, 2], [-40, 0, 2, 86], [40, 0, 2, 86]]) {
        world.addBox({ x, z, y: 0, w, h: 6.4, d, material: 'stone' });
        world.addDecoBox({ x, z, y: 6.4, w: w + 0.5, h: 0.35, d: d + 0.5, material: 'stone' });
        // Crenellations
        if (w > d) {
          for (let i = -38; i <= 38; i += 6) world.addDecoBox({ x: i, z: z + (z > 0 ? -0.5 : 0.5), y: 6.75, w: 1.6, h: 0.7, d: 0.55, material: 'stone', shadow: false });
        } else {
          for (let i = -40; i <= 40; i += 6) world.addDecoBox({ x: x + (x > 0 ? -0.5 : 0.5), z: i, y: 6.75, w: 0.55, h: 0.7, d: 1.6, material: 'stone', shadow: false });
        }
      }
      // Buttresses add vertical rhythm to the boundary wall.
      for (let i = -34; i <= 34; i += 8.5) {
        world.addBox({ x: i, z: -40.9, y: 0, w: 1.1, h: 5.6, d: 1.1, material: 'stone' });
        world.addBox({ x: i, z: 40.9, y: 0, w: 1.1, h: 5.6, d: 1.1, material: 'stone' });
      }

      // Four corner buildings frame the streets and plaza.
      world.building({ x: -24, z: -26, w: 22, d: 18, h: 10.5, material: 'plaster', balcony: true, variant: 1 });
      world.building({ x: 24, z: -26, w: 22, d: 18, h: 9.5, material: 'brick', variant: 2 });
      world.building({ x: -24, z: 26, w: 22, d: 18, h: 9.0, material: 'brick', balcony: true, variant: 0 });
      world.building({ x: 24, z: 26, w: 22, d: 18, h: 10.0, material: 'plaster', variant: 3 });
      // Chimneys and roof clutter give the skyline a real silhouette.
      for (const [x, z, h] of [[-29, -26, 2.4], [27, -28, 2.0], [-20, 28, 2.2], [29, 24, 2.6]]) {
        world.addBox({ x, z, y: 10.6, w: 1.2, h, d: 1.2, material: 'brick', collide: false });
        world.addDecoBox({ x, z, y: 10.6 + h, w: 1.5, h: 0.18, d: 1.5, material: 'stone', shadow: false });
      }

      // Plaza gateways.
      world.archway(0, -17, 0, 7.2, 4.2);
      world.archway(0, 17, 0, 7.2, 4.2);

      // Central well.
      world.fountain(0, 0, 2.6);
      world.planter(-9, -10, 1.3);
      world.planter(9, 10, 1.3);
      world.bench(-8, 8, 0.2);
      world.bench(8, -8, -0.2);

      // Raised west arcade.
      world.addBox({ x: -37, z: 0, y: 0, w: 5, h: 1.2, d: 12, material: 'stone' });
      world.addDecoBox({ x: -37, z: 0, y: 1.2, w: 5.4, h: 0.18, d: 12.4, material: 'stone', shadow: false });
      for (const side of [-1, 1]) {
        const sign = side;
        for (let i = 0; i < 3; i++) {
          const z = sign * (6.4 + i * 0.75);
          world.addBox({ x: -37, z, y: 0, w: 4.8, h: 0.9 - i * 0.3, d: 0.8, material: 'stone' });
        }
      }
      // Small arcade posts and canopy on the terrace.
      for (const z of [-4, 0, 4]) world.addCylinder({ x: -34.8, z, y: 1.2, radius: 0.16, h: 3.0, material: 'stone', segments: 8, collide: true });
      world.addDecoBox({ x: -37, z: 0, y: 4.2, w: 5.8, h: 0.22, d: 13, material: 'woodDark' });
      for (const z of [-4, 0, 4]) world.addDecoBox({ x: -37, z, y: 4.42, w: 5.4, h: 0.08, d: 0.5, material: 'woodDark', shadow: false });
      // Terrace rail
      for (let z = -5.5; z <= 5.5; z += 1.2) world.addDecoBox({ x: -34.7, z, y: 2.5, w: 0.08, h: 0.8, d: 0.08, material: 'metal', shadow: false });
      world.addDecoBox({ x: -34.7, z: 0, y: 3.3, w: 0.09, h: 0.09, d: 11.2, material: 'metal', shadow: false });

      // Market stalls and storage.
      world.marketStall(-19, 4, 0.1);
      world.marketStall(19, -4, -0.1);
      world.marketStall(-19, -4, 0.1);
      world.marketStall(19, 4, -0.1);

      // Cover props, all placed to leave clean navigation lanes.
      world.crate(-9, -4.5, 1.25);
      world.crate(-10.2, -4.4, 0.9, 0, 'wood');
      world.crate(9, 4.5, 1.3);
      world.crate(10.1, 4.3, 0.85, 0, 'wood');
      world.crate(-14, -13, 1.35);
      world.crate(14, 13, 1.25);
      world.crate(16, 14.5, 0.9);
      world.crate(-5, 14.8, 1.0);
      world.crate(5, -14.8, 1.0);
      world.crate(-22, 14, 1.2);
      world.crate(22, -14, 1.2);
      world.sandbagWall(-5, 9, 3.2, 0, 3);
      world.sandbagWall(5, -9, 3.2, 0, 3);
      world.sandbagWall(-11, 13.8, 2.4, Math.PI / 2, 2);
      world.barrel(-12.5, 4.0);
      world.barrel(-13.3, 4.7);
      world.barrel(12.5, -4.0);
      world.barrel(13.3, -4.7);
      world.barrel(-22, 0.5);
      world.barrel(22, -0.5);
      world.tree(-16, -12);
      world.tree(16, 12);
      world.tree(-30, 10);
      world.tree(30, -10);
      world.planter(12, 10, 1.4);
      world.planter(-12, -10, 1.4);
      world.lampPost(-12.2, -12.2);
      world.lampPost(12.2, 12.2);
      world.lampPost(-12.2, 12.2);
      world.lampPost(12.2, -12.2);
      // Kept off the central spawn lane so a fresh spawn has a clear view and
      // walk path into the plaza.
      world.lampPost(-7, -34);
      world.lampPost(7, 34);
      world.lampPost(-34, -18);
      world.lampPost(34, 18);

      // Cables loop between upper floors and across the plaza.
      for (const [a, b] of [
        [{ x: -13, y: 7.4, z: -21 }, { x: 13, y: 7.8, z: -21 }],
        [{ x: -13, y: 6.8, z: 20 }, { x: 13, y: 7.1, z: 20 }],
        [{ x: -13, y: 7.2, z: -25 }, { x: -13, y: 7.2, z: -14 }],
        [{ x: 13, y: 7.0, z: 26 }, { x: 13, y: 7.0, z: 13 }],
      ]) {
        world.addCylinderBetween(a, b, 0.025, 'black', 5);
      }
      for (const [x, z] of [[-9, -21], [9, -21], [-9, 20], [9, 20]]) {
        world.addDecoBox({ x, z, y: 6.7, w: 0.14, h: 0.9, d: 0.14, material: 'black', shadow: false });
        world.addDecoBox({ x, z, y: 6.45, w: 0.3, h: 0.25, d: 0.3, material: 'emissiveLamp', shadow: false });
      }

      // Wooden cart.
      world.addBox({ x: 22, z: 9, y: 0.5, w: 2.2, h: 0.25, d: 1.2, material: 'wood' });
      for (const sx of [-0.8, 0.8]) {
        world.addCylinder({ x: 22 + sx, z: 9, y: 0.28, radius: 0.38, h: 0.1, material: 'woodDark', segments: 10, rx: Math.PI / 2, collide: false });
      }
      world.addDecoBox({ x: 22, z: 8.2, y: 0.75, w: 2.2, h: 0.12, d: 0.3, material: 'woodDark' });
      world.addColliderBox(20.7, 23.3, 8.1, 9.9, 0, 1.2);

      // Subtle rubble outside the main routes.
      world.rubbleField(-33, -14, 2.3, 9);
      world.rubbleField(33, 14, 2.3, 9);
      world.rubbleField(0, 39, 2.8, 8);

      // Distant rooftops beyond the city wall.
      for (const [x, z, w, d, h, m] of [
        [-48, -35, 18, 16, 12, 'plaster'], [48, -30, 20, 18, 14, 'brick'],
        [-46, 30, 22, 16, 11, 'brick'], [50, 32, 18, 20, 13, 'plaster'],
        [0, -52, 30, 14, 15, 'plaster'], [-28, -52, 18, 12, 10, 'brick'],
      ]) {
        world.addBox({ x, z, y: 0, w, h, d, material: m, collide: false, shadow: false });
        world.addDecoBox({ x, z, y: h, w: w + 0.4, h: 0.3, d: d + 0.4, material: 'roof', shadow: false });
      }
    },
  },

  // -------------------------------------------------------------------------
  // INDUSTRIAL COMPLEX
  // -------------------------------------------------------------------------

  industrial: {
    id: 'industrial',
    name: 'INDUSTRIAL COMPLEX',
    subtitle: 'FREIGHT YARD • OVERCAST',
    description: 'A cold freight yard of containers, silos and a warehouse with two open bays.',
    bounds: { minX: -44, maxX: 44, minZ: -44, maxZ: 44 },
    theme: {
      skyTop: 0x707f89,
      skyBottom: 0xb6bcb7,
      fogColor: 0xa9b0ad,
      fogNear: 55,
      fogFar: 165,
      hemiSky: 0xc4cfd4,
      hemiGround: 0x464b47,
      hemiIntensity: 1.8,
      sunColor: 0xe4ebee,
      sunIntensity: 1.55,
      sunPosition: [32, 52, -28],
      sunDirection: [0.5, 0.65, -0.4],
      sunDisc: false,
      shadowExtent: 64,
      ambientColor: 0x768082,
      ambientIntensity: 0.3,
    },
    spawns: {
      CT: [{ x: 0, z: 39 }, { x: -6, z: 39 }, { x: 6, z: 39 }, { x: -12, z: 36 }, { x: 12, z: 36 }],
      T: [{ x: -10, z: -37 }, { x: 0, z: -37 }, { x: 10, z: -37 }, { x: -17, z: -35 }, { x: 17, z: -35 }],
    },
    ffaSpawns: [
      { x: -10, z: -37 }, { x: 10, z: -37 }, { x: -18, z: -28 }, { x: 18, z: -28 },
      { x: -16, z: -4 }, { x: 16, z: -4 }, { x: 0, z: 8 }, { x: -20, z: 18 },
      { x: 20, z: 18 }, { x: -16, z: 30 }, { x: 16, z: 30 }, { x: 0, z: 39 },
      { x: -32, z: 18 }, { x: 32, z: 4 }, { x: 35, z: 30 }, { x: -32, z: -18 },
    ],
    navNodes: [
      // Warehouse interior and bay doors
      { x: -18, z: -37 }, { x: -9, z: -37 }, { x: -4, z: -37 }, { x: 9, z: -37 }, { x: 18, z: -37 },
      { x: -18, z: -30 }, { x: -9, z: -30 }, { x: 0, z: -30 }, { x: 9, z: -30 }, { x: 18, z: -30 },
      { x: -9, z: -23 }, { x: 9, z: -23 },
      // North yard
      { x: -18, z: -18 }, { x: 0, z: -18 }, { x: 18, z: -18 },
      // Container rows and central corridor
      { x: -20, z: -4 }, { x: -4, z: -4 }, { x: 4, z: -4 }, { x: 20, z: -4 },
      { x: -20, z: 8 }, { x: -4, z: 8 }, { x: 4, z: 8 }, { x: 20, z: 8 },
      { x: -20, z: 18 }, { x: -4, z: 18 }, { x: 4, z: 18 }, { x: 20, z: 18 },
      // West side and silos
      { x: -26, z: -16 }, { x: -26, z: 2 }, { x: -26, z: 16 }, { x: -32, z: 14 }, { x: -32, z: 24 }, { x: -32, z: -18 },
      // East side
      { x: 28, z: -16 }, { x: 28, z: -2 }, { x: 28, z: 12 }, { x: 28, z: 26 }, { x: 34, z: 6 }, { x: 34, z: 20 },
      // South approach
      { x: -20, z: 28 }, { x: -8, z: 28 }, { x: 6, z: 28 }, { x: 16, z: 28 },
      { x: -16, z: 36 }, { x: 0, z: 36 }, { x: 16, z: 36 },
      { x: 0, z: 40 }, { x: -4, z: 40 }, { x: 4, z: 40 },
    ],
    build(world) {
      // Asphalt with painted freight lanes.
      world.addBox({ x: 0, z: 0, y: -0.1, w: 88, h: 0.1, d: 88, material: 'asphalt', collide: false, shadow: false });
      for (const x of [-14, 14]) world.addPlaneDecal(x, 24, 0.18, 34, 'paintWhite', 0.012);
      for (const z of [-10, 34]) world.addPlaneDecal(0, z, 60, 0.2, 'paintWhite', 0.012);
      for (let i = -36; i <= 36; i += 6) world.addPlaneDecal(i, -14, 3.2, 0.16, 'warning', 0.013);

      // Boundary fence/wall.
      for (const [x, z, w, d] of [[0, -44, 90, 1.5], [0, 44, 90, 1.5], [-44, 0, 1.5, 90], [44, 0, 1.5, 90]]) {
        world.addBox({ x, z, y: 0, w, h: 5.8, d, material: 'concrete' });
        if (w > d) {
          for (let i = -40; i <= 40; i += 8) world.addBox({ x: i, z: z + (z > 0 ? -1.3 : 1.3), y: 0, w: 1.2, h: 6.4, d: 0.8, material: 'concrete' });
        } else {
          for (let i = -40; i <= 40; i += 8) world.addBox({ x: x + (x > 0 ? -1.3 : 1.3), z: i, y: 0, w: 0.8, h: 6.4, d: 1.2, material: 'concrete' });
        }
      }

      // ---- warehouse, two open bays ----
      world.addBox({ x: 0, z: -32, y: 0, w: 48, h: 0.05, d: 18, material: 'concrete', collide: false, shadow: false });
      world.addBox({ x: 0, z: -41, y: 0, w: 48, h: 11, d: 1.4, material: 'concrete' });
      world.addBox({ x: -24, z: -32, y: 0, w: 1.4, h: 11, d: 18, material: 'concrete' });
      world.addBox({ x: 24, z: -32, y: 0, w: 1.4, h: 11, d: 18, material: 'concrete' });
      // Front facade segments and lintels
      for (const [x, w] of [[-19, 10], [0, 8], [19, 10]]) {
        world.addBox({ x, z: -23, y: 0, w, h: 11, d: 1, material: 'concrete' });
      }
      for (const x of [-9, 9]) {
        world.addBox({ x, z: -23, y: 6, w: 10, h: 5, d: 1, material: 'concrete' });
        world.addDecoBox({ x, z: -23.58, y: 5.8, w: 10.6, h: 0.35, d: 0.2, material: 'warning', shadow: false });
        for (const sx of [-1, 1]) world.addDecoBox({ x: x + sx * 5.2, z: -23.6, y: 5.8, w: 0.35, h: 5.1, d: 0.2, material: 'warning', shadow: false });
        // Roll-up door texture above the opening.
        world.addDecoBox({ x, z: -23.45, y: 8.4, w: 9.7, h: 2.3, d: 0.08, material: 'metal', shadow: false });
      }
      world.addDecoBox({ x: 0, z: -32, y: 11, w: 48, h: 0.5, d: 18.3, material: 'metal', shadow: true });
      world.addBox({ x: 0, z: -32, y: 11.5, w: 48.4, h: 0.2, d: 18.7, material: 'metal', collide: false });
      // Skylight strips and interior structure.
      for (const x of [-15, 0, 15]) {
        world.addDecoBox({ x, z: -32, y: 10.9, w: 5.5, h: 0.12, d: 10.5, material: 'emissiveLamp', shadow: false });
      }
      for (const x of [-12, 12]) for (const z of [-27, -37]) {
        world.addBox({ x, z, y: 0, w: 0.7, h: 11, d: 0.7, material: 'metal' });
      }
      // Interior shelving and stored freight.
      for (const side of [-1, 1]) {
        const x = side * 20.5;
        for (let z = -39; z <= -25; z += 3.6) {
          world.addBox({ x, z, y: 0, w: 2.2, h: 2.6, d: 3.0, material: 'metal' });
          world.addDecoBox({ x, z, y: 2.6, w: 2.5, h: 0.15, d: 3.3, material: 'metal', shadow: false });
          if (Math.random() > 0.35) world.crate(x, z, 0.85, 2.78, 'wood');
        }
      }
      world.crate(-14, -33, 1.3);
      world.crate(-14.6, -31.9, 0.9);
      world.crate(13, -35, 1.2);
      world.crate(14.2, -34, 0.8);
      world.crate(0, -37, 1.1);
      world.barrel(-21.5, -29);
      world.barrel(-21.5, -28);
      world.barrel(21.5, -36);
      // Warehouse lights
      for (const x of [-12, 12]) {
        const light = new THREE.PointLight(0xd9e6e8, 18, 22, 2);
        light.position.set(x, 7.2, -32);
        world.extraObjects.push(light);
        world.scene.add(light);
        world.addDecoBox({ x, z: -32, y: 7.25, w: 1.0, h: 0.08, d: 0.35, material: 'emissiveLamp', shadow: false });
      }

      // ---- container yard ----
      world.container(-9, 3, 8, 0, 'containerBlue');
      world.container(9, 3, 8, 0, 'containerRed');
      world.container(-9, 13, 8, 0, 'containerGreen');
      world.container(9, 13, 8, 0, 'containerBlue');
      world.container(-9, 3, 8, 0, 'containerRed', 2.6);
      world.container(-9, 13, 8, 0, 'containerRed', 2.6);
      world.container(22, -14, 6, Math.PI / 2, 'containerGreen');
      world.container(-24, 30, 6, Math.PI / 2, 'containerRed');
      // Container yard lamps and cable reels.
      world.lampPost(-4, 9, 5.5);
      world.lampPost(4, 19, 5.5);
      for (const [x, z] of [[0, 0], [0, 22]]) {
        world.addCylinder({ x, z, y: 0, radius: 0.75, h: 0.22, material: 'woodDark', segments: 12, rx: 0.03 });
        world.addCylinder({ x, z, y: 0.24, radius: 0.45, h: 0.18, material: 'black', segments: 10, collide: false });
      }

      // ---- silos and pipes ----
      for (const z of [-8, 2]) {
        world.addCylinder({ x: -33, z, y: 0, radius: 3.6, radiusTop: 3.6, h: 13, material: 'metal', segments: 18, collide: true });
        world.addCylinder({ x: -33, z, y: 13, radius: 3.7, radiusTop: 1.4, h: 2.2, material: 'metal', segments: 18, collide: false });
        for (const y of [2.2, 6.0, 9.8]) {
          world.addCylinder({ x: -33, z, y, radius: 3.67, h: 0.18, material: 'rust', segments: 18, collide: false });
        }
      }
      world.addCylinderBetween({ x: -33, y: 9.5, z: -4.4 }, { x: -33, y: 9.5, z: -1.6 }, 0.35, 'metal', 10);
      for (const y of [4.0, 8.0]) {
        world.addCylinderBetween({ x: -33, y, z: 5.6 }, { x: -24, y, z: 13 }, 0.24, 'rust', 8);
      }
      world.addCylinder({ x: -23.5, z: 13, y: 0, radius: 0.35, h: 8, material: 'metal', segments: 10, collide: true });
      world.addDecoBox({ x: -24, z: 13, y: 0, w: 1.4, h: 0.55, d: 1.4, material: 'warning', shadow: false });

      // ---- south factory shed / loading area ----
      world.addBox({ x: 25, z: 32, y: 0, w: 14, h: 6.5, d: 10, material: 'brick' });
      world.addDecoBox({ x: 25, z: 32, y: 6.5, w: 14.6, h: 0.35, d: 10.6, material: 'metal' });
      world.addDecoBox({ x: 25, z: 27.3, y: 0, w: 3.4, h: 2.6, d: 0.25, material: 'woodDark', shadow: false });
      world.addDecoBox({ x: 25, z: 26.8, y: 2.8, w: 5.2, h: 3.7, d: 0.18, material: 'warning', shadow: false });
      world.addBox({ x: 25, z: 26.6, y: 0, w: 15, h: 0.35, d: 1.6, material: 'concrete', collide: false });
      world.crate(20, 34, 1.3);
      world.crate(21.2, 34.2, 0.85);
      world.barrel(31, 35);
      world.barrel(30.2, 35.6);
      world.lampPost(25, 24.5, 6);

      // ---- forklift ----
      world.addBox({ x: 14, z: 24, y: 0.18, w: 2.6, h: 1.05, d: 1.5, material: 'warning' });
      world.addBox({ x: 13.4, z: 24, y: 1.23, w: 0.9, h: 0.6, d: 1.15, material: 'black', collide: false });
      world.addDecoBox({ x: 12.4, z: 24, y: 0.2, w: 0.28, h: 2.7, d: 0.28, material: 'metal' });
      for (const sz of [-0.5, 0.5]) world.addDecoBox({ x: 11.2, z: 24 + sz, y: 0, w: 2.2, h: 0.12, d: 0.16, material: 'metal' });
      for (const [sx, sz] of [[-0.9, -0.62], [0.9, -0.62], [-0.9, 0.62], [0.9, 0.62]]) {
        world.addCylinder({ x: 14 + sx, z: 24 + sz, y: 0, radius: 0.4, h: 0.35, material: 'black', segments: 10, rx: Math.PI / 2, collide: false });
      }
      world.addColliderBox(12.7, 15.3, 23.1, 24.9, 0, 2.9);

      // ---- generator, pallets, drums ----
      world.addBox({ x: -18, z: 22, y: 0, w: 3.2, h: 1.6, d: 1.8, material: 'metal' });
      world.addDecoBox({ x: -18, z: 21.05, y: 0.3, w: 2.2, h: 0.9, d: 0.12, material: 'warning', shadow: false });
      for (let i = 0; i < 3; i++) world.addDecoBox({ x: -18, z: 22, y: 1.62 + i * 0.16, w: 3.3, h: 0.07, d: 1.9, material: 'metal', shadow: false });
      world.addBox({ x: 7, z: 33, y: 0, w: 2.2, h: 0.22, d: 1.6, material: 'wood' });
      world.addBox({ x: 7.2, z: 33.3, y: 0.22, w: 2.0, h: 0.2, d: 1.4, material: 'wood' });
      for (const [x, z] of [[-14, 33], [-13, 34], [-15, 34]]) world.barrel(x, z);
      for (const [x, z] of [[-4, 34], [-3.2, 34.8], [-4.8, 34.8]]) world.barrel(x, z, 0, 'metal');
      world.sandbagWall(-4, 28, 3.6, 0, 3);
      world.sandbagWall(9, -8, 3.4, 0, 2);
      world.sandbagWall(-9, 19.5, 3.2, Math.PI / 2, 3);

      // ---- fencing and pipes around east warehouse side ----
      world.fence(33, -8, 33, 10, 2.3);
      world.fence(-38, 18, -38, 34, 2.2);
      world.addBox({ x: -24, z: 37, y: 0, w: 4, h: 1.2, d: 1.2, material: 'concrete' });
      world.addCylinderBetween({ x: 21, y: 5.4, z: -23 }, { x: 33, y: 4.2, z: -10 }, 0.24, 'metal', 8);
      world.addCylinderBetween({ x: 33, y: 4.2, z: -10 }, { x: 33, y: 4.2, z: 8 }, 0.24, 'metal', 8);

      // ---- distant industrial skyline ----
      for (const [x, z, w, d, h] of [[-58, -30, 18, 22, 16], [58, -24, 20, 24, 14], [-56, 30, 16, 20, 12], [58, 34, 18, 18, 15], [0, -56, 34, 14, 18]]) {
        world.addBox({ x, z, y: 0, w, h, d, material: 'concrete', collide: false, shadow: false });
      }
      for (const [x, z] of [[-50, -12], [52, 10]]) {
        world.addCylinder({ x, z, y: 0, radius: 1.5, radiusTop: 1.0, h: 24, material: 'brick', segments: 10, collide: false, shadow: false });
      }
      world.rubbleField(-38, -25, 3, 12);
      world.rubbleField(38, 22, 3, 12);
      world.planter(-8, 39, 1.3);
      world.planter(8, 39, 1.3);
    },
  },
};

export function createMap(scene, mapId, qualitySettings = CONFIG.quality.medium) {
  const definition = MAPS[mapId] || MAPS.old_quarter;
  // Clear any previous map lights/fog children from a prior match.
  scene.clear();
  const sky = createSky(scene, definition.theme);
  const lights = createLighting(scene, definition.theme, qualitySettings);
  setTextureAnisotropy(qualitySettings.anisotropy);
  const world = new World(scene, definition.bounds);
  definition.build(world);
  world.finalize();
  const nav = new NavGraph(definition.navNodes, world, { radius: 0.38 });
  return { definition, world, nav, sky, lights };
}

export function getSpawn(mapRuntime, team, mode, spawnIndex = 0) {
  const { definition } = mapRuntime;
  const pool = mode === 'ffa' ? definition.ffaSpawns : (definition.spawns[team] || definition.spawns.CT);
  if (!pool.length) return { x: 0, z: 0, y: 0 };
  const spawn = pool[spawnIndex % pool.length];
  return { x: spawn.x, z: spawn.z, y: spawn.y ?? 0 };
}
