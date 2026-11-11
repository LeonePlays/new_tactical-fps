// Match rules, scoring, hit-scan combat and respawn management.
import * as THREE from 'three';
import { PLAYER, MODES, DIFFICULTIES, BOT_NAMES, clamp } from './config.js';
import { raycastWorld, raySphere, rayBlocked, isSpawnFree } from './physics.js';
import { Bot } from './bots.js';

export class Game {
  constructor({ scene, player, world, effects, audio, materials, ui = null }) {
    this.scene = scene;
    this.player = player;
    this.world = world;
    this.effects = effects;
    this.audio = audio;
    this.materials = materials;
    this.ui = ui;
    this.bots = [];
    this.mode = MODES.tdm;
    this.mapBuilder = null;
    this.teamScores = { CT: 0, T: 0 };
    this.timeRemaining = 300;
    this.scoreLimit = 50;
    this.timeLimit = 300;
    this.state = 'idle'; // idle | playing | ended
    this.paused = false;
    this.difficulty = 'Normal';
    this.playerTeam = 'CT';
    this.config = null;
    this.listeners = new Map();
    this.lastKill = null;
    this.deathNoticeTimer = 0;
    this.matchStartedAt = 0;
    this.frameDamage = 0;
  }

  on(event, fn) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event).add(fn);
    return () => this.listeners.get(event)?.delete(fn);
  }

  emit(event, payload) {
    for (const fn of this.listeners.get(event) || []) {
      try { fn(payload); } catch (err) { console.error(err); }
    }
  }

  start(config, mapBuilder) {
    this.config = { ...config };
    this.mode = MODES[config.modeId] || MODES.tdm;
    this.mapBuilder = mapBuilder;
    this.world = mapBuilder;
    this.nav = mapBuilder.nav;
    this.playerTeam = this.mode.teamBased ? config.team : 'FFA';
    this.player.team = this.playerTeam;
    this.difficulty = DIFFICULTIES[config.difficulty] ? config.difficulty : 'Normal';
    this.scoreLimit = config.scoreLimit;
    this.timeLimit = config.timeLimit;
    this.timeRemaining = this.timeLimit;
    this.teamScores = { CT: 0, T: 0 };
    this.state = 'playing';
    this.paused = false;
    this.matchStartedAt = performance.now();
    this.deathNoticeTimer = 0;

    // Clear previous combatants.
    for (const b of this.bots) b.soldier.group.removeFromParent();
    this.bots = [];

    // Player stats.
    this.player.score = 0;
    this.player.kills = 0;
    this.player.deaths = 0;
    this.player.streak = 0;
    this.player.spawnProtection = 1.2;

    const spawn = this.pickSpawn(this.playerTeam, this.player);
    this.player.reset(spawn, this.yawForSpawn(spawn, this.playerTeam));
    this.effects?.reset();

    // Roster: balanced teams for TDM, every bot independent in FFA.
    const count = Math.max(1, Math.min(15, config.botCount | 0));
    const names = [...BOT_NAMES].sort(() => Math.random() - 0.5);
    for (let i = 0; i < count; i++) {
      let team;
      if (this.mode.teamBased) {
        const mates = Math.floor(count / 2);
        team = i < mates ? this.playerTeam : (this.playerTeam === 'CT' ? 'T' : 'CT');
      } else {
        team = i % 2 === 0 ? 'CT' : 'T';
      }
      const bot = new Bot({
        team,
        name: names[i % names.length] + (i >= names.length ? `-${i}` : ''),
        materials: this.materials,
        scene: this.scene,
        difficulty: this.difficulty,
        index: i,
      });
      bot.score = 0; bot.kills = 0; bot.deaths = 0; bot.spawnProtection = 1.2;
      const bspawn = this.pickSpawn(team, bot);
      bot.reset(bspawn, this.yawForSpawn(bspawn, team, true));
      this.bots.push(bot);
    }

    this.emit('start', this.snapshot());
    this.audio?.setMatchActive?.(true);
    return this;
  }

  yawForSpawn(spawn, team, isBot = false) {
    let playerYaw;
    if (this.mapBuilder?.spawnYaw && this.mode.teamBased && this.mapBuilder.spawnYaw[team] !== undefined) {
      playerYaw = this.mapBuilder.spawnYaw[team];
    } else {
      // Face roughly toward the middle of the map. The player's forward vector is
      // (-sin yaw, -cos yaw), while bot models face (+sin yaw, +cos yaw).
      playerYaw = Math.atan2(spawn.x, spawn.z);
    }
    return isBot ? playerYaw + Math.PI : playerYaw;
  }

  pickSpawn(team, self = null) {
    const builder = this.mapBuilder;
    let pool = [];
    if (!this.mode.teamBased) pool = [...(builder.spawns.CT || []), ...(builder.spawns.T || []), ...(builder.spawnsAny || [])];
    else if (builder.spawns[team]?.length) pool = builder.spawns[team];
    else pool = [...(builder.spawns.CT || []), ...(builder.spawns.T || [])];
    if (!pool.length) return new THREE.Vector3(0, 0, 0);

    const others = this.combatants().filter(e => e !== self && e.alive);
    const enemies = others.filter(e => this.mode.teamBased ? e.team !== team : true);

    const entries = pool.map((p) => {
      let nearest = Infinity;
      for (const e of others) nearest = Math.min(nearest, Math.hypot(e.pos.x - p.x, e.pos.z - p.z));
      let score = 100 + Math.random() * 12;
      for (const e of enemies) score += Math.min(42, Math.hypot(e.pos.x - p.x, e.pos.z - p.z));
      return { p, nearest, score };
    });

    // Prefer genuinely free spawn points. If the pool is exhausted, pick the
    // least crowded point instead of stacking combatants on top of each other.
    const clear = entries.filter(e => e.nearest >= 2.6);
    const ranked = (clear.length ? clear : entries.slice().sort((a, b) => b.nearest - a.nearest).slice(0, 3))
      .sort((a, b) => b.score - a.score);
    const chosen = ranked[0] || { p: pool[0], nearest: 0 };
    const spawn = chosen.p.clone();
    if (chosen.nearest > 2.0) {
      const jx = spawn.x + (Math.random() - 0.5) * 1.0;
      const jz = spawn.z + (Math.random() - 0.5) * 1.0;
      const minToOther = others.reduce((min, e) => Math.min(min, Math.hypot(e.pos.x - jx, e.pos.z - jz)), Infinity);
      if (minToOther >= 2.0 && isSpawnFree(this.world, jx, jz, 0.4)) {
        spawn.x = jx;
        spawn.z = jz;
      }
    }
    if (!isSpawnFree(this.world, spawn.x, spawn.z, 0.4)) {
      // Keep the analytic spawn point unless it is actually blocked, and never
      // fall back to an arbitrary point that another combatant already occupies.
      const free = entries
        .filter(e => isSpawnFree(this.world, e.p.x, e.p.z, 0.4))
        .sort((a, b) => b.nearest - a.nearest);
      if (free.length) spawn.copy(free[0].p);
    }
    return spawn;
  }

  combatants() {
    return [this.player, ...this.bots];
  }

  isEnemy(a, b) {
    if (a === b) return false;
    if (!this.mode.teamBased) return true;
    return a.team !== b.team;
  }

  spawnEntity(entity) {
    const team = entity === this.player ? this.playerTeam : entity.team;
    const spawn = this.pickSpawn(team, entity);
    if (entity === this.player) {
      this.player.reset(spawn, this.yawForSpawn(spawn, team));
      this.player.spawnProtection = 1.4;
      this.emit('playerRespawn', { spawn });
    } else {
      entity.reset(spawn, this.yawForSpawn(spawn, team, true));
      entity.spawnProtection = 1.4;
    }
  }

  update(dt, input) {
    if (this.state !== 'playing' || this.paused) return;
    this.timeRemaining = Math.max(0, this.timeRemaining - dt);
    if (this.timeRemaining <= 0) { this.endMatch('TIME LIMIT'); return; }

    if (this.player.spawnProtection > 0) this.player.spawnProtection -= dt;
    this.player.update(dt, { world: this.world, input, game: this });

    for (const bot of this.bots) {
      if (bot.spawnProtection > 0) bot.spawnProtection -= dt;
      bot.update(dt, this);
    }

    // Respawn timers.
    if (!this.player.alive && this.player.respawnTimer <= 0) {
      this.spawnEntity(this.player);
      this.emit('respawned', { player: true });
    }
    for (const bot of this.bots) {
      if (!bot.alive && bot.respawnTimer <= 0) this.spawnEntity(bot);
    }

    this.separateBots(dt);
    this.frameDamage = Math.max(0, this.frameDamage - dt);
    if (this.frameDamage === 0) this.emit('damageClear');
  }

  separateBots(dt) {
    // Cheap local separation so bots do not stack into each other.
    const all = [this.player, ...this.bots];
    for (let i = 1; i < all.length; i++) {
      const a = all[i];
      if (!a.alive) continue;
      for (let j = 0; j < i; j++) {
        const b = all[j];
        if (!b.alive) continue;
        const dx = a.pos.x - b.pos.x, dz = a.pos.z - b.pos.z;
        const d2 = dx * dx + dz * dz;
        const min = 0.72;
        if (d2 < min * min && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          const push = (min - d) * 0.5;
          const nx = dx / d, nz = dz / d;
          if (a !== this.player && isSpawnFree(this.world, a.pos.x + nx * push, a.pos.z + nz * push, 0.3)) {
            a.pos.x += nx * push; a.pos.z += nz * push;
          }
          if (b !== this.player && isSpawnFree(this.world, b.pos.x - nx * push, b.pos.z - nz * push, 0.3)) {
            b.pos.x -= nx * push; b.pos.z -= nz * push;
          }
        }
      }
    }
  }

  // Nearest wall or combatant along a bullet ray.
  raycastShot(origin, dir, range, shooter) {
    let wall = raycastWorld(this.world, origin, dir, range);
    let best = null;
    let bestDist = wall ? wall.distance : range;
    for (const entity of this.combatants()) {
      if (!entity.alive || entity === shooter) continue;
      if (entity.isPlayer && shooter === 'player') continue; // never let a shot hit its own owner
      if (shooter === 'player') {
        // The player can hit anyone hostile.
        if (this.mode.teamBased && entity.team === this.playerTeam) continue;
      } else if (!this.isEnemy(shooter, entity)) continue;
      for (const box of entity.getHitboxes()) {
        const hit = raySphere(origin.x, origin.y, origin.z, dir.x, dir.y, dir.z, box.x, box.y, box.z, box.radius);
        if (hit && hit.distance < bestDist) {
          bestDist = hit.distance;
          best = {
            entity, part: box.part, mult: box.mult, point: hit.point,
            normal: dir.clone().negate(), bot: entity.isPlayer ? null : entity,
            player: !!entity.isPlayer, material: 'dirt', headshot: box.part === 'head',
          };
        }
      }
    }
    if (best) return best;
    if (wall) {
      return {
        point: new THREE.Vector3(origin.x + dir.x * wall.distance, origin.y + dir.y * wall.distance, origin.z + dir.z * wall.distance),
        normal: wall.normal,
        material: wall.collider.material || 'concrete',
        distance: wall.distance,
      };
    }
    return null;
  }

  botShoot(bot, origin, dir) {
    const result = this.raycastShot(origin, dir, 90, bot);
    const muzzle = bot.soldier.getMuzzleWorld();
    if (result?.point) {
      this.effects?.tracer(muzzle, result.point);
      this.effects?.impact(result.point, result.normal || dir.clone().negate(), result.material || 'concrete', 0.8);
    }
    if (!result) return;
    const headshot = result.headshot;
    const dmg = (bot.skill?.damage || 11) * (result.mult || 1);
    if (result.player) {
      this.damagePlayer(dmg, bot, { headshot, weapon: 'CV-47', direction: dir });
    } else if (result.entity && !result.entity.isPlayer) {
      this.damageBot(result.entity, dmg, bot, headshot, 'CV-47');
    }
  }

  damageBot(bot, amount, attacker, headshot, weaponName = 'CV-47') {
    if (!bot || !bot.alive || this.state !== 'playing') return;
    if (bot.spawnProtection > 0) return;
    bot.health -= amount;
    this.emit('botDamaged', { bot, amount, attacker, headshot });
    if (bot.health > 0) return;

    bot.health = 0;
    bot.die();
    bot.deaths++;
    bot.respawnTimer = PLAYER.respawnDelay;
    const killer = attacker === this.player ? this.player : attacker;
    if (killer) {
      killer.score = (killer.score || 0) + 1;
      killer.kills = (killer.kills || 0) + 1;
      if (killer === this.player) {
        this.player.streak = (this.player.streak || 0) + 1;
        this.audio?.kill();
      }
      if (this.mode.teamBased) this.teamScores[killer.team] = (this.teamScores[killer.team] || 0) + 1;
    }
    this.reportKill(killer, bot, headshot, weaponName);
    this.emit('kill', this.lastKill);
    if (this.checkScoreLimit()) return;
  }

  damagePlayer(amount, attacker, { headshot = false, weapon = 'CV-47', direction = null } = {}) {
    if (!this.player.alive || this.state !== 'playing') return;
    if (this.player.spawnProtection > 0) return;
    const res = this.player.takeDamage(amount, attacker, { headshot, weapon });
    this.frameDamage = 0.35;
    this.audio?.hurt();
    const dir = direction ? direction.clone().negate() : null;
    this.emit('playerDamaged', { amount, health: this.player.health, armor: this.player.armor, direction: dir, headshot });
    if (!res?.killed) return;

    this.player.deaths++;
    this.player.streak = 0;
    if (attacker && attacker !== this.player) {
      attacker.score = (attacker.score || 0) + 1;
      attacker.kills = (attacker.kills || 0) + 1;
      if (this.mode.teamBased) this.teamScores[attacker.team] = (this.teamScores[attacker.team] || 0) + 1;
    }
    this.reportKill(attacker, this.player, headshot, weapon);
    this.emit('kill', this.lastKill);
    this.emit('playerKilled', { attacker, headshot });
    this.checkScoreLimit();
  }

  reportKill(killer, victim, headshot, weapon) {
    this.lastKill = {
      killer: killer ? (killer === this.player ? this.playerName() : killer.name) : 'WORLD',
      victim: victim === this.player ? this.playerName() : victim.name,
      killerTeam: killer?.team || null,
      victimTeam: victim.team || null,
      headshot: !!headshot,
      weapon,
      playerKill: killer === this.player,
      playerDeath: victim === this.player,
    };
  }

  playerName() { return this.player.displayName || 'Operator'; }

  checkScoreLimit() {
    if (this.mode.teamBased) {
      if (this.teamScores.CT >= this.scoreLimit) { this.endMatch('SCORE LIMIT', 'CT'); return true; }
      if (this.teamScores.T >= this.scoreLimit) { this.endMatch('SCORE LIMIT', 'T'); return true; }
    } else {
      for (const c of this.combatants()) {
        if ((c.score || 0) >= this.scoreLimit) { this.endMatch('SCORE LIMIT'); return true; }
      }
    }
    return false;
  }

  reportContact(team, pos, source) {
    if (Math.random() < 0.15) return;
    for (const bot of this.bots) {
      if (bot === source || !bot.alive) continue;
      if (this.mode.teamBased && bot.team !== team) continue;
      if (bot.pos.distanceTo(pos) < 38) bot.reportContact(pos);
    }
  }

  snapshot() {
    return {
      mode: this.mode,
      map: this.config?.mapId,
      teamScores: { ...this.teamScores },
      timeRemaining: this.timeRemaining,
      scoreLimit: this.scoreLimit,
      playerTeam: this.playerTeam,
      state: this.state,
    };
  }

  scoreboard() {
    const rows = this.combatants().map(c => ({
      name: c === this.player ? this.playerName() : c.name,
      team: c === this.player ? this.playerTeam : c.team,
      score: c.score || 0,
      kills: c.kills || 0,
      deaths: c.deaths || 0,
      isPlayer: c === this.player,
      alive: c.alive,
      bot: c !== this.player,
      state: c === this.player ? 'PLAYER' : c.state?.toUpperCase() || 'BOT',
    }));
    rows.sort((a, b) => b.score - a.score || b.kills - a.kills);
    return rows;
  }

  endMatch(reason = 'TIME LIMIT', forcedWinner = null) {
    if (this.state === 'ended') return;
    this.state = 'ended';
    this.audio?.setMatchActive?.(false);
    let winnerTeam = forcedWinner;
    let winnerName = null;
    let draw = false;
    let playerWon = false;

    if (this.mode.teamBased) {
      if (!winnerTeam) {
        if (this.teamScores.CT > this.teamScores.T) winnerTeam = 'CT';
        else if (this.teamScores.T > this.teamScores.CT) winnerTeam = 'T';
        else draw = true;
      }
      playerWon = !draw && winnerTeam === this.playerTeam;
      const label = winnerTeam === 'CT' ? 'COUNTER-TERRORISTS' : 'TERRORISTS';
      winnerName = draw ? 'DRAW' : label;
    } else {
      const sorted = this.combatants().slice().sort((a, b) => (b.score || 0) - (a.score || 0));
      const top = sorted[0], second = sorted[1];
      if (top && second && (top.score || 0) === (second.score || 0)) draw = true;
      winnerName = draw ? 'DRAW' : (top === this.player ? this.playerName() : top?.name || 'NO WINNER');
      playerWon = !draw && top === this.player;
    }

    const duration = Math.max(0, (performance.now() - this.matchStartedAt) / 1000);
    const result = {
      winnerName, winnerTeam, draw, playerWon, reason, duration,
      mode: this.mode,
      mapId: this.config?.mapId,
      teamScores: { ...this.teamScores },
      playerTeam: this.playerTeam,
      rows: this.scoreboard(),
      playerScore: this.player.score || 0,
      playerKills: this.player.kills || 0,
      playerDeaths: this.player.deaths || 0,
      scoreLimit: this.scoreLimit,
    };
    this.lastResult = result;
    this.audio?.matchEnd(playerWon);
    this.emit('end', result);
  }

  stop() {
    this.state = 'idle';
    this.paused = false;
    for (const b of this.bots) b.soldier.group.removeFromParent();
    this.bots = [];
    this.effects?.reset();
    this.audio?.setMatchActive?.(false);
  }
}
