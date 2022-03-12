import { CFG } from './config.mjs';

export function unPauseCombat(combat, _settings, _id) {
	if (!game.user.isGM) return;

	if (!combat.started) return; // undesired.
	if (combat.data.combatants?.length < 1) return; // combat with no combatants

	if (game.paused) {
		if (CFG.debug) console.log('KOBOLDWORKS | Combat starting. Unpausing.');
		game.togglePause(false, true);
	}
}

export function toggleCombatUnpause(value) {
	if (value)
		Hooks.on('updateCombat', unPauseCombat);
	else
		Hooks.off('updateCombat', unPauseCombat);
}
