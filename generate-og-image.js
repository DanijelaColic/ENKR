// Script to generate OG image for ENKR
// Requires: npm install canvas
// Run: node generate-og-image.js

import { createCanvas, registerFont } from 'canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const width = 1200;
const height = 630;

// Create canvas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#6366f1');
gradient.addColorStop(1, '#8b5cf6');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Decorative circles
ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
ctx.beginPath();
ctx.arc(width - 100, -100, 400, 0, Math.PI * 2);
ctx.fill();

ctx.beginPath();
ctx.arc(-50, height + 50, 300, 0, Math.PI * 2);
ctx.fill();

// Anchor icon (⚓) - drawing a simple anchor
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
ctx.lineWidth = 8;
ctx.lineCap = 'round';

// Anchor ring at top
ctx.beginPath();
ctx.arc(width / 2, height / 2 - 80, 25, 0, Math.PI * 2);
ctx.fill();
ctx.fillStyle = '#6366f1';
ctx.beginPath();
ctx.arc(width / 2, height / 2 - 80, 15, 0, Math.PI * 2);
ctx.fill();

// Shank (vertical bar)
ctx.fillStyle = 'white';
ctx.fillRect(width / 2 - 8, height / 2 - 55, 16, 90);

// Left arm
ctx.beginPath();
ctx.moveTo(width / 2 - 8, height / 2 - 55);
ctx.quadraticCurveTo(width / 2 - 60, height / 2 - 30, width / 2 - 60, height / 2 + 5);
ctx.quadraticCurveTo(width / 2 - 60, height / 2 + 40, width / 2 - 8, height / 2 + 25);
ctx.stroke();

// Right arm
ctx.beginPath();
ctx.moveTo(width / 2 + 8, height / 2 - 55);
ctx.quadraticCurveTo(width / 2 + 60, height / 2 - 30, width / 2 + 60, height / 2 + 5);
ctx.quadraticCurveTo(width / 2 + 60, height / 2 + 40, width / 2 + 8, height / 2 + 25);
ctx.stroke();

// Bottom curve
ctx.beginPath();
ctx.moveTo(width / 2 - 60, height / 2 + 5);
ctx.quadraticCurveTo(width / 2 - 30, height / 2 + 25, width / 2, height / 2 + 30);
ctx.quadraticCurveTo(width / 2 + 30, height / 2 + 25, width / 2 + 60, height / 2 + 5);
ctx.stroke();

// Brand name "ENKR"
ctx.fillStyle = 'white';
ctx.font = 'bold 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
ctx.shadowBlur = 12;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 4;

// Letter spacing simulation
const text = 'ENKR';
const letterSpacing = 20;
let x = width / 2;
const y = height / 2 + 100;

for (let i = 0; i < text.length; i++) {
  ctx.fillText(text[i], x, y);
  const metrics = ctx.measureText(text[i]);
  x += metrics.width + letterSpacing;
}

// Save image
const outputPath = join(__dirname, 'public', 'og-image.jpg');
const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
writeFileSync(outputPath, buffer);

console.log('✅ OG image generated successfully at:', outputPath);
