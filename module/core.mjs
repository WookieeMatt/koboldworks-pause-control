import { CFG } from './config.mjs';

/**
 * @param {Boolean} state
 */
export function setPauseState(state) {
	if (game.paused === state) return;
	if (CFG.debug) console.log('%cPAUSE CONTROL%c | setPauseState =', CFG.COLORS.main, CFG.COLORS.unset, state);

	if (game.user?.isGM) {
		game.togglePause(state, true); // normal way
	}
	else {
		// DANGER WILL ROBINSON: SKIP GM
		// WARN: THIS IS LIKELY TO BREAK IN THE FUTURE IF PERMISSIONS ARE CHECKED PROPERLY
		if (game.release.generation >= 10)
			game.data.paused = state; // game.paused is getter for this in v10
		else
			game.paused = state;

		game.socket.emit('pause', state);
		ui.pause.render();
		Hooks.callAll('pauseGame', state);
	}
}
