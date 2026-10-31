# Rerol Refinery Website

Static multi-page website for Rerol Refinery Private Limited.

## Project structure

- `dist/` — deployment-ready website
- `page-builder/` — page content and shared templates
- `build-pages.mjs` — regenerates the inner pages and sitemap

## Build

```bash
node build-pages.mjs
```

Serve the `dist` directory with any static web server.

## Vercel

The included `vercel.json` runs the page builder and publishes `dist`.
