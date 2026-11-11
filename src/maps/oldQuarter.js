import * as THREE from 'three';
import { MapBuilder } from './builder.js';

// Old Quarter — a sun-bleached Mediterranean old town plaza with flanking alleys,
// market stalls, a fountain landmark and two street gateways.
export function buildOldQuarter(scene, materials) {
  const b = new MapBuilder(scene, materials, 'old-quarter');
  b.bounds = { minX: -36, maxX: 36, minZ: -36, maxZ: 36 };

  b.ground('sand', 240, -0.035);
  b.ground('asphalt', 84, 0.0);
  b.surface(0, 0, 27, 27, 0.055, 'cobble');
  // Raised pavement framing the plaza and main streets.
  for (const [x, z, w, d] of [[0, -13.9, 25, 1.7], [0, 13.9, 25, 1.7], [-13.9, 0, 1.7, 25], [13.9, 0, 1.7, 25]]) {
    b.surface(x, z, w, d, 0.14, 'concrete', { materialKey: 'concrete' });
  }
  // Gutters and drain covers.
  for (const x of [-12.9, 12.9]) {
    b.box(x, 0.06, 0, 0.22, 0.06, 23, 'dark', { cast: false, solid: false });
  }
  for (const [x, z] of [[-10.5, -18], [10.5, 17], [-19, 10.5], [18, -10.5]]) {
    b.cylinder(x, 0.03, z, 0.36, 0.05, 'metalDark', { segments: 8, solid: false, cast: false });
  }

  // Perimeter walls. They read as the edge of the quarter, not a game boundary box.
  b.box(0, 4.2, -37, 76, 8.4, 2, 'plasterWarm', { materialKey: 'concrete' });
  b.box(0, 4.2, 37, 76, 8.4, 2, 'plasterWarm', { materialKey: 'concrete' });
  b.box(-37, 4.2, 0, 2, 8.4, 76, 'plaster', { materialKey: 'concrete' });
  b.box(37, 4.2, 0, 2, 8.4, 76, 'plaster', { materialKey: 'concrete' });
  for (const [x, z, w, d] of [[0, -36.1, 76, 0.4], [0, 36.1, 76, 0.4], [-36.1, 0, 0.4, 76], [36.1, 0, 0.4, 76]]) {
    b.box(x, 0.35, z, w, 0.7, d, 'concreteDark', { cast: false });
    b.box(x, 8.25, z, w + 0.5, 0.25, d + 0.5, 'concrete', { cast: false });
  }
  // Wall buttresses and niche details.
  for (let i = -2; i <= 2; i++) {
    for (const [x, z] of [[i * 12, -35.7], [i * 12, 35.7]]) {
      b.box(x, 3.2, z, 1.0, 6.4, 0.6, 'brick', { cast: false });
      b.box(x, 6.7, z, 1.3, 0.35, 0.9, 'concrete', { cast: false });
    }
  }

  // Building blocks. Each gets two detailed facades facing the streets.
  const buildings = [
    { x: -27, z: -27, w: 14, d: 12, h: 9.2, m: 'plasterWarm', faces: ['e', 's'], door: 'CASA VECCHIA', balcony: 'e' },
    { x: -15.5, z: -29.5, w: 8, d: 7, h: 7.4, m: 'brick', faces: ['e'], door: null },
    { x: -17.5, z: -17, w: 11, d: 9, h: 8.1, m: 'plaster', faces: ['e', 's', 'n'], door: 'PANETTERIA', balcony: 'e' },
    { x: -28.5, z: -15.5, w: 9, d: 11, h: 9.6, m: 'brick', faces: ['e', 's'], door: 'OSTERIA', balcony: null },

    { x: 27, z: -27, w: 14, d: 12, h: 8.6, m: 'plaster', faces: ['w', 's'], door: 'ALBERGO', balcony: 'w' },
    { x: 15.5, z: -30, w: 9, d: 6, h: 6.8, m: 'plasterWarm', faces: ['w'], door: null },
    { x: 17.5, z: -17, w: 11, d: 9, h: 9.1, m: 'brickDark', faces: ['w', 's', 'n'], door: 'FALEGNAME', balcony: 'w' },
    { x: 29, z: -15.5, w: 8, d: 10, h: 7.8, m: 'plaster', faces: ['w', 's'], door: null },

    { x: -27, z: 27, w: 14, d: 12, h: 8.8, m: 'plaster', faces: ['e', 'n'], door: 'MERCATO', balcony: 'e' },
    { x: -15, z: 29.5, w: 8, d: 7, h: 7.2, m: 'plasterWarm', faces: ['e'], door: null },
    { x: -18, z: 17, w: 12, d: 8, h: 8.3, m: 'brick', faces: ['e', 'n'], door: 'TABACCHI', balcony: 'e' },
    { x: -29, z: 15, w: 9, d: 10, h: 9.4, m: 'plaster', faces: ['e', 'n'], door: null },

    { x: 27, z: 27, w: 14, d: 12, h: 9.0, m: 'brick', faces: ['w', 'n'], door: 'CANTINA', balcony: 'w' },
    { x: 15, z: 30, w: 8, d: 6, h: 7.0, m: 'plasterWarm', faces: ['w'], door: null },
    { x: 18, z: 17, w: 12, d: 9, h: 8.4, m: 'plaster', faces: ['w', 'n'], door: 'SARTORIA', balcony: 'w' },
    { x: 29, z: 15, w: 8, d: 10, h: 8.0, m: 'brickDark', faces: ['w', 'n'], door: null },
  ];
  for (const d of buildings) {
    b.building({
      x: d.x, z: d.z, w: d.w, d: d.d, h: d.h, material: d.m,
      faces: d.faces, sign: d.door, balconyFace: d.balcony, litChance: 0.16,
    });
  }

  // Street gateways create landmarks and frame long sightlines.
  for (const z of [-12.9, 12.9]) {
    for (const x of [-10.4, 10.4]) {
      b.box(x, 3.4, z, 0.9, 6.8, 1.0, 'brick', { materialKey: 'brick' });
      b.box(x, 6.95, z, 1.2, 0.3, 1.3, 'concrete', { cast: false });
    }
    b.box(0, 7.5, z, 21.6, 1.0, 0.8, 'brick', { cast: true });
    b.box(0, 8.15, z, 22.2, 0.30, 1.05, 'concrete', { cast: false });
    b.box(0, 7.0, z - Math.sign(z) * 0.48, 3.2, 0.9, 0.10, 'dark', { solid: false, cast: false });
    b.sign(z < 0 ? 'PORTA NORD' : 'PORTA SUD', 0, 7.0, z - Math.sign(z) * 0.56, 3.3, 0.66, z < 0 ? Math.PI : 0);
  }

  // Fountain plaza.
  b.fountain(0, 0, 2.9);
  for (const [x, z, rot] of [[-4.8, 0, Math.PI / 2], [4.8, 0, -Math.PI / 2], [0, -5.2, 0], [0, 5.2, Math.PI]]) {
    // Stone benches facing the fountain.
    b.box(x, 0.43, z, 2.1, 0.18, 0.62, 'wood', { rotY: rot });
    b.box(x, 0.62, z, 2.1, 0.5, 0.16, 'woodDark', { solid: false, rotY: rot, cast: false });
    for (const s of [-0.8, 0.8]) {
      const dx = Math.cos(rot) * s, dz = Math.sin(rot) * s;
      b.box(x + dx, 0.2, z + dz, 0.35, 0.4, 0.5, 'concreteDark', { solid: false, cast: false, rotY: rot });
    }
  }

  // Market stalls and carts around the square.
  b.marketStall(-7.4, 5.2, Math.PI / 2, 'canvasRed');
  b.marketStall(7.4, -5.3, -Math.PI / 2, 'canvasCream');
  b.marketStall(5.7, 6.8, Math.PI * 0.15, 'canvasGreen');
  b.planter(-9.2, 9.3);
  b.planter(9.2, -9.3);
  b.planter(-9.2, -9.2);
  b.planter(9.2, 9.2);

  // Low cover pieces, deliberately placed but not blocking navigation.
  b.sandbag(-3.5, -11.6, 3, 3.2, 0);
  b.sandbag(4.2, 11.4, 2, 2.5, Math.PI);
  b.crate(-10.7, 14.8, 1.1);
  b.crate(-9.5, 14.8, 1.0, 0.5);
  b.crate(10.6, -14.7, 1.15);
  b.barrel(9.7, -15.6, 'rust');
  b.barrel(10.5, -14.9, 'metal');
  b.barrel(-21.5, 8.8, 'rust');
  b.crate(21.8, -8.6, 1.2);
  b.crate(22.9, -8.3, 0.9, 0.45);
  b.crate(-15.8, -9.7, 1.0);
  b.crate(-23.2, 10.2, 1.2);
  b.crate(23.0, 10.4, 1.1);
  b.barrel(15.7, 9.0, 'metal');
  b.sandbag(20.3, 11.5, 2, 2.4, Math.PI / 2);
  b.sandbag(-20.5, -11.8, 2, 2.4, 0);

  // Hand cart landmark near the west lane.
  b.box(-25.4, 0.9, 6.2, 2.4, 0.22, 1.2, 'wood', { rotY: 0.25 });
  b.box(-25.4, 1.35, 6.2, 2.3, 0.7, 0.22, 'woodDark', { solid: false, rotY: 0.25, cast: false });
  for (const x of [-26.2, -24.6]) b.cylinder(x, 0.55, 6.8, 0.48, 0.16, 'woodDark', { segments: 10, rotZ: Math.PI / 2, solid: false });
  b.crate(-25.1, 6.1, 0.62, 1.35, 0.25);

  // Street lamps, cables and overhead lamps.
  for (const [x, z] of [[-10.2, -10.2], [10.2, -10.2], [-10.2, 10.2], [10.2, 10.2], [-21.5, 0], [21.5, 0]]) {
    b.streetLamp(x, z);
  }
  b.cables([[-35, 8.0, -12], [-17, 7.0, -12], [0, 6.5, -12], [17, 7.0, -12], [35, 8.0, -12]]);
  b.cables([[-12, 8.0, -35], [-12, 7.0, -17], [-12, 6.5, 0], [-12, 7.0, 17], [-12, 8.0, 35]]);
  b.cables([[12, 8.0, 35], [12, 7.0, 17], [12, 6.5, 0], [12, 7.0, -17], [12, 8.0, -35]]);

  // Laundry lines add life above the plaza.
  const clothMats = ['canvasCream', 'canvasRed', 'canvasGreen'];
  for (let i = 0; i < 4; i++) {
    b.box(-8 + i * 1.3, 5.2, -12.2, 0.8, 0.03, 0.9, clothMats[i % 3], { solid: false, cast: true, rotX: 1.55, receive: true });
  }

  // Rubble, weeds and distant rooftops outside the walls.
  b.rubbleField(-70, -38, -60, 60, 55);
  b.rubbleField(38, 70, -60, 60, 55);
  b.rubbleField(-38, 38, -70, -38, 34);
  b.rubbleField(-38, 38, 38, 70, 34);
  const skylineMats = ['plasterCool', 'plaster', 'brickDark'];
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2;
    const r = 48 + Math.random() * 22;
    const h = 6 + Math.random() * 11;
    b.box(Math.cos(a) * r, h / 2, Math.sin(a) * r, 8 + Math.random() * 9, h, 8 + Math.random() * 8, skylineMats[i % 3], { solid: false, cast: false, receive: false });
  }
  // A church tower on the north skyline.
  b.box(0, 9, -52, 7, 18, 7, 'plasterWarm', { solid: false, cast: false });
  b.box(0, 18.6, -52, 8.4, 1.2, 8.4, 'concrete', { solid: false, cast: false });
  b.box(0, 23, -52, 3.2, 8, 3.2, 'plasterWarm', { solid: false, cast: false });
  b.box(0, 27.4, -52, 4.0, 0.8, 4.0, 'concrete', { solid: false, cast: false });

  // Spawns. CT enters from the north gate, T from the south gate.
  for (const [x, z] of [[0, -33.4], [-3.8, -33.0], [3.8, -33.0], [-7.0, -34.0], [7.0, -34.0],
    [-10.2, -32.4], [10.2, -32.4], [-5.2, -31.2], [5.2, -31.2]]) b.spawn('CT', x, z);
  for (const [x, z] of [[0, 33.4], [-3.8, 33.0], [3.8, 33.0], [-7.0, 34.0], [7.0, 34.0],
    [-10.2, 32.4], [10.2, 32.4], [-5.2, 31.2], [5.2, 31.2]]) b.spawn('T', x, z);
  // Extra FFA-capable spawn locations around the ring road.
  for (const [x, z] of [[-33, 0], [33, 0], [-30, -8], [30, 8], [-8, 30], [8, -30]]) b.spawnAny(x, z);
  b.spawnYaw = { CT: Math.PI, T: 0 };

  // Lighting: warm late-afternoon sun and cool bounce.
  const hemi = new THREE.HemisphereLight(0xd8d2bd, 0x4a4132, 1.35);
  b.root.add(hemi);
  const amb = new THREE.AmbientLight(0x6b6250, 0.35);
  b.root.add(amb);
  const sun = new THREE.DirectionalLight(0xffd7a2, 2.55);
  sun.position.set(-32, 46, -22);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -52;
  sun.shadow.camera.right = 52;
  sun.shadow.camera.top = 52;
  sun.shadow.camera.bottom = -52;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 130;
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.02;
  sun.target.position.set(0, 0, 0);
  b.root.add(sun);
  b.root.add(sun.target);
  b.sun = sun;

  b.sky('#6e8da8', '#ddc59b', '#a88e6d', '#ffd59d', new THREE.Vector3(-0.5, 0.24, -0.83));
  b.fog = { color: 0xc9b58d, near: 44, far: 150 };
  b.cinematic = { center: new THREE.Vector3(0, 1.5, 0), radius: 34, height: 10.5, speed: 0.035 };

  return b.finalize({ navSpacing: 4.5 });
}
