# Tuas AI Model API site

Next.js App Router deployment of the Tuas AI landing page. The page is currently in pre-launch ("Launching soon") mode with no CTAs or lead form. The page HTML is rendered on the server; the carousel is a small client-side progressive enhancement.

## Runtime and local development

- Node.js **24.x (Krypton LTS)**. `.node-version` pins 24.21.0 as the version used for verification; `package.json` accepts patched 24.x releases and rejects non-LTS older majors.
- npm 10+

```sh
# With nvm:
nvm install 24.21.0
nvm use
npm ci
npm run dev
```

Open http://localhost:3000. The public-facing page is `/`; `/healthz` returns `{"status":"ok","service":"tuas-ai-site"}`.

## Quality checks and production build

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm start
```

`npm run build` creates a Next.js standalone server, then its `postbuild` step (`scripts/copy-standalone-assets.mjs`) copies `.next/static` and `public/` into `.next/standalone`, so the PM2 process can run without a separate `next start` install step. Set `SITE_URL` to the canonical public origin if it differs from `https://tuas.ai`.

## Deploy with PM2 Cluster mode and Caddy

Prerequisites on the Linux host: Node.js 24.21.0 (LTS), npm, PM2 (`npm install --global pm2`), and Caddy. Point DNS for `tuas.ai` and `www.tuas.ai` to the host and allow inbound TCP 80/443.

1. Check out the release into a persistent application directory and install/build on the target host:

   ```sh
   git clone https://github.com/Kazarrackt/tuas-ai-site.git /srv/tuas-ai-site
   cd /srv/tuas-ai-site
   nvm install 24.21.0 && nvm use 24.21.0
   npm ci
   npm test && npm run typecheck && npm run lint && npm run build
   ```

2. PM2 must inherit the same Node 24 installation in its `PATH`. If using nvm, load nvm in the service account's shell before running PM2. `ecosystem.config.cjs` starts the standalone server with PM2 cluster mode, bound only to `127.0.0.1:3000`.

   ```sh
   pm2 start ecosystem.config.cjs
   pm2 save
   pm2 startup
   # Run the exact privileged command printed by `pm2 startup`, then:
   pm2 save
   ```

3. Install this repository's `Caddyfile` at `/etc/caddy/Caddyfile` (or merge its site block into the existing config), validate, then reload:

   ```sh
   sudo caddy validate --config /etc/caddy/Caddyfile
   sudo systemctl reload caddy
   ```

   Caddy obtains and renews TLS certificates and reverse proxies to the loopback-only PM2 listener. It redirects `www.tuas.ai` to `tuas.ai`.

4. Verify from the host and through the public hostname:

   ```sh
   curl --fail http://127.0.0.1:3000/healthz
   curl --fail https://tuas.ai/healthz
   curl --fail https://tuas.ai/ | grep -o 'Launching' | head -1
   pm2 status
   ```

### Release update / rollback

Build the new revision before restarting PM2. Keep the previous Git revision available; on failure, check `pm2 logs tuas-ai-site`, return to the previous revision, run `npm ci && npm run build`, and `pm2 reload ecosystem.config.cjs --update-env`. Reload after a successful build with:

```sh
pm2 reload ecosystem.config.cjs --update-env
```

The process manager and reverse proxy are intentionally separate: PM2 owns application workers, while Caddy owns public TLS and HTTP routing.

## Important production note: pre-launch mode

The page is in pre-launch mode: no buttons and no contact form. The full version with CTAs and the lead form is kept in the supplied source bundle as `_backup/index-with-ctas.html` (and in Git history before this change); its lead form never sent or persisted submissions, so connect it to an approved CRM/form handler before restoring it. The API URL and API key in the code sample are illustrative placeholders. Verify model availability, pricing, and onshore-data claims before release.

## Project structure

- `app/` — Next.js App Router, page, metadata, health endpoint, and client interactions
- `app/privacy`, `app/terms`, `app/ai-governance` — legal pages, sharing the header and footer from `index.html`; company details live in `app/company.ts`
- `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`, `public/llms.txt` — SEO and answer-engine metadata; JSON-LD structured data is in `app/layout.tsx`
- `public/assets/` — site logo and favicon
- `tests/` — project and deployment contract checks
- `ecosystem.config.cjs` — PM2 cluster application definition
- `Caddyfile` — Caddy reverse proxy and canonical-host redirect

The original `index.html` and `assets/` are retained as source/reference material during migration; the deployed app serves assets from `public/assets/`.

Model marks/logos belong to their respective owners and identify the models offered. Pricing on the source page is dated September 2026 and should be checked before launch.

## License

No license was included with the source files; all rights remain with their respective owners unless separately agreed.
'}
