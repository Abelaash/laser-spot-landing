/**
 * Generates the soft-gradient placeholder photos in /public/images.
 *
 * These exist only so the layout has correctly-sized, correctly-named images
 * to render before the real clinic photography is dropped in. Replace the
 * files with real photos at the same paths — or point lib/config.ts at new
 * filenames — and delete this script.
 *
 *   node scripts/generate-placeholders.mjs
 */

import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

/* --------------------------------- PNG --------------------------------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i += 1) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

/** Encodes raw RGB rows as a PNG, using the Up filter (great for gradients). */
function encodePng(width, height, pixels) {
  const stride = width * 3;
  const raw = Buffer.alloc((stride + 1) * height);

  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 2; // filter: Up
    for (let x = 0; x < stride; x += 1) {
      const cur = pixels[y * stride + x];
      const above = y === 0 ? 0 : pixels[(y - 1) * stride + x];
      raw[rowStart + 1 + x] = (cur - above) & 0xff;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* -------------------------------- Palette ------------------------------- */

const hex = (value) => [
  parseInt(value.slice(1, 3), 16),
  parseInt(value.slice(3, 5), 16),
  parseInt(value.slice(5, 7), 16),
];

const mix = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

const smooth = (t) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

/**
 * Renders a soft two-tone wash with a couple of blurred highlights, so the
 * placeholder reads as an image region rather than a flat block.
 */
function render(width, height, from, to, glow) {
  const top = hex(from);
  const bottom = hex(to);
  const highlight = hex(glow);
  const pixels = Buffer.alloc(width * height * 3);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const u = x / width;
      const v = y / height;

      // Diagonal base gradient.
      let colour = mix(top, bottom, smooth(v * 0.75 + u * 0.35));

      // Two soft radial highlights.
      const blobs = [
        { cx: 0.28, cy: 0.24, r: 0.55, strength: 0.55 },
        { cx: 0.82, cy: 0.72, r: 0.48, strength: 0.4 },
      ];

      for (const blob of blobs) {
        const dx = (u - blob.cx) * (width / height > 1 ? width / height : 1);
        const dy = v - blob.cy;
        const d = Math.sqrt(dx * dx + dy * dy) / blob.r;
        const falloff = smooth(1 - d) * blob.strength;
        if (falloff > 0) colour = mix(colour, highlight, falloff);
      }

      const i = (y * width + x) * 3;
      pixels[i] = Math.round(colour[0]);
      pixels[i + 1] = Math.round(colour[1]);
      pixels[i + 2] = Math.round(colour[2]);
    }
  }

  return pixels;
}

/* --------------------------------- Files -------------------------------- */

const outDir = join(process.cwd(), 'public', 'images');
mkdirSync(outDir, { recursive: true });

const files = [
  // Used by the hero.
  { name: 'clinic-treatment-room.png', w: 1400, h: 1600, from: '#f4ece9', to: '#e3d2dc', glow: '#fdfbfa' },
  // Used by the comfort & discretion section.
  { name: 'clinic-reception.png', w: 1200, h: 1500, from: '#f7f0f4', to: '#ded0d8', glow: '#fdfbfa' },
  // Spares, ready to be wired into lib/config.ts if you want more imagery.
  { name: 'technician-portrait.png', w: 1200, h: 1500, from: '#f2e9e4', to: '#d9c8d2', glow: '#fdfbfa' },
  { name: 'deka-motus-ax-device.png', w: 1400, h: 1400, from: '#f7f0f4', to: '#d5c3ce', glow: '#fdfbfa' },
];

for (const file of files) {
  const png = encodePng(file.w, file.h, render(file.w, file.h, file.from, file.to, file.glow));
  writeFileSync(join(outDir, file.name), png);
  console.log(`${file.name.padEnd(30)} ${file.w}x${file.h}  ${(png.length / 1024).toFixed(1)} KB`);
}
