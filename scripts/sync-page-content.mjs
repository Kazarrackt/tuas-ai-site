import { readFile, writeFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const match = html.match(/<body>([\s\S]*?)<\/body>/);
if (!match) throw new Error('Could not locate <body> content in index.html');
const content = match[1].replace(/\s*<script>[\s\S]*?<\/script>\s*/, '\n').trim();

// Header and footer are reused on the other pages, so in-page anchors must point back to the home page.
const pick = (tag) => {
  const part = content.match(new RegExp(`<${tag}[\\s\\S]*?</${tag}>`));
  if (!part) throw new Error(`Could not locate <${tag}> in index.html`);
  return part[0].replace(/href="#top"/g, 'href="/"').replace(/href="#/g, 'href="/#');
};

const generated = [
  `export const pageContent = ${JSON.stringify(content)};`,
  `export const siteHeader = ${JSON.stringify(pick('header'))};`,
  `export const siteFooter = ${JSON.stringify(pick('footer'))};`,
  '',
].join('\n');
await writeFile(new URL('../app/page-content.ts', import.meta.url), generated);
console.log(`Synchronized server-rendered page content (${content.length} characters).`);
