export function unPauseCombat(combat, _settings, _id) {
	if (!combat.data.active) return; // shouldn't happen
	if (!combat.started) return; // undesired.
	if (combat.data.combatants?.length < 1) return; // combat with no combatants
	if (!game.user.isGM) return;

	if (game.paused) {
		if (CONFIG.Koboldworks.debug) console.log('KOBOLDWORKS | Combat starting. Unpausing.');
		game.togglePause(false, true);
	}
}

export function toggleCombatUnpause(value) {
	if (value)
		Hooks.on('updateCombat', unPauseCombat);
	else
		Hooks.off('updateCombat', unPauseCombat);
}
