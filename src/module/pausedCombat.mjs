import { CFG } from './config.mjs';
import { isResponsibleGM, setPauseState } from './core.mjs';

/**
 * @param {Combat} combat
 * @param {object} changed
 * @param _options
 * @param _userId
 */
function combatPauseControl(combat, changed, _options, _userId) {
	if (!isResponsibleGM()) return;

	// Only react to turn changes, not to unrelated combat updates (flags, etc.)
	if (!('turn' in changed || 'round' in changed)) return;

	if (!combat.started) return; // undesired interrference.
	if (combat.combatants.size === 0) return; // combat with no combatants

	const actor = combat.combatant?.actor;
	const newPauseState = !actor?.hasPlayerOwner;
	console.debug(`%cPAUSE CONTROL%c | Combat | Pausing: %c${newPauseState}%c; Actor:`,
		CFG.COLORS.main, CFG.COLORS.unset, CFG.COLORS.label, CFG.COLORS.unset, actor);

	setPauseState(newPauseState);
}

export function togglePauseControl(value) {
	if (value)
		Hooks.on('updateCombat', combatPauseControl);
	else
		Hooks.off('updateCombat', combatPauseControl);
}
