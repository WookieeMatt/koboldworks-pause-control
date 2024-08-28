import { CFG } from './config.mjs';

/**
 * @param {Combat} combat
 * @param _options
 * @param _id
 * @returns {Promise}
 */
async function saveState(combat, _options, _id) {
	if (!game.user.isGM) return;

	const preCombatState = game.paused;

	console.debug('%cPAUSE CONTROL%c | Restore Pause | Recording state as: ', CFG.COLORS.main, CFG.COLORS.unset, preCombatState);

	return combat.setFlag(CFG.id, 'preCombatState', preCombatState);
}

/**
 *
 * @param {Combat}
 * @param combat
 * @param _options
 * @param _id
 * @returns
 */
function restoreState(combat, _options, _id) {
	if (!game.user.isGM) return;

	const preCombatState = combat.getFlag(CFG.id, 'preCombatState');
	if (preCombatState === undefined) return;

	console.debug('%cPAUSE CONTROL%c | Restore Pause | Restoring state to: ', CFG.COLORS.main, CFG.COLORS.unset, preCombatState);

	game.togglePause(preCombatState, true);

	// deletion of the flag is unnecessary
}

export function togglePauseRestore(value) {
	if (value) {
		Hooks.on('createCombat', saveState);
		Hooks.on('deleteCombat', restoreState);
	}
	else {
		Hooks.off('deleteCombat', restoreState);
		Hooks.off('createCombat', saveState);
	}
}
