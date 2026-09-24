// Writes lighter copies of every photo in public/images: -800 (cards),
// -1200 (phones) and -1920 (desktop hero). Safe to re-run.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "../public/images");
// Each size has a byte budget; busy photos (grass, crowds) step quality down until they fit.
const SIZES = [
  { suffix: "-800", width: 800, quality: 72, budget: 50_000 },
  { suffix: "-1200", width: 1200, quality: 74, budget: 95_000 },
  { suffix: "-1920", width: 1920, quality: 76, budget: 190_000 },
];

for (const dir of await fs.readdir(root)) {
  for (const file of await fs.readdir(path.join(root, dir))) {
    if (!file.endsWith(".webp") || /-(800|1200|1920)\.webp$/.test(file)) continue;
    const src = path.join(root, dir, file);
    for (const s of SIZES) {
      const out = src.replace(/\.webp$/, `${s.suffix}.webp`);
      let q = s.quality;
      let width = s.width;
      let buf;
      for (;;) {
        buf = await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality: q, effort: 6 }).toBuffer();
        if (buf.length <= s.budget) break;
        if (q > 52) q -= 6;
        else if (width > s.width * 0.7) width = Math.round(width * 0.88);
        else break;
      }
      await fs.writeFile(out, buf);
    }
  }
}
console.log("variants written");
