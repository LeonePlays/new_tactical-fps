import * as THREE from 'three';
import { damp, clamp } from '../core/utils.js';

// Articulated low-poly combatants with procedural idle/walk/run/crouch/aim and
// death animation. Geometry and materials are shared between all characters.

const shared = {
  skin: new THREE.MeshStandardMaterial({ color: 0xa98667, roughness: 0.85 }),
  skinDark: new THREE.MeshStandardMaterial({ color: 0x7f614a, roughness: 0.9 }),
  boot: new THREE.MeshStandardMaterial({ color: 0x24251f, roughness: 0.95 }),
  glove: new THREE.MeshStandardMaterial({ color: 0x2b2c26, roughness: 0.95 }),
  gunMetal: new THREE.MeshStandardMaterial({ color: 0x343833, roughness: 0.55, metalness: 0.35 }),
  gunSteel: new THREE.MeshStandardMaterial({ color: 0x676b63, roughness: 0.4, metalness: 0.5 }),
  gunWood: new THREE.MeshStandardMaterial({ color: 0x60462e, roughness: 0.85 }),
  eyes: new THREE.MeshStandardMaterial({ color: 0x171713, roughness: 1 }),
  strap: new THREE.MeshStandardMaterial({ color: 0x2b2a22, roughness: 1 }),
};

const teamMaterials = {
  CT: {
    uniform: new THREE.MeshStandardMaterial({ color: 0x465a62, roughness: 0.94 }),
    vest: new THREE.MeshStandardMaterial({ color: 0x2d3b41, roughness: 0.92 }),
    helmet: new THREE.MeshStandardMaterial({ color: 0x394b53, roughness: 0.75 }),
    accent: new THREE.MeshStandardMaterial({ color: 0x6f9aad, roughness: 0.8 }),
    balaclava: null,
  },
  T: {
    uniform: new THREE.MeshStandardMaterial({ color: 0x6d5b41, roughness: 0.95 }),
    vest: new THREE.MeshStandardMaterial({ color: 0x4d3e2b, roughness: 0.92 }),
    helmet: new THREE.MeshStandardMaterial({ color: 0x584936, roughness: 0.85 }),
    accent: new THREE.MeshStandardMaterial({ color: 0xb77a44, roughness: 0.8 }),
    balaclava: new THREE.MeshStandardMaterial({ color: 0x24231e, roughness: 1 }),
  },
};

const geo = {
  torso: new THREE.CapsuleGeometry(0.23, 0.32, 3, 8),
  vest: new THREE.BoxGeometry(0.47, 0.42, 0.31),
  hip: new THREE.BoxGeometry(0.36, 0.19, 0.28),
  head: new THREE.SphereGeometry(0.145, 8, 7),
  neck: new THREE.CylinderGeometry(0.075, 0.09, 0.12, 6),
  helmet: new THREE.SphereGeometry(0.165, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.58),
  cap: new THREE.CylinderGeometry(0.145, 0.16, 0.1, 8),
  brim: new THREE.BoxGeometry(0.26, 0.035, 0.18),
  thigh: new THREE.CapsuleGeometry(0.105, 0.27, 2, 6),
  shin: new THREE.CapsuleGeometry(0.083, 0.27, 2, 6),
  boot: new THREE.BoxGeometry(0.16, 0.16, 0.28),
  upperArm: new THREE.CapsuleGeometry(0.083, 0.25, 2, 6),
  forearm: new THREE.CapsuleGeometry(0.07, 0.22, 2, 6),
  hand: new THREE.SphereGeometry(0.075, 6, 5),
  pouch: new THREE.BoxGeometry(0.15, 0.18, 0.09),
  pack: new THREE.BoxGeometry(0.36, 0.42, 0.18),
  receiver: new THREE.BoxGeometry(0.085, 0.12, 0.48),
  barrel: new THREE.CylinderGeometry(0.025, 0.028, 0.5, 7),
  stock: new THREE.BoxGeometry(0.07, 0.12, 0.32),
  magazine: new THREE.BoxGeometry(0.07, 0.19, 0.11),
  grip: new THREE.BoxGeometry(0.065, 0.19, 0.08),
  sight: new THREE.BoxGeometry(0.035, 0.07, 0.05),
  muzzle: new THREE.PlaneGeometry(0.17, 0.17),
};

function mesh(geometry, material, position = [0, 0, 0], rotation = [0, 0, 0]) {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(...position);
  m.rotation.set(...rotation);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export class Character {
  constructor(scene, team = 'CT', { name = 'BOT', scale = 1 } = {}) {
    this.scene = scene;
    this.team = team;
    this.name = name;
    this.group = new THREE.Group();
    this.body = new THREE.Group();
    this.group.add(this.body);
    this.group.scale.setScalar(scale);

    const mats = teamMaterials[team] || teamMaterials.CT;

    // Legs
    this.legs = [];
    for (const side of [-1, 1]) {
      const hip = new THREE.Group();
      hip.position.set(side * 0.125, 0.9, 0);
      const thigh = mesh(geo.thigh, mats.uniform, [0, -0.2, 0]);
      hip.add(thigh);
      const knee = new THREE.Group();
      knee.position.y = -0.41;
      const shin = mesh(geo.shin, mats.uniform, [0, -0.19, 0]);
      const boot = mesh(geo.boot, shared.boot, [0, -0.43, 0.05]);
      knee.add(shin, boot);
      hip.add(knee);
      this.body.add(hip);
      this.legs.push({ hip, knee, side });
    }

    // Hips, torso, vest
    this.body.add(mesh(geo.hip, mats.uniform, [0, 0.95, 0]));
    const torso = mesh(geo.torso, mats.uniform, [0, 1.26, 0]);
    torso.scale.set(1.08, 1.06, 0.84);
    this.body.add(torso);
    this.body.add(mesh(geo.vest, mats.vest, [0, 1.28, 0.01]));
    for (let i = -1; i <= 1; i++) {
      this.body.add(mesh(geo.pouch, mats.vest, [i * 0.15, 1.22, 0.17]));
    }
    this.body.add(mesh(new THREE.BoxGeometry(0.42, 0.06, 0.32), shared.strap, [0, 1.49, 0]));

    // Head and headwear
    this.body.add(mesh(geo.neck, shared.skin, [0, 1.57, 0]));
    this.headGroup = new THREE.Group();
    this.headGroup.position.set(0, 1.69, 0);
    const head = mesh(geo.head, team === 'T' ? shared.skinDark : shared.skin);
    head.scale.set(0.92, 1.06, 0.95);
    this.headGroup.add(head);
    if (team === 'CT') {
      this.headGroup.add(mesh(geo.helmet, mats.helmet, [0, 0.035, 0]));
      this.headGroup.add(mesh(new THREE.BoxGeometry(0.22, 0.05, 0.06), mats.accent, [0, 0.06, 0.14]));
    } else {
      this.headGroup.add(mesh(geo.cap, mats.helmet, [0, 0.1, 0]));
      this.headGroup.add(mesh(geo.brim, mats.helmet, [0, 0.07, 0.14]));
      const mask = mesh(new THREE.SphereGeometry(0.15, 8, 6), mats.balaclava, [0, -0.01, 0]);
      mask.scale.set(0.94, 1.0, 0.95);
      this.headGroup.add(mask);
      // Eyes visible through the balaclava
      for (const side of [-1, 1]) {
        this.headGroup.add(mesh(new THREE.BoxGeometry(0.045, 0.022, 0.02), shared.eyes, [side * 0.055, 0.01, 0.137]));
      }
    }
    this.body.add(this.headGroup);

    // Arms
    this.arms = [];
    for (const side of [-1, 1]) {
      const shoulder = new THREE.Group();
      shoulder.position.set(side * 0.3, 1.44, 0);
      shoulder.rotation.z = side * -0.08;
      const upper = mesh(geo.upperArm, mats.uniform, [0, -0.16, 0]);
      const elbow = new THREE.Group();
      elbow.position.y = -0.33;
      const fore = mesh(geo.forearm, mats.uniform, [0, -0.14, 0]);
      const hand = mesh(geo.hand, shared.glove, [0, -0.29, 0]);
      elbow.add(fore, hand);
      shoulder.add(upper, elbow);
      this.body.add(shoulder);
      this.arms.push({ shoulder, elbow, side, hand });
    }
    // Shoulder patch
    this.body.add(mesh(new THREE.BoxGeometry(0.07, 0.1, 0.2), mats.accent, [-0.33, 1.48, 0]));

    // Backpack or radio
    if (team === 'T') {
      this.body.add(mesh(geo.pack, mats.vest, [0, 1.3, -0.21]));
    } else {
      this.body.add(mesh(new THREE.BoxGeometry(0.24, 0.3, 0.12), mats.vest, [0, 1.31, -0.21]));
      this.body.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 4), shared.gunMetal, [0.08, 1.5, -0.22]));
    }

    // Rifle. The mount pivots between a lowered patrol pose and an aimed pose.
    this.weaponMount = new THREE.Group();
    this.weaponMount.position.set(0.14, 1.3, 0.18);
    this.rifle = new THREE.Group();
    const receiver = mesh(geo.receiver, shared.gunMetal, [0, 0, 0.16]);
    const barrel = mesh(geo.barrel, shared.gunSteel, [0, 0.015, 0.57], [Math.PI / 2, 0, 0]);
    const stock = mesh(geo.stock, shared.gunWood, [0, -0.01, -0.18]);
    const magazine = mesh(geo.magazine, shared.gunMetal, [0, -0.14, 0.12]);
    magazine.rotation.x = -0.28;
    const grip = mesh(geo.grip, shared.gunMetal, [0, -0.14, -0.02]);
    grip.rotation.x = 0.2;
    const sight = mesh(geo.sight, shared.gunSteel, [0, 0.085, 0.1]);
    const sightFront = mesh(new THREE.BoxGeometry(0.02, 0.055, 0.03), shared.gunSteel, [0, 0.08, 0.5]);
    this.rifle.add(receiver, barrel, stock, magazine, grip, sight, sightFront);
    this.muzzleFlash = new THREE.Mesh(geo.muzzle, new THREE.MeshBasicMaterial({
      color: 0xffd48a, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    }));
    this.muzzleFlash.position.set(0, 0.015, 0.84);
    this.muzzleFlash.rotation.x = Math.PI / 2;
    this.muzzleFlash.visible = false;
    this.rifle.add(this.muzzleFlash);
    this.weaponMount.add(this.rifle);
    this.body.add(this.weaponMount);

    this.group.traverse((obj) => {
      if (obj.isMesh) { obj.castShadow = true; obj.receiveShadow = true; }
    });

    this.phase = Math.random() * Math.PI * 2;
    this.flashTimer = 0;
    this.deadTime = 0;
    this.dead = false;
    this.aimBlend = 0;
    this.crouchBlend = 0;
    this.scene.add(this.group);
  }

  setPosition(x, y, z) {
    this.group.position.set(x, y, z);
  }

  setYaw(yaw) {
    this.group.rotation.y = yaw;
  }

  muzzle() {
    if (this.flashTimer <= 0) {
      this.flashTimer = 0.055;
      this.muzzleFlash.visible = true;
      this.muzzleFlash.rotation.z = Math.random() * Math.PI;
      this.muzzleFlash.scale.setScalar(0.8 + Math.random() * 0.7);
    }
  }

  reset() {
    this.dead = false;
    this.deadTime = 0;
    this.body.rotation.set(0, 0, 0);
    this.body.position.set(0, 0, 0);
    this.group.visible = true;
    this.flashTimer = 0;
    this.muzzleFlash.visible = false;
    this.aimBlend = 0;
    this.crouchBlend = 0;
    for (const leg of this.legs) { leg.hip.rotation.set(0, 0, 0); leg.knee.rotation.set(0, 0, 0); }
    for (const arm of this.arms) { arm.shoulder.rotation.set(0, 0, arm.side * -0.08); arm.elbow.rotation.set(0, 0, 0); }
  }

  setDead() {
    this.dead = true;
    this.deadTime = 0;
  }

  update(dt, state = {}) {
    const { speed = 0, crouched = false, aiming = false, grounded = true } = state;
    const moving = speed > 0.15;

    if (this.dead) {
      this.deadTime += dt;
      this.body.rotation.x = damp(this.body.rotation.x, -Math.PI / 2, 8, dt);
      this.body.position.y = damp(this.body.position.y, 0.18, 8, dt);
      this.group.visible = this.deadTime < 12;
      return;
    }

    this.aimBlend = damp(this.aimBlend, aiming ? 1 : 0, 10, dt);
    this.crouchBlend = damp(this.crouchBlend, crouched ? 1 : 0, 12, dt);

    if (moving && grounded) this.phase += dt * (2.5 + speed * 1.35);
    else this.phase += dt * 1.5;

    const walkAmp = moving ? clamp(speed / 6.5, 0.18, 1) : 0;
    const swing = Math.sin(this.phase) * 0.72 * walkAmp;
    for (const leg of this.legs) {
      const s = leg.side === 1 ? 1 : -1;
      const bend = this.crouchBlend * 0.5;
      leg.hip.rotation.x = swing * s - bend * 0.7;
      leg.knee.rotation.x = Math.max(0, -Math.sin(this.phase * 1 + (leg.side > 0 ? 0 : Math.PI))) * 0.65 * walkAmp + bend * 1.25;
    }

    const bob = moving ? Math.abs(Math.sin(this.phase * 2)) * 0.025 : Math.sin(this.phase * 0.8) * 0.006;
    this.body.position.y = bob - this.crouchBlend * 0.23;
    this.body.rotation.z = moving ? Math.sin(this.phase) * 0.012 : 0;

    // Arms: aiming raises the rifle; otherwise they swing with the legs.
    for (const arm of this.arms) {
      const s = arm.side === 1 ? 1 : -1;
      const aimPose = arm.side === 1 ? -1.42 : -1.28;
      const restPose = -swing * s * 0.55;
      arm.shoulder.rotation.x = restPose * (1 - this.aimBlend) + aimPose * this.aimBlend;
      arm.shoulder.rotation.z = arm.side * (-0.08 - this.aimBlend * 0.22);
      arm.elbow.rotation.x = (moving ? 0.28 : 0.08) * (1 - this.aimBlend) + (arm.side === 1 ? 0.55 : 1.0) * this.aimBlend;
    }
    this.weaponMount.rotation.x = (1 - this.aimBlend) * 0.72 - 0.02;
    this.weaponMount.rotation.y = (1 - this.aimBlend) * 0.18;
    this.weaponMount.position.y = 1.3 - this.crouchBlend * 0.05;

    this.headGroup.rotation.y = Math.sin(this.phase * 0.35) * (moving ? 0.05 : 0.16);
    this.headGroup.rotation.x = this.aimBlend * -0.04;

    if (this.flashTimer > 0) {
      this.flashTimer -= dt;
      if (this.flashTimer <= 0) this.muzzleFlash.visible = false;
    }
  }

  dispose() {
    this.scene.remove(this.group);
    this.group.traverse((obj) => {
      if (obj.isMesh && obj.geometry && !Object.values(geo).includes(obj.geometry)) obj.geometry.dispose();
      if (obj.isMesh && obj.material !== shared.eyes) {
        if (obj.material && obj.material.transparent && obj.material.map) obj.material.map.dispose();
      }
    });
    // The muzzle flash owns a per-character material that is not shared.
    this.muzzleFlash.material.dispose();
  }
}

export function createHitSpheres(character, position) {
  return [
    { x: position.x, y: position.y + 1.7, z: position.z, radius: 0.21, part: 'head' },
    { x: position.x, y: position.y + 1.24, z: position.z, radius: 0.36, part: 'body' },
    { x: position.x, y: position.y + 0.72, z: position.z, radius: 0.35, part: 'legs' },
  ];
}
