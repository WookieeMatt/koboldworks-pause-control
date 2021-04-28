import { module } from '../common.mjs';

const template = 'modules/koboldworks-pause-control/template/config.hbs';
Hooks.once('init', () => loadTemplates([template]));

export class KoboldworksPauseConfig extends FormApplication {
	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			id: "koboldworks-pause-config",
			title: game.i18n.localize('Koboldworks.Pause.Title'),
			template: template,
			width: 420,
			height: "auto",
			closeOnSubmit: true
		})
	}

	getData() {
		let data = super.getData();

		data.settings = {
			onReady: {
				key: 'unpauseOnReady',
				hint: 'Koboldworks.Unpause.OnReadyHint',
				label: 'Koboldworks.Unpause.OnReady',
				value: game.settings.get(module, 'unpauseOnReady'),
			},
			onCombat: {
				key: 'unpauseOnCombat',
				hint: 'Koboldworks.Unpause.OnCombatHint',
				label: 'Koboldworks.Unpause.OnCombat',
				value: game.settings.get(module, 'unpauseOnCombat'),
			},
			pausedCombat: {
				key: 'pausedCombat',
				hint: 'Koboldworks.Pause.CombatControlHint',
				label: 'Koboldworks.Pause.CombatControl',
				value: game.settings.get(module, 'pausedCombat'),
			},
			restore: {
				key: 'restorePause',
				hint: 'Koboldworks.Pause.RestoreHint',
				label: 'Koboldworks.Pause.Restore',
				value: game.settings.get(module, 'restorePause'),
			},
		};

		return data;
	}

	async _updateObject(_, formData) {
		Object.keys(formData).forEach(async (key) => {
			let value = formData[key];
			if (game.settings.get(module, key) !== value)
				await game.settings.set(module, key, value);
		});
	}

	// eslint-disable-next-line class-methods-use-this
	async _onResetDefaults(event) {
		event.preventDefault();
		await game.settings.set('unpauseOnReady', false);
		await game.settings.set('unpauseOnCombat', false);
		await game.settings.set('pausedCombat', false);
		await game.settings.set('restorePause', false);
		this.close();
	}

	activateListeners(html) {
		super.activateListeners(html);
		html.find('button[name="reset"]').click(this._onResetDefaults.bind(this));
	}
}
