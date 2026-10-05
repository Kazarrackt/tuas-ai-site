import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8');
}

test('site renders the original landing page as server-rendered markup', async () => {
  const [page, content] = await Promise.all([read('app/page.tsx'), read('app/page-content.ts')]);
  assert.match(page, /dangerouslySetInnerHTML/);
  assert.match(content, /Frontier-level AI models/);
  assert.match(content, /id=\\?"pricing/);
  assert.match(content, /id=\\?"start/);
});

test('site retains progressive enhancement and operational health endpoint', async () => {
  const [interaction, route, config] = await Promise.all([
    read('app/site-interactions.tsx'),
    read('app/healthz/route.ts'),
    read('next.config.ts'),
  ]);
  assert.match(interaction, /prefers-reduced-motion/);
  assert.match(interaction, /checkValidity/);
  assert.match(route, /NextResponse/);
  assert.match(config, /standalone/);
});

test('deployment config uses PM2 cluster mode and keeps Caddy as reverse proxy', async () => {
  const [pm2, caddy, docs] = await Promise.all([
    read('ecosystem.config.cjs'),
    read('Caddyfile'),
    read('README.md'),
  ]);
  assert.match(pm2, /exec_mode:\s*['"]cluster['"]/);
  assert.match(pm2, /instances:\s*['"]max['"]/);
  assert.match(caddy, /reverse_proxy\s+127\.0\.0\.1:3000/);
  assert.ok(docs.includes('pm2 start ecosystem.config.cjs'));
  assert.match(docs, /healthz/);
});

test('package scripts expose reproducible build, test and type-check gates', async () => {
  const pkg = JSON.parse(await read('package.json'));
  assert.equal(pkg.scripts.build, 'next build');
  assert.equal(pkg.scripts.test, 'node --test');
  assert.equal(pkg.scripts.typecheck, 'tsc --noEmit');
});
