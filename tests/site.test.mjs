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
  assert.match(content, /Launching <span class=\\?"y\\?">soon/);
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
  assert.match(interaction, /prefers-reduced-motion/);
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
  // 'max' by default; hosts may pin a fixed worker count instead.
  assert.match(pm2, /instances:\s*(['"]max['"]|['"]?[1-9]\d*['"]?)\s*,/);
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

test('pre-launch page has no CTAs or lead form', async () => {
  const [content, interaction, layout] = await Promise.all([
    read('app/page-content.ts'),
    read('app/site-interactions.tsx'),
    read('app/layout.tsx'),
  ]);
  assert.doesNotMatch(content, /<form|href=\\?"#start|Get API access/);
  assert.doesNotMatch(interaction, /checkValidity|getElementById\('lead'\)/);
  assert.match(layout, /Launching soon/);
  assert.match(layout, /fonts\.googleapis\.com\/css2\?family=Figtree/);
});

test('package scripts expose reproducible build, test and type-check gates', async () => {
  const pkg = JSON.parse(await read('package.json'));
  assert.equal(pkg.scripts.build, 'next build');
  assert.equal(pkg.scripts.test, 'node --test');
  assert.equal(pkg.scripts.predev, 'node scripts/sync-page-content.mjs');
  assert.equal(pkg.scripts.prebuild, 'node scripts/sync-page-content.mjs');
  assert.equal(pkg.scripts.postbuild, 'node scripts/copy-standalone-assets.mjs');
  assert.equal(pkg.scripts.typecheck, 'tsc --noEmit');
});

test('hero carousel features GLM-5.3 at the pricing-card price instead of Kimi K3', async () => {
  const content = await read('app/page-content.ts');
  const hero = content.slice(content.indexOf('id=\\"offer'), content.indexOf('class=\\"pillars'));
  assert.doesNotMatch(content, /Kimi K3/);
  assert.match(hero, /GLM-5\.3<\/span>/);
  assert.doesNotMatch(hero, /class=\\"plan/);
  assert.equal((content.match(/<article class=\\"plan\\">/g) ?? []).length, 2);
  assert.match(hero, /1\.40<\/b>/);
  assert.match(hero, /4\.40<\/b>/);
  assert.match(hero, /Same price as Z\.ai/);
  assert.match(hero, /aria-label=\\"Show GLM-5\.3\\"/);
});

test('footer shows the UEN and links every legal page on all pages', async () => {
  const [content, company] = await Promise.all([read('app/page-content.ts'), read('app/company.ts')]);
  const footer = content.slice(content.indexOf('export const siteFooter'));
  assert.match(footer, /UEN: 202635139W/);
  assert.match(company, /uen: '202635139W'/);
  for (const path of ['privacy', 'terms', 'ai-governance']) {
    assert.match(footer, new RegExp(`href=\\\\"${path}\\\\"`));
    const page = await read(`app/${path}/page.tsx`);
    assert.match(page, new RegExp(`legalMetadata\\(\\s*'/${path}'`));
  }
  assert.doesNotMatch(content.slice(content.indexOf('export const siteHeader')), /href=\\"#/);
});

test('policies state the AI governance commitments', async () => {
  const [governance, privacy] = await Promise.all([read('app/ai-governance/page.tsx'), read('app/privacy/page.tsx')]);
  assert.match(governance, /NVIDIA GPU accelerators/);
  assert.match(governance, /Hugging Face/);
  assert.match(governance, /never train/);
  assert.match(privacy, /PDPA/);
  assert.match(privacy, /Data Protection\s+Officer/);
});

test('SEO and answer-engine metadata are published', async () => {
  const [layout, robots, sitemap, llms] = await Promise.all([
    read('app/layout.tsx'),
    read('app/robots.ts'),
    read('app/sitemap.ts'),
    read('public/llms.txt'),
  ]);
  assert.match(layout, /application\/ld\+json/);
  assert.match(layout, /propertyID: 'UEN'/);
  assert.match(layout, /canonical: '\/'/);
  assert.match(robots, /sitemap\.xml/);
  assert.match(sitemap, /legalPages/);
  assert.match(llms, /GLM-5\.3 \$1\.40 \/ \$4\.40/);
});
