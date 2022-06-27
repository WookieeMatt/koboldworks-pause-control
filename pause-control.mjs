import { CFG } from './module/config.mjs';
import { getDocData } from './module/common.mjs';

import { KoboldworksPauseConfig } from './module/menu.mjs';
import { togglePauseRestore } from './module/pauseRestore.mjs';
import { toggleCombatUnpause } from './module/unpause.mjs';
import { togglePauseControl } from './module/pausedCombat.mjs';
import { setPauseState } from './module/core.mjs';

export function registerSettings() {
	game.settings.register(CFG.module, 'unpauseOnReady', { default: false, type: Boolean, scope: 'world', config: false });
	game.settings.register(CFG.module, 'unpauseOnCombat', { default: false, type: Boolean, scope: 'world', config: false, onChange: toggleCombatUnpause });
	game.settings.register(CFG.module, 'pausedCombat', { default: false, type: Boolean, scope: 'world', config: false, onChange: togglePauseControl });
	game.settings.register(CFG.module, 'restorePause', { default: false, type: Boolean, scope: 'world', config: false, onChange: togglePauseRestore });

	game.settings.registerMenu(
		CFG.module,
		'pauseMenu',
		{
			id: 'koboldworks-pause-config',
			name: 'Koboldworks.Pause.MenuLabel',
			label: 'Koboldworks.Pause.Title',
			hint: 'Koboldworks.Pause.MenuHint',
			icon: 'far fa-pause-circle',
			type: KoboldworksPauseConfig,
			config: true,
			restricted: true,
		}
	)
}

Hooks.once('init', () => {
	registerSettings();
});

Hooks.once('ready', () => {
	if (game.settings.get(CFG.module, 'pausedCombat'))
		togglePauseControl(true);

	if (game.settings.get(CFG.module, 'restorePause'))
		togglePauseRestore(true);

	if (game.settings.get(CFG.module, 'unpauseOnCombat'))
		toggleCombatUnpause(true);

	if (game.settings.get(CFG.module, 'unpauseOnReady'))
		setPauseState(false);

	const mod = game.modules.get(CFG.module);
	const md = getDocData(mod);
	console.log(`Koboldworks.PauseControl | ${md.version} | READY!`);
});
