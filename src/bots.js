// Map-aware bot combatant: perception, finite-state behaviour, A* navigation and
// difficulty-scaled aiming. Bots only fire at targets they can actually see.
import * as THREE from 'three';
import { DIFFICULTIES, PLAYER, clamp, damp } from './config.js';
import { moveHorizontal, rayBlocked, supportHeight } from './physics.js';
import { Soldier } from './characters.js';

const TMP_A = new THREE.Vector3();
const TMP_B = new THREE.Vector3();
const TMP_C = new THREE.Vector3();

function angleDiff(a, b) {
  return Math.atan2(Math.sin(b - a), Math.cos(b - a));
}

export class Bot {
  constructor({ team, name, materials, scene, difficulty = 'Normal', index = 0 }) {
    this.team = team;
    this.name = name;
    this.index = index;
    this.isPlayer = false;
    this.skillName = difficulty;
    this.skill = DIFFICULTIES[difficulty] || DIFFICULTIES.Normal;
    this.variation = 0.82 + Math.random() * 0.36;
    this.accuracyVariation = 0.9 + Math.random() * 0.2;
    this.maxHealth = Math.round(this.skill.health * (0.92 + Math.random() * 0.16));
    this.health = this.maxHealth;
    this.alive = true;
    this.respawnTimer = 0;
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.state = 'patrol';
    this.stateTimer = 0;
    this.target = null;
    this.targetVisible = false;
    this.lastSeen = new THREE.Vector3();
    this.lastSeenTimer = 0;
    this.reactionTimer = 0;
    this.fireCooldown = 0;
    this.burstLeft = 0;
    this.burstPause = 0;
    this.ammo = 30;
    this.reloadT = 0;
    this.thinkTimer = Math.random() * 0.15;
    this.path = [];
    this.pathIndex = 0;
    this.goal = null;
    this.goalType = 'patrol';
    this.repathTimer = 0;
    this.strafeDir = Math.random() > 0.5 ? 1 : -1;
    this.strafeTimer = 1 + Math.random() * 2;
    this.stuckTimer = 0;
    this.stuckCount = 0;
    this.lastStuckPos = new THREE.Vector3();
    this.investigateTimer = 0;
    this.idleTimer = Math.random();
    this.deathHideTimer = 0;
    this.soldier = new Soldier(team, name, materials, index);
    scene.add(this.soldier.group);
    this.group = this.soldier.group;
    this.group.position.copy(this.pos);
    this.contactCooldown = 0;
    this.firstSeen = 0;
  }

  reset(spawn, yaw = 0) {
    this.pos.copy(spawn);
    this.health = this.maxHealth;
    this.alive = true;
    this.respawnTimer = 0;
    this.yaw = yaw;
    this.pitch = 0;
    this.target = null;
    this.targetVisible = false;
    this.state = 'patrol';
    this.stateTimer = 0;
    this.path = [];
    this.pathIndex = 0;
    this.goal = null;
    this.reactionTimer = 0;
    this.fireCooldown = 0.4 + Math.random() * 0.8;
    this.burstLeft = 0;
    this.burstPause = 0;
    this.ammo = 30;
    this.reloadT = 0;
    this.investigateTimer = 0;
    this.idleTimer = Math.random() * 1.3;
    this.stuckCount = 0;
    this.lastStuckPos.copy(this.pos);
    this.soldier.revive();
    this.group.position.copy(this.pos);
    this.group.rotation.y = yaw;
  }

  die() {
    this.alive = false;
    this.target = null;
    this.state = 'dead';
    this.path = [];
    this.deathHideTimer = 1.7;
    this.soldier.dead = false;
    this.soldier.update(0, { dead: true });
  }

  hear(pos) {
    if (!this.alive || this.state === 'engage') return;
    if (Math.random() < 0.35) return;
    this.lastSeen.copy(pos);
    this.lastSeenTimer = Math.max(this.lastSeenTimer, 2.6);
    if (this.state !== 'investigate' && this.state !== 'pursue') {
      this.state = 'investigate';
      this.stateTimer = 0;
      this.path = [];
      this.goal = pos.clone();
      this.goalType = 'investigate';
    }
  }

  reportContact(targetPos) {
    if (!this.alive || this.state === 'engage') return;
    this.lastSeen.copy(targetPos);
    this.lastSeenTimer = Math.max(this.lastSeenTimer, 3.2);
  }

  getEyeWorld() {
    return new THREE.Vector3(this.pos.x, this.pos.y + 1.62, this.pos.z);
  }

  getHitboxes() {
    return this.soldier.getHitboxes();
  }

  update(dt, game) {
    if (!this.alive) {
      this.deathHideTimer -= dt;
      if (this.deathHideTimer <= 0) this.soldier.group.visible = false;
      else this.soldier.update(dt, { dead: true });
      this.respawnTimer = Math.max(0, this.respawnTimer - dt);
      return;
    }

    this.thinkTimer -= dt;
    this.contactCooldown = Math.max(0, this.contactCooldown - dt);
    this.fireCooldown = Math.max(0, this.fireCooldown - dt);
    this.reactionTimer = Math.max(0, this.reactionTimer - dt);
    this.stateTimer += dt;
    this.strafeTimer -= dt;
    if (this.strafeTimer <= 0) {
      this.strafeDir *= -1;
      this.strafeTimer = 1.1 + Math.random() * 2.4;
    }
    if (this.reloadT > 0) {
      this.reloadT -= dt;
      if (this.reloadT <= 0) this.ammo = 30;
    }

    if (this.thinkTimer <= 0) {
      this.thinkTimer = 0.16 + Math.random() * 0.1;
      this.perceive(game);
    }

    this.updateBehaviour(dt, game);

    // Animation state follows the tactical state.
    const speed = Math.hypot(this.vel.x, this.vel.z);
    this.soldier.update(dt, {
      speed,
      aiming: this.state === 'engage' || this.state === 'investigate',
      crouching: this.state === 'engage' && this.health < this.maxHealth * 0.35 && Math.random() < 0.01,
      dead: false,
    });
    this.group.position.copy(this.pos);
    this.group.rotation.y = this.yaw;
  }

  perceive(game) {
    const eye = this.getEyeWorld();
    const forward = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    const halfFov = Math.cos((this.skill.fov * Math.PI / 180) / 2);
    let best = null, bestScore = Infinity;
    let visibleAny = false;

    for (const other of game.combatants()) {
      if (other === this || !other.alive) continue;
      if (!game.isEnemy(this, other)) continue;
      const otherEye = other.isPlayer ? other.eyePosition() : other.getEyeWorld();
      const dx = otherEye.x - eye.x, dz = otherEye.z - eye.z;
      const dist = Math.hypot(dx, dz);
      if (dist > this.skill.sight) continue;
      const flat = new THREE.Vector3(dx, 0, dz).normalize();
      const inFov = forward.dot(flat) > halfFov;
      if (!inFov && dist > 4.2) continue;
      const chest = other.isPlayer
        ? new THREE.Vector3(other.pos.x, other.pos.y + 1.25, other.pos.z)
        : new THREE.Vector3(other.pos.x, other.pos.y + 1.3, other.pos.z);
      if (rayBlocked(game.world, eye, chest, 0.08)) continue;
      // Target selection: closer and already-engaged targets score better.
      let score = dist;
      if (other === this.target) score -= 6;
      if (other.isPlayer) score -= 2.5;
      if (other.health < 35) score -= 2;
      if (score < bestScore) { bestScore = score; best = other; visibleAny = true; }
    }

    if (best) {
      if (this.target !== best) {
        this.reactionTimer = this.skill.reaction[0] + Math.random() * (this.skill.reaction[1] - this.skill.reaction[0]);
        this.firstSeen = 0;
      }
      this.target = best;
      this.targetVisible = true;
      this.lastSeen.set(best.pos.x, best.pos.y + 1.2, best.pos.z);
      this.lastSeenTimer = 3.8;
      if (this.contactCooldown <= 0) {
        this.contactCooldown = 2.2;
        game.reportContact(this.team, this.lastSeen, this);
      }
    } else {
      this.targetVisible = false;
      if (this.lastSeenTimer > 0) this.lastSeenTimer -= 0.2;
      if (this.target && (!this.target.alive || this.lastSeenTimer <= 0)) this.target = null;
    }
  }

  updateBehaviour(dt, game) {
    if (this.target && this.targetVisible) {
      // Retreat is a genuine tactical decision, not a scripted state.
      if (this.health < this.maxHealth * 0.28 && this.state !== 'retreat' && Math.random() < 0.008) {
        this.state = 'retreat';
        this.stateTimer = 0;
        this.path = [];
        this.goal = this.findRetreatPoint(game);
        this.goalType = 'retreat';
      } else if (this.state !== 'retreat') {
        this.state = 'engage';
      }
    } else if (this.state === 'engage') {
      this.state = 'investigate';
      this.stateTimer = 0;
      this.path = [];
      this.goal = this.lastSeen.clone();
      this.goalType = 'investigate';
    }

    if (this.state === 'engage') this.engage(dt, game);
    else if (this.state === 'retreat') this.retreat(dt, game);
    else if (this.state === 'investigate') this.investigate(dt, game);
    else if (this.state === 'regroup') this.regroup(dt, game);
    else this.patrol(dt, game);
  }

  moveTowards(game, dir, speed, dt) {
    if (dir.lengthSq() < 0.0001) { this.vel.multiplyScalar(Math.pow(0.01, dt)); return; }
    dir.normalize();
    this.vel.x = damp(this.vel.x, dir.x * speed, 9, dt);
    this.vel.z = damp(this.vel.z, dir.z * speed, 9, dt);
    const before = TMP_A.copy(this.pos);
    moveHorizontal(game.world, this.pos, this.vel.x * dt, this.vel.z * dt, 1.68, 0.38, 0.48);
    // Vertical support / gravity. Bots follow stairs via the nav links.
    const support = supportHeight(game.world, this.pos.x, this.pos.z, this.pos.y, 0.38, 0.5);
    if (support > this.pos.y) this.pos.y = support;
    else if (support < this.pos.y - 0.35) {
      this.pos.y -= Math.min(9, dt * 16);
      if (this.pos.y < support) this.pos.y = support;
    } else this.pos.y = support;

    if (!this.stateEngagingFacing) this.yaw = this.faceYaw(this.yaw, Math.atan2(dir.x, dir.z), this.skill.turnSpeed * 0.75, dt);

    const moved = Math.hypot(this.pos.x - before.x, this.pos.z - before.z);
    if (moved < 0.006) {
      this.stuckTimer += dt;
      if (this.stuckTimer > 0.55) {
        this.stuckCount++;
        this.stuckTimer = 0;
        this.path = [];
        if (this.stuckCount >= 3) {
          this.stuckCount = 0;
          const node = game.nav.nearest(this.pos);
          if (node) {
            // Safe recovery to the nearest valid nav node (never through geometry).
            this.pos.set(node.x, node.y, node.z);
            this.vel.set(0, 0, 0);
          }
        }
      }
    } else {
      this.stuckCount = Math.max(0, this.stuckCount - 0.04);
      this.stuckTimer = 0;
    }
  }

  faceYaw(current, desired, turnSpeed, dt) {
    return current + clamp(angleDiff(current, desired), -turnSpeed * dt, turnSpeed * dt);
  }

  facePitch(current, desired, turnSpeed, dt) {
    return current + clamp(desired - current, -turnSpeed * dt, turnSpeed * dt);
  }

  followPath(game, goal, speed, dt, faceMovement = true) {
    this.stateEngagingFacing = !faceMovement;
    if (!goal) { this.vel.multiplyScalar(0.8); return false; }
    this.repathTimer -= dt;
    if (!this.path.length || this.repathTimer <= 0) {
      this.repathTimer = 1.4 + Math.random() * 0.8;
      this.path = game.nav.findPath(this.pos, goal);
      this.pathIndex = 0;
      if (!this.path.length) {
        // No route: head directly toward the goal while respecting collision.
        this.path = [game.nav.nearest(goal) || goal];
        this.pathIndex = 0;
      }
    }
    let wp = this.path[this.pathIndex];
    if (!wp) return false;
    const dx = wp.x - this.pos.x, dz = wp.z - this.pos.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.72) {
      this.pathIndex++;
      wp = this.path[this.pathIndex];
      if (!wp) return Math.hypot(goal.x - this.pos.x, goal.z - this.pos.z) < 1.4;
    } else {
      this.moveTowards(game, TMP_B.set(dx, 0, dz), speed, dt);
    }
    return Math.hypot(goal.x - this.pos.x, goal.z - this.pos.z) < 1.4;
  }

  patrol(dt, game) {
    this.stateEngagingFacing = false;
    this.idleTimer -= dt;
    if (!this.goal || this.state !== 'patrol' || (this.path.length && this.pathIndex >= this.path.length)) {
      if (this.idleTimer > 0) {
        this.vel.multiplyScalar(Math.pow(0.01, dt));
        return;
      }
      this.state = 'patrol';
      const target = this.pickPatrolPoint(game);
      this.goal = target;
      this.goalType = 'patrol';
      this.path = [];
      this.idleTimer = 1.3 + Math.random() * 3.5;
    }
    const arrived = this.followPath(game, this.goal, 3.15, dt);
    if (arrived) {
      this.goal = null;
      this.path = [];
      this.idleTimer = 1.2 + Math.random() * 2.6;
      // Sometimes switch to explore or regroup for more varied movement.
      if (Math.random() < 0.15) {
        this.state = 'explore';
        this.stateTimer = 0;
      }
    }
  }

  investigate(dt, game) {
    this.stateEngagingFacing = false;
    if (this.lastSeenTimer <= 0 && this.stateTimer > 2.0) {
      this.state = 'patrol';
      this.goal = null;
      this.path = [];
      this.idleTimer = 0.4;
      return;
    }
    if (!this.goal) this.goal = this.lastSeen.clone();
    if (this.state === 'explore') {
      this.lastSeenTimer = Math.max(this.lastSeenTimer, 0.2);
    }
    const arrived = this.followPath(game, this.goal, 3.8, dt);
    if (arrived) {
      this.stateTimer = 0;
      this.state = 'investigate';
      // Look around while searching.
      this.yaw += dt * 1.2;
      this.vel.multiplyScalar(Math.pow(0.01, dt));
      if (this.stateTimer > 2.4 || this.lastSeenTimer <= 0) {
        this.state = 'patrol';
        this.goal = null;
        this.path = [];
        this.idleTimer = 0.8;
      }
    }
  }

  retreat(dt, game) {
    this.stateEngagingFacing = false;
    if (!this.goal) this.goal = this.findRetreatPoint(game);
    const arrived = this.followPath(game, this.goal, 4.0, dt);
    // Fire back while retreating, less accurately.
    if (this.target && this.targetVisible) this.tryFire(game, 1.35);
    if (arrived || this.stateTimer > 3.2 || this.health > this.maxHealth * 0.45) {
      this.state = 'patrol';
      this.stateTimer = 0;
      this.goal = null;
      this.path = [];
      this.idleTimer = 0.7;
    }
  }

  regroup(dt, game) {
    this.stateEngagingFacing = false;
    if (!this.goal || this.stateTimer > 4) {
      const teammates = game.bots.filter(b => b !== this && b.alive && b.team === this.team);
      if (!teammates.length) { this.state = 'patrol'; this.goal = null; return; }
      const mate = teammates[Math.floor(Math.random() * teammates.length)];
      this.goal = new THREE.Vector3(mate.pos.x, mate.pos.y, mate.pos.z);
      this.stateTimer = 0;
      this.path = [];
    }
    this.followPath(game, this.goal, 3.7, dt);
    if (this.goal && Math.hypot(this.goal.x - this.pos.x, this.goal.z - this.pos.z) < 2.2) {
      this.state = 'patrol';
      this.goal = null;
      this.path = [];
    }
  }

  pickPatrolPoint(game) {
    const nodes = game.nav.nodes;
    if (!nodes.length) return this.pos.clone();
    let best = null;
    for (let i = 0; i < 8; i++) {
      const n = nodes[Math.floor(Math.random() * nodes.length)];
      const d = Math.hypot(n.x - this.pos.x, n.z - this.pos.z);
      if (d > 8 && d < 44) { best = n; break; }
    }
    best ||= nodes[Math.floor(Math.random() * nodes.length)];
    return new THREE.Vector3(best.x, best.y, best.z);
  }

  findRetreatPoint(game) {
    const nodes = game.nav.nodes;
    const threat = this.target ? (this.target.isPlayer ? this.target.pos : this.target.pos) : null;
    let best = null, bestScore = -Infinity;
    for (let i = 0; i < Math.min(nodes.length, 40); i++) {
      const n = nodes[Math.floor(Math.random() * nodes.length)];
      let score = Math.hypot(n.x - this.pos.x, n.z - this.pos.z);
      if (threat) score += Math.hypot(n.x - threat.x, n.z - threat.z) * 0.9;
      if (score > bestScore) { bestScore = score; best = n; }
    }
    return best ? new THREE.Vector3(best.x, best.y, best.z) : this.pos.clone();
  }

  engage(dt, game) {
    const target = this.target;
    if (!target || !target.alive) { this.state = 'patrol'; this.goal = null; return; }
    const eye = this.getEyeWorld();
    const targetEye = target.isPlayer ? target.eyePosition() : target.getEyeWorld();
    const targetChest = new THREE.Vector3(target.pos.x, target.pos.y + (target.isPlayer ? 1.2 : 1.25), target.pos.z);
    const dx = targetChest.x - eye.x, dz = targetChest.z - eye.z;
    const dist = Math.hypot(dx, dz);
    const desiredYaw = Math.atan2(dx, dz);
    const vertical = targetChest.y - eye.y;
    const desiredPitch = Math.atan2(vertical, Math.max(0.2, dist));

    this.yaw = this.faceYaw(this.yaw, desiredYaw, this.skill.turnSpeed, dt);
    this.pitch = this.facePitch(this.pitch, desiredPitch, this.skill.turnSpeed, dt);
    this.stateEngagingFacing = true;

    // Tactical movement: advance, hold, retreat or strafe.
    const preferred = 8.5 + (this.skillName === 'Easy' ? 6 : this.skillName === 'Hard' ? 1 : 3);
    const dir = TMP_A.set(dx, 0, dz).normalize();
    if (!this.targetVisible) {
      // Chase the last known position.
      this.followPath(game, this.lastSeen.clone(), 4.2, dt, false);
    } else if (dist > preferred + 4.5) {
      this.followPath(game, targetChest, 3.9, dt, false);
    } else if (dist < 4.0) {
      this.moveTowards(game, TMP_B.set(-dir.x, 0, -dir.z), 2.8, dt);
    } else {
      const strafe = TMP_B.set(-dir.z * this.strafeDir, 0, dir.x * this.strafeDir);
      strafe.multiplyScalar(this.skill.strafe * 2.4);
      this.moveTowards(game, strafe, 1.1 + this.skill.strafe, dt);
    }

    if (this.targetVisible) this.tryFire(game);
  }

  tryFire(game, inaccuracyMult = 1) {
    if (this.reloadT > 0) return;
    if (this.ammo <= 0) { this.reloadT = 2.1 + Math.random() * 0.5; return; }
    if (this.fireCooldown > 0) return;
    if (this.reactionTimer > 0) return;
    if (!this.target || !this.targetVisible) return;

    const target = this.target;
    const eye = this.getEyeWorld();
    const boxes = target.getHitboxes();
    const headChance = this.skillName === 'Hard' ? 0.22 : this.skillName === 'Normal' ? 0.11 : 0.04;
    const box = Math.random() < headChance ? boxes[0] : boxes[Math.min(boxes.length - 1, 1)];
    const aim = new THREE.Vector3(box.x, box.y, box.z);

    // Aim error scales with distance, movement and difficulty.
    const moving = Math.hypot(this.vel.x, this.vel.z);
    const error = this.skill.aimError * inaccuracyMult * (1 + moving * 0.12) * (1 + Math.hypot(aim.x - eye.x, aim.z - eye.z) * 0.012);
    aim.x += (Math.random() - 0.5) * error * 8;
    aim.y += (Math.random() - 0.5) * error * 6;
    aim.z += (Math.random() - 0.5) * error * 8;

    const dir = aim.sub(eye).normalize();
    // Verify muzzle line has not been blocked between perception and trigger.
    if (rayBlocked(game.world, eye, new THREE.Vector3(box.x, box.y, box.z), 0.1)) return;

    const muzzle = this.soldier.getMuzzleWorld();
    game.effects?.muzzle(muzzle, 0xffbd6b, 0.8);
    game.audio?.shot('rifle', this.pos.distanceTo(game.player.pos));
    game.botShoot(this, eye, dir);

    this.ammo--;
    this.fireCooldown = this.skill.fireDelay[0] + Math.random() * (this.skill.fireDelay[1] - this.skill.fireDelay[0]);
    if (this.skillName === 'Hard') this.fireCooldown *= 0.82;
    this.burstLeft++;
    if (this.burstLeft > this.skill.burst[1] || Math.random() < 0.12) {
      this.burstLeft = 0;
      this.fireCooldown += 0.25 + Math.random() * 0.55;
    }
    this.soldier.kick();
    if (this.ammo <= 0) this.reloadT = 2.2;
  }
}
