// First-person weapon view models with idle sway, recoil and reload animation.
import * as THREE from 'three';
import { WEAPONS } from './config.js';

export class ViewModel {
  constructor(camera, materials) {
    this.camera = camera;
    this.materials = materials;
    this.root = new THREE.Group();
    this.root.position.set(0, 0, 0);
    camera.add(this.root);
    this.rifle = this.buildRifle();
    this.pistol = this.buildPistol();
    this.rifle.scale.setScalar(0.82);
    this.pistol.scale.setScalar(0.82);
    this.group = this.rifle;
    this.weaponId = 'rifle';
    this.pistol.visible = false;
    this.recoil = 0;
    this.recoilVel = 0;
    this.swayX = 0; this.swayY = 0;
    this.swayTargetX = 0; this.swayTargetY = 0;
    this.bob = 0;
    this.aim = 0;
    this.reloadT = 0;
    this.reloadDuration = WEAPONS.rifle.reloadTime;
    this.muzzleWorld = new THREE.Vector3();
    this._v = new THREE.Vector3();
  }

  makeArm(material, glove) {
    const arm = new THREE.Group();
    const fore = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.36, 3, 7), material);
    fore.rotation.x = Math.PI / 2.1;
    fore.position.set(0, -0.06, 0.28);
    fore.castShadow = false;
    arm.add(fore);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.095, 8, 6), glove);
    hand.scale.set(1, 0.8, 1.2);
    hand.position.set(0, 0.01, 0.06);
    arm.add(hand);
    return arm;
  }

  buildRifle() {
    const g = new THREE.Group();
    const metal = this.materials.weapon;
    const wood = this.materials.weaponWood;
    const dark = this.materials.dark;
    const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z); m.rotation.set(rx, ry, rz);
      m.castShadow = false;
      g.add(m); return m;
    };
    // Receiver, handguard, stock, barrel and magazine.
    add(new THREE.BoxGeometry(0.115, 0.12, 0.46), metal, 0, 0, 0);
    add(new THREE.BoxGeometry(0.13, 0.1, 0.28), metal, 0, 0.005, -0.34);
    add(new THREE.BoxGeometry(0.105, 0.13, 0.3), wood, 0, -0.01, 0.34, -0.06);
    add(new THREE.BoxGeometry(0.075, 0.07, 0.22), wood, 0, -0.11, 0.46, -0.18);
    add(new THREE.BoxGeometry(0.09, 0.2, 0.11), metal, 0, -0.14, -0.02, 0.18);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.46, 9), metal);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.035, -0.64);
    g.add(barrel);
    add(new THREE.BoxGeometry(0.05, 0.055, 0.08), metal, 0, 0.035, -0.89);
    add(new THREE.BoxGeometry(0.018, 0.07, 0.02), metal, 0, 0.105, -0.44);
    // Rear sight notch.
    add(new THREE.BoxGeometry(0.06, 0.03, 0.035), metal, 0, 0.095, 0.1);
    add(new THREE.BoxGeometry(0.018, 0.055, 0.02), dark, -0.022, 0.11, 0.1);
    add(new THREE.BoxGeometry(0.018, 0.055, 0.02), dark, 0.022, 0.11, 0.1);
    // Trigger guard / grip.
    add(new THREE.BoxGeometry(0.045, 0.16, 0.07), wood, 0, -0.15, 0.15, -0.24);
    add(new THREE.BoxGeometry(0.08, 0.025, 0.18), dark, 0, -0.075, 0.02);
    // Right hand on grip, left hand under handguard.
    const right = this.makeArm(this.materials.cloth, this.materials.boots);
    right.position.set(0.09, -0.18, 0.28);
    right.rotation.set(-0.32, -0.1, -0.35);
    g.add(right);
    const left = this.makeArm(this.materials.cloth, this.materials.boots);
    left.position.set(-0.13, -0.13, -0.24);
    left.rotation.set(-0.14, 0.15, 1.25);
    g.add(left);

    g.position.set(0.34, -0.31, -0.62);
    g.rotation.set(-0.03, -0.06, -0.02);
    this.root.add(g);
    return g;
  }

  buildPistol() {
    const g = new THREE.Group();
    const metal = this.materials.weapon;
    const dark = this.materials.dark;
    const add = (geo, mat, x, y, z, rx = 0) => {
      const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.x = rx; g.add(m); return m;
    };
    add(new THREE.BoxGeometry(0.09, 0.11, 0.36), metal, 0, 0, -0.18);
    add(new THREE.BoxGeometry(0.075, 0.18, 0.09), metal, 0, -0.12, 0.05, -0.25);
    add(new THREE.BoxGeometry(0.05, 0.045, 0.055), metal, 0, -0.08, 0.0);
    add(new THREE.BoxGeometry(0.055, 0.025, 0.13), metal, 0, 0.07, -0.16);
    add(new THREE.BoxGeometry(0.012, 0.035, 0.025), dark, 0, 0.09, -0.28);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.2, 8), metal);
    barrel.rotation.x = Math.PI / 2; barrel.position.set(0, 0.02, -0.46); g.add(barrel);
    const right = this.makeArm(this.materials.cloth, this.materials.boots);
    right.position.set(0.06, -0.16, 0.22); right.rotation.set(-0.2, -0.1, -0.4); g.add(right);
    g.position.set(0.28, -0.27, -0.55);
    g.rotation.set(-0.02, -0.06, -0.02);
    this.root.add(g);
    return g;
  }

  switchWeapon(id) {
    if (id === this.weaponId) return;
    this.weaponId = id;
    this.rifle.visible = id === 'rifle';
    this.pistol.visible = id === 'pistol';
    this.group = id === 'rifle' ? this.rifle : this.pistol;
    this.reloadT = 0;
    this.recoil = -0.8;
    this.recoilVel = 0;
  }

  fire(weaponId) {
    this.recoilVel += weaponId === 'pistol' ? 3.2 : 5.0;
    this.bob += 0.3;
  }

  reload(duration) {
    this.reloadT = duration;
    this.reloadDuration = duration;
  }

  addSway(dx, dy) {
    this.swayTargetX = THREE.MathUtils.clamp(this.swayTargetX - dx * 0.0009, -0.04, 0.04);
    this.swayTargetY = THREE.MathUtils.clamp(this.swayTargetY + dy * 0.0009, -0.035, 0.035);
  }

  update(dt, { speed = 0, aiming = false, grounded = true, crouching = false } = {}) {
    this.aim += ((aiming ? 1 : 0) - this.aim) * Math.min(1, dt * 12);
    this.recoilVel += (-this.recoil * 160 - this.recoilVel * 18) * dt;
    this.recoil += this.recoilVel * dt;
    if (Math.abs(this.recoil) < 0.0001 && Math.abs(this.recoilVel) < 0.001) { this.recoil = 0; this.recoilVel = 0; }
    if (this.reloadT > 0) this.reloadT = Math.max(0, this.reloadT - dt);

    const move = Math.min(1, speed / 5.2) * (grounded ? 1 : 0.25);
    this.bob += dt * (2.2 + move * 8.5);
    this.swayX += (this.swayTargetX - this.swayX) * Math.min(1, dt * 9);
    this.swayY += (this.swayTargetY - this.swayY) * Math.min(1, dt * 9);
    this.swayTargetX *= Math.pow(0.08, dt);
    this.swayTargetY *= Math.pow(0.08, dt);

    const bobX = Math.sin(this.bob) * 0.012 * move;
    const bobY = Math.abs(Math.cos(this.bob)) * 0.009 * move;
    const crouchDrop = crouching ? -0.03 : 0;
    const aim = this.aim;

    const baseX = 0.31 - aim * 0.31;
    const baseY = -0.3 + aim * 0.1 - crouchDrop;
    const baseZ = -0.86 + aim * 0.12;

    const reloadProgress = this.reloadT > 0 ? 1 - this.reloadT / this.reloadDuration : 0;
    const reloadArc = this.reloadT > 0 ? Math.sin(reloadProgress * Math.PI) : 0;

    this.group.position.set(
      baseX + this.swayX + bobX + reloadArc * 0.04,
      baseY + this.swayY + bobY - reloadArc * 0.25,
      baseZ + this.recoil * 0.14,
    );
    this.group.rotation.set(
      -0.03 + this.swayY * 0.8 - this.recoil * 0.12 - reloadArc * 0.75,
      -0.06 + this.swayX * 1.2,
      -0.02 + this.swayX * 0.7 - aim * 0.01 + reloadArc * 0.45,
    );

    // Weapon root shake from footsteps.
    this.root.position.y = bobY * 0.4;
    this.root.position.x = bobX * 0.6;

    // Compute muzzle world position for effects.
    const tip = this.weaponId === 'rifle' ? this._v.set(0, 0.035, -0.92) : this._v.set(0, 0.02, -0.58);
    this.group.updateWorldMatrix(true, false);
    this.group.localToWorld(tip);
    this.muzzleWorld.copy(tip);
  }
}
