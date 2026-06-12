import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import { resolve } from 'path'

function inlineCssPlugin() {
  let outDir;
  return {
    name: 'inline-css',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const htmlPath = resolve(outDir, 'index.html');
      let html = readFileSync(htmlPath, 'utf-8');
      const cssLinkRegex = /<link rel="stylesheet" crossorigin href="\/([^"]+\.css)">/;
      let match;
      while ((match = cssLinkRegex.exec(html)) !== null) {
        const cssPath = resolve(outDir, match[1]);
        let css = readFileSync(cssPath, 'utf-8');
        // Remueve @import de Google Fonts (ya están en el HTML via preload)
        css = css.replace(/@import\s+(?:url\([^)]+\)|"[^"]+")\s*;/g, '');
        html = html.replace(match[0], `<style>${css}</style>`);
        unlinkSync(cssPath);
      }
      writeFileSync(htmlPath, html);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), process.env.ANALYZE && visualizer({ open: true }), inlineCssPlugin()].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor';
          }
          if (id.includes('@vercel/analytics')) {
            return 'analytics';
          }
        },
      },
    },
  },
})
