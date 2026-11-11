import * as THREE from 'three';
import { MapBuilder } from './builder.js';

// Industrial Complex — two enterable warehouses, a freight yard, container stacks,
// silos and a raised loading dock. Cool dusk light with warm sodium floodlights.
export function buildIndustrial(scene, materials) {
  const b = new MapBuilder(scene, materials, 'industrial');
  b.bounds = { minX: -40, maxX: 40, minZ: -35, maxZ: 35 };

  b.ground('concreteDark', 260, -0.04);
  b.ground('asphalt', 96, 0.0);
  // Painted yard markings and drain channels.
  for (let i = -3; i <= 3; i++) {
    b.box(i * 7, 0.025, 4, 0.18, 0.02, 54, 'yellow', { solid: false, cast: false });
  }
  for (const z of [-20, 5, 26]) {
    b.box(-1, 0.025, z, 47, 0.02, 0.18, 'hazard', { solid: false, cast: false });
  }
  b.box(-1, 0.02, 4, 50, 0.01, 0.45, 'dark', { cast: false, solid: false });

  // Perimeter: concrete base with corrugated fence panels.
  const wall = (x, z, w, d) => {
    b.box(x, 1.2, z, w, 2.4, d, 'concreteDark', { materialKey: 'concrete' });
    b.box(x, 3.6, z, w, 4.8, d * 0.6, 'metal', { cast: false, materialKey: 'metal' });
    b.box(x, 6.1, z, w + 0.2, 0.2, d + 0.25, 'metalDark', { cast: false });
  };
  wall(0, -36, 82, 1.0);
  wall(0, 36, 82, 1.0);
  wall(-41, 0, 1.0, 72);
  wall(41, 0, 1.0, 72);
  for (let i = -4; i <= 4; i++) {
    b.box(i * 9.8, 4.0, -35.2, 0.35, 8, 0.9, 'metalDark', { cast: false });
    b.box(i * 9.8, 4.0, 35.2, 0.35, 8, 0.9, 'metalDark', { cast: false });
  }

  // ── West warehouse (enterable) ──────────────────────────────────────────
  const wh = { minX: -35, maxX: -10, minZ: -22, maxZ: 2, h: 10.5 };
  const wallH = wh.h;
  b.box(-22.5, wallH / 2, -22, 25, wallH, 0.7, 'metal', { materialKey: 'metal' });
  b.box(-35, wallH / 2, -10, 0.7, wallH, 24, 'metal', { materialKey: 'metal' });
  // East wall with a wide bay opening (z -9 .. -1).
  b.box(-10, wallH / 2, -15.5, 0.7, wallH, 13, 'metal', { materialKey: 'metal' });
  b.box(-10, wallH / 2, 0.5, 0.7, wallH, 3, 'metal', { materialKey: 'metal' });
  b.box(-10, 8.9, -5, 0.7, 3.2, 8, 'metalDark', { materialKey: 'metal' });
  // South wall with a 10 m opening.
  b.box(-30.5, wallH / 2, 2, 9, wallH, 0.7, 'metal', { materialKey: 'metal' });
  b.box(-13, wallH / 2, 2, 6, wallH, 0.7, 'metal', { materialKey: 'metal' });
  b.box(-21, 8.9, 2, 10, 3.2, 0.7, 'metalDark', { materialKey: 'metal' });
  // Roof and skylights.
  b.box(-22.5, wallH + 0.35, -10, 25.6, 0.7, 24.6, 'metalDark', { materialKey: 'metal' });
  for (let i = 0; i < 4; i++) {
    b.box(-30 + i * 5.2, wallH + 0.04, -10, 2.6, 0.08, 8, 'windowLit', { solid: false, cast: false });
  }
  // Interior floor, columns, shelving and light fixtures.
  b.surface(-22.5, -10, 24.4, 23.4, 0.045, 'concrete', { materialKey: 'concrete' });
  for (const [x, z] of [[-30, -18], [-16, -18], [-30, -3], [-16, -3]]) {
    b.box(x, wallH / 2, z, 0.45, wallH, 0.45, 'metalDark', { cast: false });
  }
  for (let i = 0; i < 4; i++) {
    b.box(-29 + i * 4.3, wallH - 0.7, -10, 0.16, 0.12, 18, 'lamp', { solid: false, cast: false });
    b.box(-29 + i * 4.3, wallH - 0.45, -10, 0.6, 0.10, 18, 'metalDark', { solid: false, cast: false });
  }
  b.addLight(0xd9e5d2, 17, 22, -22, 7.6, -8);
  b.addLight(0xffd49a, 11, 18, -27, 6.5, -16);
  // Shelving rows.
  for (const x of [-29, -24.5]) {
    for (const z of [-16, -8, 0]) {
      b.box(x, 1.6, z, 1.1, 3.2, 4.4, 'metalDark', { materialKey: 'metal' });
      for (let s = 0; s < 3; s++) b.box(x, 0.7 + s * 1.05, z, 1.25, 0.08, 4.2, 'metal', { solid: false, cast: false });
    }
  }
  for (const [x, z, s] of [[-24, -18, 1.2], [-24, -16.6, 0.8], [-14, -17, 1.1], [-14, 0.2, 1.0], [-28, 0.2, 1.3]]) b.crate(x, z, s);
  b.barrel(-12.5, -17, 'rust'); b.barrel(-12.5, -15.9, 'metal');
  // Forklift silhouette inside the warehouse.
  forklift(b, -19.5, -13.5, Math.PI * 0.5);
  // Loading bay numbers.
  b.sign('BAY 01', -9.55, 5.6, -5, 3.4, 0.7, Math.PI / 2);
  b.sign('BAY 02', -21, 5.7, 2.4, 3.4, 0.7, 0);
  b.sign('STORAGE', -17.5, 6.0, -22.4, 4.2, 0.8, Math.PI);

  // ── East warehouse (enterable, open west face) ──────────────────────────
  b.box(23.5, 4.5, 6, 23, 9, 0.6, 'metal', { materialKey: 'metal' });             // north
  b.box(23.5, 4.5, 28, 23, 9, 0.6, 'metal', { materialKey: 'metal' });            // south
  b.box(35, 4.5, 17, 0.6, 9, 22, 'metal', { materialKey: 'metal' });              // east
  b.box(12, 4.5, 7.2, 0.6, 9, 2.4, 'metal', { materialKey: 'metal' });            // west pier
  b.box(12, 4.5, 26.8, 0.6, 9, 2.4, 'metal', { materialKey: 'metal' });
  b.box(12, 8.2, 17, 0.6, 1.6, 17.2, 'metalDark', { materialKey: 'metal' });
  b.box(23.5, 9.35, 17, 23.6, 0.7, 22.6, 'metalDark', { materialKey: 'metal' });
  b.surface(23.5, 17, 22.4, 21.4, 0.05, 'concrete', { materialKey: 'concrete' });
  for (let i = 0; i < 3; i++) {
    b.box(17 + i * 6, 8.75, 17, 4.2, 0.08, 3.0, 'windowLit', { solid: false, cast: false });
    b.box(17 + i * 6, 8.55, 17, 0.1, 0.08, 14, 'lamp', { solid: false, cast: false });
  }
  b.addLight(0xcfe0d2, 14, 20, 23, 7.6, 17);
  for (const x of [18, 24.5]) {
    for (const z of [10, 24]) {
      b.box(x, 2.2, z, 1.0, 4.4, 3.8, 'metalDark', { materialKey: 'metal' });
      for (let s = 0; s < 2; s++) b.box(x, 1.2 + s * 1.5, z, 1.2, 0.1, 3.6, 'metal', { solid: false, cast: false });
    }
  }
  for (const [x, z, s] of [[29, 10, 1.3], [30.3, 11, 0.9], [30, 23.5, 1.15], [17, 20, 1.0]]) b.crate(x, z, s);
  b.sign('FREIGHT CO.', 22, 6.2, 5.6, 5.4, 1.0, Math.PI);

  // ── Yard: containers, trucks, loading dock, silos ───────────────────────
  const container = (x, z, rotY, color, y = 0, length = 6.1) => {
    const m = color;
    b.box(x, y + 1.32, z, length, 2.64, 2.5, m, { rotY, materialKey: 'metal' });
    for (let i = -2; i <= 2; i++) {
      const off = i * 1.1;
      const dx = Math.cos(rotY) * off, dz = Math.sin(rotY) * off;
      b.box(x + dx, y + 1.32, z + dz, 0.12, 2.55, 2.56, 'metalDark', { solid: false, cast: false, rotY });
    }
    const ex = Math.cos(rotY) * length / 2, ez = Math.sin(rotY) * length / 2;
    b.box(x + ex, y + 1.32, z + ez, 0.1, 2.45, 2.3, 'metalDark', { solid: false, cast: false, rotY });
    b.box(x + ex, y + 0.2, z + ez, 0.3, 0.2, 2.4, 'metal', { solid: false, cast: false, rotY });
  };
  container(2, -16, 0, 'rust');
  container(6.5, -11, Math.PI / 2, 'blue');
  container(2, -16, 0, 'orange', 2.72);
  container(2, 15, 0, 'green');
  container(-3, 20, Math.PI / 2, 'rust');
  container(7, 24, 0, 'blue', 0, 5.2);
  container(7, 24, 0, 'green', 2.72, 5.2);
  container(-6, -4, Math.PI / 2, 'green');
  container(-4, 28, Math.PI / 2, 'orange');

  // Loading dock with steps and rails.
  b.box(2, 0.6, -28, 14, 1.2, 6.2, 'concrete', { materialKey: 'concrete' });
  b.box(2, 1.24, -28, 14.2, 0.1, 6.4, 'concreteDark', { cast: false });
  for (let i = 0; i < 5; i++) {
    b.box(9.8 + i * 0.72, 0.12 + i * 0.24, -24.5, 0.75, 0.24, 2.4, 'concrete', { walkable: true, materialKey: 'concrete' });
  }
  for (let i = 0; i <= 4; i++) {
    b.box(-4 + i * 0.65, 1.8, -25.1, 0.08, 1.0, 0.08, 'metalDark', { solid: false, cast: false });
  }
  b.box(0, 1.8, -25.1, 6.2, 0.08, 0.08, 'metalDark', { solid: false, cast: false });
  for (const [x, z, s] of [[-3, -29, 1.2], [0.5, -29, 1.0], [0.5, -30.2, 0.9], [4.5, -28.5, 1.1]]) b.crate(x, z, s, 1.21);
  // Manual stair/dock nav nodes.
  b.extraNavNodes = [
    { x: 12.4, y: 0, z: -24.5 }, { x: 11.5, y: 0.2, z: -24.5 }, { x: 10.7, y: 0.44, z: -24.5 },
    { x: 9.9, y: 0.68, z: -24.5 }, { x: 9.1, y: 0.92, z: -24.5 }, { x: 8.2, y: 1.18, z: -24.5 },
    { x: 6.5, y: 1.2, z: -27 }, { x: 1.5, y: 1.2, z: -29 },
    // Warehouse doorways to guarantee connectivity.
    { x: -12, y: 0, z: -5 }, { x: -8, y: 0, z: -5 },
    { x: -21, y: 0, z: 0 }, { x: -21, y: 0, z: 4 },
    { x: 10, y: 0, z: 16 }, { x: 14, y: 0, z: 16 },
  ];

  // Silos and tank farm in the south-west corner.
  for (const [x, z, r, h] of [[-27, 20, 3.2, 13], [-20, 26, 2.6, 11], [-31, 28, 2.4, 9]]) {
    b.cylinder(x, h / 2, z, r, h, 'metal', { segments: 14, materialKey: 'metal' });
    b.sphere(x, h, z, r, 'metalDark', { segments: 12 });
    b.cylinder(x, h * 0.55, z, r + 0.08, 0.22, 'rust', { segments: 14, solid: false, cast: false });
    b.cylinder(x, h * 0.8, z, r + 0.08, 0.16, 'rust', { segments: 14, solid: false, cast: false });
  }
  b.cylinder(-23.5, 6.8, 23, 0.25, 13, 'metalDark', { segments: 8, solid: false, cast: false, rotZ: 0.08 });
  b.cylinder(-23.5, 6.8, 23, 0.25, 13, 'metalDark', { segments: 8, solid: false, cast: false, rotX: 0.08 });
  b.box(-28, 1.7, 23.5, 4.2, 3.4, 3.6, 'rust', { materialKey: 'metal' });
  b.sign('FUEL', -27.8, 4.0, 23.5, 2.2, 0.5, Math.PI);
  b.sign('NO SMOKING', -27.8, 4.7, 23.5, 3.0, 0.5, Math.PI);

  // Forklift, truck, pallets and barrels around the yard.
  forklift(b, 6, 8.5, -Math.PI * 0.35);
  truck(b, 15, -8, 0);
  for (const [x, z, rot] of [[-6, 10, 0.2], [-7.5, 11.5, -0.4], [18, 2, 0]]) {
    b.box(x, 0.16, z, 2.2, 0.18, 1.8, 'wood', { rotY: rot });
    b.crate(x, z, 0.85, 0.65, rot);
  }
  for (const [x, z] of [[-8, -19], [-7, -18], [14, 4], [15.2, 4.6], [9, 30], [8, 31.2], [-38, 5]]) b.barrel(x, z, Math.random() > 0.5 ? 'rust' : 'metal');
  // Tire stacks.
  for (const [x, z] of [[-37, -10], [13, -16]]) {
    for (let i = 0; i < 3; i++) b.cylinder(x, 0.16 + i * 0.3, z, 0.55, 0.28, 'black', { segments: 12, solid: i === 0, cast: true });
  }

  // Gantry crane over the yard.
  for (const x of [-7, 9]) {
    b.box(x, 4.5, 3, 0.55, 9, 0.55, 'yellow', { materialKey: 'metal' });
    b.box(x, 0.35, 3, 1.4, 0.7, 1.4, 'concreteDark', { cast: false });
  }
  b.box(1, 9.2, 3, 16.6, 0.7, 1.0, 'yellow', { materialKey: 'metal' });
  b.box(1, 8.7, 3, 0.18, 1.0, 0.18, 'metalDark', { solid: false, cast: false });
  b.box(1, 8.1, 3, 0.8, 0.4, 0.8, 'metalDark', { solid: false, cast: false });

  // Floodlight towers.
  for (const [x, z] of [[-38, -20], [38, 8], [-38, 30], [10, 33]]) {
    b.cylinder(x, 4.5, z, 0.12, 9, 'metalDark', { segments: 6, solid: false, cast: false });
    b.box(x, 9.0, z, 0.9, 0.5, 0.45, 'metalDark', { solid: false });
    b.box(x, 8.95, z + 0.24, 0.7, 0.32, 0.1, 'lamp', { solid: false, cast: false });
    b.addLight(0xffc173, 12, 20, x, 8.8, z);
  }
  b.addLight(0xc6d9e3, 9, 24, 3, 8.5, -5);

  // Container yard signage and prop details.
  b.sign('SECTOR 7', 34.4, 5.4, 17, 4.6, 0.9, -Math.PI / 2);
  b.sign('LOADING', 9.4, 3.2, -31.8, 4.0, 0.7, 0);
  b.sign('CAUTION', -10.6, 3.2, -5, 2.8, 0.62, -Math.PI / 2);
  b.sign('FREIGHT YARD', -1, 3.2, 35.6, 5.6, 0.9, Math.PI);

  // Chimney and distant industrial skyline.
  b.cylinder(36, 12, -31, 2.2, 24, 'brickDark', { segments: 12, solid: false, cast: false });
  b.cylinder(36, 24.3, -31, 2.4, 0.8, 'metalDark', { segments: 12, solid: false, cast: false });
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    const r = 55 + Math.random() * 18;
    const h = 5 + Math.random() * 14;
    b.box(Math.cos(a) * r, h / 2, Math.sin(a) * r, 7 + Math.random() * 10, h, 7 + Math.random() * 8, i % 3 ? 'concreteDark' : 'rust', { solid: false, cast: false, receive: false });
  }

  // Spawns: CT on the west yard, T on the east side.
  for (const [x, z] of [[-36, 9], [-34, 6], [-37, 13], [-33, 11], [-36, 16],
    [-38, -2], [-31, 8], [-32, 14], [-38, 18]]) b.spawn('CT', x, z);
  for (const [x, z] of [[36, -5], [34, -8], [37, 0], [33, -2], [36, 3],
    [38, -10], [32, -12], [38, 4], [31, 0]]) b.spawn('T', x, z);
  for (const [x, z] of [[0, -32], [0, 32], [-36, -28], [36, 31], [0, 0], [-6, 4], [18, 4]]) b.spawnAny(x, z);
  b.spawnYaw = { CT: -Math.PI / 2, T: Math.PI / 2 };

  // Dusk lighting.
  const hemi = new THREE.HemisphereLight(0xa8bdcb, 0x3e3d35, 1.25);
  b.root.add(hemi);
  b.root.add(new THREE.AmbientLight(0x515a5c, 0.4));
  const sun = new THREE.DirectionalLight(0xffc286, 1.9);
  sun.position.set(34, 30, 20);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -56;
  sun.shadow.camera.right = 56;
  sun.shadow.camera.top = 56;
  sun.shadow.camera.bottom = -56;
  sun.shadow.camera.far = 120;
  sun.shadow.bias = -0.0008;
  sun.shadow.normalBias = 0.025;
  sun.target.position.set(0, 0, 0);
  b.root.add(sun);
  b.root.add(sun.target);
  b.sun = sun;

  b.sky('#3e566b', '#b08d6e', '#595950', '#ffc079', new THREE.Vector3(0.65, 0.18, 0.45));
  b.fog = { color: 0x8f9290, near: 42, far: 145 };
  b.cinematic = { center: new THREE.Vector3(1, 2, 0), radius: 38, height: 13, speed: 0.028 };

  return b.finalize({ navSpacing: 4.4 });
}

function forklift(b, x, z, rotY) {
  b.box(x, 0.62, z, 2.1, 1.0, 1.15, 'yellow', { rotY, materialKey: 'metal' });
  b.box(x, 1.25, z, 0.8, 1.0, 1.0, 'metalDark', { solid: false, rotY, cast: true });
  b.box(x, 1.7, z, 1.05, 0.12, 1.15, 'metalDark', { solid: false, rotY, cast: false });
  b.box(x - 1.35, 0.75, z, 0.25, 1.5, 0.25, 'metalDark', { solid: false, rotY, cast: false });
  b.box(x - 0.45, 0.28, z, 0.4, 0.55, 0.4, 'black', { solid: false, rotY, cast: false });
  for (const s of [-1, 1]) {
    for (const dz of [-0.9, 0.9]) {
      b.cylinder(x + Math.cos(rotY) * dz, 0.35, z + Math.sin(rotY) * dz, 0.35, 0.24, 'black', { segments: 10, rotZ: Math.PI / 2, solid: false, cast: false });
    }
  }
}

function truck(b, x, z, rotY) {
  b.box(x, 1.2, z, 6.4, 1.6, 2.4, 'green', { rotY, materialKey: 'metal' });
  b.box(x + 2.2, 1.7, z, 1.8, 1.9, 2.3, 'metalDark', { rotY, cast: false });
  b.box(x - 1.5, 2.4, z, 3.4, 1.0, 2.2, 'canvasGreen', { solid: false, rotY, cast: false });
  for (const dx of [-2.2, 0, 2.4]) for (const dz of [-1.25, 1.25]) {
    b.cylinder(x + Math.cos(rotY) * dx, 0.46, z + Math.sin(rotY) * dz, 0.46, 0.28, 'black', { segments: 12, rotZ: Math.PI / 2, solid: false, cast: false });
  }
}
