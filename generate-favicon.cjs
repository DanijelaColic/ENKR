const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, 'public', 'favicon.png');
const OUTPUT_DIR = path.join(__dirname, 'public');

async function generateFavicons() {
  const src = sharp(INPUT);

  // Trim transparent space around the anchor, then add small padding
  const trimmed = await src.trim().toBuffer();

  // 32x32 favicon for browser tab — white background so no black square
  await sharp(trimmed)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicon-32.png'));

  // 48x48 favicon
  await sharp(trimmed)
    .resize(48, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicon-48.png'));

  // Generate ICO-like 32x32 (browsers handle .ico transparency well)
  // We'll create a proper 32x32 PNG and also a 16x16
  await sharp(trimmed)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicon-16.png'));

  // 180x180 apple-touch-icon with white background (Apple requires opaque)
  await sharp(trimmed)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon.png'));

  // Overwrite favicon.png with trimmed 32x32 version (what browsers actually use)
  await sharp(trimmed)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicon.png'));

  console.log('Generated all favicon sizes');
}

generateFavicons().catch(console.error);
