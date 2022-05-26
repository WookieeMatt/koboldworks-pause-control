import { CFG } from './config.mjs';

// V10 compatibility
export function getDocData(doc) {
	CFG.v10 ??= isNewerVersion(game.version, '10');
	return CFG.v10 ? doc : doc.data;
}
