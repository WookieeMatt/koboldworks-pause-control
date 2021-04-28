'use strict';

import { module } from './common.mjs';
import { registerSettings} from './module/register.mjs';

import { togglePauseRestore } from './module/pauseRestore.mjs';
import { toggleCombatUnpause } from './module/unpause.mjs';
import { togglePauseControl } from './module/pausedCombat.mjs';
import { setPauseState } from './module/core.mjs';

Hooks.on('init', () => {
	if (CONFIG.Koboldworks === undefined) CONFIG.Koboldworks = { debug: false };

	registerSettings();
});

Hooks.once('ready', () => {
	if (game.settings.get(module, 'pausedCombat'))
		togglePauseControl(true);

	if (game.settings.get(module, 'restorePause'))
		togglePauseRestore(true);

	if (game.settings.get(module, 'unpauseOnCombat'))
		toggleCombatUnpause(true);

	if (game.settings.get(module, 'unpauseOnReady'))
		setPauseState(false);

	console.log(`Koboldworks.PauseControl | ${game.modules.get(module).data.version} | READY!`);
});
