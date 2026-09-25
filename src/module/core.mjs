import { CFG } from './config.mjs';

/**
 * Should this client act on automated pause changes?
 *
 * Only one GM should act so multiple connected GMs do not fight over the pause state.
 *
 * @returns {boolean}
 */
export function isResponsibleGM() {
	return game.users.activeGM?.isSelf ?? false;
}

/**
 * Change pause state for everyone.
 *
 * Only a GM can broadcast pause changes, so this does nothing for other users.
 *
 * @param {boolean} state
 */
export function setPauseState(state) {
	if (!isResponsibleGM()) return;
	if (game.paused === state) return;
	console.debug('%cPAUSE CONTROL%c | setPauseState =', CFG.COLORS.main, CFG.COLORS.unset, state);

	game.togglePause(state, { broadcast: true });
}
