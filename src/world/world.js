import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { getMaterial, getMaterialUv } from './textures.js';

// ---------------------------------------------------------------------------
// World builder
// Static geometry is collected and merged by material, so a whole street of
// architectural trim costs a handful of draw calls. Collision is kept as
// simple AABB volumes and is deliberately independent from the render mesh.
// ---------------------------------------------------------------------------

const BOX_UV_FACES = [
  [1, 1], [1, 1], [0, 2], [0, 2], [0, 1], [0, 1],
];

export class World {
  constructor(scene, bounds) {
    this.scene = scene;
    this.bounds = bounds;
    this.group = new THREE.Group();
    this.group.name = 'world';
    scene.add(this.group);
    this.colliders = [];
    this.buckets = new Map();
    this.extraObjects = [];
    this.supports = [];
  }

  boxGeometry(w, h, d, uvScale) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const uv = geo.attributes.uv;
    const dimensions = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
    for (let face = 0; face < 6; face++) {
      for (let vertex = 0; vertex < 4; vertex++) {
        const index = face * 4 + vertex;
        const [du, dv] = dimensions[face];
        uv.setXY(index, uv.getX(index) * du * uvScale, uv.getY(index) * dv * uvScale);
      }
    }
    return geo;
  }

  addGeometry(geometry, materialName, matrix, { collide = false, shadow = true } = {}) {
    const material = getMaterial(materialName);
    const geometryCopy = geometry.index ? geometry.toNonIndexed() : geometry.clone();
    geometry.dispose();
    if (matrix) geometryCopy.applyMatrix4(matrix);
    const key = `${materialName}:${shadow ? 1 : 0}`;
    if (!this.buckets.has(key)) this.buckets.set(key, { material, geometries: [], shadow });
    this.buckets.get(key).geometries.push(geometryCopy);
    if (collide) {
      geometryCopy.computeBoundingBox();
      const bb = geometryCopy.boundingBox;
      this.addColliderBox(bb.min.x, bb.max.x, bb.min.z, bb.max.z, bb.min.y, bb.max.y);
    }
  }

  addColliderBox(minX, maxX, minZ, maxZ, minY, maxY, { support = true, tag = '' } = {}) {
    if (maxX - minX < 0.01 || maxZ - minZ < 0.01) return;
    this.colliders.push({ minX, maxX, minZ, maxZ, minY, maxY, support, tag });
  }

  addBox({ x, z, y = 0, w, h, d, material = 'concrete', collide = true, support = true, shadow = true, uv, tag = '' }) {
    const geo = this.boxGeometry(w, h, d, uv ?? getMaterialUv(material));
    const matrix = new THREE.Matrix4().makeTranslation(x, y + h / 2, z);
    this.addGeometry(geo, material, matrix, { shadow });
    if (collide) {
      this.addColliderBox(x - w / 2, x + w / 2, z - d / 2, z + d / 2, y, y + h, { support, tag });
    }
  }

  addDecoBox({ x, z, y = 0, w, h, d, material = 'concrete', rx = 0, ry = 0, rz = 0, shadow = true }) {
    const geo = this.boxGeometry(w, h, d, getMaterialUv(material));
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y + h / 2, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
      new THREE.Vector3(1, 1, 1),
    );
    this.addGeometry(geo, material, matrix, { shadow });
  }

  addCylinder({ x, z, y = 0, radius, radiusTop, h, material = 'metal', segments = 10, collide = true, support = true, rx = 0, ry = 0, rz = 0, shadow = true, uv = 0.5 }) {
    const geo = new THREE.CylinderGeometry(radiusTop ?? radius, radius, h, segments);
    const uvAttr = geo.attributes.uv;
    for (let i = 0; i < uvAttr.count; i++) uvAttr.setXY(i, uvAttr.getX(i) * Math.PI * 2 * radius * uv, uvAttr.getY(i) * h * uv);
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y + h / 2, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
      new THREE.Vector3(1, 1, 1),
    );
    this.addGeometry(geo, material, matrix, { shadow });
    if (collide) {
      const r = Math.max(radius, radiusTop ?? radius);
      this.addColliderBox(x - r, x + r, z - r, z + r, y, y + h, { support });
    }
  }

  addCylinderBetween(a, b, radius, material = 'metal', segments = 8, { collide = false } = {}) {
    const start = new THREE.Vector3(a.x, a.y, a.z);
    const end = new THREE.Vector3(b.x, b.y, b.z);
    const dir = end.clone().sub(start);
    const length = dir.length();
    const geo = new THREE.CylinderGeometry(radius, radius, length, segments);
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    const matrix = new THREE.Matrix4().compose(start.clone().add(end).multiplyScalar(0.5), quat, new THREE.Vector3(1, 1, 1));
    this.addGeometry(geo, material, matrix, { shadow: true });
    if (collide) {
      const r = radius + 0.02;
      this.addColliderBox(Math.min(start.x, end.x) - r, Math.max(start.x, end.x) + r, Math.min(start.z, end.z) - r, Math.max(start.z, end.z) + r, Math.min(start.y, end.y), Math.max(start.y, end.y), { support: false });
    }
  }

  addTorus({ x, z, y = 0, radius = 1.8, tube = 0.24, material = 'stone', segments = 14, arc = Math.PI, rx = 0, ry = 0, rz = 0 }) {
    const geo = new THREE.TorusGeometry(radius, tube, 6, segments, arc);
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
      new THREE.Vector3(1, 1, 1),
    );
    this.addGeometry(geo, material, matrix);
  }

  addSphere({ x, z, y = 0, radius = 1, material = 'foliage', segments = 8, scale = [1, 1, 1] }) {
    const geo = new THREE.IcosahedronGeometry(radius, 1);
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion(),
      new THREE.Vector3(...scale),
    );
    this.addGeometry(geo, material, matrix);
  }

  addPlaneDecal(x, z, w, d, material = 'paintWhite', y = 0.012) {
    this.addBox({ x, z, y, w, h: 0.008, d, material, collide: false, shadow: false });
  }

  // ---- high level reusable props -----------------------------------------

  crate(x, z, size = 1.25, y = 0, material = 'wood') {
    this.addBox({ x, z, y, w: size, h: size, d: size, material });
    this.addDecoBox({ x, z, y: y + size - 0.06, w: size + 0.06, h: 0.09, d: size + 0.06, material: 'woodDark', shadow: false });
    this.addDecoBox({ x, z, y: y + size * 0.48, w: size + 0.04, h: 0.08, d: size + 0.04, material: 'woodDark', shadow: false });
    for (const sx of [-1, 1]) {
      this.addDecoBox({ x: x + sx * (size / 2 + 0.025), z, y: y + 0.08, w: 0.05, h: size - 0.16, d: size * 0.86, material: 'woodDark', shadow: false });
    }
  }

  barrel(x, z, y = 0, material = 'rust') {
    this.addCylinder({ x, z, y, radius: 0.46, h: 1.18, material, segments: 12, uv: 0.7 });
    for (const oy of [0.22, 0.94]) {
      this.addCylinder({ x, z, y: y + oy, radius: 0.485, h: 0.07, material: 'metal', segments: 12, collide: false });
    }
  }

  sandbagWall(x, z, length = 3, rot = 0, height = 3) {
    const rows = height;
    const bagW = 0.8, bagH = 0.34, bagD = 0.5;
    for (let row = 0; row < rows; row++) {
      const count = Math.ceil(length / bagW);
      for (let i = 0; i < count; i++) {
        const local = -length / 2 + bagW / 2 + i * bagW + (row % 2) * bagW * 0.3;
        const ox = Math.cos(rot) * local;
        const oz = Math.sin(rot) * local;
        const geo = new THREE.SphereGeometry(0.44, 7, 5);
        const matrix = new THREE.Matrix4().compose(
          new THREE.Vector3(x + ox, row * bagH + 0.17, z + oz),
          new THREE.Quaternion().setFromEuler(new THREE.Euler(0.05, rot, 0)),
          new THREE.Vector3(0.92, 0.62, 0.74),
        );
        this.addGeometry(geo, 'sandbag', matrix);
      }
    }
    const dx = Math.abs(Math.cos(rot)) * length / 2 + 0.3;
    const dz = Math.abs(Math.sin(rot)) * length / 2 + 0.3;
    this.addColliderBox(x - dx, x + dx, z - dz, z + dz, 0, rows * bagH, { support: true });
  }

  lampPost(x, z, height = 5.2) {
    this.addCylinder({ x, z, y: 0, radius: 0.1, radiusTop: 0.075, h: height, material: 'black', segments: 7, collide: true });
    this.addCylinder({ x, z, y: 0.05, radius: 0.24, h: 0.25, material: 'black', segments: 8, collide: false });
    this.addDecoBox({ x: x + 0.24, z, y: height - 0.25, w: 0.7, h: 0.08, d: 0.08, material: 'black', shadow: false });
    this.addDecoBox({ x: x + 0.55, z, y: height - 0.55, w: 0.26, h: 0.38, d: 0.26, material: 'emissiveLamp', shadow: false });
    const glow = new THREE.PointLight(0xffc582, 9, 9, 2);
    glow.position.set(x + 0.55, height - 0.6, z);
    this.extraObjects.push(glow);
    this.scene.add(glow);
  }

  marketStall(x, z, rot = 0) {
    const cos = Math.cos(rot), sin = Math.sin(rot);
    for (const [lx, lz] of [[-1.5, -1.1], [1.5, -1.1], [-1.5, 1.1], [1.5, 1.1]]) {
      this.addCylinder({ x: x + lx * cos - lz * sin, z: z + lx * sin + lz * cos, y: 0, radius: 0.07, h: 2.5, material: 'woodDark', segments: 6, collide: false });
    }
    this.addDecoBox({ x, z, y: 2.42, w: 3.5, h: 0.12, d: 2.7, material: 'redCloth', ry: rot, rx: 0.08 });
    this.addBox({ x, z, y: 0, w: 2.9, h: 0.9, d: 1.7, material: 'wood', collide: true });
    this.addDecoBox({ x, z, y: 0.9, w: 3.1, h: 0.09, d: 1.9, material: 'woodDark' });
    this.crate(x - 0.7, z, 0.6, 0.98, 'wood');
    this.crate(x + 0.7, z + 0.2, 0.5, 0.98, 'wood');
  }

  planter(x, z, size = 1.6) {
    this.addBox({ x, z, y: 0, w: size, h: 0.5, d: size, material: 'stone' });
    this.addBox({ x, z, y: 0.32, w: size - 0.22, h: 0.2, d: size - 0.22, material: 'dirt', collide: false });
    this.addSphere({ x, z, y: 0.85, radius: 0.65, material: 'foliage', scale: [1.1, 1.25, 1.1] });
    this.addSphere({ x: x + 0.2, z: z - 0.1, y: 1.15, radius: 0.4, material: 'foliage', scale: [1, 1.1, 1] });
  }

  bench(x, z, rot = 0) {
    this.addBox({ x, z, y: 0.42, w: 1.9, h: 0.14, d: 0.55, material: 'wood', collide: false });
    this.addDecoBox({ x, z: z - 0.22, y: 0.55, w: 1.9, h: 0.55, d: 0.1, material: 'wood', ry: rot });
    for (const sx of [-0.75, 0.75]) {
      this.addDecoBox({ x: x + sx, z, y: 0, w: 0.12, h: 0.42, d: 0.5, material: 'metal' });
    }
    this.addColliderBox(x - 1, x + 1, z - 0.35, z + 0.35, 0, 0.95);
  }

  fence(x1, z1, x2, z2, height = 2.1) {
    const dx = x2 - x1, dz = z2 - z1;
    const length = Math.hypot(dx, dz);
    const angle = Math.atan2(dz, dx);
    const posts = Math.max(2, Math.round(length / 2.2) + 1);
    for (let i = 0; i < posts; i++) {
      const t = i / (posts - 1);
      this.addCylinder({ x: x1 + dx * t, z: z1 + dz * t, y: 0, radius: 0.055, h: height, material: 'metal', segments: 6, collide: false });
    }
    for (const y of [0.45, height - 0.2]) {
      this.addDecoBox({ x: (x1 + x2) / 2, z: (z1 + z2) / 2, y, w: length, h: 0.06, d: 0.06, material: 'metal', ry: angle, shadow: false });
    }
    const pad = 0.18;
    this.addColliderBox(Math.min(x1, x2) - pad, Math.max(x1, x2) + pad, Math.min(z1, z2) - pad, Math.max(z1, z2) + pad, 0, height, { support: false });
  }

  container(x, z, len = 6, rot = 0, material = 'containerBlue', y = 0) {
    const width = 2.5, height = 2.6;
    this.addDecoBox({ x, z, y, w: len, h: height, d: width, material, ry: rot });
    // End frames and door bars.
    const cos = Math.cos(rot), sin = Math.sin(rot);
    for (const s of [-1, 1]) {
      const ox = (len / 2 - 0.08) * cos, oz = (len / 2 - 0.08) * sin;
      this.addDecoBox({ x: x + ox, z: z + oz, y, w: 0.16, h: height, d: width, material: 'metal', ry: rot, shadow: false });
    }
    for (const oy of [0.12, height - 0.12]) {
      this.addDecoBox({ x, z, y: y + oy, w: len, h: 0.1, d: width + 0.04, material: 'metal', ry: rot, shadow: false });
    }
    const halfX = Math.abs(cos) * len / 2 + Math.abs(sin) * width / 2;
    const halfZ = Math.abs(sin) * len / 2 + Math.abs(cos) * width / 2;
    this.addColliderBox(x - halfX, x + halfX, z - halfZ, z + halfZ, y, y + height, { support: true });
  }

  building({ x, z, w, d, h, material = 'plaster', roof = 'roof', windows = true, door = true, balcony = false, variant = 0 }) {
    this.addBox({ x, z, w, h, d, material });
    // Cornice
    this.addDecoBox({ x, z, y: h - 0.28, w: w + 0.7, h: 0.28, d: d + 0.7, material: 'stone', shadow: false });
    this.addDecoBox({ x, z, y: h - 0.62, w: w + 0.35, h: 0.16, d: d + 0.35, material: 'stone', shadow: false });
    // Roof slab / parapet
    this.addDecoBox({ x, z, y: h, w: w + 0.2, h: 0.2, d: d + 0.2, material: roof, shadow: true });
    this.addDecoBox({ x, z, y: h + 0.2, w: w + 0.2, h: 0.45, d: 0.35, material: material, shadow: false });
    this.addDecoBox({ x, z: z - d / 2, y: h + 0.2, w: 0.35, h: 0.45, d: d + 0.2, material: material, shadow: false });

    const facade = (axis, sign, length, offsetAxis, wallOffset, yBase) => {
      // axis: 'x' means windows spread along x on a z-facing wall
      const count = Math.max(2, Math.floor(length / 4));
      for (let i = 0; i < count; i++) {
        const t = (i + 0.5) / count - 0.5;
        const along = t * (length - 2.2);
        const px = axis === 'x' ? x + along : x + wallOffset;
        const pz = axis === 'x' ? z + wallOffset : z + along;
        const floors = h > 8 ? 2 : 1;
        for (let floor = 0; floor < floors; floor++) {
          const wy = yBase + floor * 3.3;
          const ww = 1.15, wh = 1.65;
          const fw = axis === 'x' ? ww : 0.16;
          const fd = axis === 'x' ? 0.16 : ww;
          this.addDecoBox({ x: px, z: pz, y: wy, w: fw + 0.3, h: wh + 0.3, d: fd + 0.3, material: 'stone', shadow: false });
          this.addDecoBox({ x: px + (axis === 'x' ? 0 : sign * 0.05), z: pz + (axis === 'x' ? sign * 0.05 : 0), y: wy + 0.15, w: fw, h: wh, d: fd, material: 'darkGlass', shadow: false });
          // sill and lintel
          this.addDecoBox({ x: px, z: pz, y: wy - 0.1, w: axis === 'x' ? ww + 0.5 : 0.32, h: 0.13, d: axis === 'x' ? 0.32 : ww + 0.5, material: 'stone', shadow: false });
          this.addDecoBox({ x: px, z: pz, y: wy + wh + 0.05, w: axis === 'x' ? ww + 0.42 : 0.26, h: 0.2, d: axis === 'x' ? 0.26 : ww + 0.42, material: 'stone', shadow: false });
          // muntin
          this.addDecoBox({ x: px, z: pz, y: wy + wh * 0.5, w: axis === 'x' ? ww : 0.05, h: 0.06, d: axis === 'x' ? 0.05 : ww, material: 'woodDark', shadow: false });
          if (variant % 2 === 0) {
            // shutters either side
            const sx = axis === 'x' ? ww * 0.72 : 0;
            const sz = axis === 'x' ? 0 : ww * 0.72;
            this.addDecoBox({ x: px - sx, z: pz - sz, y: wy + 0.12, w: axis === 'x' ? 0.38 : 0.1, h: wh - 0.24, d: axis === 'x' ? 0.1 : 0.38, material: 'woodDark', shadow: false });
            this.addDecoBox({ x: px + sx, z: pz + sz, y: wy + 0.12, w: axis === 'x' ? 0.38 : 0.1, h: wh - 0.24, d: axis === 'x' ? 0.1 : 0.38, material: 'woodDark', shadow: false });
          }
        }
      }
      if (door) {
        const px = axis === 'x' ? x : x + wallOffset;
        const pz = axis === 'x' ? z + wallOffset : z;
        this.addDecoBox({ x: px, z: pz, y: 0, w: axis === 'x' ? 1.45 : 0.2, h: 2.45, d: axis === 'x' ? 0.2 : 1.45, material: 'woodDark', shadow: false });
        this.addDecoBox({ x: px, z: pz, y: 2.45, w: axis === 'x' ? 1.75 : 0.3, h: 0.18, d: axis === 'x' ? 0.3 : 1.75, material: 'stone', shadow: false });
      }
    };

    if (windows) {
      facade('x', 1, w, 0, d / 2 + 0.06, 2.4 + (variant % 3) * 0.15);
      facade('x', -1, w, 0, -d / 2 - 0.06, 2.4 + (variant % 2) * 0.2);
      facade('z', 1, d, 0, w / 2 + 0.06, 2.4);
      facade('z', -1, d, 0, -w / 2 - 0.06, 2.4);
    }
    if (balcony) {
      const bx = x + w * 0.26;
      const bz = z + d / 2 + 0.65;
      this.addDecoBox({ x: bx, z: bz, y: 3.55, w: 3.2, h: 0.15, d: 1.25, material: 'stone' });
      for (let i = -1; i <= 1; i++) {
        this.addDecoBox({ x: bx + i * 1.25, z: bz + 0.5, y: 3.7, w: 0.08, h: 0.9, d: 0.08, material: 'metal', shadow: false });
      }
      this.addDecoBox({ x: bx, z: bz + 0.5, y: 4.55, w: 3.2, h: 0.07, d: 0.07, material: 'metal', shadow: false });
    }
  }

  archway(x, z, rot = 0, width = 3.8, height = 3.9) {
    const cos = Math.cos(rot), sin = Math.sin(rot);
    for (const s of [-1, 1]) {
      const ox = s * width / 2 * cos, oz = s * width / 2 * sin;
      this.addBox({ x: x + ox, z: z + oz, y: 0, w: 0.65, h: height - 0.5, d: 0.9, material: 'stone' });
    }
    this.addDecoBox({ x, z, y: height - 0.55, w: width + 0.8, h: 0.5, d: 0.95, material: 'stone', ry: rot });
    // The default torus arc is an upper semicircle in the XY plane. Rotating it
    // into the gateway plane (and not flipping it) makes a true arch instead of
    // a half-ring that curves down through the street.
    this.addTorus({ x, z, y: height - 0.55, radius: width / 2, tube: 0.2, material: 'stone', arc: Math.PI, ry: rot });
    this.addDecoBox({ x, z, y: height - 0.35, w: width + 1.0, h: 0.18, d: 1.1, material: 'stone', ry: rot, shadow: false });
  }

  fountain(x, z, radius = 2.5) {
    this.addCylinder({ x, z, y: 0, radius, h: 0.6, material: 'stone', segments: 16, collide: true });
    this.addCylinder({ x, z, y: 0.05, radius: radius - 0.35, h: 0.56, material: 'water', segments: 16, collide: false });
    this.addCylinder({ x, z, y: 0.6, radius: 0.32, h: 1.4, material: 'stone', segments: 10, collide: true });
    this.addCylinder({ x, z, y: 1.7, radius: 0.75, h: 0.22, material: 'stone', segments: 12, collide: false });
    this.addSphere({ x, z, y: 2.05, radius: 0.26, material: 'brass', scale: [1, 1.15, 1] });
  }

  tree(x, z, height = 4.4) {
    this.addCylinder({ x, z, y: 0, radius: 0.2, radiusTop: 0.13, h: height, material: 'woodDark', segments: 7, collide: true });
    this.addSphere({ x, z, y: height + 0.6, radius: 1.5, material: 'foliage', scale: [1, 0.9, 1] });
    this.addSphere({ x: x + 0.8, z: z + 0.3, y: height - 0.1, radius: 1.05, material: 'foliage', scale: [1, 0.9, 1] });
    this.addSphere({ x: x - 0.7, z: z - 0.4, y: height + 0.3, radius: 1.1, material: 'foliage' });
  }

  rubbleField(x, z, radius = 4, count = 14) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * radius;
      const s = 0.2 + Math.random() * 0.65;
      this.addSphere({
        x: x + Math.cos(angle) * dist,
        z: z + Math.sin(angle) * dist,
        y: s * 0.5,
        radius: s,
        material: Math.random() > 0.4 ? 'concrete' : 'stone',
        scale: [1.2, 0.65, 1],
      });
    }
  }

  finalize() {
    for (const [key, { material, geometries, shadow }] of this.buckets) {
      if (!geometries.length) continue;
      const merged = geometries.length === 1 ? geometries[0] : mergeGeometries(geometries, false);
      if (!merged) continue;
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, material);
      mesh.name = `static:${key.split(':')[0]}`;
      mesh.castShadow = shadow;
      mesh.receiveShadow = true;
      mesh.matrixAutoUpdate = false;
      this.group.add(mesh);
      geometries.forEach((g) => { if (g !== merged) g.dispose(); });
    }
    this.buckets.clear();

    // A dark, slightly translucent world floor helps catch any visual gaps.
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(this.bounds.maxX - this.bounds.minX + 30, this.bounds.maxZ - this.bounds.minZ + 30),
      getMaterial('asphalt'),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set((this.bounds.maxX + this.bounds.minX) / 2, -0.02, (this.bounds.maxZ + this.bounds.minZ) / 2);
    ground.receiveShadow = true;
    this.group.add(ground);
  }

  // ---- collision queries ---------------------------------------------------

  collidesCircle(x, z, radius, minY, maxY) {
    for (const c of this.colliders) {
      if (c.maxY <= minY || c.minY >= maxY) continue;
      if (x + radius > c.minX && x - radius < c.maxX && z + radius > c.minZ && z - radius < c.maxZ) return true;
    }
    return false;
  }

  groundAt(x, z, radius, maxY) {
    let height = 0;
    for (const c of this.colliders) {
      if (!c.support) continue;
      if (c.maxY > maxY + 0.001) continue;
      if (x + radius > c.minX && x - radius < c.maxX && z + radius > c.minZ && z - radius < c.maxZ) {
        if (c.maxY > height) height = c.maxY;
      }
    }
    return height;
  }

  pathClear(a, b, radius = 0.42, step = 0.45) {
    const dx = b.x - a.x, dz = b.z - a.z;
    const length = Math.hypot(dx, dz);
    const samples = Math.max(1, Math.ceil(length / 0.7));
    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const x = a.x + dx * t;
      const z = a.z + dz * t;
      const feet = (a.y ?? 0) + ((b.y ?? 0) - (a.y ?? 0)) * t;
      if (this.collidesCircle(x, z, radius, feet + step, feet + 1.7)) return false;
    }
    return true;
  }

  segmentBlocked(a, b) {
    return this.segmentHitFraction(a, b) !== null;
  }

  segmentHitFraction(a, b) {
    let nearest = null;
    const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
    for (const c of this.colliders) {
      let tmin = 0, tmax = 1;
      let hit = true;
      const axes = [
        [a.x, dx, c.minX, c.maxX],
        [a.y, dy, c.minY, c.maxY],
        [a.z, dz, c.minZ, c.maxZ],
      ];
      for (const [origin, dir, min, max] of axes) {
        if (Math.abs(dir) < 1e-7) {
          if (origin < min || origin > max) { hit = false; break; }
        } else {
          let t1 = (min - origin) / dir;
          let t2 = (max - origin) / dir;
          if (t1 > t2) [t1, t2] = [t2, t1];
          tmin = Math.max(tmin, t1);
          tmax = Math.min(tmax, t2);
          if (tmin > tmax) { hit = false; break; }
        }
      }
      if (hit && tmin > 0.001 && (nearest === null || tmin < nearest)) nearest = tmin;
    }
    return nearest;
  }

  clampToBounds(position, radius) {
    position.x = Math.max(this.bounds.minX + radius, Math.min(this.bounds.maxX - radius, position.x));
    position.z = Math.max(this.bounds.minZ + radius, Math.min(this.bounds.maxZ - radius, position.z));
  }

  dispose() {
    for (const light of this.extraObjects) {
      if (light.parent) light.parent.remove(light);
      if (light.dispose) light.dispose();
    }
    this.scene.remove(this.group);
    this.group.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
    });
    this.extraObjects.length = 0;
    this.colliders.length = 0;
  }
}
