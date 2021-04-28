function combatPauseControl(combat, _settings, _id) {
	if (!combat.data.active) return; // shouldn't happen
	if (!combat.started) return; // undesired interrference.
	if (combat.data.combatants?.length < 1) return; // combat with no combatants

	if (!game.user.isGM) return;

	let actor = canvas.tokens.get(combat.current.tokenId)?.actor;
	const newPauseState = !(actor?.hasPlayerOwner);
	if (CONFIG.Koboldworks?.debug) console.log('KOBOLDWORKS | PausedCombat | Pausing: ', newPauseState, 'Actor: ', actor);

	if (game.paused !== newPauseState)
		game.togglePause(newPauseState, true);
}

export function togglePauseControl(value) {
	if (value)
		Hooks.on('updateCombat', combatPauseControl);
	else
		Hooks.off('updateCombat', combatPauseControl);
}
