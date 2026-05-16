## Exploration: i18n + Theme Refactor Plan Validation

### Current State
The portfolio app uses a flat `LanguageContext` with `useState('es')` and no persistence. Every component manually checks `lang === 'es' ? ... : ...` for translations, scattered across 10 components as inline ternaries. JSON data files carry `_en` suffixed fields alongside Spanish originals. CSS light mode is controlled by `@media (prefers-color-scheme: light)` in two places (one orphaned). No theme toggle exists. No `React.memo` or `useMemo` is used. React 19 with Vite.

---

### 1. File Inventory: Inline String Ternaries (`lang === 'es' ? ... : ...`)

**80 total matches across 10 files.**

#### `src/components/sections/Hero.jsx` — 11 occurrences
| Line | Expression |
|------|-----------|
| 40 | `lang === 'es' ? profile.availability : profile.availability_en` |
| 44 | `lang === 'es' ? 'Hola, soy' : 'Hello, I\'m'` |
| 48 | `lang === 'es' ? profile.title : profile.title_en` |
| 52 | `lang === 'es' ? profile.tagline : profile.tagline_en` |
| 57 | `lang === 'es' ? 'Ver proyectos' : 'View projects'` |
| 60 | `lang === 'es' ? 'Contactar' : 'Contact'` |
| 63 | `lang === 'es' ? 'Descargar CV' : 'Download CV'` |
| 71 | `lang === 'es' ? 'Años de experiencia' : 'Years of experience'` |
| 77 | `lang === 'es' ? 'Proyectos' : 'Projects'` |
| 83 | `lang === 'es' ? 'Clientes / Empresas' : 'Clients / Companies'` |
| 103 | `lang === 'es' ? 'Desplazarse hacia abajo' : 'Scroll down'` |

#### `src/components/sections/About.jsx` — 8 occurrences
| Line | Expression |
|------|-----------|
| 12 | `lang === 'es' ? 'Sobre mí' : 'About Me'` |
| 13 | `lang === 'es' ? 'Conoce mi historia' : 'Discover my story'` |
| 18 | `lang === 'es' ? profile.bio : profile.bio_en` |
| 23 | `lang === 'es' ? 'Mis valores' : 'My values'` |
| 29 | `lang === 'es' ? value.es : value.en` |
| 38 | `lang === 'es' ? 'Ubicación' : 'Location'` |
| 44 | `lang === 'es' ? 'Disponibilidad' : 'Availability'` |
| 47 | `lang === 'es' ? profile.availability : profile.availability_en` |

#### `src/components/sections/Skills.jsx` — 10 occurrences (some nested)
| Line | Expression |
|------|-----------|
| 32 | `lang === 'es' ? 'Habilidades' : 'Skills'` |
| 33 | `lang === 'es' ? 'Tecnologías que domino' : 'Technologies I master'` |
| 55 | `lang === 'es' ? skill.years : skill.years.replace(...)` |
| 61-62 | nested `(lang === 'es' ? 'Ámbito Personal' : 'Personal Scope') / (lang === 'es' ? 'Ámbito Laboral' : 'Work Scope')` |
| 86 | `lang === 'es' ? 'Idiomas' : 'Languages'` |
| 97 | `lang === 'es' ? skill.name : (skill.name_en \|\| skill.name)` |
| 98-101 | nested chain: `lang === 'es' ? skill.level : (level === 'Nativo' ? 'Native' : ...)` |
| 111 | `lang === 'es' ? 'Habilidades Blandas' : 'Soft Skills'` |
| 122 | `lang === 'es' ? skill.name : (skill.name_en \|\| skill.name)` |
| 123-126 | nested chain: `lang === 'es' ? skill.level : (level === 'Avanzado' ? 'Advanced' : ...)` |

#### `src/components/sections/Projects.jsx` — 14 occurrences
| Line | Expression |
|------|-----------|
| 19 | `title={...} subtitle={...}` (2 ternaries on one line) |
| 26 | `lang === 'es' ? 'Todos' : 'All'` |
| 32 | `lang === 'es' ? 'Personales' : 'Personal'` |
| 38 | `lang === 'es' ? 'Laborales' : 'Professional'` |
| 48 | `alt={lang === 'es' ? project.title : project.title_en}` |
| 57 | `aria-label={lang === 'es' ? \`Ver código de...\` : \`View code of...\`}` |
| 70 | `aria-label={lang === 'es' ? \`Ver demo de...\` : \`View demo of...\`}` |
| 84 | `lang === 'es' ? project.title : project.title_en` |
| 87 | `lang === 'es' ? project.description : project.description_en` |
| 98 | `lang === 'es' ? 'Desafío: ' : 'Challenge: '` |
| 101 | `lang === 'es' ? project.challenge : project.challenge_en` |
| 107 | `lang === 'es' ? 'Resultado: ' : 'Result: '` |
| 110 | `lang === 'es' ? project.result : project.result_en` |
| 125 | `lang === 'es' ? 'Ver todos los proyectos' : 'View all projects'` |

#### `src/components/sections/Experience.jsx` — 9 occurrences
| Line | Expression |
|------|-----------|
| 10 | `if (date === 'actual') return lang === 'es' ? 'Actual' : 'Present';` |
| 14 | `const monthNames = lang === 'es' ? monthNamesEs : monthNamesEn;` |
| 21 | `lang === 'es' ? 'Experiencia' : 'Experience'` |
| 22 | `lang === 'es' ? 'Mi trayectoria' : 'My journey'` |
| 44 | `lang === 'es' ? job.company : job.company_en` |
| 52 | `lang === 'es' ? job.company : job.company_en` |
| 58 | `lang === 'es' ? job.role : job.role_en` |
| 61 | `lang === 'es' ? job.location : job.location_en` |
| 65 | `(lang === 'es' ? job.achievements : job.achievements_en).map(...)` |

#### `src/components/sections/Education.jsx` — 6 occurrences
| Line | Expression |
|------|-----------|
| 12 | `lang === 'es' ? 'Educación' : 'Education'` |
| 13 | `lang === 'es' ? 'Formación continua' : 'Continuous learning'` |
| 29 | `aria-label={lang === 'es' ? 'Certificado verificado' : 'Verified certificate'}` |
| 33 | `lang === 'es' ? 'Verificado' : 'Verified'` |
| 46 | `lang === 'es' ? cert.institution : cert.institution_en` |
| 50 | `lang === 'es' ? cert.description : cert.description_en` |

#### `src/components/sections/Contact.jsx` — 13 occurrences (3 redundant)
| Line | Expression | Note |
|------|-----------|------|
| 44 | `lang === 'es' ? 'Contacto' : 'Contact'` | |
| 45 | `lang === 'es' ? 'Hablemos' : 'Let\'s talk'` | |
| 50 | `lang === 'es' ? profile.tagline : profile.tagline_en` | |
| 53 | `lang === 'es' ? 'Actualmente estoy' : 'I am currently'` | |
| 53 | `lang === 'es' ? profile.availability.toLowerCase() : profile.availability_en.toLowerCase()` | |
| 54-57 | `lang === 'es' ? 'Si tienes...' : 'If you have...'` | |
| 71 | `lang === 'es' ? 'Email' : 'Email'` | ⚠️ **Redundant** — same value |
| 81 | `aria-label={lang === 'es' ? 'Copiar email' : 'Copy email'}` | |
| 82 | `title={lang === 'es' ? 'Copiar email' : 'Copy email'}` | |
| 85 | `(lang === 'es' ? '¡Copiado!' : 'Copied!')` | |
| 86 | `(lang === 'es' ? 'Copiar' : 'Copy')` | |
| 99 | `lang === 'es' ? 'GitHub' : 'GitHub'` | ⚠️ **Redundant** — same value |
| 115 | `lang === 'es' ? 'LinkedIn' : 'LinkedIn'` | ⚠️ **Redundant** — same value |
| 126 | `lang === 'es' ? 'Enviar Email' : 'Send Email'` | |

#### `src/components/layout/Header.jsx` — 4 occurrences
| Line | Expression |
|------|-----------|
| 24 | `const navLinks = lang === 'es' ? navLinksEs : navLinksEn;` |
| 51 | `aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}` |
| 53 | `lang === 'es' ? 'EN' : 'ES'` |
| 59 | `aria-label={lang === 'es' ? 'Abrir menú de navegación' : 'Toggle navigation'}` |

#### `src/components/layout/Footer.jsx` — 3 occurrences (4 ternaries on 3 lines)
| Line | Expression |
|------|-----------|
| 14 | `lang === 'es' ? profile.fullName : profile.fullName_en` |
| 15 | `lang === 'es' ? profile.tagline : profile.tagline_en` |
| 34 | `lang === 'es' ? profile.fullName : profile.fullName_en` + `lang === 'es' ? profile.availability : profile.availability_en` |

#### `src/components/common/BackToTop.jsx` — 1 occurrence
| Line | Expression |
|------|-----------|
| 24 | `const label = lang === 'es' ? 'Volver arriba' : 'Back to top';` |

---

### 2. JSON `_en` Fields — Complete Inventory

#### `src/data/profile.json` — 6 `_en` fields + `values` array (different format)
- `fullName_en` (line 5) — identical to `fullName` ("Kevin Alvarado")
- `title_en` (line 7) — "Web Developer"
- `tagline_en` (line 9) — "Versatile web developer..."
- `availability_en` (line 19) — "Available for projects"
- `bio_en` (line 21) — "Versatile web developer with over 5 years..."
- `values` array (lines 22-28): uses `{ es: "...", en: "..." }` format — **NOT `_en` suffix** — different pattern

#### `src/data/projects.json` — 32 `_en` fields (8 projects × 4 each)
Each project has: `title_en`, `description_en`, `challenge_en`, `result_en`

#### `src/data/education.json` — 33 `_en` fields (11 certs × 3 each)
Each cert has: `institution_en`, `degree_en`, `description_en`
⚠️ Several `institution_en` values are identical to `institution` (e.g., "Platzi", "HackerRank", "OpenWebinars")

#### `src/data/experience.json` — 4 `_en` fields
- `company_en` (line 5)
- `role_en` (line 8)
- `location_en` (line 10) — identical to `location` ("Caracas, Venezuela")
- `achievements_en` (line 22) — array of 7 strings

#### `src/data/skills.json` — 7 `name_en` fields
- On `soft` array items only (lines 48-54):
  - `name_en` for Español, Inglés, Resolución de problemas, Comunicación, Trabajo en equipo, Gestión de tiempo, Adaptabilidad
- ⚠️ No `_en` fields on `categories[].skills[]` items — the skills under categories use Spanish-only names

**Total: ~82 `_en` or equivalent translation fields across 5 JSON files.**

---

### 3. Light Mode Media Query Analysis

#### Active location: `src/index.css` (lines 79-100)
```css
@media (prefers-color-scheme: light) {
  :root {
    --color-bg: #fafafa;
    --color-bg-secondary: #f4f4f5;
    --color-bg-glass: rgba(250, 250, 250, 0.85);
    --color-surface: #ffffff;
    --color-surface-hover: #f4f4f5;
    --color-border: #e4e4e7;
    --color-border-hover: #d4d4d8;
    --color-text: #18181b;
    --color-text-secondary: #52525b;
    --color-text-muted: #a1a1a6;
    --color-primary: #0891b2;
    --color-primary-hover: #0e7490;
    --color-primary-alpha: rgba(8, 145, 178, 0.1);
    --color-primary-glow: rgba(8, 145, 178, 0.2);
    --color-error: #dc2626;
  }
}
```
**15 custom properties to migrate from `@media` to `[data-theme="light"]`.**

#### Orphaned duplicate: `src/styles/variables.css` (lines 77-98)
⚠️ **IDENTICAL** `@media (prefers-color-scheme: light)` block with same 15 properties.
- `variables.css` is imported by `src/styles/global.css` (line 1)
- Neither `global.css` nor `variables.css` is imported by any component
- Only `src/index.css` is imported (by `main.jsx` line 3)
- **This is dead code** — `styles/` directory is entirely unused

#### Dark theme `:root` differences between `index.css` and `variables.css`:
| Property | `index.css` | `variables.css` |
|----------|-----------|----------------|
| `--color-text-secondary` | `#a1a1a6` | `#b4b4b8` |
| `--max-width` | `1200px` | _not present_ |
| `--breakpoint-*` | _not present_ | `sm: 480px`, `md: 768px`, `lg: 1024px` |

---

### 4. Theme Flash Prevention — Current State

#### `src/index.html` (39 lines total)
- **No inline `<script>`** for theme flash prevention — bare bones Vite HTML
- `meta[name="theme-color"]` (line 9): hardcoded to `#0a0a0b` (dark) — not dynamic
- No mechanism currently exists to prevent flash of wrong theme
- The plan's approach (inline script before `<body>` + localStorage) is correct and necessary
- `html lang="en"` is hardcoded — could be made dynamic for i18n too

---

### 5. Component Complexity Analysis (React.memo Candidates)

| Component | Lines | List rendering | State | Re-render trigger | Memo benefit |
|-----------|-------|---------------|-------|-------------------|-------------|
| **Skills.jsx** | 136 | 4 categories + 2 filtered sections | none | lang toggle | 🔴 **HIGH** — 50+ items re-render |
| **Projects.jsx** | 133 | 8 project cards + 3 filter btns | activeFilter | lang toggle, filter click | 🟡 **MEDIUM** — filteredProjects |
| **Experience.jsx** | 81 | 1 job + achievements array | none | lang toggle | 🟢 **LOW** — single item |
| **Education.jsx** | 58 | 11 cert cards | none | lang toggle | 🟢 **LOW-MEDIUM** |
| **Hero.jsx** | 108 | none | none (IntersectionObserver) | lang toggle | 🟢 **LOW** |
| **About.jsx** | 55 | values array (5 items) | none | lang toggle | 🟢 **LOW** |
| **Contact.jsx** | 132 | none | copied (local state) | lang toggle, copy | 🟢 **LOW** |
| **Header.jsx** | 70 | navLinks array | menuOpen | lang toggle, scroll, menu | 🟢 **LOW** |
| **Footer.jsx** | 40 | none | none | lang toggle | 🟢 **LOW** |
| **BackToTop.jsx** | 36 | none | visible | scroll | 🟢 **LOW** |

**Current performance optimizations in the codebase:**
- `App.jsx` already lazy-loads Skills, Projects, Experience, Education, Contact (lines 7-11)
- `useCallback` on `toggleLang` in LanguageContext (line 8)
- **Zero `React.memo` or `useMemo` usage anywhere** in the entire app

---

### 6. Risk Assessment & Gotchas

#### 🔴 HIGH PRIORITY

1. **Dead code in `src/styles/` will cause confusion during migration**
   - `variables.css`, `global.css`, `reset.css` are NOT imported by any component
   - They have an IDENTICAL `@media (prefers-color-scheme: light)` block to `index.css`
   - If someone migrates `variables.css` but forgets `index.css` (or vice versa), the theme toggle won't work correctly in some scenarios
   - **Recommendation**: Delete `src/styles/` entirely or consolidate before/alongside the migration

2. **All project `image` fields are empty strings (`""`)**
   - The `{project.image && (...)}` guard (Projects.jsx line 46) prevents rendering, but the image div structure remains in the code
   - The "Don't render image container if empty" optimization is already partially implemented
   - Consider: is this intentional dead code for future use, or should the image block be removed?

3. **Skills years `.replace()` translation is fragile**
   ```jsx
   skill.years.replace('años', 'years').replace('año', 'year').replace('meses', 'months')
   ```
   - Works for current dataset but will fail for any new format or unexpected Spanish string
   - Chained `.replace()` on the same string doesn't compose well (first match wins)
   - The plan correctly identifies this should become a translation key

4. **`transition: all` performance on theme toggle**
   - 21 CSS rules across all component stylesheets use `transition: all`
   - On theme toggle, ALL color/bg/border properties transition simultaneously
   - ~150ms duration is short, but could jank on low-end mobile devices
   - Consider: `transition: background-color var(--transition-normal), color var(--transition-normal), border-color var(--transition-normal)` — more explicit, better perf

#### 🟡 MEDIUM PRIORITY

5. **LanguageContext has NO localStorage persistence**
   - Starts at `'es'` on every page load
   - Plan addresses this correctly

6. **profile.json `values` array uses different format**
   - `{ es: "...", en: "..." }` keys (NOT `_en` suffix)
   - Already similar to the proposed `translations.js` format
   - Could be moved to translations.js OR kept in profile.json (less migration work)

7. **3 redundant ternaries in Contact.jsx**
   - Line 71: `'Email' : 'Email'` — same in both languages
   - Line 99: `'GitHub' : 'GitHub'` — same in both languages
   - Line 115: `'LinkedIn' : 'LinkedIn'` — same in both languages
   - These should be simplified to static text during refactor

#### 🟢 LOW PRIORITY / OBSERVATIONS

8. **React 19 patterns available**
   - Project uses `useContext()` instead of `use()` from React 19
   - Project standards recommend `use()` over `useContext()`
   - Could update LanguageContext to use `use()` as part of refactor

9. **html lang attribute is hardcoded**
   - `index.html` line 2: `<html lang="en">`
   - Could set dynamically via the `lang` state for better a11y

10. **vite.config.js is minimal**
    - Only `@vitejs/plugin-react`
    - Bundle visualizer (`vite-plugin-visualizer`) needs to be added as dev dependency

11. **Category translations already use key-value map in Skills.jsx** (lines 17-24)
    ```jsx
    const categoryTranslations = {
      'Back-end': { es: 'Back-end', en: 'Back-end' },
      'Bases de Datos': { es: 'Bases de Datos', en: 'Databases' },
      ...
    };
    ```
    - This pattern is similar to the proposed `translations.js` — it could be migrated to the centralized file

12. **Section and Card components are i18n-agnostic** — they receive translated strings as props. No changes needed.

---

### Summary

| Metric | Count |
|--------|-------|
| Files with inline ternaries | 10 |
| Inline ternaries (total) | ~80 |
| JSON files with `_en` fields | 5 |
| Total `_en` translation fields | ~82 |
| CSS files with light mode block | 2 (1 active, 1 orphaned) |
| CSS custom properties to migrate | 15 |
| Redundant ternaries (same both langs) | 3 |
| Components using React.memo currently | 0 |
| Components using useMemo currently | 0 |

### Ready for Proposal
**Yes** — the plan is sound and well-scoped. Key adjustments:
1. Delete `src/styles/` dead code during migration to avoid confusion
2. Remove 3 redundant ternaries in Contact.jsx
3. Consider using `use()` instead of `useContext()` per React 19 standards
4. Consider `transition` scoping (avoid `all`) for theme toggle performance
5. Move `values` array translation to either translations.js or keep in profile.json (awareness of different pattern)
