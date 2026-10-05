import { readFile, writeFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const match = html.match(/<body>([\s\S]*?)<\/body>/);
if (!match) throw new Error('Could not locate <body> content in index.html');
const content = match[1].replace(/\s*<script>[\s\S]*?<\/script>\s*/, '\n').trim();
const generated = `export const pageContent = ${JSON.stringify(content)};\n`;
await writeFile(new URL('../app/page-content.ts', import.meta.url), generated);
console.log(`Synchronized server-rendered page content (${content.length} characters).`);
