import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const result = await build({ absWorkingDir: root, entryPoints: [path.join(root, 'dist/pattern-waves.js')], outfile: path.join(root, 'dist/pattern-waves.bundle.js'), bundle: true, minify: true, format: 'esm', target: ['es2020'], legalComments: 'eof', metafile: true });
const inputs = await Promise.all(Object.keys(result.metafile.inputs).map(file => readFile(path.resolve(root, file))));
const bundle = await readFile(path.join(root, 'dist/pattern-waves.bundle.js'));
const metrics = {
  original: { requests: inputs.length, bytes: inputs.reduce((sum, input) => sum + input.length, 0), gzipBytes: inputs.reduce((sum, input) => sum + gzipSync(input).length, 0) },
  bundled: { requests: 1, bytes: bundle.length, gzipBytes: gzipSync(bundle).length },
  note: 'Build-time transfer comparison; not a browser timing or frame-rate measurement.'
};
await writeFile(path.join(root, 'animation-build-metrics.json'), JSON.stringify(metrics, null, 2) + '\n');
console.log(JSON.stringify(metrics));
