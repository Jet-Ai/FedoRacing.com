# FedoRacing

Slovak-first, English-second performance website. Red brand theme, official logo, visible social links and a roaming helmeted crab mascot with smoke, an on/off control and reduced-motion support.

## Pages

- `/index.html` / `/en.html`: services, ECU tuning, projects and contact.
- `/cars.html` / `/cars-en.html`: searchable car listings and customer submissions (four photos, 5 MB each). Every submission waits for owner approval.
- `/news.html` / `/news-en.html`: news, blog and events.
- `/admin.html`: owner moderation and bilingual article editor. No demo inventory or articles are published.

Instagram is FedoRacing. YouTube temporarily links to HillClimbFans as requested. Facebook is visibly marked as coming soon until its URL is supplied. The general enquiry form opens an email draft; visitors send it themselves. Car submissions are saved to the backend and do not send notification emails; review the admin queue.

## Source and previews

`dist/` contains the authored static frontend. Run `node build-community.mjs` to rebuild community pages. `localize.mjs` rebuilds the Slovak homepage from English; run the community builder after it. Copy `dist/*` into `backend/public/` after frontend edits.

`node preview.mjs` runs a static visual preview on port 4173. Listings and admin need the backend; static hosting alone cannot process submissions.

The `backend/` Vinext app provides D1 persistence, R2 photo storage, owner authentication and moderation. With Node 22.13+ and npm:

```sh
cd backend
npm ci
npm run dev -- --port 5173 --hostname 127.0.0.1
```

Apply `backend/drizzle/0000_damp_pete_wisdom.sql` to the local D1 database before testing. Local-only `.dev.vars` can define `ADMIN_TOKEN`; never commit it. `test-api.mjs` exercises moderation, photo permissions, article drafts, validation and authentication against the local server. Do not run it against production.

## Hosting recommendation

Use Cloudflare Workers for the website/API, D1 for listings/articles and R2 for photos. GitHub retains source. A standalone Worker adapter is included so the business domain need not depend on the private Sites preview.

1. Create a Cloudflare account, D1 database and R2 bucket.
2. Copy `wrangler.example.jsonc` to `wrangler.jsonc`; replace the database ID and resource names.
3. Install backend dependencies, then run from the repository root:

```sh
node backend/node_modules/wrangler/bin/wrangler.js login
node backend/node_modules/wrangler/bin/wrangler.js d1 migrations apply DB --remote --config wrangler.jsonc
node backend/node_modules/wrangler/bin/wrangler.js secret put ADMIN_TOKEN --config wrangler.jsonc
node backend/node_modules/wrangler/bin/wrangler.js deploy --config wrangler.jsonc
```

Use a long, unique, randomly generated administrator secret. Enter it on `/admin.html` only on your own HTTPS domain. It remains in the browser tab session until logout. Keep `AUTH_PROVIDER` set to `token` on standalone hosting; Sites identity headers are trusted only behind the Sites authentication proxy.

Connect `FedoRacing.com` as a Worker custom domain after deployment. This repository does not claim the domain is connected. The existing Sites preview remains owner-private and uses the owner's authenticated identity; its runtime secrets are configured outside Git.

References: [Workers static assets](https://developers.cloudflare.com/workers/static-assets/), [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/), [R2 bindings](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/).
