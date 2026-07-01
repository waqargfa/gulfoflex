import { execSync } from "child_process";
import { createRequire } from "module";
import { statSync } from "fs";

const require = createRequire(import.meta.url);
const ffmpeg = require("@ffmpeg-installer/ffmpeg").path;

console.log("Converting slidervideo.mp4 to WebM...");
execSync(
  `"${ffmpeg}" -i public/slidervideo.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -vf scale=1280:-2 -an -deadline good -cpu-used 2 public/slidervideo.webm`,
  { stdio: "pipe", windowsHide: true }
);

const orig = statSync("public/slidervideo.mp4").size;
const out = statSync("public/slidervideo.webm").size;
console.log(
  `${(orig / 1e6).toFixed(1)} MB -> ${(out / 1e6).toFixed(1)} MB (${(100 - (out / orig) * 100).toFixed(1)}% smaller)`
);
