import { mkdir, writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { renderPage } from "./page-builder/core.mjs";
import { navigationMarkup, desktopNavigationMarkup } from './page-builder/navigation.mjs';
import { mainPages } from "./page-builder/pages-main.mjs";
import { detailPages } from "./page-builder/pages-details.mjs";
import { articlePages } from "./page-builder/pages-articles.mjs";
import { specificationSection, specificationLinks } from "./page-builder/specifications.mjs";
import { legalPages } from "./page-builder/pages-legal.mjs";
import { metadataHead, enhanceHtml } from "./page-builder/seo.mjs";

const siteDirectory = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.join(siteDirectory, "dist");
const pages = [...mainPages, ...detailPages, ...articlePages, ...legalPages];
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
await writeFile(path.join(outputDirectory, "robots.txt"), "User-agent: *\nAllow: /\n\nSitemap: https://rerolrefinery.com/sitemap.xml\n", "utf8");
const notFound = {
  path: "404", noindex: true, active: "", title: "Page Not Found | Rerol Refinery",
  description: "This page could not be found. Explore Rerol products and services or contact our team.",
  kicker: "404 · Page not found", headline: "Let’s get you back on track.",
  intro: "The address may have changed or the page may no longer exist. Use the links below to continue.",
  primaryLabel: "Back to home", primaryHref: "/", secondaryLabel: "Explore products", secondaryHref: "/products/", body: ""
};
await writeFile(path.join(outputDirectory, "404.html"), renderPage(notFound), "utf8");
const homePath = path.join(outputDirectory, "index.html");
let homeHtml = await readFile(homePath, "utf8");
homeHtml = homeHtml.replace(/(<nav class="primary-nav"[^>]*>)[\s\S]*?<\/nav>/, `$1${desktopNavigationMarkup('/')}</nav>`);
homeHtml = homeHtml.replace(/(<ol class="menu-list"[^>]*>)[\s\S]*?<\/ol>/, `$1${navigationMarkup('/', true)}</ol>`);
homeHtml = homeHtml.replace(/<!-- SEO:start -->[\s\S]*?<!-- SEO:end -->\s*/g, "");
const homeMeta = {
  path: "", title: homeHtml.match(/<title>(.*?)<\/title>/s)[1],
  description: homeHtml.match(/name="description"\s+content="([^"]*)"/s)[1]
};
homeHtml = homeHtml.replace("</head>", metadataHead(homeMeta) + "\n  </head>");
if (!homeHtml.includes('href="/privacy-policy/"')) {
  homeHtml = homeHtml.replace('<span>Chennai, Tamil Nadu</span>', '<span>Chennai, Tamil Nadu</span><a href="/privacy-policy/">Privacy notice</a><button class="text-button" type="button" data-analytics-preferences>Analytics preferences</button>');
  homeHtml = homeHtml.replace('I agree that Rerol may contact me by phone, WhatsApp or email about this enquiry.', 'I agree that Rerol may contact me by phone, WhatsApp or email about this enquiry, as described in the <a href="/privacy-policy/">privacy notice</a>.');
}
await writeFile(homePath, enhanceHtml(homeHtml).replace(/[ \t]+$/gm, ""), "utf8");

console.log(`Built ${pages.length} pages and sitemap.xml`);
