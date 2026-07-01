/**
 * Convert MP4 product videos to WebM (VP9) for better web performance.
 * Requires ffmpeg installed and in PATH.
 * 
 * Usage: node scripts/convert-videos-webm.mjs
 */
import { execSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { join, basename, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, "..", "public", "videos", "products");

const files = readdirSync(DIR).filter((f) => extname(f) === ".mp4");
console.log(`Found ${files.length} MP4 files to convert:\n`);

let totalIn = 0, totalOut = 0;

for (const file of files) {
  const src = join(DIR, file);
  const out = join(DIR, `${basename(file, ".mp4")}.webm`);
  const inSize = statSync(src).size;

  console.log(`Converting ${file}...`);
  
  // VP9 single-pass, CRF 35 = good quality for background videos, -an = no audio (muted autoplay)
  try {
    execSync(
      `"${ffmpegPath}" -y -i "${src}" -c:v libvpx-vp9 -crf 35 -b:v 0 -vf scale=1280:-2 -an -deadline good -cpu-used 2 "${out}"`,
      { stdio: "pipe", windowsHide: true }
    );
  } catch (e) {
    console.error(`  ERROR: ${e.stderr?.toString().trim() || e.message}`);
    continue;
  }

  const outSize = statSync(out).size;
  totalIn += inSize;
  totalOut += outSize;
  const pct = ((1 - outSize / inSize) * 100).toFixed(1);
  console.log(`  ${(inSize/1024/1024).toFixed(1)} MB -> ${(outSize/1024/1024).toFixed(1)} MB (${pct}% smaller)\n`);
}

console.log(`\nTotal: ${(totalIn/1024/1024).toFixed(1)} MB -> ${(totalOut/1024/1024).toFixed(1)} MB (${((1-totalOut/totalIn)*100).toFixed(1)}% smaller)`);
