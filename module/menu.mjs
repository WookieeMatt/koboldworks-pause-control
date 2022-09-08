import { CFG } from './config.mjs';

export class PauseConfig extends FormApplication {
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
