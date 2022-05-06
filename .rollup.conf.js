const project = 'pause-control';

const path = require('path');

const externalizedEsm = [
];

export default {
	input: `${project}.mjs`,
	output: {
		file: `${project}.bundled.mjs`,
		format: 'es',
		sourcemap: true,
		preferConst: true,
		assetFileNames: "[name].[ext]",
	},
	preserveEntrySignatures: 'strict',
	external: [
		...externalizedEsm.map(p => path.resolve(__dirname, p)),
		/\/node_modules/
	],
	watch: {
		buildDelay: 250,
		exclude: ['node_modules/**'],
		include: ['**/*.mjs'],
		clearScreen: false,
	}
};
