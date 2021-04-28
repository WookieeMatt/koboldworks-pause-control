'use strict';

import { module } from '../common.mjs';
import { KoboldworksPauseConfig } from './menu.mjs';
import { togglePauseRestore } from './pauseRestore.mjs';
import { toggleCombatUnpause } from './unpause.mjs';
import { togglePauseControl } from './pausedCombat.mjs';

export function registerSettings() {
	game.settings.register(module, 'unpauseOnReady', { default: false, type: Boolean, scope: 'world', config: false, });
	game.settings.register(module, 'unpauseOnCombat', { default: false, type: Boolean, scope: 'world', config: false, onChange: toggleCombatUnpause, });
	game.settings.register(module, 'pausedCombat', { default: false, type: Boolean, scope: 'world', config: false, onChange: togglePauseControl, });
	game.settings.register(module, 'restorePause', { default: false, type: Boolean, scope: 'world', config: false, onChange: togglePauseRestore, });

	game.settings.registerMenu(
		module,
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
