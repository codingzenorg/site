import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceDir = process.argv[2] || '.external/first-fire/dist';
const targetDir = process.argv[3] || 'apps/first-fire';

await rm(targetDir, { recursive: true, force: true });
await mkdir(targetDir, { recursive: true });

const entries = await readdir(sourceDir, { withFileTypes: true });

for (const entry of entries) {
  const destination = path.join(targetDir, entry.name);
  await cp(path.join(sourceDir, entry.name), destination, {
    recursive: entry.isDirectory(),
  });
}

async function secureJavaScriptFiles(directory) {
  const files = await readdir(directory, { withFileTypes: true });
  for (const file of files) {
    const filename = path.join(directory, file.name);
    if (file.isDirectory()) {
      await secureJavaScriptFiles(filename);
      continue;
    }
    if (!file.name.endsWith('.js')) continue;

    const bundle = await readFile(filename, 'utf8');
    const secureUuidBundle = bundle.replace(
      'function Ze(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;',
      'function Ze(){let i=new Uint32Array(4);crypto.getRandomValues(i);let e=i[0],t=i[1],n=i[2],r=i[3];',
    );

    if (secureUuidBundle === bundle && bundle.includes('function Ze(){')) {
      throw new Error(`Could not secure UUID generation in ${filename}`);
    }

    await writeFile(filename, secureUuidBundle);
  }
}

await secureJavaScriptFiles(targetDir);

const html = await readFile(path.join(sourceDir, 'index.html'), 'utf8');
const stagedHtml = html.replaceAll('/assets/', './assets/');

await writeFile(path.join(targetDir, 'index.html'), stagedHtml);
