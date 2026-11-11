// Pooled, low-cost visual effects: dust impacts, sparks, tracers, muzzle flashes.
import * as THREE from 'three';

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.max = 320;
    this.cursor = 0;
    this.particles = [];
    const pos = new Float32Array(this.max * 3);
    const col = new Float32Array(this.max * 3);
    const size = new Float32Array(this.max);
    const alpha = new Float32Array(this.max);
    this.buffers = { pos, col, size, alpha };
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(alpha, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setDrawRange(0, 0);
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader: `
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = aColor; vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (260.0 / max(1.0, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.12, d) * vAlpha;
          gl_FragColor = vec4(vColor, a);
        }
      `,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 4;
    scene.add(this.points);

    // Tracer pool (one LineSegments draw call).
    this.tracerMax = 24;
    this.tracers = [];
    const tpos = new Float32Array(this.tracerMax * 6);
    const tcol = new Float32Array(this.tracerMax * 6);
    const tgeo = new THREE.BufferGeometry();
    tgeo.setAttribute('position', new THREE.BufferAttribute(tpos, 3).setUsage(THREE.DynamicDrawUsage));
    tgeo.setAttribute('color', new THREE.BufferAttribute(tcol, 3).setUsage(THREE.DynamicDrawUsage));
    tgeo.setDrawRange(0, 0);
    this.tracerMesh = new THREE.LineSegments(tgeo, new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    this.tracerMesh.frustumCulled = false;
    this.tracerMesh.renderOrder = 3;
    scene.add(this.tracerMesh);

    // Muzzle flash sprites.
    const flashTex = this.makeRadialTexture();
    this.flashes = [];
    for (let i = 0; i < 7; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({
        map: flashTex, color: 0xffcf7a, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false,
      }));
      s.scale.set(0.55, 0.55, 1);
      s.visible = false;
      s.userData.life = 0;
      scene.add(s);
      this.flashes.push(s);
    }
    this.flashCursor = 0;
    this.flashLight = new THREE.PointLight(0xffb25e, 0, 8, 2);
    scene.add(this.flashLight);

    // Ambient dust motes around the play space — one draw call, very cheap.
    const dustGeo = new THREE.BufferGeometry();
    const dustCount = 170;
    const dp = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dp[i * 3] = (Math.random() - 0.5) * 90;
      dp[i * 3 + 1] = 0.4 + Math.random() * 8;
      dp[i * 3 + 2] = (Math.random() - 0.5) * 90;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dp, 3));
    this.dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: 0xe4d7b4, size: 0.035, transparent: true, opacity: 0.28, depthWrite: false,
    }));
    this.dust.frustumCulled = false;
    scene.add(this.dust);
    this.dustBase = dp;
  }

  makeRadialTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(32, 32, 1, 32, 32, 31);
    g.addColorStop(0, 'rgba(255,255,235,1)');
    g.addColorStop(0.25, 'rgba(255,205,120,.9)');
    g.addColorStop(0.6, 'rgba(255,150,50,.35)');
    g.addColorStop(1, 'rgba(255,100,20,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  spawnParticle(x, y, z, vx, vy, vz, life, size, color, gravity = 4) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.max;
    this.particles[i] = { x, y, z, vx, vy, vz, life, maxLife: life, size, color: color instanceof THREE.Color ? color : new THREE.Color(color), gravity };
  }

  impact(point, normal, kind = 'concrete', scale = 1) {
    const colors = {
      concrete: [0xbcb6a3, 0x938e7d], wood: [0x8b6b43, 0x5d4529], metal: [0xd9d2b5, 0xffc36b],
      sand: [0xc2b18e, 0xa89672], glass: [0xb9d3d1, 0x86a8aa], dirt: [0x9a8768, 0x78664b],
    };
    const palette = colors[kind] || colors.concrete;
    const n = Math.round((kind === 'metal' ? 7 : 10) * scale);
    for (let i = 0; i < n; i++) {
      const spread = 1.4 + Math.random() * 2.6;
      this.spawnParticle(
        point.x + normal.x * 0.04, point.y + normal.y * 0.04, point.z + normal.z * 0.04,
        normal.x * spread + (Math.random() - 0.5) * 1.8,
        normal.y * spread + Math.random() * 1.6,
        normal.z * spread + (Math.random() - 0.5) * 1.8,
        0.2 + Math.random() * 0.45,
        (1.7 + Math.random() * 2.2) * scale,
        palette[Math.random() > 0.5 ? 0 : 1],
        kind === 'metal' ? 6.5 : 3.5,
      );
    }
    if (kind === 'metal') {
      for (let i = 0; i < 4; i++) {
        this.spawnParticle(point.x, point.y, point.z,
          (Math.random() - 0.5) * 5, Math.random() * 4, (Math.random() - 0.5) * 5,
          0.12 + Math.random() * 0.2, 1.2, 0xffc46c, 7);
      }
    }
  }

  muzzle(pos, color = 0xffc46a, scale = 1) {
    const s = this.flashes[this.flashCursor++ % this.flashes.length];
    s.position.copy(pos);
    s.material.color.setHex(color);
    s.scale.setScalar((0.42 + Math.random() * 0.32) * scale);
    s.material.opacity = 0.95;
    s.visible = true;
    s.userData.life = 0.055;
    this.flashLight.position.copy(pos);
    this.flashLight.intensity = 9 * scale;
  }

  tracer(from, to, color = 0xffd08a) {
    this.tracers.push({ from: from.clone(), to: to.clone(), life: 0.06, color: new THREE.Color(color) });
    if (this.tracers.length > this.tracerMax) this.tracers.shift();
  }

  update(dt) {
    const { pos, col, size, alpha } = this.buffers;
    let count = 0;
    for (let i = 0; i < this.max; i++) {
      const p = this.particles[i];
      if (!p || p.life <= 0) continue;
      p.life -= dt;
      if (p.life <= 0) continue;
      p.vy -= p.gravity * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      p.vx *= Math.pow(0.18, dt); p.vz *= Math.pow(0.18, dt);
      if (p.y < 0.02) { p.y = 0.02; p.vy *= -0.25; }
      const t = p.life / p.maxLife;
      pos[count * 3] = p.x; pos[count * 3 + 1] = p.y; pos[count * 3 + 2] = p.z;
      const c = p.color;
      col[count * 3] = c.r; col[count * 3 + 1] = c.g; col[count * 3 + 2] = c.b;
      size[count] = p.size;
      alpha[count] = Math.min(1, t * 1.5);
      count++;
    }
    this.points.geometry.setDrawRange(0, count);
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.aColor.needsUpdate = true;
    this.points.geometry.attributes.aSize.needsUpdate = true;
    this.points.geometry.attributes.aAlpha.needsUpdate = true;

    for (let i = this.tracers.length - 1; i >= 0; i--) {
      const t = this.tracers[i];
      t.life -= dt;
      if (t.life <= 0) this.tracers.splice(i, 1);
    }
    const tg = this.tracerMesh.geometry;
    const tp = tg.attributes.position.array;
    const tc = tg.attributes.color.array;
    for (let i = 0; i < this.tracers.length; i++) {
      const t = this.tracers[i];
      tp[i * 6] = t.from.x; tp[i * 6 + 1] = t.from.y; tp[i * 6 + 2] = t.from.z;
      tp[i * 6 + 3] = t.to.x; tp[i * 6 + 4] = t.to.y; tp[i * 6 + 5] = t.to.z;
      tc[i * 6] = t.color.r; tc[i * 6 + 1] = t.color.g; tc[i * 6 + 2] = t.color.b;
      tc[i * 6 + 3] = t.color.r; tc[i * 6 + 4] = t.color.g; tc[i * 6 + 5] = t.color.b;
    }
    tg.setDrawRange(0, this.tracers.length * 2);
    tg.attributes.position.needsUpdate = true;
    tg.attributes.color.needsUpdate = true;

    for (const f of this.flashes) {
      if (!f.visible) continue;
      f.userData.life -= dt;
      f.material.opacity = Math.max(0, f.userData.life / 0.055) * 0.95;
      if (f.userData.life <= 0) f.visible = false;
    }
    this.flashLight.intensity = Math.max(0, this.flashLight.intensity - dt * 140);

    // Drift ambient dust slowly.
    const dp = this.dust.geometry.attributes.position;
    for (let i = 0; i < dp.count; i++) {
      let y = dp.getY(i) + dt * (0.05 + (i % 5) * 0.005);
      if (y > 8.5) y = 0.4;
      dp.setY(i, y);
    }
    dp.needsUpdate = true;
  }

  reset() {
    this.particles.length = 0;
    this.tracers.length = 0;
    this.points.geometry.setDrawRange(0, 0);
    for (const f of this.flashes) { f.visible = false; f.material.opacity = 0; }
    this.flashLight.intensity = 0;
  }
}
