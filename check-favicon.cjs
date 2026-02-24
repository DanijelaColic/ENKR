const sharp = require('sharp');
const fs = require('fs');

(async () => {
  const m = await sharp('public/favicon.png').metadata();
  
  const { data, info } = await sharp('public/favicon.png').raw().toBuffer({ resolveWithObject: true });
  
  let transparent = 0, opaque = 0, semi = 0, darkOpaque = 0;
  const ch = info.channels;
  for (let i = 0; i < info.width * info.height; i++) {
    const off = i * ch;
    const a = ch === 4 ? data[off + 3] : 255;
    const r = data[off], g = data[off+1], b = data[off+2];
    if (a === 0) transparent++;
    else if (a === 255) { opaque++; if (r < 40 && g < 40 && b < 40) darkOpaque++; }
    else semi++;
  }

  const result = {
    metadata: m,
    rawInfo: info,
    pixelStats: { transparent, opaque, semi, darkOpaque, total: info.width * info.height }
  };

  fs.writeFileSync('favicon-analysis.json', JSON.stringify(result, null, 2));
  console.log('Done - wrote favicon-analysis.json');
})();
