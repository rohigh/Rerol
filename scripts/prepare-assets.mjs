import sharp from "sharp";
import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
const assets = path.resolve("dist/assets");
let before = 0, after = 0;
const responsive = {};
for (const name of await readdir(assets)) {
  if (!/\.(jpg|png)$/.test(name) || name === "social-card.png") continue;
  const input = path.join(assets, name);
  const output = input.replace(/\.(jpg|png)$/, ".webp");
  const image = sharp(input);
  if (name.startsWith("rerol-logo")) image.resize({ width: 256, withoutEnlargement: true });
  await image.webp({ quality: 82, effort: 6, alphaQuality: 100 }).toFile(output);
  before += (await stat(input)).size;
  after += (await stat(output)).size;
  if (!name.startsWith("rerol-logo")) {
    const meta = await sharp(input).metadata();
    const stem = path.parse(name).name;
    const widths = [...new Set([400, 800, 1200, meta.width].filter(width => width <= meta.width))].sort((a, b) => a - b);
    responsive[stem] = { width: meta.width, height: meta.height, variants: [] };
    for (const width of widths) {
      const filename = width === meta.width ? `${stem}.webp` : `${stem}-${width}.webp`;
      if (width !== meta.width) await sharp(input).resize({ width }).webp({ quality: 80, effort: 6 }).toFile(path.join(assets, filename));
      responsive[stem].variants.push({ width, src: `/assets/${filename}`, bytes: (await stat(path.join(assets, filename))).size });
    }
  }
}
await writeFile(path.join(assets, "responsive-images.json"), JSON.stringify(responsive, null, 2));
// Square, padded icons keep the entire brand mark visible on browser tabs and iOS.
for (const [name, size] of [["favicon-32.png", 32], ["favicon-192.png", 192], ["apple-touch-icon.png", 180]]) {
  const mark = await sharp(path.join(assets, "rerol-logo.png")).trim().resize(Math.round(size * .8), Math.round(size * .8), { fit: "inside" }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#f4f5f6" } }).composite([{ input: mark, gravity: "centre" }]).png().toFile(path.resolve("dist", name));
}
// ICO supports PNG payloads; include a 32px browser icon without another dependency.
const png = await sharp(path.resolve("dist/favicon-32.png")).png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4); ico[6] = 32; ico[7] = 32;
ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12); ico.writeUInt32LE(png.length, 14); ico.writeUInt32LE(22, 18);
await writeFile(path.resolve("dist/favicon.ico"), Buffer.concat([ico, png]));
const backdrop = await sharp(path.join(assets, "hero-refinery-dusk.jpg")).resize(1200, 630, { fit: "cover" }).toBuffer();
const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#101418" opacity=".85"/><rect x="66" y="70" width="6" height="490" fill="#ff8500"/><text x="108" y="147" fill="#fff" font-family="Arial,sans-serif" font-size="40" font-weight="700">Rerol Refinery</text><text x="108" y="290" fill="#fff" font-family="Arial,sans-serif" font-size="67" font-weight="700">Tested oil.</text><text x="108" y="375" fill="#ff8500" font-family="Arial,sans-serif" font-size="67" font-weight="700">Dependable supply.</text><text x="108" y="460" fill="#d1d7db" font-family="Arial,sans-serif" font-size="28">Furnace oil · LDO · Base oil · Used oil collection</text><text x="108" y="540" fill="#3fc5f4" font-family="Arial,sans-serif" font-size="26">rerolrefinery.com</text></svg>`);
await sharp(backdrop).composite([{ input: overlay }]).png().toFile(path.join(assets, "social-card.png"));
console.log(`WebP assets: ${before} → ${after} bytes (${Math.round((1-after/before)*100)}% smaller)`);
