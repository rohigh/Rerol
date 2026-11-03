import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
const assets = path.resolve("dist/assets");
let before = 0, after = 0;
for (const name of await readdir(assets)) {
  if (!/\.(jpg|png)$/.test(name) || name === "social-card.png") continue;
  const input = path.join(assets, name);
  const output = input.replace(/\.(jpg|png)$/, ".webp");
  const image = sharp(input);
  if (name.startsWith("rerol-logo")) image.resize({ width: 256, withoutEnlargement: true });
  await image.webp({ quality: 82, effort: 6, alphaQuality: 100 }).toFile(output);
  before += (await stat(input)).size;
  after += (await stat(output)).size;
}
const backdrop = await sharp(path.join(assets, "hero-refinery-dusk.jpg")).resize(1200, 630, { fit: "cover" }).toBuffer();
const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#101418" opacity=".85"/><rect x="66" y="70" width="6" height="490" fill="#ff8500"/><text x="108" y="147" fill="#fff" font-family="Arial,sans-serif" font-size="40" font-weight="700">Rerol Refinery</text><text x="108" y="290" fill="#fff" font-family="Arial,sans-serif" font-size="67" font-weight="700">Tested oil.</text><text x="108" y="375" fill="#ff8500" font-family="Arial,sans-serif" font-size="67" font-weight="700">Dependable supply.</text><text x="108" y="460" fill="#d1d7db" font-family="Arial,sans-serif" font-size="28">Furnace oil · LDO · Base oil · Used oil collection</text><text x="108" y="540" fill="#3fc5f4" font-family="Arial,sans-serif" font-size="26">rerolrefinery.com</text></svg>`);
await sharp(backdrop).composite([{ input: overlay }]).png().toFile(path.join(assets, "social-card.png"));
console.log(`WebP assets: ${before} → ${after} bytes (${Math.round((1-after/before)*100)}% smaller)`);
