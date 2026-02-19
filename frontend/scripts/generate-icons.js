// ─────────────────────────────────────────────────────────────
// PWA Icon Generator Script
// Run: node scripts/generate-icons.js
// Generates PNG icons from the SVG favicon for PWA manifest
// ─────────────────────────────────────────────────────────────

// Since we can't generate actual PNGs without sharp/canvas,
// this script creates simple HTML canvas-based icons.
// For production, use a tool like pwa-asset-generator or 
// realfavicongenerator.net

import { writeFileSync, mkdirSync, existsSync } from 'fs';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create a minimal 1x1 PNG for each size (placeholder)
// These should be replaced with proper icons for production
function createMinimalPNG(size) {
    // Minimal valid PNG with MyMedic blue (#0052cc) fill
    // In production, generate proper icons from the SVG
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="#0052cc"/>
  <g transform="translate(${size / 2}, ${size / 2}) scale(${size / 512})" fill="none" stroke="#ffffff" stroke-width="24" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="0" cy="-16" r="60"/>
    <circle cx="0" cy="-16" r="20" fill="#ffffff" stroke="none"/>
    <path d="M 0 44 L 0 104 Q 0 144 40 144 L 64 144 Q 104 144 104 104 L 104 24"/>
    <path d="M -60 -16 L -96 -76 L -116 -116"/>
    <path d="M 60 -16 L 96 -76 L 116 -116"/>
    <circle cx="-116" cy="-124" r="12" fill="#ffffff"/>
    <circle cx="116" cy="-124" r="12" fill="#ffffff"/>
    <circle cx="104" cy="14" r="16" fill="#ffffff" stroke="none"/>
  </g>
</svg>`;
    return svgContent;
}

// Ensure icons directory exists
const iconsDir = 'public/icons';
if (!existsSync(iconsDir)) {
    mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons (browsers render them fine; for PNG, use external tools)
sizes.forEach(size => {
    const svg = createMinimalPNG(size);
    writeFileSync(`${iconsDir}/icon-${size}x${size}.svg`, svg);
    console.log(`✓ Generated icon-${size}x${size}.svg`);
});

console.log('\n📱 Icon generation complete!');
console.log('💡 For production PNGs, use: npx pwa-asset-generator public/favicon.svg public/icons');
