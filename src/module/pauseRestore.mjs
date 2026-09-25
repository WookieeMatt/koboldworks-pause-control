import { CFG } from './config.mjs';
import { isResponsibleGM, setPauseState } from './core.mjs';

/**
 * @param {Combat} combat
 * @param _options
 * @param _userId
 * @returns {Promise}
 */
async function saveState(combat, _options, _userId) {
	if (!isResponsibleGM()) return;

	const preCombatState = game.paused;

	console.debug('%cPAUSE CONTROL%c | Restore Pause | Recording state as: ', CFG.COLORS.main, CFG.COLORS.unset, preCombatState);

	return combat.setFlag(CFG.id, 'preCombatState', preCombatState);
}

/**
 * @param {Combat} combat
 * @param _options
 * @param _userId
 */
function restoreState(combat, _options, _userId) {
	if (!isResponsibleGM()) return;

	const preCombatState = combat.getFlag(CFG.id, 'preCombatState');
	if (preCombatState === undefined) return;

	console.debug('%cPAUSE CONTROL%c | Restore Pause | Restoring state to: ', CFG.COLORS.main, CFG.COLORS.unset, preCombatState);

	setPauseState(preCombatState);

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
