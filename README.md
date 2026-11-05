# Rerol Refinery Website

Static multi-page website for Rerol Refinery Private Limited.

## Project structure

- `dist/` — deployment-ready website
- `page-builder/` — page content and shared templates
- `build-pages.mjs` — regenerates the inner pages and sitemap

## Build

```bash
npm ci
npm run build
```

Serve the `dist` directory with any static web server.

## Vercel

The included `vercel.json` generates responsive images and icons, bundles the background animation, runs the page builder and publishes `dist`.

## Enquiry delivery

The public Web3Forms access key supplied by the client is configured in `page-builder/enquiries.mjs`. `REROL_WEB3FORMS_ACCESS_KEY` can override it during the build. The form should be owned by Rerol with `rerolrefinery@gmail.com` as its verified recipient. The key is a public form identifier embedded in HTML, not an account API token or password.

Without a configured key, forms keep the existing WhatsApp-only flow and matching privacy disclosure. With a key, the form submits to Web3Forms and waits for an explicit successful response before opening WhatsApp. Failed or timed-out requests retain the fields and offer retry or a direct WhatsApp link. No enquiry fields are sent to Google Analytics or Google Ads by this integration.

Verify an actual enquiry in the Web3Forms dashboard and recipient inbox before declaring delivery live. Dashboard history and email delivery depend on the provider's current plan and account configuration.

```bash
node scripts/check-site.mjs
node scripts/check-enquiries.mjs
```

The enquiry tests mock network responses; they send no email and do not verify live delivery.
