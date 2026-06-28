import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceDir = process.argv[2] || '.external/first-fire/dist';
const targetDir = process.argv[3] || 'apps/first-fire';

await rm(targetDir, { recursive: true, force: true });
await mkdir(targetDir, { recursive: true });

const entries = await readdir(sourceDir, { withFileTypes: true });

for (const entry of entries) {
  await cp(path.join(sourceDir, entry.name), path.join(targetDir, entry.name), {
    recursive: entry.isDirectory(),
  });
}

const html = await readFile(path.join(sourceDir, 'index.html'), 'utf8');
const stagedHtml = html.replaceAll('/assets/', './assets/');

await writeFile(path.join(targetDir, 'index.html'), stagedHtml);
