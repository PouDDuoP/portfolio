# Design: i18n + Theme Refactor

## Technical Approach

Replace 80+ inline ternaries and 82 `_en` JSON fields with a ~50-line `translations.js` + `useT()` hook. Add light/dark theme toggle via CSS custom properties + `[data-theme]` selectors. Flash prevention via inline `<script>` in `<head>`. Delete dead `src/styles/`. Minimal React perf wins.

## Architecture Decisions

| Decision | Options | Chosen | Rationale |
|----------|---------|--------|-----------|
| i18n approach | react-i18next, custom hook | `translations.js` + `useT()` | 30KB lib for 2 langs is overkill; custom impl is ~50 lines |
| Theme mechanism | CSS-in-JS, CSS modules, custom properties | `[data-theme]` + CSS vars | Zero runtime, no extra deps, works with existing architecture |
| Flash prevention | SSR, inline script, FOUC class | Inline `<script>` in `<head>` | Simplest, most reliable; runs before any React code |
| Data i18n | Keep _en in JSON, extract to translations | Extract to `translations.js` | Single source of truth; grep `=== 'es'` returns zero after refactor |

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/i18n/translations.js` | Create | ~90 key-value pairs with `{es, en}` |
| `src/i18n/useTranslation.js` | Create | Hook returning `{t, lang, toggleLang}` |
| `src/i18n/index.js` | Create | Re-exports |
| `src/context/ThemeContext.jsx` | Create | `{theme, toggleTheme, isDark}` with localStorage |
| `src/context/LanguageContext.jsx` | Modify | Add localStorage persistence (`portfolio-lang`), keep `toggleLang` API |
| `src/main.jsx` | Modify | Wrap with `ThemeProvider` (outermost) |
| `src/App.jsx` | Modify | No structural change; consumers use `useT()` from i18n |
| `src/components/sections/Hero.jsx` | Modify | 11 ternaries → `t()` |
| `src/components/sections/About.jsx` | Modify | 8 ternaries → `t()` |
| `src/components/sections/Skills.jsx` | Modify | ~20 ternaries + `.replace()` → `t()`, wrap `React.memo()` |
| `src/components/sections/Projects.jsx` | Modify | ~14 ternaries → `t()`, add `useMemo`, remove `{project.image && ...}` |
| `src/components/sections/Experience.jsx` | Modify | ~8 ternaries → `t()` |
| `src/components/sections/Education.jsx` | Modify | ~7 ternaries → `t()` |
| `src/components/sections/Contact.jsx` | Modify | ~12 ternaries → `t()`, Email/GitHub/LinkedIn labels → static text |
| `src/components/layout/Header.jsx` | Modify | Nav links → `t()`, add theme toggle button with sun/moon SVG |
| `src/components/layout/Footer.jsx` | Modify | 3 ternaries → `t()` |
| `src/components/layout/Header.css` | Modify | Add `.header__theme-toggle` styles |
| `src/components/common/BackToTop.jsx` | Modify | 1 ternary → `t()` |
| `src/index.css` | Modify | Move `@media (prefers-color-scheme: light)` → `[data-theme="light"]`; add transitions; add `prefers-reduced-motion` override |
| `src/styles/` | Delete | 3 dead files (global.css, reset.css, variables.css) — no imports from them |
| `src/data/profile.json` | Modify | Remove `title_en`, `tagline_en`, `availability_en`, `bio_en`, `fullName_en`, `values[].en` |
| `src/data/projects.json` | Modify | Remove `title_en`, `description_en`, `challenge_en`, `result_en` per project |
| `src/data/skills.json` | Modify | Remove `name_en` from soft skills |
| `src/data/education.json` | Modify | Remove `institution_en`, `degree_en`, `description_en` |
| `src/data/experience.json` | Modify | Remove `company_en`, `role_en`, `location_en`, `achievements_en` |
| `index.html` | Modify | Flash prevention script in `<head>`, dynamic `meta[name="theme-color"]` |
| `package.json` | Modify | Add `vite-plugin-visualizer` as devDependency |

## Translation Key Map

### Static UI (~40 keys)

| Key | ES | EN |
|-----|----|----|
| `nav.about` | Sobre mí | About |
| `nav.skills` | Habilidades | Skills |
| `nav.projects` | Proyectos | Projects |
| `nav.experience` | Experiencia | Experience |
| `nav.contact` | Contacto | Contact |
| `nav.menuOpen` | Abrir menú de navegación | Toggle navigation |
| `common.loading` | Cargando... | Loading... |
| `common.backToTop` | Volver arriba | Back to top |
| `hero.greeting` | Hola, soy | Hello, I'm |
| `hero.viewProjects` | Ver proyectos | View projects |
| `hero.contact` | Contactar | Contact |
| `hero.downloadCv` | Descargar CV | Download CV |
| `hero.yearsExperience` | Años de experiencia | Years of experience |
| `hero.projects` | Proyectos | Projects |
| `hero.clients` | Clientes / Empresas | Clients / Companies |
| `hero.scrollDown` | Desplazarse hacia abajo | Scroll down |
| `about.title` | Sobre mí | About Me |
| `about.subtitle` | Conoce mi historia | Discover my story |
| `about.values` | Mis valores | My values |
| `about.location` | Ubicación | Location |
| `about.availability` | Disponibilidad | Availability |
| `skills.title` | Habilidades | Skills |
| `skills.subtitle` | Tecnologías que domino | Technologies I master |
| `skills.languages` | Idiomas | Languages |
| `skills.softSkills` | Habilidades Blandas | Soft Skills |
| `skills.type.personal` | Ámbito Personal | Personal Scope |
| `skills.type.laboral` | Ámbito Laboral | Work Scope |
| `skills.level.native` | Nativo | Native |
| `skills.level.advanced` | Avanzado | Advanced |
| `skills.level.intermediate` | Intermedio | Intermediate |
| `projects.title` | Proyectos | Projects |
| `projects.subtitle` | Trabajos realizados | Work done |
| `projects.filterAll` | Todos | All |
| `projects.filterPersonal` | Personales | Personal |
| `projects.filterProfessional` | Laborales | Professional |
| `projects.challenge` | Desafío:  | Challenge:  |
| `projects.result` | Resultado:  | Result:  |
| `projects.viewAll` | Ver todos los proyectos | View all projects |
| `experience.title` | Experiencia | Experience |
| `experience.subtitle` | Mi trayectoria | My journey |
| `experience.present` | Actual | Present |
| `education.title` | Educación | Education |
| `education.subtitle` | Formación continua | Continuous learning |
| `education.verified` | Verificado | Verified |
| `contact.title` | Contacto | Contact |
| `contact.subtitle` | Hablemos | Let's talk |
| `contact.currently` | Actualmente estoy | I am currently |
| `contact.cta` | Si tienes un proyecto en mente... | If you have a project in mind... |
| `contact.sendEmail` | Enviar Email | Send Email |
| `contact.copied` | ¡Copiado! | Copied! |
| `contact.copy` | Copiar | Copy |

### Profile data (~12 keys)

| Key pattern | Source |
|-------------|--------|
| `profile.fullName` | profile.fullName + fullName_en |
| `profile.title` | profile.title + title_en |
| `profile.tagline` | profile.tagline + tagline_en |
| `profile.availability` | profile.availability + availability_en |
| `profile.bio` | profile.bio + bio_en |
| `profile.values.0` through `profile.values.4` | profile.values[N].es + .en |

### Dynamic data (~50+ keys)

Composite keys per record ID: `{dataset}.{id}.{field}`

| Pattern | Example | Count |
|---------|---------|-------|
| `projects.{id}.title` | `projects.qualitas.title` | 8 |
| `projects.{id}.description` | `projects.qualitas.description` | 8 |
| `projects.{id}.challenge` | `projects.qualitas.challenge` | 8 |
| `projects.{id}.result` | `projects.qualitas.result` | 8 |
| `experience.{id}.company` | `experience.humanitas-qualitas.company` | 1 |
| `experience.{id}.role` | `experience.humanitas-qualitas.role` | 1 |
| `experience.{id}.location` | `experience.humanitas-qualitas.location` | 1 |
| `experience.{id}.achievements.N` | `.achievements.0` through `.achievements.6` | 7 |
| `education.{id}.institution` | per cert | 11 |
| `education.{id}.degree` | per cert | 11 |
| `education.{id}.description` | per cert | 11 |

### Skills years (~7 keys)

| Key | ES | EN |
|-----|----|----|
| `skills.years.2months` | 2+ meses | 2+ months |
| `skills.years.6months` | 6+ meses | 6+ months |
| `skills.years.1year` | 1+ año | 1+ year |
| `skills.years.2years` | 2+ años | 2+ years |
| `skills.years.3years` | 3+ años | 3+ years |
| `skills.years.5years` | 5+ años | 5+ years |

### Skills categories (~6 keys)

`skills.categories.{name}` for: Back-end (same), Front-end (same), Databases/Bases de Datos, Tools (same), Languages/Idiomas, Soft Skills/Habilidades Blandas.

## Data Flow

```
useT('hero.greeting')
  → useTranslation() reads LanguageContext.lang
  → translations['hero.greeting'][lang]
  → fallback: es → key name
```

```
User clicks theme toggle
  → ThemeContext.toggleTheme()
  → setState + localStorage('portfolio-theme')
  → effect: document.documentElement.dataset.theme = theme
  → effect: meta[name="theme-color"] = --color-bg
  → CSS vars react → all elements update
```

Provider nesting in `main.jsx`:
```
ThemeProvider           ← outermost
  └─ LanguageProvider   ← needs access if lang used in aria-labels
      └─ App
```

## CSS Architecture

`:root` retains dark values (default). Light overrides move from `@media (prefers-color-scheme: light)` to `[data-theme="light"]`. Transitions limited to `background-color`, `color`, `border-color`, `box-shadow`. `prefers-reduced-motion` sets `transition-duration: 0.01ms !important` on all elements.

## Flash Prevention

Inline script before `</head>` in `index.html`:
```html
<script>try{var t=localStorage.getItem('portfolio-theme')||'dark';document.documentElement.dataset.theme=t}catch(e){}</script>
```

## Testing Strategy

| Layer | What | How |
|-------|------|-----|
| Manual | All sections render identically in ES/EN | Visual diff per section |
| Manual | Theme toggle + persistence | Toggle → refresh → no flash |
| Verification | Zero `=== 'es'` or `_en` in src/ | `grep -r "=== 'es'" src/` returns empty |
| Build | No errors or warnings | `npm run build` passes |

## Migration / Rollout

No migration needed. All changes are in-place file modifications. Rollback per-file via `git checkout`. Clear `localStorage` keys `portfolio-lang` and `portfolio-theme` for fresh start.

## Open Questions

- [ ] Skills years: `.replace()` currently converts year strings inline. With translations, each year format (1+ año, 2+ meses) becomes a static key — confirm all variants are covered.
- [ ] `open` a project `GitHub` links with dynamic aria-label `t('projects.viewCode', { title })` — does `t()` need interpolation support?
