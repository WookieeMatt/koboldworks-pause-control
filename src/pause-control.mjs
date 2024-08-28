import { CFG } from './module/config.mjs';

import { registerSettings } from './module/settings.mjs';
import { togglePauseRestore } from './module/pauseRestore.mjs';
import { toggleCombatUnpause } from './module/unpause.mjs';
import { togglePauseControl } from './module/pausedCombat.mjs';
import { setPauseState } from './module/core.mjs';

Hooks.once('init', registerSettings);

Hooks.once('ready', () => {
	const getSetting = (id) => game.settings.get(CFG.id, id);

	if (getSetting('pausedCombat'))
		togglePauseControl(true);

	if (getSetting('restorePause'))
		togglePauseRestore(true);

	if (getSetting('unpauseOnCombat'))
		toggleCombatUnpause(true);

	if (getSetting('unpauseOnReady'))
		setPauseState(false);

	const mod = game.modules.get(CFG.id);

	console.log(`%cPAUSE CONTROL%c | %c${mod.version}%c | READY!`,
		CFG.COLORS.main, CFG.COLORS.unset, CFG.COLORS.label, CFG.COLORS.unset);
});
