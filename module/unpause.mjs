import { CFG } from './config.mjs';
import { getDocData } from './compat.mjs';

export function unPauseCombat(combat, _settings, _id) {
	if (!game.user.isGM) return;

	if (!combat.started) return; // undesired.
	if (getDocData(combat).combatants?.length < 1) return; // combat with no combatants

	if (game.paused) {
		if (CFG.debug) console.log('%cPAUSE CONTROL%c | Combat starting. Unpausing.', CFG.COLORS.main, CFG.COLORS.unset);
		game.togglePause(false, true);
	}
}

export function toggleCombatUnpause(value) {
	if (value)
		Hooks.on('updateCombat', unPauseCombat);
	else
		Hooks.off('updateCombat', unPauseCombat);
}
