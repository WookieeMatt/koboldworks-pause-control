import { CFG } from './config.mjs';
import { toggleCombatUnpause } from './unpause.mjs';
import { togglePauseControl } from './pausedCombat.mjs';
import { togglePauseRestore } from './pauseRestore.mjs';

export function registerSettings() {
	game.settings.register(CFG.id, 'unpauseOnReady', {
		name: 'Koboldworks.Unpause.OnReady',
		hint: 'Koboldworks.Unpause.OnReadyHint',
		default: false,
		type: Boolean,
		scope: 'world',
		config: true,
	});

	game.settings.register(CFG.id, 'unpauseOnCombat', {
		name: 'Koboldworks.Unpause.OnCombat',
		hint: 'Koboldworks.Unpause.OnCombatHint',
		default: false,
		type: Boolean,
		scope: 'world',
		config: true,
		onChange: toggleCombatUnpause,
	});

	game.settings.register(CFG.id, 'pausedCombat', {
		name: 'Koboldworks.Pause.CombatControl',
		hint: 'Koboldworks.Pause.CombatControlHint',
		default: false,
		type: Boolean,
		scope: 'world',
		config: true,
		onChange: togglePauseControl,
	});

	game.settings.register(CFG.id, 'restorePause', {
		name: 'Koboldworks.Pause.Restore',
		hint: 'Koboldworks.Pause.RestoreHint',
		default: false,
		type: Boolean,
		scope: 'world',
		config: true,
		onChange: togglePauseRestore,
	});
}
