import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
const root = path.resolve("dist");
const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const files = walk(root);
const pages = files.filter(file => file.endsWith(".html"));
const seenTitles = new Set(), seenDescriptions = new Set(), failures = [];
let schemaCount = 0, linkCount = 0, images = 0;
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const relative = path.relative(root, file).replaceAll("\\", "/");
  const route = relative === "404.html" ? "/404.html" : "/" + relative.replace(/index.html$/, "");
  const fail = message => failures.push(relative + ": " + message);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/name="description"\s+content="([^"]*)"/s)?.[1];
  if (!title || seenTitles.has(title)) fail("missing or duplicate title");
  if (!description || seenDescriptions.has(description)) fail("missing or duplicate description");
  seenTitles.add(title); seenDescriptions.add(description);
  if ((html.match(/<h1\b/g) || []).length !== 1) fail("must have exactly one H1");
  if (relative !== "404.html" && !html.includes('rel="canonical" href="https://rerolrefinery.com' + route + '"')) fail("incorrect canonical");
  if (!html.includes('property="og:image"')) fail("missing sharing image");
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const schema = JSON.parse(match[1]); schemaCount++;
      if (!schema["@graph"]?.some(item => item["@type"] === "Organization")) fail("missing Organization schema");
      if (!["index.html", "404.html"].includes(relative) && !schema["@graph"]?.some(item => item["@type"] === "BreadcrumbList")) fail("missing breadcrumb schema");
    } catch { fail("invalid JSON-LD"); }
  }
  if (!html.includes('src="/site-common.js?v=2"') || !html.includes('data-ga-id="G-GN2M85TE4F"')) fail("missing configured analytics code");
  if (!html.includes('href="/privacy-policy/"')) fail("missing privacy link");
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    images++;
    if (!/\balt=/.test(match[0])) fail("image without alt attribute");
    if (!/\.webp/.test(match[0])) fail("HTML image not optimized");
  }
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), "https://rerolrefinery.com" + route);
    if (url.origin !== "https://rerolrefinery.com") continue;
    linkCount++;
    let target = path.join(root, decodeURIComponent(url.pathname));
    if (existsSync(target) && statSync(target).isDirectory()) target = path.join(target, "index.html");
    if (!existsSync(target)) fail("missing internal target " + url.pathname);
    else if (url.hash && target.endsWith(".html") && !readFileSync(target, "utf8").includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"')) fail("missing anchor " + url.href);
  }
}
if (!existsSync(path.join(root, "robots.txt"))) failures.push("missing robots.txt");
if (!existsSync(path.join(root, "404.html"))) failures.push("missing custom 404");
const sitemap = readFileSync(path.join(root, "sitemap.xml"), "utf8");
if (sitemap.includes("/404")) failures.push("404 included in sitemap");
console.log(JSON.stringify({ pages: pages.length, indexablePages: pages.length - 1, schemas: schemaCount, internalLinksChecked: linkCount, optimizedImages: images, failures }, null, 2));
if (failures.length) process.exitCode = 1;
