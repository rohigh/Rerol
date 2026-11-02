import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { renderPage } from "./page-builder/core.mjs";
import { mainPages } from "./page-builder/pages-main.mjs";
import { detailPages } from "./page-builder/pages-details.mjs";
import { articlePages } from "./page-builder/pages-articles.mjs";
import { specificationSection, specificationLinks } from "./page-builder/specifications.mjs";

const siteDirectory = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.join(siteDirectory, "dist");
const pages = [...mainPages, ...detailPages, ...articlePages];
const specificationPages = new Map([
  ["services/used-oil-collection", 0],
  ["products/re-refined-base-oil", 1],
  ["products/light-diesel-oil", 2],
  ["products/distilled-fuel-oil", 3],
]);
pages.push({
  path: "products/distilled-fuel-oil",
  active: "products",
  title: "Distilled Fuel Oil (DFO) Proposed Specifications | Rerol Refinery",
  description: "Provisional DFO engineering targets, test methods and contaminant screening references. Laboratory validation pending; confirm the actual batch COA.",
  kicker: "Distilled fuel oil (DFO)",
  headline: "Provisional fuel targets for industrial heating.",
  intro: "A proposed Rerol grade for furnace and burner use, not automotive fuel. Review the engineering targets and confirm fuel classification, permitted end use and actual batch results before release.",
  heroImage: "/assets/product-furnace.jpg",
  primaryLabel: "Discuss DFO requirements",
  primaryHref: "/contact/",
  secondaryLabel: "Call our team",
  body: "",
});
for (const page of pages) {
  if (specificationPages.has(page.path)) {
    page.body = specificationSection(specificationPages.get(page.path)) + page.body;
  }
  if (["products", "services/testing-and-documentation"].includes(page.path)) {
    page.body = specificationLinks() + page.body;
  }
}

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
