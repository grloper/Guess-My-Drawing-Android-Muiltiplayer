import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
// A strict allowlist publishes only reviewed static assets, never Android source,
// historical archives, Firebase configuration or the repository root.
const files = [
  ['site/index.html', 'index.html'],
  ['site/style.css', 'style.css'],
  ['site/canvas-concept.svg', 'canvas-concept.svg'],
  ['docs/cover.svg', 'identity.svg'],
];
await mkdir(output, { recursive: true });
const allowed = new Set(files.map(([, target]) => target));
const unexpected = (await readdir(output)).filter(file => !allowed.has(file));
if (unexpected.length) throw new Error(`Unexpected output files; use a fresh dist directory: ${unexpected.join(', ')}`);
for (const [source, target] of files) await copyFile(path.join(root, source), path.join(output, target));
console.log(`Static project page built with ${process.version}: ${files.length} allowlisted files in dist/`);
