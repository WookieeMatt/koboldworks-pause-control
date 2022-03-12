import { CFG } from './config.mjs';

/**
 * @param {Boolean} state
 */
export function setPauseState(state) {
	if (game.paused === state) return;
	if (CFG.debug) console.log('KOBOLDWORKS | setPauseState =' + state);

	// DANGER WILL ROBINSON: SKIP GM
	// WARN: THIS IS LIKELY TO BREAK IN THE FUTURE IF PERMISSIONS ARE CHECKED PROPERLY
	// game.togglePause(state, true); // normal way
	game.data.paused = state;
	game.socket.emit('pause', game.data.paused);
	ui.pause.render();
	Hooks.callAll('pauseGame', game.data.paused);

	if (game.paused !== state && CFG.debug) console.warn('KOBOLDWORKS | setPauseState: state unchanged');
}
