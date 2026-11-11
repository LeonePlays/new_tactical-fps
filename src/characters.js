// Articulated low-poly combatants with team-specific silhouettes and animation.
import * as THREE from 'three';

const shared = {
  thigh: new THREE.CylinderGeometry(0.17, 0.21, 1, 7),
  shin: new THREE.CylinderGeometry(0.13, 0.17, 1, 7),
  upperArm: new THREE.CylinderGeometry(0.11, 0.14, 1, 7),
  foreArm: new THREE.CylinderGeometry(0.095, 0.12, 1, 7),
  boot: new THREE.BoxGeometry(0.25, 0.19, 0.42),
  torso: new THREE.CapsuleGeometry(0.29, 0.45, 3, 8),
  vest: new THREE.CapsuleGeometry(0.315, 0.36, 3, 8),
  head: new THREE.SphereGeometry(0.215, 9, 7),
  helmet: new THREE.SphereGeometry(0.25, 9, 6, 0, Math.PI * 2, 0, Math.PI * 0.58),
  pouch: new THREE.BoxGeometry(0.18, 0.2, 0.12),
  rifleBody: new THREE.BoxGeometry(0.16, 0.18, 0.55),
  rifleBarrel: new THREE.CylinderGeometry(0.03, 0.038, 0.62, 7),
  rifleStock: new THREE.BoxGeometry(0.14, 0.15, 0.3),
  mag: new THREE.BoxGeometry(0.1, 0.25, 0.13),
  hand: new THREE.SphereGeometry(0.09, 6, 5),
  backpack: new THREE.BoxGeometry(0.34, 0.42, 0.22),
};

function limb(geo, material, length) {
  const m = new THREE.Mesh(geo, material);
  m.scale.y = length;
  m.position.y = -length / 2;
  m.castShadow = true;
  return m;
}

export class Soldier {
  constructor(team, name, materials, variant = 0) {
    this.team = team;
    this.name = name;
    this.materials = materials;
    this.variant = variant;
    this.group = new THREE.Group();
    this.group.name = `soldier:${name}`;
    this.model = new THREE.Group();
    this.group.add(this.model);

    this.phase = Math.random() * Math.PI * 2;
    this.speed = 0;
    this.aiming = false;
    this.crouching = false;
    this.dead = false;
    this.deathTime = 0;
    this.crouchFactor = 0;
    this.aimFactor = 0;
    this.fireKick = 0;
    this.hitboxes = [];
    this._v = new THREE.Vector3();

    const isCT = team === 'CT';
    const cloth = isCT ? materials.ctCloth : materials.tCloth;
    const vestMat = isCT ? materials.ctVest : materials.tVest;
    const helmetMat = isCT ? materials.helmet : (materials.helmetT || materials.helmet);
    const skinMat = variant % 3 === 0 ? materials.skinDark : materials.skin;

    // Body group is lowered when crouching.
    this.bodyGroup = new THREE.Group();
    this.bodyGroup.position.y = 0;
    this.model.add(this.bodyGroup);

    const torso = new THREE.Mesh(shared.torso, cloth);
    torso.position.y = 1.26;
    torso.castShadow = true;
    this.bodyGroup.add(torso);

    const vest = new THREE.Mesh(shared.vest, vestMat);
    vest.position.set(0, 1.29, -0.015);
    vest.scale.set(1, 0.95, 0.82);
    vest.castShadow = true;
    this.bodyGroup.add(vest);

    // Belt and pouches.
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.33, 0.13, 8), materials.boots);
    belt.position.y = 1.0;
    belt.castShadow = true;
    this.bodyGroup.add(belt);
    for (let i = 0; i < 3; i++) {
      const pouch = new THREE.Mesh(shared.pouch, vestMat);
      pouch.position.set((i - 1) * 0.2, 1.13, 0.3);
      pouch.castShadow = true;
      this.bodyGroup.add(pouch);
    }

    // Head, face and helmet.
    const head = new THREE.Mesh(shared.head, skinMat);
    head.position.y = 1.74;
    head.scale.set(0.92, 1.06, 0.92);
    head.castShadow = true;
    this.bodyGroup.add(head);
    this.head = head;

    if (isCT) {
      const helmet = new THREE.Mesh(shared.helmet, helmetMat);
      helmet.position.y = 1.79;
      helmet.rotation.z = 0.03;
      helmet.castShadow = true;
      this.bodyGroup.add(helmet);
    } else {
      // Balaclava + soft cap gives the opposing team a clearly different silhouette.
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 5, 0, Math.PI * 2, 0, Math.PI * 0.52), materials.boots);
      cap.position.y = 1.82;
      cap.castShadow = true;
      this.bodyGroup.add(cap);
      const mask = new THREE.Mesh(new THREE.SphereGeometry(0.17, 7, 5), materials.dark);
      mask.position.set(0, 1.71, 0.06);
      mask.scale.set(0.88, 0.7, 0.6);
      mask.castShadow = false;
      this.bodyGroup.add(mask);
    }
    // Eyes: two tiny dark boxes add readability at distance.
    for (const s of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.022, 0.02), materials.black);
      eye.position.set(s * 0.062, 1.755, 0.19);
      this.bodyGroup.add(eye);
    }

    // Backpack / radio.
    const pack = new THREE.Mesh(shared.backpack, vestMat);
    pack.position.set(0, 1.3, -0.3);
    pack.castShadow = true;
    this.bodyGroup.add(pack);
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.42, 4), materials.metalDark);
    antenna.position.set(0.12, 1.62, -0.35);
    antenna.rotation.z = -0.08;
    this.bodyGroup.add(antenna);

    // Legs with knee pivots.
    this.legs = [];
    for (const side of [-1, 1]) {
      const hip = new THREE.Group();
      hip.position.set(side * 0.145, 0.94, 0);
      this.model.add(hip);
      const thigh = limb(shared.thigh, cloth, 0.44);
      hip.add(thigh);
      const knee = new THREE.Group();
      knee.position.y = -0.44;
      hip.add(knee);
      const shin = limb(shared.shin, cloth, 0.44);
      knee.add(shin);
      const boot = new THREE.Mesh(shared.boot, materials.boots);
      boot.position.set(0, -0.47, 0.055);
      boot.castShadow = true;
      knee.add(boot);
      // Knee pad.
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.1), vestMat);
      pad.position.set(0, -0.02, 0.18);
      pad.castShadow = false;
      knee.add(pad);
      this.legs.push({ hip, knee, side, boot });
    }

    // Arms with elbow pivots.
    this.arms = [];
    for (const side of [-1, 1]) {
      const shoulder = new THREE.Group();
      shoulder.position.set(side * 0.34, 1.44, 0);
      this.bodyGroup.add(shoulder);
      const upper = limb(shared.upperArm, cloth, 0.32);
      shoulder.add(upper);
      const elbow = new THREE.Group();
      elbow.position.y = -0.32;
      shoulder.add(elbow);
      const fore = limb(shared.foreArm, cloth, 0.31);
      elbow.add(fore);
      const hand = new THREE.Mesh(shared.hand, materials.boots);
      hand.position.y = -0.32;
      hand.castShadow = true;
      elbow.add(hand);
      // Team armband.
      if (!isCT) {
        const band = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.08, 7), materials.red);
        band.position.y = -0.09;
        shoulder.add(band);
      }
      this.arms.push({ shoulder, elbow, side, hand });
    }

    // Rifle held in front, pointing along +Z (the model's forward axis).
    this.rifle = new THREE.Group();
    this.rifle.position.set(0.19, 1.31, 0.28);
    this.bodyGroup.add(this.rifle);
    const body = new THREE.Mesh(shared.rifleBody, materials.weapon);
    body.castShadow = true;
    this.rifle.add(body);
    const barrel = new THREE.Mesh(shared.rifleBarrel, materials.weapon);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.035, 0.55);
    barrel.castShadow = true;
    this.rifle.add(barrel);
    const stock = new THREE.Mesh(shared.rifleStock, materials.weaponWood);
    stock.position.set(0, -0.005, -0.43);
    stock.rotation.x = -0.12;
    stock.castShadow = true;
    this.rifle.add(stock);
    const mag = new THREE.Mesh(shared.mag, materials.weapon);
    mag.position.set(0, -0.19, 0.08);
    mag.rotation.x = 0.12;
    mag.castShadow = true;
    this.rifle.add(mag);
    const sight = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.09, 0.035), materials.weapon);
    sight.position.set(0, 0.135, 0.14);
    this.rifle.add(sight);

    // Hands grip the weapon.
    this.arms[0].shoulder.rotation.set(-1.12, 0, -0.18);
    this.arms[0].elbow.rotation.set(-0.55, 0.16, 0.15);
    this.arms[1].shoulder.rotation.set(-1.16, 0, 0.18);
    this.arms[1].elbow.rotation.set(-0.5, -0.2, -0.2);

    this.group.userData.soldier = this;
    this.group.traverse(o => { if (o.isMesh) o.userData.owner = this; });
  }

  setTeamColor(team) { this.team = team; }

  update(dt, opts = {}) {
    const { speed = 0, aiming = false, crouching = false, firing = false, dead = false } = opts;
    this.speed = speed;
    this.aiming = aiming;
    this.crouching = crouching;

    if (dead && !this.dead) {
      this.dead = true;
      this.deathTime = 0;
    }
    if (this.dead) {
      this.deathTime += dt;
      const t = Math.min(1, this.deathTime / 0.65);
      this.model.rotation.x = -t * Math.PI * 0.46;
      this.model.position.y = -t * 0.08;
      for (const leg of this.legs) { leg.hip.rotation.x = t * 0.35; leg.knee.rotation.x = -t * 0.55; }
      return;
    }

    this.crouchFactor += ((crouching ? 1 : 0) - this.crouchFactor) * Math.min(1, dt * 12);
    this.aimFactor += ((aiming ? 1 : 0) - this.aimFactor) * Math.min(1, dt * 14);
    this.fireKick = Math.max(0, this.fireKick - dt * 8);
    this.phase += dt * (1.0 + speed * 2.1);

    const moving = Math.min(1, speed / 4.2);
    const swing = moving * 0.65;
    const crouch = this.crouchFactor;

    this.bodyGroup.position.y = -0.22 * crouch;
    this.model.position.y = 0;
    this.model.rotation.x = 0;

    // Legs: walk cycle and crouch bend.
    for (let i = 0; i < this.legs.length; i++) {
      const leg = this.legs[i];
      const sidePhase = i === 0 ? 0 : Math.PI;
      leg.hip.rotation.x = Math.sin(this.phase + sidePhase) * swing - crouch * 0.55;
      leg.knee.rotation.x = Math.max(0.02, Math.sin(this.phase + sidePhase + 0.8) * -swing) - crouch * 0.85;
      leg.hip.rotation.z = leg.side * (0.02 + crouch * 0.12);
    }

    // Idle breathing / recoil body movement.
    const breathe = Math.sin(this.phase * 0.55) * 0.006;
    this.bodyGroup.position.y += breathe;
    this.bodyGroup.rotation.z = Math.sin(this.phase * 0.42) * 0.006;

    // Arms blend between relaxed walk pose and weapon-ready aiming pose.
    const aim = this.aimFactor;
    for (const arm of this.arms) {
      const side = arm.side;
      if (side < 0) {
        arm.shoulder.rotation.x = THREE.MathUtils.lerp(-0.18 + Math.sin(this.phase) * swing * 0.5, -1.18, aim);
        arm.shoulder.rotation.z = THREE.MathUtils.lerp(-0.12, -0.22, aim);
        arm.elbow.rotation.x = THREE.MathUtils.lerp(-0.18, -0.58, aim);
      } else {
        arm.shoulder.rotation.x = THREE.MathUtils.lerp(-0.2 - Math.sin(this.phase) * swing * 0.5, -1.2, aim);
        arm.shoulder.rotation.z = THREE.MathUtils.lerp(0.12, 0.24, aim);
        arm.elbow.rotation.x = THREE.MathUtils.lerp(-0.22, -0.52, aim);
      }
      arm.shoulder.rotation.y = side * -0.06;
    }

    // Rifle follows aim, with a small firing kick.
    this.rifle.position.set(
      0.19 - crouch * 0.03,
      1.31 - crouch * 0.13 - this.fireKick * 0.02,
      0.28 + this.fireKick * 0.05,
    );
    this.rifle.rotation.x = (1 - aim) * 0.38 - this.fireKick * 0.05;
    this.rifle.rotation.z = (1 - aim) * -0.12;

    // Head tracks forward, gives a small idle turn.
    this.head.rotation.y = Math.sin(this.phase * 0.25) * 0.04;
  }

  kick() { this.fireKick = 1; }

  getMuzzleWorld() {
    this.group.updateMatrixWorld(true);
    const p = new THREE.Vector3(0.19, 1.35, 1.0);
    this.bodyGroup.localToWorld(p);
    return p;
  }

  getEyeWorld() {
    this.group.updateMatrixWorld(true);
    return new THREE.Vector3(this.group.position.x, this.group.position.y + 1.68 - this.crouchFactor * 0.5, this.group.position.z);
  }

  getHitboxes() {
    const x = this.group.position.x, z = this.group.position.z;
    const feet = this.group.position.y;
    const crouch = this.crouchFactor;
    return [
      { x, y: feet + 1.72 - crouch * 0.48, z, radius: 0.19, part: 'head', mult: 2.2 },
      { x, y: feet + 1.3 - crouch * 0.35, z, radius: 0.27, part: 'chest', mult: 1.0 },
      { x, y: feet + 0.95 - crouch * 0.3, z, radius: 0.24, part: 'torso', mult: 1.0 },
      { x, y: feet + 0.5, z, radius: 0.24, part: 'legs', mult: 0.8 },
    ];
  }

  setVisible(v) { this.group.visible = v; }

  revive() {
    this.dead = false;
    this.deathTime = 0;
    this.crouchFactor = 0;
    this.model.rotation.set(0, 0, 0);
    this.model.position.y = 0;
    this.bodyGroup.position.y = 0;
    this.group.visible = true;
  }

  dispose() {
    this.group.removeFromParent();
  }
}
