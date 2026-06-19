import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, '..', 'public', 'images', 'og-image.webp');

const WIDTH = 1200;
const HEIGHT = 630;

// SVG overlay with the design
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
  <g stroke="#ffffff" stroke-opacity="0.03" stroke-width="0.5">
    ${Array.from({length: 20}, (_, i) => `<line x1="0" y1="${i * 32}" x2="${WIDTH}" y2="${i * 32}"/>`).join('')}
    ${Array.from({length: 38}, (_, i) => `<line x1="${i * 32}" y1="0" x2="${i * 32}" y2="${HEIGHT}"/>`).join('')}
  </g>

  <!-- Glow accent top-right -->
  <ellipse cx="1000" cy="140" rx="430" ry="350" fill="#22d3ee" opacity="0.08"/>

  <!-- Badge Open to Work -->
  <rect x="990" y="58" width="145" height="28" rx="14" fill="#22d3ee" opacity="0.12"/>
  <rect x="990" y="58" width="145" height="28" rx="14" fill="none" stroke="#22d3ee" stroke-width="1" stroke-opacity="0.3"/>
  <text x="1062" y="76" font-family="'Outfit', 'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="600" fill="#67e8f9" text-anchor="middle">🚀 Open to Work</text>

  <!-- ===== TOP BAR ===== -->

  <!-- Monogram KA (top-left) — like favicon con avatar-ring -->
  <!-- Avatar ring (like hero__avatar-ring) -->
  <rect x="52" y="56" width="56" height="44" rx="8" fill="none" stroke="#22d3ee" stroke-width="1.5" stroke-opacity="0.3"/>
  <circle cx="80" cy="100" r="3" fill="#22d3ee" opacity="0.15"/>

  <text x="80" y="84" font-family="'Outfit', 'Segoe UI', system-ui, sans-serif" font-size="22" font-weight="700" fill="#22d3ee" text-anchor="middle">KA</text>

  <!-- Favicon dot: to the right of the A, vertically centered -->
  <circle cx="100" cy="76" r="3" fill="#22d3ee"/>

  <!-- ===== NAME SECTION ===== -->

  <!-- Name with gradient -->
  <text x="80" y="195" font-family="'Outfit', 'Segoe UI', system-ui, sans-serif" font-size="64" font-weight="700" fill="url(#nameGrad)">Kevin Alvarado</text>

  <!-- Divider -->
  <line x1="80" y1="225" x2="500" y2="225" stroke="#22d3ee" stroke-width="2" stroke-opacity="0.5"/>

  <!-- Title -->
  <text x="80" y="270" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="30" font-weight="500" fill="#a1a1aa">Full Stack Developer</text>

  <!-- Tagline -->
  <text x="80" y="305" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="17" font-weight="400" fill="#71717a">8+ years of experience</text>

  <!-- ===== TECH STACK ===== -->

  <text x="80" y="355" font-family="'Outfit', 'Segoe UI', system-ui, sans-serif" font-size="20" font-weight="600" fill="#22d3ee">Tech Stack</text>

  <!-- Backend -->
  <circle cx="83.5" cy="385" r="3.5" fill="#22d3ee" opacity="0.5"/>
  <text x="96" y="390" font-family="'JetBrains Mono', monospace" font-size="14" fill="#22d3ee">Back-end</text>
  <text x="185" y="390" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="15" fill="#e4e4e7">Node.js · Python · PHP · Django · ASP Classic</text>

  <!-- Frontend -->
  <rect x="80" y="413" width="8" height="8" rx="1" fill="none" stroke="#22d3ee" stroke-width="1.3" stroke-opacity="0.5"/>
  <text x="96" y="422" font-family="'JetBrains Mono', monospace" font-size="14" fill="#22d3ee">Front-end</text>
  <text x="185" y="422" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="15" fill="#e4e4e7">JavaScript · Angular · Flutter · jQuery · Bootstrap</text>

  <!-- Databases -->
  <polygon points="84,445 80,449 84,453 88,449" fill="#22d3ee" opacity="0.5"/>
  <text x="96" y="454" font-family="'JetBrains Mono', monospace" font-size="14" fill="#22d3ee">Databases</text>
  <text x="185" y="454" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="15" fill="#e4e4e7">SQL Server · Oracle Database · PostgreSQL · MySQL</text>

  <!-- Decorative vertical line (right side) -->
  <line x1="1090" y1="170" x2="1090" y2="490" stroke="#22d3ee" stroke-width="1" stroke-opacity="0.12"/>
  <circle cx="1090" cy="170" r="2.5" fill="#22d3ee" opacity="0.25"/>
  <circle cx="1090" cy="490" r="2.5" fill="#22d3ee" opacity="0.25"/>

  <!-- Decorative braces (developer theme) -->
  <text x="940" y="350" font-family="'JetBrains Mono', monospace" font-size="140" font-weight="100" fill="#22d3ee" opacity="0.04" text-anchor="middle">{ }</text>

  <!-- ===== BOTTOM BAR ===== -->

  <!-- Bottom accent line -->
  <rect x="60" y="500" width="1080" height="1" rx="1" fill="url(#line)"/>

  <!-- Portafolio -->
  <text x="80" y="526" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="14" fill="#a1a1aa">🌐 Portfolio:</text>
  <text x="185" y="526" font-family="'JetBrains Mono', monospace" font-size="14" fill="#22d3ee">kevin-alvarado.vercel.app</text>

  <!-- Ubicación -->
  <text x="80" y="552" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="13" fill="#a1a1aa">📍 Location:</text>
  <text x="185" y="552" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="13" fill="#22d3ee">Caracas, Venezuela</text>

  <!-- Redes -->
  <text x="80" y="578" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="13" fill="#a1a1aa">💬 Contact:</text>
  <text x="185" y="578" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="13" fill="#22d3ee">github.com/PouDDuoP</text>
  <text x="325" y="578" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="13" fill="#a1a1aa">·</text>
  <text x="337" y="578" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="13" fill="#22d3ee">linkedin.com/in/kevin-alvarado-graterol</text>
  <text x="590" y="578" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="12" fill="#a1a1aa">· ✉️ </text>
  <text x="620" y="578" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="12" fill="#22d3ee">kevinalvarado.ag+jobs@gmail.com</text>
  <text x="1090" y="578" font-family="'DM Sans', 'Segoe UI', system-ui, sans-serif" font-size="11" fill="#71717a" text-anchor="end">· 2026</text>
</svg>`;

try {
  await sharp(Buffer.from(svg))
    .resize(WIDTH, HEIGHT)
    .webp({ quality: 90 })
    .toFile(outputPath);

  console.log(`✅ OG Image generated: ${outputPath}`);
} catch (err) {
  console.error('❌ Error generating OG Image:', err);
  process.exit(1);
}
