# Spec: i18n + Theme Refactor

## Capability 1: Centralized i18n

### Requirements

| ID | Requirement | Strength |
|----|-------------|----------|
| I18N-1 | The system MUST provide a `translations.js` module exporting a flat object of translation keys with `{ es: string, en: string }` values | MUST |
| I18N-2 | The system MUST expose a `useT()` hook returning a `t(key)` function that resolves a dot-notation key to the current language value | MUST |
| I18N-3 | Language SHALL persist across reloads via `localStorage` key `portfolio-lang` | SHALL |
| I18N-4 | The `<html>` `lang` attribute MUST reflect the current language (es/en) | MUST |
| I18N-5 | All 80+ inline ternaries (`lang === 'es' ? X : Y`) SHALL be replaced by `t('key')` | SHALL |
| I18N-6 | All `_en` fields in JSON data files SHALL be removed; translations merge into `translations.js` | SHALL |
| I18N-7 | `.replace()` calls for year strings in Skills SHALL be replaced by `t()` keys | SHALL |
| I18N-8 | If a key is missing, the system SHOULD fall back to Spanish gracefully (or show the key name) | SHOULD |

### Interface Contract

- **Module**: `src/i18n/translations.js` — flat dot-notation keys
- **Hook**: `src/i18n/useTranslation.js` — returns `{ t, lang, toggleLang }`
- **Context**: `LanguageContext` rewritten — same public API (`lang`, `toggleLang`), adds localStorage persistence
- **Fallback**: `translations[key]?.[lang] ?? translations[key]?.es ?? key`

### Scenarios

**Happy path**: ES user loads site → language reads `localStorage` or defaults to `'es'` → `t('hero.greeting')` returns `'Hola, soy'` → toggles to EN → refreshes → language persists as `'en'`

**Missing key**: A key not found in `translations.js` → shows the Spanish value if available, or the key name as last resort — no crash

**localStorage unavailable**: Private browsing or restricted storage → `useT()` catches the error and falls back to `'es'` — no crash

**`_en` removal**: After refactor, no JSON file contains an `_en` suffix field — all translations live in `translations.js`

### Verification

- Grep for `=== 'es'` and `_en` patterns — zero matches across `src/`
- All 10 section/layout/common components render identically in both languages
- `document.documentElement.lang` = current language

## Capability 2: Theme Toggle

### Requirements

| ID | Requirement | Strength |
|----|-------------|----------|
| THEME-1 | The system MUST provide a `ThemeContext` exposing `{ theme, toggleTheme, isDark }` | MUST |
| THEME-2 | Default theme SHALL be `'dark'` — system preference is never read | MUST |
| THEME-3 | Theme SHALL persist via `localStorage` key `portfolio-theme` | MUST |
| THEME-4 | A flash prevention inline `<script>` in `<head>` MUST set `data-theme` from `localStorage` before React hydrates | MUST |
| THEME-5 | CSS SHALL use `[data-theme="dark"]` and `[data-theme="light"]` selectors on `<html>` (replace `@media (prefers-color-scheme)`) | MUST |
| THEME-6 | 15 light-mode custom properties SHALL be moved from `@media` to `[data-theme="light"]` | MUST |
| THEME-7 | A toggle button with sun/moon SVG SHALL be rendered in Header next to the language toggle | MUST |
| THEME-8 | `<meta name="theme-color">` SHALL dynamically update to match `--color-bg` for the current theme | MUST |
| THEME-9 | Color properties SHALL use `transition` for smooth switching (not `transition: all`) | SHOULD |

### Interface Contract

- **Context**: `ThemeContext` — `{ theme, toggleTheme, isDark }`
- **DOM**: `<html data-theme="dark|light">` set by inline script then kept in sync by React
- **CSS selectors**: `[data-theme="light"]` overrides `:root` variables for light mode
- **Header button**: sun icon (light) / moon icon (dark) — SVG inline, `aria-label` bilingual

### Scenarios

**Happy path**: User visits site → `data-theme="dark"` (default) → toggles to light → `localStorage` persists → refresh → flash prevention script reads key and sets `data-theme` before paint → React confirms

**First visit**: No `localStorage` key → dark theme applied → toggle works → key created

**localStorage unavailable**: Script fails silently → dark theme always — no crash

**System dark mode active**: System wants dark → default is already dark → toggle still works independently of system preference

### Verification

- Refresh with light theme active — zero flash (inspect `<html>` before React hydrates)
- `meta[theme-color]` changes with toggle
- All color variables switch to light palette on toggle
- No `prefers-color-scheme: light` remains in CSS

## Capability 3: Cleanup

### Requirements

| ID | Requirement | Strength |
|----|-------------|----------|
| CLN-1 | `src/styles/` directory SHALL be deleted — no file imports from it | MUST |
| CLN-2 | Project image block (`{project.image && ...}`) SHALL be removed from `Projects.jsx` — all images are `""` | MUST |
| CLN-3 | 3 redundant ternaries in `Contact.jsx` (Email, GitHub, LinkedIn labels — same value in both languages) SHALL be replaced with static text | MUST |

### Verification

- `Test-Path src/styles` returns `False` — no broken imports
- `Projects.jsx`: no `project.image` reference remains
- `Contact.jsx`: Email/GitHub/LinkedIn labels are plain text, not ternaries

## Capability 4: Performance

### Requirements

| ID | Requirement | Strength |
|----|-------------|----------|
| PERF-1 | `Skills` component SHALL be wrapped in `React.memo()` | MUST |
| PERF-2 | `filteredProjects` in `Projects.jsx` SHALL use `useMemo()` with `[activeFilter, lang]` deps | MUST |
| PERF-3 | `vite-plugin-visualizer` SHALL be added as a devDependency for bundle analysis | MAY |
| PERF-4 | `npm run build` SHALL pass with no errors after all changes | MUST |

### Verification

- `React.memo(Skills)` present in `Skills.jsx`
- `useMemo` wrapping the filter in `Projects.jsx`
- `vite-plugin-visualizer` in `package.json` devDependencies
- Build produces no warnings or errors
