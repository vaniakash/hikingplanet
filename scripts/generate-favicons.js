/**
 * Favicon generation script for HikingPlanet branding assets.
 * Generates all required icon sizes from the official logo.
 * v2 - Better proportions and branding
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SOURCE_LOGO = path.join(__dirname, '../public/images/hikingplanet.png');
const PUBLIC_DIR = path.join(__dirname, '../public');
const FAVICON_IO_DIR = path.join(__dirname, '../public/images/favicon_io');

// Generate icon with white background and red logo, padded nicely
async function generateIcon(outputPath, size) {
  // For smaller sizes, use more padding; for larger sizes, logo can be bigger
  const paddingFactor = size <= 32 ? 0.12 : 0.15;
  const targetLogoWidth = Math.round(size * (1 - paddingFactor * 2));
  const targetLogoHeight = Math.round(size * 0.45); // Logo is roughly 4:1.5 ratio

  const logoBuffer = await sharp(SOURCE_LOGO)
    .resize(targetLogoWidth, targetLogoHeight, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .toBuffer();

  const { width: logoW, height: logoH } = await sharp(logoBuffer).metadata();

  const left = Math.max(0, Math.floor((size - logoW) / 2));
  const top = Math.max(0, Math.floor((size - logoH) / 2));

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 255 },
    },
  })
    .composite([{ input: logoBuffer, left, top }])
    .png({ quality: 100 })
    .toFile(outputPath);

  console.log(`✓ Generated: ${path.basename(outputPath)} (${size}x${size})`);
}

async function generateICO(outputPath) {
  // Create the 32x32 PNG data first
  const size = 32;
  const targetLogoWidth = Math.round(size * 0.76);
  const targetLogoHeight = Math.round(size * 0.35);

  const logoBuffer = await sharp(SOURCE_LOGO)
    .resize(targetLogoWidth, targetLogoHeight, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .toBuffer();

  const { width: logoW, height: logoH } = await sharp(logoBuffer).metadata();
  const left = Math.max(0, Math.floor((size - logoW) / 2));
  const top = Math.max(0, Math.floor((size - logoH) / 2));

  const pngBuffer = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 255 },
    },
  })
    .composite([{ input: logoBuffer, left, top }])
    .png()
    .toBuffer();

  // Build proper ICO with multi-size support (16x16 + 32x32)
  const size16 = 16;
  const logoBuffer16 = await sharp(SOURCE_LOGO)
    .resize(Math.round(size16 * 0.76), Math.round(size16 * 0.35), {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .toBuffer();

  const { width: logoW16, height: logoH16 } = await sharp(logoBuffer16).metadata();
  const left16 = Math.max(0, Math.floor((size16 - logoW16) / 2));
  const top16 = Math.max(0, Math.floor((size16 - logoH16) / 2));

  const pngBuffer16 = await sharp({
    create: {
      width: size16,
      height: size16,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 255 },
    },
  })
    .composite([{ input: logoBuffer16, left: left16, top: top16 }])
    .png()
    .toBuffer();

  // Build ICO with 2 images
  const icoBuffer = buildIco([
    { size: 16, data: pngBuffer16 },
    { size: 32, data: pngBuffer },
  ]);
  
  fs.writeFileSync(outputPath, icoBuffer);
  console.log(`✓ Generated: favicon.ico (multi-size: 16x16 + 32x32)`);
}

function buildIco(images) {
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * count;
  
  // Calculate offsets
  let offset = headerSize + dirSize;
  const offsets = [];
  for (const img of images) {
    offsets.push(offset);
    offset += img.data.length;
  }

  // File header (6 bytes)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: ICO
  header.writeUInt16LE(count, 4); // Count

  // Directory entries
  const dirEntries = [];
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.size >= 256 ? 0 : img.size, 0);
    entry.writeUInt8(img.size >= 256 ? 0 : img.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.data.length, 8);
    entry.writeUInt32LE(offsets[i], 12);
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...images.map(i => i.data)]);
}

async function main() {
  console.log('\n🏔️  HikingPlanet Favicon Generation v2\n');
  console.log(`Source logo: ${SOURCE_LOGO}`);
  
  if (!fs.existsSync(SOURCE_LOGO)) {
    console.error('❌ Source logo not found!');
    process.exit(1);
  }

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.mkdirSync(FAVICON_IO_DIR, { recursive: true });

  console.log('\n📦 Generating favicon assets into public/...\n');

  await generateIcon(path.join(PUBLIC_DIR, 'favicon-16x16.png'), 16);
  await generateIcon(path.join(PUBLIC_DIR, 'favicon-32x32.png'), 32);
  await generateIcon(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), 180);
  await generateIcon(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'), 192);
  await generateIcon(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'), 512);
  await generateICO(path.join(PUBLIC_DIR, 'favicon.ico'));

  const faviconFiles = [
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'favicon.ico',
  ];

  console.log('\n📁 Syncing to public/images/favicon_io/...\n');
  for (const file of faviconFiles) {
    fs.copyFileSync(path.join(PUBLIC_DIR, file), path.join(FAVICON_IO_DIR, file));
    console.log(`✓ Synced: ${file}`);
  }

  console.log('\n✅ All favicon assets generated successfully!\n');
}

main().catch(console.error);
