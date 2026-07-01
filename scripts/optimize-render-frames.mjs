/**
 * Optimize the scroll-driven render frame sequences.
 *
 * Source frames are 2000x2000 PNGs (~900 KB each, ~1 GB total across 1083 files),
 * which are far too heavy to load smoothly during scroll. This script resizes them
 * to 1080x1080 and converts to WebP (alpha preserved), reducing each frame to
 * roughly 60-90 KB — a ~10-15x reduction — so the sequence loads quickly.
 *
 * Output WebP files are written alongside the PNGs in the same folders.
 *
 * Usage: node scripts/optimize-render-frames.mjs
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const FOLDERS = [
  "public/Render/pipe",
  "public/Render/duct/nbr",
  "public/Render/duct/aluglass",
];

const TARGET = 1080; // max dimension
const QUALITY = 80;

let totalIn = 0;
let totalOut = 0;
let count = 0;

for (const rel of FOLDERS) {
  const dir = join(ROOT, rel);
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    console.warn(`Skipping missing folder: ${rel}`);
    continue;
  }
  const pngs = entries.filter((f) => extname(f).toLowerCase() === ".png");
  console.log(`\n${rel}: ${pngs.length} PNG frames`);

  for (const file of pngs) {
    const src = join(dir, file);
    const out = join(dir, `${basename(file, extname(file))}.webp`);
    const { size: inSize } = await stat(src);
    await sharp(src)
      .resize(TARGET, TARGET, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY, alphaQuality: 90, effort: 4 })
      .toFile(out);
    const { size: outSize } = await stat(out);
    totalIn += inSize;
    totalOut += outSize;
    count++;
  }
  console.log(`  done.`);
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(
  `\nConverted ${count} frames. Total: ${mb(totalIn)} MB -> ${mb(totalOut)} MB ` +
    `(${((1 - totalOut / totalIn) * 100).toFixed(1)}% smaller)`
);
