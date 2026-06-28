import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceDir = process.argv[2] || '.external/shesha/dist';
const targetDir = process.argv[3] || 'apps/shesha';

await rm(targetDir, { recursive: true, force: true });
await mkdir(targetDir, { recursive: true });

const entries = await readdir(sourceDir, { withFileTypes: true });
const bundleEntry = entries.find((entry) => entry.isFile() && entry.name.endsWith('.js') && !entry.name.endsWith('.js.map'));

if (!bundleEntry) {
  throw new Error(`Could not find a Shesha bundle in ${sourceDir}`);
}

for (const entry of entries) {
  if (entry.name === 'index.html') {
    continue;
  }

  await cp(path.join(sourceDir, entry.name), path.join(targetDir, entry.name), {
    recursive: entry.isDirectory(),
  });
}

await writeFile(
  path.join(targetDir, 'index.html'),
  `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="../../images/favicon.png">
  <title>shesha | codingzen</title>
  <style>
    .root-return {
      position: fixed;
      top: 14px;
      left: 14px;
      z-index: 10;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 38px;
      padding: 0.55rem 0.8rem;
      border: 1px solid rgba(156, 255, 87, 0.36);
      border-radius: 999px;
      color: #07130f;
      background: linear-gradient(135deg, #9cff57, #dcff97);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.24);
      font: 700 0.72rem/1 monospace;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  </style>
</head>

<body>
  <a class="root-return" id="root-return" href="../../">world map</a>
  <script>
    document.getElementById('root-return').href = sessionStorage.getItem('codingzen:return-root') || '../../';
  </script>
  <script src="${bundleEntry.name}"></script>
</body>

</html>
`,
);
