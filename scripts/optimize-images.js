// One-off image optimization pass (Phase 2 of the site audit).
// Run with: node scripts/optimize-images.js
// Not wired into the build — safe to delete after use, kept for reference
// in case new oversized source images show up later.
const sharp = require('sharp');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'images');
const p = (f) => path.join(dir, f);

const INK = '#242322';

async function run() {
  // Hero background — resize down from 4K, keep alpha (compositing over the
  // dark section background is intentional), WebP compresses photos with
  // alpha far better than PNG.
  await sharp(p('shapka.png'))
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(p('shapka.webp'));

  // Dedicated, art-directed OG/Twitter share image at the standard 1200x630 —
  // flattened onto the brand ink background since social platforms render it
  // on their own white canvas otherwise.
  await sharp(p('shapka.png'))
    .resize({ width: 1200, height: 630, fit: 'cover' })
    .flatten({ background: INK })
    .jpeg({ quality: 85 })
    .toFile(p('og-cover.jpg'));

  // Fully-opaque PNG diagrams/renders — palette compression keeps PNG
  // (safe for text/line art) but cuts file size drastically.
  const pngTargets = [
    ['abrasive-detailed.png', 1100],
    ['quality-garant.png', 1000],
    ['primer.png', 1000],
  ];
  for (const [file, width] of pngTargets) {
    await sharp(p(file))
      .resize({ width, withoutEnlargement: true })
      .png({ palette: true, quality: 82, compressionLevel: 9 })
      .toFile(p('tmp-' + file));
  }

  // Gallery thumbnails — displayed at ~320x220, source was 1100-3000px wide.
  const jpgTargets = [
    'zernotgx.jpg',
    'zernotgx1.jpg',
    'zernotgx3.jpg',
    'zernonqn.jpg',
    'zernopa.jpg',
  ];
  for (const file of jpgTargets) {
    await sharp(p(file))
      .resize({ width: 700, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(p('tmp-' + file));
  }

  console.log('Done. Review tmp-* files and shapka.webp/og-cover.jpg, then swap in.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
