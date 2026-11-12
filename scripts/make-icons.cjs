// Renders src/app/icon.svg into the PNG icons the manifest and Apple devices need.
// Usage: npm run icons
const sharp = require("sharp");
const fs = require("node:fs");

const svg = fs.readFileSync("src/app/icon.svg");
const targets = [
  ["public/icons/icon-192.png", 192],
  ["public/icons/icon-512.png", 512],
  ["src/app/apple-icon.png", 180],
];

(async () => {
  for (const [file, size] of targets) {
    await sharp(svg, { density: 384 }).resize(size, size).png().toFile(file);
    console.log("wrote", file);
  }
})();
