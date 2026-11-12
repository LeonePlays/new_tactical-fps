import * as THREE from 'three';
import { Character } from '../entities/character.js';
import { CONFIG } from '../core/config.js';
import { clamp, damp, dampAngle, distance2D, rand, randInt } from '../core/utils.js';

const tempA = new THREE.Vector3();
const tempB = new THREE.Vector3();

// Finite-state tactical bot. Navigation and perception are real systems: every
// route comes from the map nav graph and every shot requires live line of sight.

export class Bot {
  constructor({ scene, world, nav, team, visualTeam, name, difficulty, mode, index, game }) {
    this.scene = scene;
    this.world = world;
    this.nav = nav;
    this.team = team;
    this.visualTeam = visualTeam;
    this.name = name;
    this.mode = mode;
    this.game = game;
    this.index = index;
    this.difficultyName = difficulty;
    this.character = new Character(scene, visualTeam, { name });
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.yaw = Math.PI;
    this.health = 100;
    this.alive = true;
    this.grounded = true;
    this.state = 'patrol';
    this.stateTimer = rand(0, 2);
    this.respawnTimer = 0;
    this.path = [];
    this.pathGoal = null;
    this.pathTimer = 0;
    this.perceptionTimer = rand(0, 0.15);
    this.target = null;
    this.targetVisible = false;
    this.lastSeen = new THREE.Vector3();
    this.lastSeenAt = -100;
    this.reactionTimer = 0;
    this.fireTimer = rand(0.2, 0.8);
    this.burstRemaining = 0;
    this.burstPause = 0;
    this.turnSpeed = 8;
    this.crouched = false;
    this.stuckTimer = 0;
    this.stuckCheckTimer = 0;
    this.lastPosition = new THREE.Vector3();
    this.strafeDir = Math.random() > 0.5 ? 1 : -1;
    this.strafeTimer = rand(0.7, 1.6);
    this.patrolGoalNode = null;
    this.idleLook = 0;
    this.kills = 0;
    this.deaths = 0;
    this.headshots = 0;
    this.damageDealt = 0;
    this.aimPitch = 0;
    this.skill = {
      reaction: rand(0.85, 1.18),
      accuracy: rand(0.82, 1.18),
      aggression: rand(0.75, 1.25),
      perception: rand(0.9, 1.12),
    };
    this.currentSpeed = 0;
    this.deadTime = 0;
    this.footstepTimer = 0;
    this.lastNoise = new THREE.Vector3();
  }

  configure(difficulty, mode) {
    this.difficultyName = difficulty;
    this.mode = mode;
  }

  spawn(spawn) {
    this.position.set(spawn.x, spawn.y ?? 0, spawn.z);
    this.velocity.set(0, 0, 0);
    this.health = 100;
    this.alive = true;
    this.grounded = true;
    this.state = 'patrol';
    this.stateTimer = rand(0, 1.2);
    this.path = [];
    this.pathGoal = null;
    this.target = null;
    this.targetVisible = false;
    this.lastSeenAt = -100;
    this.reactionTimer = 0;
    this.burstRemaining = 0;
    this.respawnTimer = 0;
    this.deadTime = 0;
    this.stuckTimer = 0;
    this.character.reset();
    this.character.setPosition(spawn.x, spawn.y ?? 0, spawn.z);
    this.character.setYaw(this.yaw = Math.atan2(-spawn.x, -spawn.z));
    this.choosePatrolPath(true);
  }

  get eyePosition() {
    return tempA.set(this.position.x, this.position.y + 1.55, this.position.z);
  }

  get difficulty() {
    return CONFIG.difficulties[this.difficultyName] || CONFIG.difficulties.Normal;
  }

  isEnemy(entity) {
    if (!entity || entity === this || !entity.alive) return false;
    if (this.mode === 'ffa') return entity !== this;
    return entity.team !== this.team;
  }

  receiveAlert(position, sourceTeam) {
    if (!this.alive) return;
    if (this.mode !== 'ffa' && sourceTeam === this.team) return;
    if (this.state === 'engage') return;
    this.lastSeen.copy(position);
    this.lastSeenAt = this.game.time;
    this.state = 'investigate';
    this.stateTimer = rand(2.5, 4.5);
    this.path = this.nav.findPath(this.position, position) || [];
    this.pathTimer = 0.8;
  }

  hear(position, sourceTeam) {
    if (!this.alive || this.state === 'engage') return;
    if (distance2D(this.position, position) > 28) return;
    if (this.mode !== 'ffa' && sourceTeam === this.team) return;
    this.lastSeen.copy(position);
    this.lastSeenAt = this.game.time;
    if (this.state === 'patrol' || this.state === 'idle' || this.state === 'regroup') {
      this.state = 'investigate';
      this.stateTimer = rand(3, 5);
      this.path = this.nav.findPath(this.position, position) || [];
      this.pathTimer = 1;
    }
  }

  choosePatrolPath(initial = false) {
    const self = this.position;
    for (let attempt = 0; attempt < 8; attempt++) {
      let node = this.nav.randomNode();
      if (!node) return;
      if (distance2D(self, node) < (initial ? 8 : 12)) continue;
      const path = this.nav.findPath(self, node);
      if (path && path.length) {
        this.path = path;
        this.pathGoal = node;
        this.patrolGoalNode = node;
        this.pathTimer = 3;
        return;
      }
    }
    this.path = [];
  }

  chooseRetreatPath() {
    const threat = this.target && this.target.position ? this.target.position : this.position;
    const candidates = this.nav.nodes.filter((node) => distance2D(node, threat) > 16 && distance2D(node, this.position) > 3);
    const shuffled = candidates.sort(() => Math.random() - 0.5).slice(0, 8);
    for (const node of shuffled) {
      const path = this.nav.findPath(this.position, node);
      if (path && path.length) {
        this.path = path;
        this.pathGoal = node;
        this.pathTimer = 2;
        return true;
      }
    }
    return false;
  }

  faceTarget(target, dt, speed) {
    const dx = target.x - this.position.x;
    const dz = target.z - this.position.z;
    const desired = Math.atan2(dx, dz);
    this.yaw = dampAngle(this.yaw, desired, speed, dt);
  }

  faceMovement(dx, dz, dt) {
    if (Math.abs(dx) + Math.abs(dz) < 0.001) return;
    this.yaw = dampAngle(this.yaw, Math.atan2(dx, dz), 8, dt);
  }

  moveToward(point, speed, dt, allowSprint = false) {
    const dx = point.x - this.position.x;
    const dz = point.z - this.position.z;
    const distance = Math.hypot(dx, dz);
    if (distance < 0.08) return 0;
    const nx = dx / distance;
    const nz = dz / distance;
    const step = CONFIG.player.stepHeight;
    const radius = CONFIG.player.radius;
    let moveSpeed = speed;
    if (allowSprint && distance > 8) moveSpeed = Math.min(CONFIG.player.sprintSpeed * 0.86, speed * 1.35);
    const nextX = this.position.x + nx * moveSpeed * dt;
    const nextZ = this.position.z + nz * moveSpeed * dt;
    const feet = this.position.y;
    let moved = 0;
    if (!this.world.collidesCircle(nextX, this.position.z, radius, feet + step, feet + 1.7)) {
      moved += Math.abs(nextX - this.position.x);
      this.position.x = nextX;
    }
    if (!this.world.collidesCircle(this.position.x, nextZ, radius, feet + step, feet + 1.7)) {
      moved += Math.abs(nextZ - this.position.z);
      this.position.z = nextZ;
    }
    this.world.clampToBounds(this.position, radius);
    this.currentSpeed = moved / Math.max(dt, 0.001);
    this.faceMovement(nx, nz, dt);
    return distance;
  }

  followPath(dt, speed, allowSprint) {
    if (!this.path.length) return false;
    const point = this.path[0];
    const distance = Math.hypot(point.x - this.position.x, point.z - this.position.z);
    if (distance < 0.9) {
      this.path.shift();
      if (!this.path.length) return false;
    }
    this.moveToward(this.path[0], speed, dt, allowSprint);
    return true;
  }

  updateVertical(dt) {
    this.velocity.y -= 20 * dt;
    this.position.y += this.velocity.y * dt;
    const ground = this.world.groundAt(this.position.x, this.position.z, 0.34, this.position.y + CONFIG.player.stepHeight + 0.04);
    if (this.position.y <= ground + 0.001) {
      this.position.y = ground;
      this.velocity.y = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }
    if (this.position.y < -5) {
      this.position.y = 0;
      this.velocity.y = 0;
    }
  }

  perceive(ctx) {
    const diff = this.difficulty;
    const eye = this.eyePosition.clone();
    const candidates = [];
    if (this.isEnemy(ctx.player)) candidates.push(ctx.player);
    for (const bot of ctx.bots) {
      if (bot !== this && bot.alive && this.isEnemy(bot)) candidates.push(bot);
    }

    let best = null;
    let bestScore = Infinity;
    const forwardX = Math.sin(this.yaw);
    const forwardZ = Math.cos(this.yaw);
    const range = diff.perception * this.skill.perception;

    for (const entity of candidates) {
      const targetPos = entity.position;
      const dx = targetPos.x - this.position.x;
      const dz = targetPos.z - this.position.z;
      const distance = Math.hypot(dx, dz);
      if (distance > range) continue;
      const dot = (dx * forwardX + dz * forwardZ) / Math.max(distance, 0.001);
      const inFov = dot > Math.cos((diff.fov * Math.PI / 180) / 2) || distance < 5;
      if (!inFov && entity !== this.target) continue;
      const chest = tempB.set(targetPos.x, targetPos.y + 1.2, targetPos.z);
      if (this.world.segmentBlocked(eye, chest)) continue;
      let score = distance;
      if (entity === this.target) score *= 0.7;
      if (entity.health < 40) score *= 0.8;
      if (score < bestScore) { bestScore = score; best = entity; }
    }

    if (best) {
      if (best !== this.target) {
        this.target = best;
        this.reactionTimer = rand(diff.reaction[0], diff.reaction[1]) * this.skill.reaction;
        this.burstRemaining = 0;
        this.lastSeen.copy(best.position);
        this.lastSeenAt = ctx.time;
      }
      this.targetVisible = true;
      this.lastSeen.copy(best.position);
      this.lastSeenAt = ctx.time;
      if (this.state !== 'engage' && this.state !== 'retreat') {
        if (this.health <= diff.retreatHealth && Math.random() < 0.45) {
          this.enterRetreat(ctx);
        } else {
          this.state = 'engage';
          this.stateTimer = 0;
          this.game.alertTeam(this, best);
        }
      }
    } else {
      this.targetVisible = false;
      if (this.target && !this.target.alive) this.target = null;
    }
  }

  enterRetreat(ctx) {
    this.state = 'retreat';
    this.stateTimer = rand(2.5, 4);
    this.chooseRetreatPath();
    this.game.alertTeam(this, this.target || { position: this.lastSeen });
  }

  handleCombat(dt, ctx) {
    const target = this.target;
    if (!target || !target.alive) {
      this.target = null;
      this.targetVisible = false;
      this.state = 'investigate';
      this.stateTimer = 3;
      return;
    }
    const diff = this.difficulty;
    const diffX = target.position.x - this.position.x;
    const diffZ = target.position.z - this.position.z;
    const distance = Math.hypot(diffX, diffZ);
    this.reactionTimer -= dt;
    this.faceTarget(target.position, dt, diff.turnSpeed);
    if (!this.targetVisible) {
      if (ctx.time - this.lastSeenAt > 1.4) {
        this.state = 'investigate';
        this.stateTimer = rand(3.5, 6);
        this.path = this.nav.findPath(this.position, this.lastSeen) || [];
        this.pathTimer = 1.2;
        this.target = null;
      }
      return;
    }

    // Keep a sensible fighting distance and strafe between bursts.
    this.strafeTimer -= dt;
    if (this.strafeTimer <= 0) {
      this.strafeTimer = rand(0.7, 1.8);
      this.strafeDir *= -1;
    }
    const preferred = 8 + (1 - diff.aggression) * 7;
    let moveSpeed = 0;
    if (distance > preferred + 2) {
      const pathReady = this.pathTimer <= 0 || !this.path.length;
      if (pathReady && distance > 16) {
        this.path = this.nav.findPath(this.position, target.position) || [];
        this.pathTimer = 0.8;
      }
      if (this.path.length) this.followPath(dt, 3.4, false);
      else this.moveToward(target.position, 3.4, dt, false);
      moveSpeed = this.currentSpeed;
    } else if (distance < preferred - 3) {
      const nx = -diffX / Math.max(distance, 0.001);
      const nz = -diffZ / Math.max(distance, 0.001);
      const strafe = (Math.sin(ctx.time * 1.7 + this.index) > 0 ? 1 : -1);
      const move = tempA.set(nx + (-nz) * strafe * 0.7, 0, nz + nx * strafe * 0.7).normalize();
      const speed = 2.6;
      const nextX = this.position.x + move.x * speed * dt;
      const nextZ = this.position.z + move.z * speed * dt;
      if (!this.world.collidesCircle(nextX, nextZ, 0.36, this.position.y + 0.44, this.position.y + 1.7)) {
        this.position.x = nextX; this.position.z = nextZ;
        this.currentSpeed = speed;
        moveSpeed = speed;
      }
    } else {
      // Lateral strafe
      const nx = -diffZ / Math.max(distance, 0.001);
      const nz = diffX / Math.max(distance, 0.001);
      const speed = 2.0 + this.skill.aggression;
      const nextX = this.position.x + nx * this.strafeDir * speed * dt;
      const nextZ = this.position.z + nz * this.strafeDir * speed * dt;
      if (!this.world.collidesCircle(nextX, nextZ, 0.36, this.position.y + 0.44, this.position.y + 1.7)) {
        this.position.x = nextX; this.position.z = nextZ;
        this.currentSpeed = speed;
        moveSpeed = speed;
      } else {
        this.strafeDir *= -1;
      }
    }

    // Shooting: reaction delay, aim cone and a live line-of-sight re-check.
    if (this.reactionTimer <= 0 && this.fireTimer <= 0) {
      const dx = target.position.x - this.position.x;
      const dz = target.position.z - this.position.z;
      const desiredYaw = Math.atan2(dx, dz);
      const aimError = Math.abs(((desiredYaw - this.yaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
      if (aimError < 0.3 && this.world.segmentBlocked(this.eyePosition, tempB.set(target.position.x, target.position.y + 1.15, target.position.z)) === false) {
        if (this.burstRemaining <= 0) {
          this.burstRemaining = randInt(diff.burst[0], diff.burst[1]);
          this.fireTimer = 0.05;
        } else {
          this.game.botShoot(this, target, diff);
          this.character.muzzle();
          this.burstRemaining--;
          this.fireTimer = rand(0.11, 0.17);
          if (this.burstRemaining <= 0) this.fireTimer = rand(diff.burstPause[0], diff.burstPause[1]) * (1.2 - diff.accuracySkill * 0.4);
        }
      } else {
        this.fireTimer = 0.08;
      }
    }
    this.fireTimer = Math.max(0, this.fireTimer - dt);
    return moveSpeed;
  }

  update(dt, ctx) {
    if (!this.alive) {
      this.deadTime += dt;
      this.respawnTimer -= dt;
      this.character.update(dt, { aiming: false });
      if (this.respawnTimer <= 0) ctx.game.respawnBot(this);
      return;
    }

    const diff = this.difficulty;
    this.stateTimer -= dt;
    this.perceptionTimer -= dt;
    this.pathTimer -= dt;
    this.fireTimer = Math.max(0, this.fireTimer - dt);
    this.currentSpeed = 0;

    if (this.perceptionTimer <= 0) {
      this.perceptionTimer = rand(0.1, 0.19);
      this.perceive(ctx);
    }

    if (this.state === 'engage' && this.target) {
      this.handleCombat(dt, ctx);
    } else if (this.state === 'retreat') {
      if (this.path.length) this.followPath(dt, 4.9, true);
      else if (!this.chooseRetreatPath()) this.state = 'patrol';
      if (this.stateTimer <= 0) {
        this.state = 'regroup';
        this.stateTimer = 4;
        this.path = [];
      }
    } else if (this.state === 'investigate') {
      if (this.path.length) {
        this.followPath(dt, 3.4, true);
      } else {
        this.currentSpeed = 0;
        this.idleLook += dt;
        this.yaw += Math.sin(this.idleLook * 1.8) * dt * 1.2;
      }
      if (this.stateTimer <= 0) {
        this.state = 'patrol';
        this.choosePatrolPath();
      }
    } else if (this.state === 'regroup') {
      // Move toward the nearest living teammate, then resume patrolling.
      let ally = null, best = Infinity;
      for (const bot of ctx.bots) {
        if (bot !== this && bot.alive && bot.team === this.team) {
          const d = distance2D(bot.position, this.position);
          if (d < best) { best = d; ally = bot; }
        }
      }
      if (this.mode === 'ffa' || !ally || best < 5) {
        this.state = 'patrol';
        this.choosePatrolPath();
      } else {
        if (this.pathTimer <= 0 || !this.path.length) {
          this.path = this.nav.findPath(this.position, ally.position) || [];
          this.pathTimer = 1.4;
        }
        this.followPath(dt, 3.6, false);
        if (this.stateTimer <= 0) this.state = 'patrol';
      }
    } else if (this.state === 'idle') {
      this.idleLook += dt;
      this.yaw += Math.sin(this.idleLook * 1.4) * dt * 0.8;
      if (this.stateTimer <= 0) {
        this.state = 'patrol';
        this.choosePatrolPath();
      }
    } else {
      // patrol
      if (!this.path.length) {
        if (this.stateTimer > 0) {
          this.state = 'idle';
          this.stateTimer = rand(0.8, 2.4);
          this.idleLook = 0;
        } else {
          this.choosePatrolPath();
          this.stateTimer = rand(8, 16);
        }
      } else {
        const hadPath = this.followPath(dt, 3.8, true);
        if (!hadPath) {
          this.state = 'idle';
          this.stateTimer = rand(0.7, 2.2);
          this.idleLook = 0;
        }
      }
    }

    // Gravity and ground snapping run every frame regardless of AI state, so a
    // bot that loses sight while stepping off a ledge cannot float in the air.
    this.updateVertical(dt);

    // Stuck recovery: re-route, then relocate to a valid node as a last resort.
    this.stuckCheckTimer += dt;
    if (this.stuckCheckTimer > 1) {
      const moved = distance2D(this.position, this.lastPosition);
      const wantMove = this.currentSpeed > 0.2;
      if (wantMove && moved < 0.3) this.stuckTimer += this.stuckCheckTimer;
      else this.stuckTimer = Math.max(0, this.stuckTimer - 0.5);
      this.lastPosition.copy(this.position);
      this.stuckCheckTimer = 0;
      if (this.stuckTimer > 1.8) {
        this.choosePatrolPath();
        this.stuckTimer = 0;
      }
      if (this.stuckTimer > 4.5) {
        const node = this.nav.nearestNode(this.position);
        if (node) {
          this.position.set(node.x, node.y, node.z);
          this.velocity.set(0, 0, 0);
          this.stuckTimer = 0;
          this.path = [];
        }
      }
    }

    // Separation so squads do not occupy the same space.
    for (const bot of ctx.bots) {
      if (bot === this || !bot.alive) continue;
      const dx = this.position.x - bot.position.x;
      const dz = this.position.z - bot.position.z;
      const d = Math.hypot(dx, dz);
      if (d > 0.01 && d < 0.85) {
        const nx = this.position.x + (dx / d) * (0.85 - d) * 0.5;
        const nz = this.position.z + (dz / d) * (0.85 - d) * 0.5;
        if (!this.world.collidesCircle(nx, nz, 0.36, this.position.y + CONFIG.player.stepHeight, this.position.y + 1.7)) {
          this.position.x = nx;
          this.position.z = nz;
        }
      }
    }

    this.world.clampToBounds(this.position, 0.36);
    this.character.setPosition(this.position.x, this.position.y, this.position.z);
    this.character.setYaw(this.yaw);
    const aiming = this.state === 'engage' || this.state === 'investigate' || this.state === 'retreat';
    this.character.update(dt, {
      speed: this.currentSpeed,
      grounded: this.grounded,
      crouched: this.crouched,
      aiming,
    });
  }

  takeDamage(amount) {
    if (!this.alive) return false;
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
      this.deadTime = 0;
      this.respawnTimer = 4.2;
      this.target = null;
      this.targetVisible = false;
      this.state = 'respawn';
      this.character.setDead();
      return true;
    }
    return false;
  }

  dispose() {
    this.character.dispose();
  }
}
