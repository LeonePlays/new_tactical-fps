// Deterministic collision helpers. Maps are made of analytic AABBs so they are cheap
// to query for movement, line of sight and hit-scan fire.
import * as THREE from 'three';

export function circleOverlapsAABB(x, z, r, c) {
  const cx = x < c.minX ? c.minX : x > c.maxX ? c.maxX : x;
  const cz = z < c.minZ ? c.minZ : z > c.maxZ ? c.maxZ : z;
  const dx = x - cx, dz = z - cz;
  return dx * dx + dz * dz < r * r;
}

export function pointInAABB(x, z, r, c) {
  return x + r > c.minX && x - r < c.maxX && z + r > c.minZ && z - r < c.maxZ;
}

// Ground/support height under a circle. Only surfaces within step reach are considered.
export function supportHeight(world, x, z, feetY, radius = 0.32, step = 0.42) {
  let best = 0;
  for (const c of world.colliders) {
    if (c.maxY > feetY + step + 0.02) continue;
    if (c.maxY <= best) continue;
    if (pointInAABB(x, z, radius * 0.72, c)) best = c.maxY;
  }
  return best;
}

export function collidesAt(world, x, z, feetY, height = 1.7, radius = 0.34, step = 0.42) {
  for (const c of world.colliders) {
    if (c.maxY <= feetY + step + 0.01) continue; // can step onto / stand on it
    if (c.minY >= feetY + height - 0.02) continue; // overhead clearance
    if (pointInAABB(x, z, radius, c)) return true;
  }
  return false;
}

export function isSpawnFree(world, x, z, radius = 0.4) {
  if (!world || !world.colliders) return false;
  return !collidesAt(world, x, z, 0, 1.7, radius, 0.12);
}

// Move a capsule horizontally with axis separation and sub-stepping. Returns actual dx/dz.
export function moveHorizontal(world, pos, dx, dz, height = 1.7, radius = 0.34, step = 0.42) {
  const startX = pos.x, startZ = pos.z;
  const dist = Math.hypot(dx, dz);
  const steps = Math.max(1, Math.ceil(dist / 0.12));
  const sx = dx / steps, sz = dz / steps;
  for (let i = 0; i < steps; i++) {
    const nx = pos.x + sx;
    if (!collidesAt(world, nx, pos.z, pos.y, height, radius, step)) pos.x = nx;
    else if (!collidesAt(world, pos.x + sx * 0.35, pos.z, pos.y, height, radius, step)) pos.x += sx * 0.35;
    const nz = pos.z + sz;
    if (!collidesAt(world, pos.x, nz, pos.y, height, radius, step)) pos.z = nz;
    else if (!collidesAt(world, pos.x, pos.z + sz * 0.35, pos.y, height, radius, step)) pos.z += sz * 0.35;
  }
  return { dx: pos.x - startX, dz: pos.z - startZ };
}

// Segment vs AABB. Returns entry distance and normal.
export function rayAABB(ox, oy, oz, dx, dy, dz, maxDist, c) {
  let tmin = 0, tmax = maxDist;
  let nx = 0, ny = 0, nz = 0;
  // X slab
  if (Math.abs(dx) < 1e-8) {
    if (ox < c.minX || ox > c.maxX) return null;
  } else {
    let t1 = (c.minX - ox) / dx, t2 = (c.maxX - ox) / dx;
    let sign = -1;
    if (t1 > t2) { [t1, t2] = [t2, t1]; sign = 1; }
    if (t1 > tmin) { tmin = t1; nx = sign; ny = 0; nz = 0; }
    if (t2 < tmax) tmax = t2;
    if (tmin > tmax) return null;
  }
  // Y slab
  if (Math.abs(dy) < 1e-8) {
    if (oy < c.minY || oy > c.maxY) return null;
  } else {
    let t1 = (c.minY - oy) / dy, t2 = (c.maxY - oy) / dy;
    let sign = -1;
    if (t1 > t2) { [t1, t2] = [t2, t1]; sign = 1; }
    if (t1 > tmin) { tmin = t1; nx = 0; ny = sign; nz = 0; }
    if (t2 < tmax) tmax = t2;
    if (tmin > tmax) return null;
  }
  // Z slab
  if (Math.abs(dz) < 1e-8) {
    if (oz < c.minZ || oz > c.maxZ) return null;
  } else {
    let t1 = (c.minZ - oz) / dz, t2 = (c.maxZ - oz) / dz;
    let sign = -1;
    if (t1 > t2) { [t1, t2] = [t2, t1]; sign = 1; }
    if (t1 > tmin) { tmin = t1; nx = 0; ny = 0; nz = sign; }
    if (t2 < tmax) tmax = t2;
    if (tmin > tmax) return null;
  }
  if (tmin < 0) return null;
  return { distance: tmin, normal: new THREE.Vector3(nx, ny, nz) };
}

export function raycastWorld(world, origin, dir, maxDist) {
  let hit = null;
  for (const c of world.colliders) {
    const r = rayAABB(origin.x, origin.y, origin.z, dir.x, dir.y, dir.z, maxDist, c);
    if (r && (!hit || r.distance < hit.distance)) {
      hit = { ...r, collider: c };
    }
  }
  return hit;
}

export function rayBlocked(world, from, to, padding = 0.02) {
  const dx = to.x - from.x, dy = to.y - from.y, dz = to.z - from.z;
  const dist = Math.hypot(dx, dy, dz);
  if (dist < 1e-5) return false;
  const inv = 1 / dist;
  const hit = raycastWorld(world, from, { x: dx * inv, y: dy * inv, z: dz * inv }, dist - padding);
  return !!hit;
}

// 2D line-of-walk check used to build navigation links.
export function segmentBlocked(world, a, b, radius = 0.36) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const len = Math.hypot(dx, dz);
  const steps = Math.max(1, Math.ceil(len / 0.5));
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const x = a.x + dx * t, z = a.z + dz * t;
    const y = a.y + (b.y - a.y) * t;
    if (collidesAt(world, x, z, y, 1.7, radius, 0.5)) return true;
  }
  return false;
}

// Ray vs sphere. Returns distance or null.
export function raySphere(ox, oy, oz, dx, dy, dz, cx, cy, cz, radius) {
  const lx = cx - ox, ly = cy - oy, lz = cz - oz;
  const tca = lx * dx + ly * dy + lz * dz;
  if (tca < 0) return null;
  const d2 = lx * lx + ly * ly + lz * lz - tca * tca;
  const r2 = radius * radius;
  if (d2 > r2) return null;
  const thc = Math.sqrt(r2 - d2);
  const t0 = tca - thc, t1 = tca + thc;
  if (t1 < 0) return null;
  return t0 >= 0 ? { distance: t0, point: new THREE.Vector3(ox + dx * t0, oy + dy * t0, oz + dz * t0) } : { distance: t1, point: new THREE.Vector3(ox + dx * t1, oy + dy * t1, oz + dz * t1) };
}
