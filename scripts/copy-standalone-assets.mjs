import { cp, rm, stat } from 'node:fs/promises';

// `next build` with `output: 'standalone'` does not copy static assets; the standalone server expects them alongside it.
const root = new URL('../', import.meta.url);
const standalone = new URL('.next/standalone/', root);
await stat(standalone);

const copies = [
  ['.next/static/', '.next/standalone/.next/static/'],
  ['public/', '.next/standalone/public/'],
];
for (const [from, to] of copies) {
  const target = new URL(to, root);
  await rm(target, { recursive: true, force: true });
  await cp(new URL(from, root), target, { recursive: true });
}
console.log('Copied .next/static and public into .next/standalone.');
