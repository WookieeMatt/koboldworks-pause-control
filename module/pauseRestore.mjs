async function saveState(combat, _options, _id) {
	if (!game.user.isGM) return;

	const preCombatState = game.paused;

	if (CONFIG.Koboldworks?.debug) console.log('KOBOLDWORKS | Restore Pause | Recording state as: ', preCombatState);

	await combat.setFlag(module, 'preCombatState', preCombatState);
};

function restoreState(combat, _options, _id) {
	if (!game.user.isGM) return;

	const preCombatState = combat.getFlag(module, 'preCombatState');
	if (preCombatState === undefined) return;

	if (CONFIG.Koboldworks?.debug) console.log('KOBOLDWORKS | Restore Pause | Restoring state to: ', preCombatState);

	game.togglePause(preCombatState, true);

	// deletion of the flag is unnecessary
};

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
