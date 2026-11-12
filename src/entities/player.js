import * as THREE from 'three';
import { CONFIG } from '../core/config.js';
import { clamp, damp, rand } from '../core/utils.js';

const weaponMaterials = {
  metal: new THREE.MeshStandardMaterial({ color: 0x343831, roughness: 0.5, metalness: 0.4 }),
  steel: new THREE.MeshStandardMaterial({ color: 0x74786d, roughness: 0.36, metalness: 0.55 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x674b2e, roughness: 0.82 }),
  glove: new THREE.MeshStandardMaterial({ color: 0x30322b, roughness: 0.95 }),
  sleeve: new THREE.MeshStandardMaterial({ color: 0x45534d, roughness: 0.95 }),
  brass: new THREE.MeshStandardMaterial({ color: 0xa78a4b, roughness: 0.4, metalness: 0.6 }),
};

function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  return m;
}

function cylinder(radius, length, material, x, y, z) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 8), material);
  m.rotation.x = Math.PI / 2;
  m.position.set(x, y, z);
  return m;
}

class ViewWeapon {
  constructor(camera) {
    this.camera = camera;
    this.root = new THREE.Group();
    camera.add(this.root);
    this.rifle = new THREE.Group();
    this.pistol = new THREE.Group();
    this.muzzleFlashes = [];
    this.buildRifle();
    this.buildPistol();
    this.root.add(this.rifle, this.pistol);
    this.root.position.set(0.34, -0.3, -0.58);
    this.recoil = 0;
    this.recoilVelocity = 0;
    this.bobPhase = 0;
    this.switchOffset = 0;
    this.flashTimer = 0;
    this.rifle.visible = true;
    this.pistol.visible = false;
    this.current = 'rifle';
  }

  buildRifle() {
    const g = this.rifle;
    g.add(box(0.13, 0.15, 0.5, weaponMaterials.metal, 0, 0, -0.14));
    g.add(box(0.145, 0.1, 0.22, weaponMaterials.steel, 0, 0.01, -0.44));
    g.add(box(0.11, 0.11, 0.3, weaponMaterials.wood, 0, -0.01, 0.24));
    g.add(box(0.09, 0.24, 0.12, weaponMaterials.metal, 0, -0.16, -0.16));
    g.add(box(0.08, 0.21, 0.1, weaponMaterials.wood, 0, -0.15, 0.02));
    g.add(cylinder(0.025, 0.54, weaponMaterials.steel, 0, 0.025, -0.61));
    g.add(box(0.04, 0.08, 0.05, weaponMaterials.steel, 0, 0.09, -0.36));
    g.add(box(0.02, 0.07, 0.03, weaponMaterials.steel, 0, 0.095, -0.84));
    // Wood handguard detail
    g.add(box(0.16, 0.07, 0.38, weaponMaterials.wood, 0, -0.04, -0.42));
    // Charging handle and selector
    g.add(box(0.04, 0.04, 0.14, weaponMaterials.steel, 0.09, 0.05, -0.13));
    // Gloved hands and sleeves
    const rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.085, 7, 6), weaponMaterials.glove);
    rightHand.position.set(0.02, -0.16, 0.07);
    rightHand.scale.set(0.9, 1.15, 1.1);
    g.add(rightHand);
    const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.08, 7, 6), weaponMaterials.glove);
    leftHand.position.set(-0.01, -0.1, -0.46);
    leftHand.scale.set(1.15, 0.9, 1.2);
    g.add(leftHand);
    const rightSleeve = new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.36, 3, 7), weaponMaterials.sleeve);
    rightSleeve.position.set(0.1, -0.34, 0.3);
    rightSleeve.rotation.set(-0.85, 0.12, -0.3);
    g.add(rightSleeve);
    const leftSleeve = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.42, 3, 7), weaponMaterials.sleeve);
    leftSleeve.position.set(-0.16, -0.32, -0.18);
    leftSleeve.rotation.set(-0.95, -0.25, 0.55);
    g.add(leftSleeve);
    const flash = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.32), new THREE.MeshBasicMaterial({
      color: 0xffcf7a, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    }));
    flash.position.set(0, 0.03, -0.91);
    flash.visible = false;
    g.add(flash);
    this.muzzleFlashes.push(flash);
    g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
  }

  buildPistol() {
    const g = this.pistol;
    g.add(box(0.09, 0.11, 0.42, weaponMaterials.metal, 0, 0.02, -0.12));
    g.add(box(0.075, 0.16, 0.09, weaponMaterials.wood, 0, -0.12, 0.06));
    g.add(cylinder(0.018, 0.15, weaponMaterials.steel, 0, 0.025, -0.39));
    g.add(box(0.035, 0.035, 0.04, weaponMaterials.steel, 0, 0.085, -0.3));
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.085, 7, 6), weaponMaterials.glove);
    hand.position.set(0, -0.12, 0.07);
    hand.scale.set(1, 1.2, 1);
    g.add(hand);
    const sleeve = new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.4, 3, 7), weaponMaterials.sleeve);
    sleeve.position.set(0.1, -0.35, 0.26);
    sleeve.rotation.set(-0.9, 0.1, -0.35);
    g.add(sleeve);
    const flash = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.22), new THREE.MeshBasicMaterial({
      color: 0xffd082, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    }));
    flash.position.set(0, 0.025, -0.5);
    flash.visible = false;
    g.add(flash);
    this.muzzleFlashes.push(flash);
    g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
  }

  setWeapon(id) {
    this.current = id;
    this.rifle.visible = id === 'rifle';
    this.pistol.visible = id === 'pistol';
    this.switchOffset = 1;
  }

  fire() {
    this.recoilVelocity += 3.4;
    const flash = this.muzzleFlashes[this.current === 'rifle' ? 0 : 1];
    if (flash) {
      flash.visible = true;
      flash.rotation.z = Math.random() * Math.PI;
      flash.scale.setScalar(0.8 + Math.random() * 0.6);
      this.flashTimer = 0.045;
    }
  }

  update(dt, state) {
    const speed = state.speed || 0;
    const moving = speed > 0.3 && state.grounded;
    this.bobPhase += dt * (moving ? 7 + speed * 0.9 : 1.5);
    const bobAmount = moving ? clamp(speed / 7, 0.2, 1) : 0.18;
    this.recoilVelocity *= Math.exp(-16 * dt);
    this.recoil = damp(this.recoil, 0, 14, dt);
    this.recoil += this.recoilVelocity * dt * 0.1;
    this.switchOffset = damp(this.switchOffset, 0, 12, dt);

    const reload = state.reloadProgress || 0;
    const reloadDip = reload > 0 ? Math.sin(Math.min(1, reload) * Math.PI) : 0;
    const x = 0.34 + Math.sin(this.bobPhase * 0.5) * 0.006 * bobAmount - reloadDip * 0.09;
    const y = -0.3 + Math.abs(Math.sin(this.bobPhase)) * 0.012 * bobAmount - reloadDip * 0.16 - this.switchOffset * 0.25;
    const z = -0.58 + this.recoil * 0.11 + reloadDip * 0.03;
    this.root.position.set(x, y, z);
    this.root.rotation.x = this.recoil * 0.03 - reloadDip * 0.25;
    this.root.rotation.y = Math.sin(this.bobPhase * 0.5) * 0.01 - reloadDip * 0.35;
    this.root.rotation.z = reloadDip * 0.25;

    if (this.flashTimer > 0) {
      this.flashTimer -= dt;
      if (this.flashTimer <= 0) {
        for (const flash of this.muzzleFlashes) flash.visible = false;
      }
    }
  }
}

export class Player {
  constructor({ scene, camera, world, audio, settings }) {
    this.scene = scene;
    this.camera = camera;
    this.world = world;
    this.audio = audio;
    this.settings = settings;
    this.position = new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.health = CONFIG.player.maxHealth;
    this.armor = 100;
    this.alive = true;
    this.grounded = true;
    this.crouched = false;
    this.eye = CONFIG.player.standEye;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.stepDistance = 0;
    this.landKick = 0;
    this.world = world;
    this.weaponId = 'rifle';
    this.ammo = {
      rifle: { mag: CONFIG.weapons.rifle.magazine, reserve: CONFIG.weapons.rifle.reserve },
      pistol: { mag: CONFIG.weapons.pistol.magazine, reserve: CONFIG.weapons.pistol.reserve },
    };
    this.fireCooldown = 0;
    this.reloadTimer = 0;
    this.reloadTotal = 0;
    this.shots = 0;
    this.lastShot = 0;
    this.view = new ViewWeapon(camera);
    this.deathTimer = 0;
    this.respawnTimer = 0;
    this.lastDamageTime = -10;
    this.lastDamageDirection = new THREE.Vector3();
    this.stats = { kills: 0, deaths: 0, headshots: 0 };
    this.camera.rotation.order = 'YXZ';
    this.camera.fov = settings.get('fov');
    this.camera.updateProjectionMatrix();
    this.baseFov = settings.get('fov');
    this.currentSpread = 0;
    scene.add(camera);
  }

  get weapon() {
    return CONFIG.weapons[this.weaponId];
  }

  get currentAmmo() {
    return this.ammo[this.weaponId];
  }

  respawn(spawn, yaw = 0) {
    this.position.set(spawn.x, spawn.y ?? 0, spawn.z);
    this.velocity.set(0, 0, 0);
    this.yaw = yaw;
    this.pitch = 0;
    this.health = CONFIG.player.maxHealth;
    this.armor = 100;
    this.alive = true;
    this.grounded = true;
    this.crouched = false;
    this.eye = CONFIG.player.standEye;
    this.ammo.rifle = { mag: CONFIG.weapons.rifle.magazine, reserve: CONFIG.weapons.rifle.reserve };
    this.ammo.pistol = { mag: CONFIG.weapons.pistol.magazine, reserve: CONFIG.weapons.pistol.reserve };
    this.fireCooldown = 0;
    this.reloadTimer = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.weaponId = 'rifle';
    this.view.setWeapon('rifle');
    this.view.root.visible = true;
    this.deathTimer = 0;
    this.respawnTimer = 0;
    this.updateCamera(0, 0);
  }

  look(dx, dy) {
    if (!this.alive) return;
    const sensitivity = this.settings.get('sensitivity') * 0.0021;
    this.yaw -= dx * sensitivity;
    this.pitch -= dy * sensitivity * (this.settings.get('invertY') ? -1 : 1);
    this.pitch = clamp(this.pitch, -1.35, 1.35);
  }

  update(dt, input) {
    if (!this.alive) {
      this.deathTimer += dt;
      this.respawnTimer -= dt;
      this.camera.position.y = damp(this.camera.position.y, this.position.y + 0.45, 3, dt);
      this.camera.rotation.x = damp(this.camera.rotation.x, -0.35, 3, dt);
      this.view.root.visible = false;
      return;
    }

    this.fireCooldown = Math.max(0, this.fireCooldown - dt);
    this.landKick = damp(this.landKick, 0, 9, dt);
    this.recoilPitch = damp(this.recoilPitch, 0, 7, dt);
    this.recoilYaw = damp(this.recoilYaw, 0, 7, dt);

    if (this.reloadTimer > 0) {
      this.reloadTimer -= dt;
      if (this.reloadTimer <= 0) this.finishReload();
    }

    const crouchWanted = Boolean(input.crouch);
    this.crouched = crouchWanted;
    const height = this.crouched ? CONFIG.player.crouchHeight : CONFIG.player.standHeight;

    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    const wish = new THREE.Vector3();
    if (input.forward) wish.add(forward);
    if (input.back) wish.sub(forward);
    if (input.right) wish.add(right);
    if (input.left) wish.sub(right);
    if (wish.lengthSq() > 0) wish.normalize();

    const sprinting = input.sprint && !this.crouched && (!input.back);
    let targetSpeed = this.crouched ? CONFIG.player.crouchSpeed : sprinting ? CONFIG.player.sprintSpeed : CONFIG.player.walkSpeed;
    if (this.reloadTimer > 0) targetSpeed *= 0.85;
    const accel = this.grounded ? CONFIG.player.accel : CONFIG.player.airAccel;
    const lerpAmount = 1 - Math.exp(-accel * dt);
    const desiredX = wish.x * targetSpeed;
    const desiredZ = wish.z * targetSpeed;
    this.velocity.x += (desiredX - this.velocity.x) * lerpAmount;
    this.velocity.z += (desiredZ - this.velocity.z) * lerpAmount;
    if (wish.lengthSq() === 0 && this.grounded) {
      const friction = Math.exp(-CONFIG.player.friction * dt);
      this.velocity.x *= friction;
      this.velocity.z *= friction;
    }

    // Jump
    if (input.jump && this.grounded) {
      this.velocity.y = CONFIG.player.jumpSpeed;
      this.grounded = false;
      if (this.audio) this.audio.footstep(true);
    }

    // Horizontal sweep, axis by axis. Step-height colliders are ignored.
    const step = CONFIG.player.stepHeight;
    const radius = CONFIG.player.radius;
    const feet = this.position.y;
    let nx = this.position.x + this.velocity.x * dt;
    if (!this.world.collidesCircle(nx, this.position.z, radius, feet + step, feet + height)) {
      this.position.x = nx;
    } else {
      this.velocity.x *= 0.1;
    }
    let nz = this.position.z + this.velocity.z * dt;
    if (!this.world.collidesCircle(this.position.x, nz, radius, feet + step, feet + height)) {
      this.position.z = nz;
    } else {
      this.velocity.z *= 0.1;
    }
    this.world.clampToBounds(this.position, radius);

    // Vertical integration and ground snapping.
    this.velocity.y -= CONFIG.player.gravity * dt;
    const newY = this.position.y + this.velocity.y * dt;
    const ground = this.world.groundAt(this.position.x, this.position.z, radius * 0.92, this.position.y + step + 0.05);
    if (this.grounded && this.position.y > ground + step + 0.02) {
      this.grounded = false;
    }
    if (newY <= ground + 0.001 && this.velocity.y <= 0) {
      if (!this.grounded && this.velocity.y < -4.5) {
        this.landKick = Math.min(0.11, Math.abs(this.velocity.y) * 0.012);
        if (this.audio) this.audio.footstep(true);
      }
      this.position.y = ground;
      this.velocity.y = 0;
      this.grounded = true;
    } else {
      this.position.y = newY;
      if (newY > ground + 0.02) this.grounded = false;
    }
    // Safety net: never fall out of the arena.
    if (this.position.y < -6) {
      this.position.y = 0;
      this.velocity.set(0, 0, 0);
    }
    if (this.grounded && Math.abs(this.velocity.x) + Math.abs(this.velocity.z) > 0.01) {
      this.stepDistance += Math.hypot(this.velocity.x, this.velocity.z) * dt;
      const stepInterval = sprinting || Math.hypot(this.velocity.x, this.velocity.z) > 5.5 ? 2.1 : 1.65;
      if (this.stepDistance > stepInterval) {
        this.stepDistance = 0;
        if (this.audio) this.audio.footstep(sprinting);
      }
    }

    // Smooth eye height and camera bob.
    const targetEye = this.crouched ? CONFIG.player.crouchEye : CONFIG.player.standEye;
    this.eye = damp(this.eye, targetEye, 13, dt);
    const bobSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    const bob = this.grounded ? Math.sin(this.stepDistance * 7.5) * Math.min(0.045, bobSpeed * 0.006) : 0;
    const targetFov = this.baseFov + (sprinting && bobSpeed > 5.2 ? 3 : 0);
    this.camera.fov = damp(this.camera.fov, targetFov, 6, dt);
    this.camera.updateProjectionMatrix();
    this.updateCamera(dt, bob);

    const reloadProgress = this.reloadTimer > 0 ? 1 - this.reloadTimer / this.reloadTotal : 0;
    this.view.update(dt, {
      speed: bobSpeed,
      grounded: this.grounded,
      reloadProgress,
      crouched: this.crouched,
    });
    this.currentSpread = this.calculateSpread(bobSpeed);
  }

  updateCamera(dt, bob) {
    const shakeX = this.recoilYaw * 0.2;
    this.camera.position.set(this.position.x, this.position.y + this.eye + bob - this.landKick, this.position.z);
    this.camera.rotation.set(this.pitch + this.recoilPitch, this.yaw + shakeX, 0, 'YXZ');
  }

  calculateSpread(speed = 0) {
    const weapon = this.weapon;
    if (!weapon) return 0.01;
    let spread = weapon.spread;
    const horizontal = Math.hypot(this.velocity.x, this.velocity.z);
    spread += (horizontal / CONFIG.player.sprintSpeed) * weapon.movingSpread;
    if (!this.grounded) spread += 0.055;
    if (this.crouched) spread *= 0.7;
    spread += Math.min(this.shots * 0.0025, weapon.maxSpread);
    return spread;
  }

  canFire() {
    return this.alive && this.fireCooldown <= 0 && this.reloadTimer <= 0 && this.currentAmmo.mag > 0;
  }

  fire(game) {
    if (!this.alive || this.reloadTimer > 0 || this.fireCooldown > 0) return false;
    const ammo = this.currentAmmo;
    if (ammo.mag <= 0) {
      this.startReload();
      return false;
    }
    const weapon = this.weapon;
    ammo.mag--;
    this.fireCooldown = weapon.fireRate;
    this.shots = Math.min(this.shots + 1, 12);
    const spread = this.calculateSpread(Math.hypot(this.velocity.x, this.velocity.z));
    this.recoilPitch += weapon.recoil * (this.crouched ? 0.8 : 1);
    this.recoilYaw += rand(-1, 1) * weapon.recoil * 0.55;
    this.view.fire();
    game.playerShoot(this, weapon, spread);
    if (ammo.mag === 0) this.startReload();
    return true;
  }

  releaseTrigger() {
    this.shots = 0;
  }

  startReload() {
    if (this.reloadTimer > 0 || !this.alive) return false;
    const ammo = this.currentAmmo;
    const weapon = this.weapon;
    if (ammo.mag >= weapon.magazine || ammo.reserve <= 0) return false;
    this.reloadTotal = weapon.reloadTime;
    this.reloadTimer = this.reloadTotal;
    if (this.audio) this.audio.reload();
    this.shots = 0;
    return true;
  }

  finishReload() {
    const ammo = this.currentAmmo;
    const weapon = this.weapon;
    const needed = weapon.magazine - ammo.mag;
    const take = Math.min(needed, ammo.reserve);
    ammo.mag += take;
    ammo.reserve -= take;
    this.reloadTimer = 0;
  }

  switchWeapon(id) {
    if (!CONFIG.weapons[id] || id === this.weaponId || this.reloadTimer > 0 || !this.alive) return;
    this.weaponId = id;
    this.fireCooldown = Math.max(this.fireCooldown, 0.35);
    this.shots = 0;
    this.view.setWeapon(id);
    if (this.audio) this.audio.uiClick();
  }

  takeDamage(amount, attackerPosition, game) {
    if (!this.alive) return false;
    const previousArmor = this.armor;
    let remaining = amount;
    if (this.armor > 0) {
      const absorbed = Math.min(this.armor, remaining * 0.5);
      this.armor -= absorbed;
      remaining -= absorbed * 0.72;
    }
    this.health -= remaining;
    this.lastDamageTime = game?.time ?? 0;
    if (attackerPosition) {
      this.lastDamageDirection.set(attackerPosition.x - this.position.x, 0, attackerPosition.z - this.position.z).normalize();
    }
    if (this.audio) this.audio.hurt();
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
      this.velocity.set(0, 0, 0);
      this.deathTimer = 0;
      this.respawnTimer = CONFIG.player.respawnTime;
      this.stats.deaths++;
      if (this.audio) this.audio.death();
      return true;
    }
    if (previousArmor <= 0 && this.armor <= 0) { /* armor already gone */ }
    return false;
  }

  dispose() {
    // The camera is reused between matches, so detach the view model before
    // disposing its geometry or the next match inherits a stale weapon.
    this.camera.remove(this.view.root);
    this.view.root.traverse((obj) => {
      if (obj.isMesh) {
        obj.geometry.dispose();
        if (obj.material && !Object.values(weaponMaterials).includes(obj.material)) {
          obj.material.dispose();
        }
      }
    });
    this.scene.remove(this.camera);
  }
}
