/**
 * Optimize render sequences in specific subfolders.
 * Converts 2000x2000 PNGs to 1080x1080 WebP.
 * Usage: node scripts/optimize-render-folders.mjs
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const FOLDERS = [
  "public/Render/pipe/Aluclad",
  "public/Render/pipe/Aluglass",
  "public/Render/pipe/Sound",
  "public/Render/pipe/XLPE",
  "public/Render/pipe/Pipes Render Ultra",
];

const TARGET = 1080;
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

  for (let i = 0; i < pngs.length; i++) {
    const file = pngs[i];
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
    if ((i + 1) % 100 === 0) console.log(`  ${i + 1}/${pngs.length}`);
  }
  console.log(`  done.`);
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(
  `\nConverted ${count} frames. Total: ${mb(totalIn)} MB -> ${mb(totalOut)} MB ` +
    `(${((1 - totalOut / totalIn) * 100).toFixed(1)}% smaller)`
);
