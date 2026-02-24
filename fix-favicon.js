const sharp = require('sharp');
const path = require('path');

const INPUT = path.join(__dirname, 'public', 'favicon.png');
const OUTPUT = path.join(__dirname, 'public', 'favicon-transparent.png');

async function removeBg() {
  const { data, info } = await sharp(INPUT)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const threshold = 40;

  for (let i = 0; i < width * height; i++) {
    const offset = i * channels;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];

    if (r < threshold && g < threshold && b < threshold) {
      data[offset + 3] = 0;
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(OUTPUT);

  console.log(`Saved transparent favicon to ${OUTPUT} (${width}x${height})`);
}

removeBg().catch(console.error);
