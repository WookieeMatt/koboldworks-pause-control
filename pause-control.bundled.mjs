const CFG = {
	module: 'koboldworks-pause-control',
};

class KoboldworksPauseConfig extends FormApplication {
	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			id: 'koboldworks-pause-config',
			title: game.i18n.localize('Koboldworks.Pause.Title'),
			width: 420,
			height: 'auto',
			closeOnSubmit: true
		})
	}

	get template() {
		return `modules/${CFG.module}/template/config.hbs`;
	}

	getData() {
		const data = super.getData();

		data.settings = {
			onReady: {
				key: 'unpauseOnReady',
				hint: 'Koboldworks.Unpause.OnReadyHint',
				label: 'Koboldworks.Unpause.OnReady',
				value: game.settings.get(CFG.module, 'unpauseOnReady'),
			},
			onCombat: {
				key: 'unpauseOnCombat',
				hint: 'Koboldworks.Unpause.OnCombatHint',
				label: 'Koboldworks.Unpause.OnCombat',
				value: game.settings.get(CFG.module, 'unpauseOnCombat'),
			},
			pausedCombat: {
				key: 'pausedCombat',
				hint: 'Koboldworks.Pause.CombatControlHint',
				label: 'Koboldworks.Pause.CombatControl',
				value: game.settings.get(CFG.module, 'pausedCombat'),
			},
			restore: {
				key: 'restorePause',
				hint: 'Koboldworks.Pause.RestoreHint',
				label: 'Koboldworks.Pause.Restore',
				value: game.settings.get(CFG.module, 'restorePause'),
			},
		};

		return data;
	}

	/**
	 * @param {Event} _
	 * @param {Object} formData
	 */
	async _updateObject(_, formData) {
		for (const [key, value] of Object.entries(formData)) {
			if (game.settings.get(CFG.module, key) !== value)
				await game.settings.set(CFG.module, key, value);
		}
	}

	/**
	 * @param {Event} event
	 */
	async _onResetDefaults(event) {
		event.preventDefault();
		event.stopPropagation();
		await game.settings.set(CFG.module, 'unpauseOnReady', false);
		await game.settings.set(CFG.module, 'unpauseOnCombat', false);
		await game.settings.set(CFG.module, 'pausedCombat', false);
		await game.settings.set(CFG.module, 'restorePause', false);
		this.close();
	}

	/**
	 * @param {JQuery} jq
	 */
	activateListeners(jq) {
		super.activateListeners(jq);
		const html = jq[0];
		html.querySelector('button[name="reset"]')
			?.addEventListener('click', this._onResetDefaults.bind(this));
	}
}

/**
 * @param {Combat} combat
 * @returns {Promise}
 */
async function saveState(combat, _options, _id) {
	if (!game.user.isGM) return;

	const preCombatState = game.paused;

	if (CFG.debug) console.log('KOBOLDWORKS | Restore Pause | Recording state as: ', preCombatState);

	return combat.setFlag(CFG.module, 'preCombatState', preCombatState);
}

/**
 *
 * @param {Combat}
 * @returns
 */
function restoreState(combat, _options, _id) {
	if (!game.user.isGM) return;

	const preCombatState = combat.getFlag(CFG.module, 'preCombatState');
	if (preCombatState === undefined) return;

	if (CFG.debug) console.log('KOBOLDWORKS | Restore Pause | Restoring state to: ', preCombatState);

	game.togglePause(preCombatState, true);

	// deletion of the flag is unnecessary
}

function togglePauseRestore(value) {
	if (value) {
		Hooks.on('createCombat', saveState);
		Hooks.on('deleteCombat', restoreState);
	}
	else {
		Hooks.off('deleteCombat', restoreState);
		Hooks.off('createCombat', saveState);
	}
}

function unPauseCombat(combat, _settings, _id) {
	if (!game.user.isGM) return;

	if (!combat.started) return; // undesired.
	if (combat.data.combatants?.length < 1) return; // combat with no combatants

	if (game.paused) {
		if (CFG.debug) console.log('KOBOLDWORKS | Combat starting. Unpausing.');
		game.togglePause(false, true);
	}
}

function toggleCombatUnpause(value) {
	if (value)
		Hooks.on('updateCombat', unPauseCombat);
	else
		Hooks.off('updateCombat', unPauseCombat);
}

function combatPauseControl(combat, _settings, _id) {
	if (!game.user.isGM) return;

	if (!combat.started) return; // undesired interrference.
	if (combat.data.combatants?.length < 1) return; // combat with no combatants

	const actor = canvas.tokens.get(combat.current.tokenId)?.actor;
	const newPauseState = !actor?.hasPlayerOwner;
	if (CFG.debug) console.log('KOBOLDWORKS | PausedCombat | Pausing: ', newPauseState, 'Actor: ', actor);

	if (game.paused !== newPauseState)
		game.togglePause(newPauseState, true);
}

function togglePauseControl(value) {
	if (value)
		Hooks.on('updateCombat', combatPauseControl);
	else
		Hooks.off('updateCombat', combatPauseControl);
}

/**
 * @param {Boolean} state
 */
function setPauseState(state) {
	if (game.paused === state) return;
	if (CFG.debug) console.log('KOBOLDWORKS | setPauseState =' + state);

	// DANGER WILL ROBINSON: SKIP GM
	// WARN: THIS IS LIKELY TO BREAK IN THE FUTURE IF PERMISSIONS ARE CHECKED PROPERLY
	// game.togglePause(state, true); // normal way
	game.data.paused = state;
	game.socket.emit('pause', game.data.paused);
	ui.pause.render();
	Hooks.callAll('pauseGame', game.data.paused);

	if (game.paused !== state && CFG.debug) console.warn('KOBOLDWORKS | setPauseState: state unchanged');
}

function registerSettings() {
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
	);
}

Hooks.on('init', () => {
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

	console.log(`Koboldworks.PauseControl | ${game.modules.get(CFG.module).data.version} | READY!`);
});

export { registerSettings };
//# sourceMappingURL=pause-control.bundled.mjs.map
