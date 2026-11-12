import { Game } from './game/game.js';
import { audio } from './audio/audio.js';

const canvas = document.querySelector('#game-canvas');
const bootError = document.querySelector('#boot-error');

function fail(error) {
  console.error(error);
  if (bootError) {
    bootError.classList.remove('hidden');
    bootError.innerHTML = `<strong>THE GAME COULD NOT START</strong><span>${String(error?.message || error)}</span><small>Try a current desktop browser with WebGL2 enabled.</small>`;
  }
}

try {
  if (!canvas) throw new Error('Game canvas was not found.');
  const game = new Game(canvas);
  window.game = game;

  // Unlock procedural audio as soon as the player interacts with the page.
  const unlock = () => {
    audio.init();
    audio.startMusic();
    audio.setVolumes();
  };
  window.addEventListener('pointerdown', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });

  window.addEventListener('error', (event) => {
    if (event.error) console.error('Runtime error:', event.error);
  });
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
  });
} catch (error) {
  fail(error);
}
