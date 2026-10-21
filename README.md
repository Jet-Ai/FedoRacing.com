# FedoRacing

Responsive website for drifting, car tuning, ECU chiptuning, performance upgrades, and drift and race car enquiries. Slovak is the default language; English is available through the SK / EN switch.

## Local preview

Requires Node.js. No dependencies or build step are needed.

```sh
node preview.mjs
```

Open http://127.0.0.1:4173 in your browser.

## Deployment

Publish the `dist` directory with any static website host. The entry point is `dist/index.html`. Connecting FedoRacing.com requires configuring the domain with the chosen host.

## Content and enquiries

- Email: FedoRacing@gmail.com
- Phone / WhatsApp: +421 951 215 935
- The enquiry form opens the visitor's email application with a prepared message. The visitor must send it; there is no backend form submission or storage.
- Vehicle images are illustrative. Replace them with actual inventory, specifications, and pricing when available.
- Fonts load from Google Fonts. Car images are included locally.

## Files

- `dist/index.html` — Slovak homepage
- `dist/en.html` — English version
- `localize.mjs` — Slovak translations; run `node localize.mjs` after editing the English page to regenerate the Slovak homepage
- `dist/styles.css` — responsive styling
- `dist/app.js` — navigation, tuning tabs, vehicle filters and email enquiry handling
- `preview.mjs` — local static preview server
