import { CFG } from './config.mjs';
import { isResponsibleGM, setPauseState } from './core.mjs';

export function unPauseCombat(combat, changed, _options, _userId) {
	if (!isResponsibleGM()) return;

	// Only when combat begins, so manual pauses mid-combat are left alone
	if (changed.round !== 1) return;

	if (!combat.started) return; // undesired.
	if (combat.combatants.size === 0) return; // combat with no combatants

	if (game.paused) {
		console.debug('%cPAUSE CONTROL%c | Combat starting. Unpausing.', CFG.COLORS.main, CFG.COLORS.unset);
		setPauseState(false);
	}
}

export function toggleCombatUnpause(value) {
	if (value)
		Hooks.on('updateCombat', unPauseCombat);
	else
		Hooks.off('updateCombat', unPauseCombat);
}
