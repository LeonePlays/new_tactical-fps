// First-person controller: acceleration, collision, jumping, crouching, weapons.
import * as THREE from 'three';
import { PLAYER, WEAPONS, clamp, damp } from './config.js';
import { moveHorizontal, supportHeight, collidesAt } from './physics.js';

export class Player {
  constructor() {
    this.pos = new THREE.Vector3(0, 0, 0);
    this.vel = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.health = 100;
    this.armor = 100;
    this.alive = true;
    this.respawnTimer = 0;
    this.grounded = true;
    this.crouching = false;
    this.crouchFactor = 0;
    this.aiming = false;
    this.aimFactor = 0;
    this.bobPhase = 0;
    this.bobOffset = 0;
    this.landDip = 0;
    this.stepAccum = 0;
    this.eyeHeight = PLAYER.eyeStand;
    this.weaponId = 'rifle';
    this.weapon = WEAPONS.rifle;
    this.ammo = WEAPONS.rifle.magSize;
    this.reserve = WEAPONS.rifle.reserve;
    this.slots = {
      rifle: { ammo: WEAPONS.rifle.magSize, reserve: WEAPONS.rifle.reserve },
      pistol: { ammo: WEAPONS.pistol.magSize, reserve: WEAPONS.pistol.reserve },
    };
    this.cooldown = 0;
    this.reloadT = 0;
    this.reloading = false;
    this.switchLock = 0;
    this.deadTime = 0;
    this.jumpBuffer = 0;
    this.wasGrounded = true;
    this._dir = new THREE.Vector3();
    this._euler = new THREE.Euler(0, 0, 0, 'YXZ');
    this._origin = new THREE.Vector3();
    this._prevPos = new THREE.Vector3();
    this.streak = 0;
    this.isPlayer = true;
    this.team = 'CT';
  }

  reset(spawn, yaw = 0) {
    this.pos.copy(spawn);
    this.vel.set(0, 0, 0);
    this.yaw = yaw;
    this.pitch = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.health = 100;
    this.armor = 100;
    this.alive = true;
    this.respawnTimer = 0;
    this.grounded = true;
    this.crouching = false;
    this.crouchFactor = 0;
    this.reloading = false;
    this.reloadT = 0;
    this.weaponId = 'rifle';
    this.weapon = WEAPONS.rifle;
    this.ammo = WEAPONS.rifle.magSize;
    this.reserve = WEAPONS.rifle.reserve;
    this.slots = {
      rifle: { ammo: WEAPONS.rifle.magSize, reserve: WEAPONS.rifle.reserve },
      pistol: { ammo: WEAPONS.pistol.magSize, reserve: WEAPONS.pistol.reserve },
    };
    this.cooldown = 0;
    this.streak = 0;
  }

  setWeapon(id) {
    if (id === this.weaponId || !this.alive) return false;
    const w = WEAPONS[id];
    if (!w) return false;
    this.slots[this.weaponId] = { ammo: this.ammo, reserve: this.reserve };
    this.weaponId = id;
    this.weapon = w;
    const slot = this.slots[id] || { ammo: w.magSize, reserve: w.reserve };
    this.ammo = slot.ammo;
    this.reserve = slot.reserve;
    this.reloading = false;
    this.reloadT = 0;
    this.cooldown = Math.max(this.cooldown, 0.35);
    this.switchLock = 0.3;
    return true;
  }

  update(dt, { world, input, game }) {
    this._prevPos.copy(this.pos);
    if (!this.alive) {
      this.respawnTimer = Math.max(0, this.respawnTimer - dt);
      this.deadTime += dt;
      return;
    }

    this.cooldown = Math.max(0, this.cooldown - dt);
    this.switchLock = Math.max(0, this.switchLock - dt);
    if (this.reloading) {
      this.reloadT -= dt;
      if (this.reloadT <= 0) this.finishReload();
    }

    const canMove = true;
    const wantCrouch = !!input.crouch;
    if (wantCrouch) this.crouching = true;
    else if (this.crouching) {
      // Only stand when there is headroom.
      if (!collidesAt(world, this.pos.x, this.pos.z, this.pos.y, PLAYER.standHeight, PLAYER.radius, PLAYER.stepHeight)) this.crouching = false;
    }
    this.crouchFactor = damp(this.crouchFactor, this.crouching ? 1 : 0, 13, dt);
    this.aiming = !!input.aim && !this.crouching;
    this.aimFactor = damp(this.aimFactor, this.aiming ? 1 : 0, 13, dt);

    const forward = this._dir.set(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    const wish = new THREE.Vector3();
    if (canMove) {
      if (input.forward) wish.add(forward);
      if (input.back) wish.sub(forward);
      if (input.right) wish.add(right);
      if (input.left) wish.sub(right);
    }
    if (wish.lengthSq() > 0) wish.normalize();

    let speed = PLAYER.standSpeed;
    if (this.crouching) speed = PLAYER.crouchSpeed;
    else if (input.walk) speed = PLAYER.walkSpeed;
    else if (this.aiming) speed = PLAYER.aimSpeed;

    const accel = this.grounded ? PLAYER.accel : PLAYER.airAccel;
    const targetX = wish.x * speed, targetZ = wish.z * speed;
    if (wish.lengthSq() > 0) {
      this.vel.x = damp(this.vel.x, targetX, accel, dt);
      this.vel.z = damp(this.vel.z, targetZ, accel, dt);
    } else if (this.grounded) {
      this.vel.x *= Math.pow(0.0008, dt);
      this.vel.z *= Math.pow(0.0008, dt);
    } else {
      this.vel.x *= Math.pow(0.5, dt);
      this.vel.z *= Math.pow(0.5, dt);
    }

    // Jump with a small input buffer.
    if (input.jumpPressed) this.jumpBuffer = 0.12;
    this.jumpBuffer = Math.max(0, this.jumpBuffer - dt);
    if (this.jumpBuffer > 0 && this.grounded && this.crouchFactor < 0.35) {
      this.vel.y = PLAYER.jumpSpeed;
      this.grounded = false;
      this.jumpBuffer = 0;
      game.audio?.jump();
    }

    this.wasGrounded = this.grounded;
    const height = this.crouching ? PLAYER.crouchHeight : PLAYER.standHeight;
    moveHorizontal(world, this.pos, this.vel.x * dt, this.vel.z * dt, height, PLAYER.radius, PLAYER.stepHeight);

    // Vertical motion and step support.
    const support = supportHeight(world, this.pos.x, this.pos.z, this.pos.y, PLAYER.radius, PLAYER.stepHeight + 0.04);
    if (this.grounded) {
      if (support > this.pos.y) this.pos.y = support;
      else if (support < this.pos.y - 0.28) {
        this.grounded = false;
        this.vel.y = 0;
      } else this.pos.y = support;
    }
    if (!this.grounded) {
      this.vel.y -= PLAYER.gravity * dt;
      this.pos.y += this.vel.y * dt;
      const landSupport = supportHeight(world, this.pos.x, this.pos.z, this.pos.y + 0.1, PLAYER.radius, PLAYER.stepHeight);
      if (this.pos.y <= landSupport && this.vel.y <= 0) {
        const impact = -this.vel.y;
        this.pos.y = landSupport;
        this.vel.y = 0;
        this.grounded = true;
        this.landDip = Math.min(0.12, impact * 0.016);
        if (impact > 3) game.audio?.land(impact > 6.5);
      }
    }

    // Ground bobbing and footsteps.
    const horizontalSpeed = Math.hypot(this.vel.x, this.vel.z);
    this.bobPhase += dt * (2.5 + horizontalSpeed * 1.55);
    const bobAmount = this.grounded ? Math.min(1, horizontalSpeed / 5.3) : 0;
    this.bobOffset = Math.sin(this.bobPhase * 2) * 0.022 * bobAmount;
    this.landDip = damp(this.landDip, 0, 9, dt);
    if (this.grounded && horizontalSpeed > 1.4) {
      this.stepAccum += dt * horizontalSpeed;
      if (this.stepAccum > (this.crouching ? 2.0 : 1.75)) {
        this.stepAccum = 0;
        game.audio?.footstep(!this.crouching);
      }
    } else this.stepAccum = 0;

    // Weapon input.
    if (input.switchWeapon) {
      this.setWeapon(this.weaponId === 'rifle' ? 'pistol' : 'rifle');
      game.onWeaponChanged?.(this);
    }
    if (input.reload) this.startReload(game);
    if (input.fire && !this.reloading && this.switchLock <= 0) {
      const canFire = this.weapon.auto ? true : input.firePressed;
      if (canFire && this.cooldown <= 0) this.shoot(game);
    }

    // Recoil recovery.
    this.recoilPitch = damp(this.recoilPitch, 0, 11, dt);
    this.recoilYaw = damp(this.recoilYaw, 0, 11, dt);
    if (this.ammo <= 0 && !this.reloading) this.startReload(game);
  }

  startReload(game) {
    if (this.reloading || this.reserve <= 0 || this.ammo >= this.weapon.magSize) return;
    this.reloading = true;
    this.reloadT = this.weapon.reloadTime;
    game.audio?.reload();
    game.viewModel?.reload(this.weapon.reloadTime);
    game.onReloadStarted?.(this);
  }

  finishReload() {
    const need = this.weapon.magSize - this.ammo;
    const take = Math.min(need, this.reserve);
    this.ammo += take;
    this.reserve -= take;
    this.slots[this.weaponId] = { ammo: this.ammo, reserve: this.reserve };
    this.reloading = false;
    this.reloadT = 0;
  }

  shoot(game) {
    if (!this.alive) return;
    if (this.ammo <= 0) { game.audio?.dryFire(); this.startReload(game); return; }
    this.ammo--;
    this.cooldown = this.weapon.fireInterval;
    this.slots[this.weaponId] = { ammo: this.ammo, reserve: this.reserve };

    const moving = Math.hypot(this.vel.x, this.vel.z);
    let spread = this.weapon.spread;
    if (this.aiming) spread = this.weapon.aimSpread;
    spread += Math.min(0.03, moving * 0.0028);
    if (!this.grounded) spread += 0.035;
    if (this.crouching) spread *= 0.65;

    this._euler.set(this.pitch + this.recoilPitch, this.yaw + this.recoilYaw, 0, 'YXZ');
    const dir = this._dir.set(0, 0, -1).applyEuler(this._euler).normalize();
    // Random cone for spread.
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * spread;
    const up = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(dir, up).normalize();
    const up2 = new THREE.Vector3().crossVectors(right, dir).normalize();
    dir.addScaledVector(right, Math.cos(a) * r).addScaledVector(up2, Math.sin(a) * r).normalize();

    this._origin.set(this.pos.x, this.pos.y + this.eyeHeight - this.crouchFactor * (PLAYER.eyeStand - PLAYER.eyeCrouch), this.pos.z);
    const result = game.raycastShot(this._origin, dir, this.weapon.range, 'player');

    const muzzle = game.viewModel?.muzzleWorld || this._origin;
    game.effects?.muzzle(muzzle, this.weaponId === 'rifle' ? 0xffc46a : 0xffdda0, this.weaponId === 'rifle' ? 1 : 0.7);
    if (result?.point) {
      game.effects?.tracer(muzzle, result.point);
      game.effects?.impact(result.point, result.normal || new THREE.Vector3(0, 1, 0), result.material || 'concrete', result.bot ? 0.7 : 1);
    } else {
      const end = this._origin.clone().addScaledVector(dir, this.weapon.range);
      game.effects?.tracer(muzzle, end);
    }
    game.audio?.shot(this.weapon.sound);

    // Recoil and camera feedback.
    this.recoilPitch += this.weapon.recoil * (this.crouching ? 0.7 : 1) * (this.aiming ? 0.7 : 1);
    this.recoilYaw += (Math.random() - 0.5) * this.weapon.recoil * 0.55;
    game.viewModel?.fire(this.weaponId);
    game.onPlayerShot?.(this, result);

    if (result?.bot) {
      const headshot = result.part === 'head';
      const dmg = this.weapon.damage * (result.mult || 1);
      game.damageBot(result.bot, dmg, this, headshot, this.weapon.name);
      game.ui?.hitmarker(headshot);
      game.audio?.hitmarker(headshot);
    }
    game.onAmmoChanged?.(this);
    if (this.ammo <= 0) this.startReload(game);
  }

  takeDamage(amount, attacker, { headshot = false, weapon = 'CV-47', direction = null } = {}) {
    if (!this.alive) return;
    let hp = amount;
    if (this.armor > 0) {
      const absorbed = Math.min(this.armor, hp * 0.5);
      this.armor = Math.max(0, this.armor - absorbed);
      hp -= absorbed;
    }
    this.health = Math.max(0, this.health - hp);
    if (this.health <= 0) {
      this.alive = false;
      this.deadTime = 0;
      this.respawnTimer = PLAYER.respawnDelay;
      this.crouching = false;
    }
    return { killed: !this.alive, direction };
  }

  respawn(world, spawn, yaw) {
    this.reset(spawn, yaw);
  }

  eyePosition() {
    return new THREE.Vector3(
      this.pos.x,
      this.pos.y + this.eyeHeight - this.crouchFactor * (PLAYER.eyeStand - PLAYER.eyeCrouch) + this.bobOffset - this.landDip,
      this.pos.z,
    );
  }

  getHitboxes() {
    const feet = this.pos.y;
    const c = this.crouchFactor;
    return [
      { x: this.pos.x, y: feet + 1.68 - c * 0.48, z: this.pos.z, radius: 0.18, part: 'head', mult: 2.2, player: true },
      { x: this.pos.x, y: feet + 1.28 - c * 0.35, z: this.pos.z, radius: 0.25, part: 'chest', mult: 1.0, player: true },
      { x: this.pos.x, y: feet + 0.62, z: this.pos.z, radius: 0.26, part: 'legs', mult: 0.8, player: true },
    ];
  }
}
