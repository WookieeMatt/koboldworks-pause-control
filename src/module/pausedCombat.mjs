import { CFG } from './config.mjs';

function combatPauseControl(combat, _settings, _id) {
	if (!game.user.isGM) return;

	if (!combat.started) return; // undesired interrference.
	if (combat.data.combatants?.length < 1) return; // combat with no combatants

	const actor = canvas.tokens.get(combat.current.tokenId)?.actor;
	const newPauseState = !actor?.hasPlayerOwner;
	console.debug(`%cPAUSE CONTROL%c | Combat | Pausing: %c${newPauseState}%c; Actor:`,
		CFG.COLORS.main, CFG.COLORS.unset, CFG.COLORS.label, CFG.COLORS.unset, actor);

	if (game.paused !== newPauseState)
		game.togglePause(newPauseState, true);
}

export function togglePauseControl(value) {
	if (value)
		Hooks.on('updateCombat', combatPauseControl);
	else
		Hooks.off('updateCombat', combatPauseControl);
}
