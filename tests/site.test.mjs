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
  assert.equal((content.match(/model-card/g) ?? []).length, 5);
  assert.match(content, /GLM/);
  assert.match(content, /class=\\?"model-card/);
});

test('site retains progressive enhancement and operational health endpoint', async () => {
  const [interaction, route, config] = await Promise.all([
    read('app/site-interactions.tsx'),
    read('app/healthz/route.ts'),
    read('next.config.ts'),
  ]);
  assert.match(interaction, /touchstart/);
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

test('model chips scale on hover without hiding logos', async () => {
  const [content, styles, interactions] = await Promise.all([
    read('app/page-content.ts'),
    read('app/globals.css'),
    read('app/site-interactions.tsx'),
  ]);
  assert.match(styles, /\.models \.model-card:hover/);
  assert.match(styles, /transform:\s*scale\(1\.04\)/);
  assert.match(styles, /\.models \.model-card \.mlogo/);
  const decodedContent = content.slice(content.indexOf('"') + 1, content.lastIndexOf('"'));
  assert.ok(decodedContent.indexOf('>Qwen</span>') < decodedContent.indexOf('>Kimi</span>'));
  assert.ok(decodedContent.indexOf('>Gemma</span>') < decodedContent.indexOf('>GLM</span>'));
  assert.doesNotMatch(interactions, /pointermove|--tilt-x|--tilt-y/);
});

test('pricing cards subtly emphasize the hovered card and de-emphasize its siblings', async () => {
  const styles = await read('app/globals.css');
  assert.match(styles, /\.plans:has\(\.plan:hover\) \.plan:not\(:hover\)/);
  assert.match(styles, /\.plan:hover/);
});

test('package scripts expose reproducible build, test and type-check gates', async () => {
  const pkg = JSON.parse(await read('package.json'));
  assert.equal(pkg.scripts.build, 'next build');
  assert.equal(pkg.scripts.test, 'node --test');
  assert.equal(pkg.scripts.predev, 'node scripts/sync-page-content.mjs');
  assert.equal(pkg.scripts.prebuild, 'node scripts/sync-page-content.mjs');
  assert.equal(pkg.scripts.typecheck, 'tsc --noEmit');
});
