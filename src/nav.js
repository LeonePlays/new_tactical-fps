// Navigation graph, grid sampling and A* pathfinding for bots.
import { isSpawnFree, segmentBlocked, supportHeight } from './physics.js';

export class NavGraph {
  constructor(nodes = []) {
    this.nodes = nodes;
    this.nextId = nodes.length;
  }

  static build(world, { spacing = 4.6, margin = 2.4, maxLink = 8.2 } = {}) {
    const nodes = [];
    const { minX, maxX, minZ, maxZ } = world.bounds;
    for (let x = minX + margin; x <= maxX - margin; x += spacing) {
      for (let z = minZ + margin; z <= maxZ - margin; z += spacing) {
        const jitterX = ((Math.round(z * 7) % 5) - 2) * 0.16;
        const jitterZ = ((Math.round(x * 5) % 5) - 2) * 0.16;
        const px = x + jitterX, pz = z + jitterZ;
        if (!isSpawnFree(world, px, pz, 0.52)) continue;
        const y = supportHeight(world, px, pz, 0, 0.38, 0.42);
        nodes.push({ id: 0, x: px, y, z: pz, neighbors: [] });
      }
    }

    // Explicit nodes supplied by maps are appended (used for raised platforms).
    for (const n of world.extraNavNodes || []) {
      if (!isSpawnFree(world, n.x, n.z, 0.45) && !n.force) continue;
      nodes.push({ id: 0, x: n.x, y: n.y ?? supportHeight(world, n.x, n.z, n.y ?? 0, .38, .5), z: n.z, neighbors: [] });
    }

    nodes.forEach((n, i) => { n.id = i; });

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(b.x - a.x, b.z - a.z);
        if (d > maxLink || d < 0.5) continue;
        if (Math.abs(a.y - b.y) > 0.65) continue;
        if (segmentBlocked(world, a, b, 0.4)) continue;
        a.neighbors.push({ node: b, cost: d });
        b.neighbors.push({ node: a, cost: d });
      }
    }

    // Keep only the largest connected component so every path is usable.
    const seen = new Set();
    let best = [];
    for (const n of nodes) {
      if (seen.has(n.id)) continue;
      const stack = [n]; const comp = []; seen.add(n.id);
      while (stack.length) {
        const cur = stack.pop(); comp.push(cur);
        for (const e of cur.neighbors) if (!seen.has(e.node.id)) { seen.add(e.node.id); stack.push(e.node); }
      }
      if (comp.length > best.length) best = comp;
    }

    if (best.length) {
      const keep = new Set(best.map(n => n.id));
      const filtered = best.map(n => ({
        ...n,
        neighbors: n.neighbors.filter(e => keep.has(e.node.id)),
      }));
      filtered.forEach((n, i) => { n.id = i; });
      // Rebuild neighbor references after re-indexing.
      const byOld = new Map(best.map((n, i) => [n.id, filtered[i]]));
      for (const n of filtered) {
        n.neighbors = n.neighbors.map(e => {
          const oldNode = best.find(x => x.id === e.node.id) || e.node;
          const target = byOld.get(oldNode.id);
          return target ? { node: target, cost: e.cost } : null;
        }).filter(Boolean);
      }
      return new NavGraph(filtered);
    }
    return new NavGraph(nodes);
  }

  nearest(pos, maxCheck = 12) {
    let best = null, bestD = Infinity;
    for (const n of this.nodes) {
      const dx = n.x - pos.x, dz = n.z - pos.z;
      const d = dx * dx + dz * dz;
      if (d < bestD) { bestD = d; best = n; }
    }
    return best;
  }

  // Find a reachable node close to a point, checking the final approach.
  nearestReachable(world, pos, radius = 1.1) {
    const sorted = [...this.nodes].sort((a, b) =>
      (a.x - pos.x) ** 2 + (a.z - pos.z) ** 2 - ((b.x - pos.x) ** 2 + (b.z - pos.z) ** 2));
    for (let i = 0; i < Math.min(sorted.length, 18); i++) {
      const n = sorted[i];
      if (Math.abs(n.y - (pos.y ?? n.y)) > 1.6) continue;
      if (!segmentBlocked(world, { x: pos.x, y: pos.y ?? n.y, z: pos.z }, n, 0.34)) return n;
    }
    return sorted[0] || null;
  }

  findPath(startPos, endPos) {
    if (!this.nodes.length) return [];
    const start = this.nearest(startPos);
    const end = this.nearest(endPos);
    if (!start || !end) return [];
    if (start === end) return [end];

    const open = [start];
    const came = new Map();
    const gScore = new Map([[start.id, 0]]);
    const fScore = new Map([[start.id, Math.hypot(end.x - start.x, end.z - start.z)]]);
    const closed = new Set();

    while (open.length) {
      let bestIdx = 0;
      for (let i = 1; i < open.length; i++) {
        if ((fScore.get(open[i].id) ?? Infinity) < (fScore.get(open[bestIdx].id) ?? Infinity)) bestIdx = i;
      }
      const current = open.splice(bestIdx, 1)[0];
      if (current === end) {
        const path = [current];
        let cur = current;
        while (came.has(cur.id)) { cur = came.get(cur.id); path.unshift(cur); }
        return path;
      }
      closed.add(current.id);
      for (const edge of current.neighbors) {
        const neighbor = edge.node;
        if (closed.has(neighbor.id)) continue;
        const tentative = (gScore.get(current.id) ?? Infinity) + edge.cost;
        if (tentative >= (gScore.get(neighbor.id) ?? Infinity)) continue;
        came.set(neighbor.id, current);
        gScore.set(neighbor.id, tentative);
        fScore.set(neighbor.id, tentative + Math.hypot(end.x - neighbor.x, end.z - neighbor.z));
        if (!open.includes(neighbor)) open.push(neighbor);
      }
    }
    return [];
  }

  randomNode(rng = Math.random) {
    return this.nodes.length ? this.nodes[Math.floor(rng() * this.nodes.length)] : null;
  }
}
