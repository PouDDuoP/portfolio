import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, '..', 'public', 'images', 'linkedin-cover.webp');

// LinkedIn cover standard: 1584 x 396
const WIDTH = 1584;
const HEIGHT = 396;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0b"/>
      <stop offset="50%" stop-color="#111113"/>
      <stop offset="100%" stop-color="#0a0a0b"/>
    </linearGradient>
    <linearGradient id="nameGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="50%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#67e8f9"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#22d3ee" stop-opacity="0.3"/>
      <stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" rx="0"/>

  <!-- Grid pattern -->
  <g stroke="#ffffff" stroke-opacity="0.025" stroke-width="0.5">
    ${Array.from({length: 13}, (_, i) => `<line x1="0" y1="${i * 32}" x2="${WIDTH}" y2="${i * 32}"/>`).join('')}
    ${Array.from({length: 50}, (_, i) => `<line x1="${i * 32}" y1="0" x2="${i * 32}" y2="${HEIGHT}"/>`).join('')}
  </g>

  <!-- Glow accent -->
  <ellipse cx="1300" cy="140" rx="460" ry="300" fill="#22d3ee" opacity="0.06"/>

  <!-- ===== INLINE MONOGRAM + NAME ===== -->

  <!-- KA Monogram — like OG image -->
  <rect x="280" y="90" width="48" height="40" rx="8" fill="none" stroke="#22d3ee" stroke-width="1.5" stroke-opacity="0.3"/>
  <circle cx="304" cy="130" r="2.5" fill="#22d3ee" opacity="0.15"/>
  <text x="304" y="118" font-family="'Outfit', 'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700" fill="#22d3ee" text-anchor="middle">KA</text>
  <circle cx="320" cy="110" r="2.5" fill="#22d3ee"/>

  <!-- Name — más grande -->
  <text x="360" y="132" font-family="'Outfit', 'Segoe UI', system-ui, sans-serif" font-size="72" font-weight="700" fill="url(#nameGrad)">Kevin Alvarado</text>

  <!-- Divider -->
  <line x1="360" y1="156" x2="680" y2="156" stroke="#22d3ee" stroke-width="2" stroke-opacity="0.4"/>

  <!-- Title — más grande -->
  <text x="360" y="216" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="40" font-weight="500" fill="#a1a1aa">Full Stack Developer</text>

  <!-- Tagline — solo experiencia, sin "Building with..." -->
  <text x="360" y="260" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="28" font-weight="400" fill="#a1a1aa">8+ years of experience</text>

  <!-- ===== RIGHT SECTION: Open to Work + Tech ===== -->

  <!-- Open to Work badge -->
  <rect x="980" y="65" width="195" height="40" rx="20" fill="#22d3ee" opacity="0.12"/>
  <rect x="980" y="65" width="195" height="40" rx="20" fill="none" stroke="#22d3ee" stroke-width="1" stroke-opacity="0.3"/>
  <text x="1078" y="94" font-family="'Outfit', 'Segoe UI', system-ui, sans-serif" font-size="22" font-weight="600" fill="#67e8f9" text-anchor="middle">🚀 Open to Work</text>

  <!-- Tech stack — más separado de Open to Work -->
  <text x="980" y="155" font-family="'Outfit', 'Segoe UI', system-ui, sans-serif" font-size="22" font-weight="600" fill="#22d3ee">Stack</text>

  <circle cx="983.5" cy="191" r="3.5" fill="#22d3ee" opacity="0.5"/>
  <text x="1000" y="197" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" fill="#22d3ee">Back-end</text>
  <text x="1110" y="197" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="18" fill="#e4e4e7">Node.js · Python · PHP · Django · ASP Classic</text>

  <rect x="980" y="218" width="7" height="7" rx="1" fill="none" stroke="#22d3ee" stroke-width="1.2" stroke-opacity="0.5"/>
  <text x="1000" y="230" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700" fill="#22d3ee">Front-end</text>
  <text x="1110" y="230" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="18" fill="#e4e4e7">JavaScript · Angular · Flutter · jQuery · Bootstrap</text>

  <polygon points="984,252 980,256 984,260 988,256" fill="#22d3ee" opacity="0.5"/>
  <text x="1000" y="263" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="700" fill="#22d3ee">Databases</text>
  <text x="1110" y="263" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="18" fill="#e4e4e7">SQL Server · Oracle Database · PostgreSQL · MySQL</text>

  <!-- ===== FOOTER ===== -->

  <!-- Bottom accent line -->
  <rect x="280" y="330" width="1120" height="1" rx="1" fill="url(#line)"/>

  <!-- Portfolio domain -->
  <text x="1400" y="364" font-family="'JetBrains Mono', monospace" font-size="18" fill="#22d3ee" text-anchor="end">kevin-alvarado.vercel.app</text>
  <text x="280" y="364" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="16" fill="#71717a">2026</text>
</svg>`;

try {
  await sharp(Buffer.from(svg))
    .resize(WIDTH, HEIGHT)
    .webp({ quality: 100 })
    .toFile(outputPath);

  console.log(`✅ LinkedIn Cover generated: ${outputPath}`);
} catch (err) {
  console.error('❌ Error generating LinkedIn Cover:', err);
  process.exit(1);
}
