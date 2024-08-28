import { CFG } from './config.mjs';

export function unPauseCombat(combat, _settings, _id) {
	if (!game.user.isGM) return;

	if (!combat.started) return; // undesired.
	if (combat.combatants.size == 0) return; // combat with no combatants

	if (game.paused) {
		console.debug('%cPAUSE CONTROL%c | Combat starting. Unpausing.', CFG.COLORS.main, CFG.COLORS.unset);
		game.togglePause(false, true);
	}
}

export function toggleCombatUnpause(value) {
	if (value)
		Hooks.on('updateCombat', unPauseCombat);
	else
		Hooks.off('updateCombat', unPauseCombat);
}
