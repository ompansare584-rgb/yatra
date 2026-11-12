// Turns the supplied square portrait into transparent circular WebP files.
// Usage: node scripts/make-portrait.cjs <input.png>
const sharp = require("sharp");
const input = process.argv[2];
if (!input) { console.error("Provide an input image path."); process.exit(1); }

async function run() {
  for (const size of [320, 640]) {
    const r = size / 2;
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`
    );
    await sharp(input)
      .resize(size, size)
      .ensureAlpha()
      .composite([{ input: mask, blend: "dest-in" }])
      .webp({ quality: 86 })
      .toFile(`public/images/om-portrait-${size}.webp`);
  }
  console.log("Portrait files written.");
}
run();
