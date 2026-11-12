import * as THREE from 'three';

// Map-aware navigation graph with A* pathfinding and string-pulled paths.
// Edges are validated against the actual collision world both at bake time and
// when a bot requests a route, so a graph can never route through a wall.

export class NavGraph {
  constructor(nodes, world, { maxLink = 14, maxRise = 0.52, radius = 0.38 } = {}) {
    this.world = world;
    this.radius = radius;
    this.nodes = nodes.map((node, index) => ({
      index,
      x: node.x,
      z: node.z,
      y: node.y ?? 0,
      tag: node.tag || '',
      links: node.links || [],
      edges: [],
    }));
    this.build();
  }

  build() {
    for (const node of this.nodes) {
      node.edges.length = 0;
    }
    for (let i = 0; i < this.nodes.length; i++) {
      const a = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const b = this.nodes[j];
        if (Math.abs(a.y - b.y) > 0.56) continue;
        const distance = Math.hypot(a.x - b.x, a.z - b.z);
        if (distance > 14.5) continue;
        if (!this.world.pathClear(a, b, this.radius)) continue;
        const weight = distance + Math.abs(a.y - b.y) * 1.5;
        a.edges.push({ to: j, weight });
        b.edges.push({ to: i, weight });
      }
    }
    // Explicit author links are useful around steps and doorways.
    for (const node of this.nodes) {
      for (const other of node.links) {
        if (other < 0 || other >= this.nodes.length) continue;
        if (!node.edges.some((e) => e.to === other)) {
          const b = this.nodes[other];
          const distance = Math.hypot(node.x - b.x, node.z - b.z);
          node.edges.push({ to: other, weight: distance + 0.1 });
          if (!b.edges.some((e) => e.to === node.index)) b.edges.push({ to: node.index, weight: distance + 0.1 });
        }
      }
    }
    this.ensureConnectivity();
  }

  ensureConnectivity() {
    const component = new Array(this.nodes.length).fill(-1);
    let count = 0;
    for (let i = 0; i < this.nodes.length; i++) {
      if (component[i] !== -1) continue;
      const queue = [i];
      component[i] = count;
      while (queue.length) {
        const index = queue.pop();
        for (const edge of this.nodes[index].edges) {
          if (component[edge.to] === -1) {
            component[edge.to] = count;
            queue.push(edge.to);
          }
        }
      }
      count++;
    }
    // Try to bridge any isolated island with the shortest physically valid link.
    while (count > 1) {
      let best = null;
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = 0; j < this.nodes.length; j++) {
          if (component[i] === component[j]) continue;
          const a = this.nodes[i], b = this.nodes[j];
          if (Math.abs(a.y - b.y) > 0.8) continue;
          const d = Math.hypot(a.x - b.x, a.z - b.z);
          if (d > 18) continue;
          if (best && d >= best.d) continue;
          if (!this.world.pathClear(a, b, this.radius)) continue;
          best = { i, j, d };
        }
      }
      if (!best) break;
      const a = this.nodes[best.i], b = this.nodes[best.j];
      a.edges.push({ to: b.index, weight: best.d });
      b.edges.push({ to: a.index, weight: best.d });
      const from = component[b.index];
      for (let k = 0; k < component.length; k++) if (component[k] === from) component[k] = component[best.i];
      count = new Set(component).size;
    }
    this.componentCount = count;
  }

  nearestNode(position, ignoreY = false) {
    let best = null, bestDistance = Infinity;
    for (const node of this.nodes) {
      const dy = ignoreY ? 0 : (node.y - position.y) * 2.2;
      const d = Math.hypot(node.x - position.x, node.z - position.z, dy);
      if (d < bestDistance) { bestDistance = d; best = node; }
    }
    return best;
  }

  findPath(from, to, { exactStart = true, exactEnd = false } = {}) {
    if (!this.nodes.length) return null;
    const start = this.nearestNode(from);
    let end = this.nearestNode(to);
    if (!start || !end) return null;

    // Direct walk is often enough and avoids a needless detour.
    const direct = new THREE.Vector3(to.x, start.y, to.z);
    if (this.world.pathClear({ x: from.x, z: from.z, y: from.y ?? 0 }, direct, this.radius * 0.95)) {
      return [new THREE.Vector3(to.x, Math.max(to.y ?? 0, 0), to.z)];
    }

    if (start.index === end.index) {
      return [new THREE.Vector3(to.x, end.y, to.z)];
    }

    const open = new Set([start.index]);
    const closed = new Set();
    const gScore = new Map([[start.index, 0]]);
    const fScore = new Map([[start.index, Math.hypot(start.x - end.x, start.z - end.z)]]);
    const cameFrom = new Map();

    while (open.size) {
      let current = null, currentF = Infinity;
      for (const index of open) {
        const f = fScore.get(index) ?? Infinity;
        if (f < currentF) { currentF = f; current = index; }
      }
      if (current === end.index) {
        const path = [];
        let index = current;
        while (index !== undefined) {
          path.push(this.nodes[index]);
          index = cameFrom.get(index);
        }
        path.reverse();
        const result = path.map((node) => new THREE.Vector3(node.x, node.y, node.z));
        // String pulling: skip intermediate nodes when the line is walkable.
        const smoothed = [];
        let cursor = 0;
        const points = [new THREE.Vector3(from.x, from.y ?? 0, from.z), ...result];
        while (cursor < points.length - 1) {
          let furthest = cursor + 1;
          for (let next = points.length - 1; next > cursor + 1; next--) {
            if (this.world.pathClear(points[cursor], points[next], this.radius * 0.9)) { furthest = next; break; }
          }
          smoothed.push(points[furthest]);
          cursor = furthest;
        }
        if (exactEnd && to) smoothed[smoothed.length - 1] = new THREE.Vector3(to.x, smoothed[smoothed.length - 1].y, to.z);
        return smoothed;
      }
      open.delete(current);
      closed.add(current);
      const node = this.nodes[current];
      for (const edge of node.edges) {
        if (closed.has(edge.to)) continue;
        const tentative = (gScore.get(current) ?? Infinity) + edge.weight;
        if (tentative < (gScore.get(edge.to) ?? Infinity)) {
          cameFrom.set(edge.to, current);
          gScore.set(edge.to, tentative);
          const neighbor = this.nodes[edge.to];
          fScore.set(edge.to, tentative + Math.hypot(neighbor.x - end.x, neighbor.z - end.z) + Math.abs(neighbor.y - end.y));
          open.add(edge.to);
        }
      }
    }
    return null;
  }

  randomNode(filter = null) {
    const candidates = filter ? this.nodes.filter(filter) : this.nodes;
    if (!candidates.length) return this.nodes[0];
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  nodeNear(x, z, maxDistance = 4) {
    let best = null, bestDistance = maxDistance;
    for (const node of this.nodes) {
      const d = Math.hypot(node.x - x, node.z - z);
      if (d < bestDistance) { bestDistance = d; best = node; }
    }
    return best;
  }
}
