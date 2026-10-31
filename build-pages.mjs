import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { renderPage } from "./page-builder/core.mjs";
import { mainPages } from "./page-builder/pages-main.mjs";
import { detailPages } from "./page-builder/pages-details.mjs";
import { articlePages } from "./page-builder/pages-articles.mjs";

const siteDirectory = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.join(siteDirectory, "dist");
const pages = [...mainPages, ...detailPages, ...articlePages];

for (const page of pages) {
  const destination = path.join(outputDirectory, ...page.path.split("/"));
  await mkdir(destination, { recursive: true });
  await writeFile(path.join(destination, "index.html"), renderPage(page), "utf8");
}

const urls = ["/", ...pages.map((page) => `/${page.path}/`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>https://rerolrefinery.com${url}</loc></url>`).join("\n")}
</urlset>\n`;
await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap, "utf8");

console.log(`Built ${pages.length} pages and sitemap.xml`);
