import path from 'node:path';
import esbuild from 'esbuild';
import process from 'node:process';
import fs from 'node:fs';

const packData = fs.readFileSync('./package.json');
const packJSON = JSON.parse(packData);
const mainFile = packJSON.main;

const args = process.argv.slice(2);

const watch = args.includes('--watch');

const __dirname = path.resolve();
const externalizedEsm = ['./context/actor/details-tab/providers/*'];

async function build() {
	const res = await esbuild.build({
		entryPoints: [mainFile],
		bundle: true,
		outfile: mainFile.replace(/\.mjs$/, '.bundled.mjs'),
		metafile: true,
		sourcemap: true,
		minify: true,
		minifyIdentifiers: true,
		minifyWhitespace: true,
		minifySyntax: true,
		keepNames: true,
		platform: 'browser',
		format: 'esm',
		logLevel: 'info',
		logLimit: 0,
		treeShaking: true,
		color: true,
		watch,
		external: [
			...externalizedEsm.map(p => path.resolve(__dirname, p)),
			'/tests/*',
			'/node_modules/*'
		],
	}).catch(e => process.exit(-1));

	// Display size of sources
	const originalSizeB = Object.values(res.metafile.inputs).reduce((t, i) => t + i.bytes, 0);
	const files = Object.entries(res.metafile.inputs).reduce((t, [file, data]) => {
		t.add(file);
		data.imports.forEach(d => t.add(d.path));
		return t;
	}, new Set());
	console.log('Original total:', Math.round(originalSizeB / 100) / 10, 'kB,', files.size, 'files');
}

build();
