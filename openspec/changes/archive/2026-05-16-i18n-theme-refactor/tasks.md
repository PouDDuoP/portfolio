# Tasks: i18n + Theme Refactor

## Dependencies between groups

```
A (Foundation)
├── B (i18n Adoption — any order within group after A1)
├── C (JSON Cleanup — anytime after A1)
├── D2-D5 (Theme UI — after D1)
└── E (Integration — after A5, D1)
        └── F (Cleanup & Perf — anytime, best at end)
                └── G (Verification — last)
```

## Execution rules
- All A tasks MUST be done before any B task
- C tasks can be done anytime after A1 (translations.js is the source of truth)
- D1 MUST be done before D2-D5 (CSS structure must exist before toggle can work)
- E1 MUST be done after A5 (ThemeProvider needs ThemeContext)
- F tasks are safe to do anytime but best left for the end
- G tasks are the final verification pass

---

## Group A: Foundation

Nothing visual yet. These MUST be done first — everything else depends on them.

### [A1] Create `src/i18n/translations.js` ✅
**Files**: `my-app/src/i18n/translations.js` (NEW)
**Depends on**: nothing
**Description**: Create the central translation dictionary as a flat object of dot-notation keys, each with `{ es: string, en: string }`. Cover all ~90 keys from the design doc:
- Nav/UI keys (nav.\*, common.\*, hero.\*, about.\*, skills.\*, projects.\*, experience.\*, education.\*, contact.\*)
- Profile keys (profile.fullName, profile.title, profile.tagline, profile.availability, profile.bio, profile.values.0..4)
- Project keys (projects.{id}.title, .description, .challenge, .result) for all 8 projects
- Experience keys (experience.humanitas-qualitas.company, .role, .location, .achievements.0..6)
- Education keys (education.{id}.institution, .degree, .description) for all 11 certs
- Skills year keys (skills.years.2months, .6months, .1year, .2years, .3years, .5years)
- Skills category keys (skills.categories.Back-end, .Front-end, .Bases\ de\ Datos, .Tools, .Idiomas, .Habilidades\ Blandas)
- Skills level keys (skills.level.native, .advanced, .intermediate)
**Verification**: All components can import and use keys. No missing key errors at runtime. Fallback chain: `translations[key]?.[lang] ?? translations[key]?.es ?? key`.

### [A2] Create `src/i18n/useTranslation.js` hook ✅
**Files**: `my-app/src/i18n/useTranslation.js` (NEW)
**Depends on**: A1
**Description**: Create a custom hook that reads `lang` from `LanguageContext`, imports `translations`, and returns a `t(key)` function. The `t()` function resolves dot-notation keys with the fallback chain: `translations[key]?.[lang] ?? translations[key]?.es ?? key`. Wrap `t()` in `useCallback` to prevent re-renders. The hook returns `{ t, lang, toggleLang }` where `lang` and `toggleLang` pass through from `LanguageContext`.
**Verification**: `useTranslation()` returns working `t()` that resolves both static keys and dynamic data keys. No runtime errors.

### [A3] Create `src/i18n/index.js` barrel export ✅
**Files**: `my-app/src/i18n/index.js` (NEW)
**Depends on**: A1, A2
**Description**: Create a barrel file that re-exports `useTranslation` from `useTranslation.js` for clean imports: `import { useT } from '../../i18n'`.
**Verification**: Components can import `{ useT }` from `../../i18n`.

### [A4] Update `LanguageContext.jsx` to persist language to localStorage ✅
**Files**: `my-app/src/context/LanguageContext.jsx` (MODIFY)
**Depends on**: nothing (foundational)
**Description**: Add localStorage persistence to LanguageContext:
- On init: read `localStorage.getItem('portfolio-lang')`, fall back to `'es'`
- On toggle: write `localStorage.setItem('portfolio-lang', newLang)` inside the `toggleLang` callback
- Wrap `setLang` + `localStorage.setItem` in a try/catch to handle private browsing (storage unavailable)
- Keep the same public API: `{ lang, toggleLang }` so existing consumers keep working
**Verification**: Language persists across reloads. Toggle → refresh → same language. Private browsing falls back to `'es'` without crashing.

### [A5] Create `ThemeContext.jsx` with `{ theme, toggleTheme, isDark }` ✅
**Files**: `my-app/src/context/ThemeContext.jsx` (NEW)
**Depends on**: nothing (foundational)
**Description**: Create a new context and provider:
- State: `theme` (`'dark'` initial, persisted via `localStorage.getItem('portfolio-theme')`)
- `toggleTheme`: toggles between `'dark'` and `'light'`, persists to `localStorage`, syncs `document.documentElement.dataset.theme`
- `isDark`: derived boolean `theme === 'dark'`
- Effect: on mount and on theme change, set `document.documentElement.dataset.theme` and update `<meta name="theme-color">` by reading computed `--color-bg` or hardcoding `#0a0a0b` / `#fafafa`
- Handle localStorage unavailable with try/catch
- Wrap state updates in `useCallback`
**Verification**: ThemeContext provides `{ theme, toggleTheme, isDark }`. Toggle updates `data-theme` attribute. Theme persists across reloads.

---

## Group B: i18n Adoption (component by component)

Each file: replace `lang === 'es' ? X : Y` with `t('key')`. Replace `import { useLanguage }` with `import { useT } from '../../i18n'`. Destructure `{ t }` instead of `{ lang }`. All data-related ternaries (like `profile.title_en`) also become `t()` calls since translations.js now holds those values.

### [B1] Header.jsx — nav links + toggle labels → `t()` ✅
**Files**: `my-app/src/components/layout/Header.jsx` (MODIFY)
**Depends on**: A1 (translations exist), A4 (LanguageContext persists)
**Description**:
- Replace `import { useLanguage }` with `import { useT } from '../../i18n'`
- Destructure `{ t, toggleLang }` instead of `{ lang, toggleLang }`
- Replace `navLinks` ternary logic: use `t('nav.about')` etc. for nav links (define a static array of key/href pairs, map over it calling `t(key)`)
- Replace `lang === 'es' ? 'EN' : 'ES'` with static toggle text (it shows EN when ES active / ES when EN active — this is a visual toggle, not a translation; keep as-is or use `lang` from `useT()`)
- Replace aria-labels: `t('nav.menuOpen')`
**Verification**: Nav links render in correct language. Language toggle switches all texts. No `=== 'es'` in the file.

### [B2] Hero.jsx — 11 ternaries → `t()` ✅
**Files**: `my-app/src/components/sections/Hero.jsx` (MODIFY)
**Depends on**: A1
**Description**:
- Replace `import { useLanguage }` with `import { useT } from '../../i18n'`
- Destructure `{ t }`
- Replace all 11 ternaries:
  - `profile.availability` / `profile.availability_en` → `t('profile.availability')`
  - `'Hola, soy'` / `'Hello, I\\'m'` → `t('hero.greeting')`
  - `profile.title` / `profile.title_en` → `t('profile.title')`
  - `profile.tagline` / `profile.tagline_en` → `t('profile.tagline')`
  - `'Ver proyectos'` / `'View projects'` → `t('hero.viewProjects')`
  - `'Contactar'` / `'Contact'` → `t('hero.contact')`
  - `'Descargar CV'` / `'Download CV'` → `t('hero.downloadCv')`
  - `'Años de experiencia'` / `'Years of experience'` → `t('hero.yearsExperience')`
  - `'Proyectos'` / `'Projects'` → `t('hero.projects')`
  - `'Clientes / Empresas'` / `'Clients / Companies'` → `t('hero.clients')`
  - `'Desplazarse hacia abajo'` / `'Scroll down'` → `t('hero.scrollDown')`
- Remove import of `profile` if no longer used directly (it's still used for `profile.name`, `profile.avatar`, `profile.fullName` in alt text — keep import)
**Verification**: Hero section renders identically in ES and EN. No `=== 'es'` in file.

### [B3] About.jsx — 8 ternaries + values → `t()` ✅
**Files**: `my-app/src/components/sections/About.jsx` (MODIFY)
**Depends on**: A1
**Description**:
- Destructure `{ t }` from `useT()`
- Replace all ternaries:
  - Section title: `'Sobre mí'` / `'About Me'` → `t('about.title')`
  - Section subtitle: `'Conoce mi historia'` / `'Discover my story'` → `t('about.subtitle')`
  - Bio: `profile.bio` / `profile.bio_en` → `t('profile.bio')`
  - Values title: `'Mis valores'` / `'My values'` → `t('about.values')`
  - Values list: `value.es` / `value.en` → `t(\`profile.values.\${index}\`)`
  - Location label: `'Ubicación'` / `'Location'` → `t('about.location')`
  - Availability label: `'Disponibilidad'` / `'Availability'` → `t('about.availability')`
  - Availability value: `profile.availability` / `profile.availability_en` → `t('profile.availability')`
- Remove `profile` import if no longer used directly (it's still used for `profile.location` — keep import)
**Verification**: About section renders identically in both languages. Values list translates.

### [B4] Skills.jsx — 10 ternaries + `.replace()` + nested level chains → `t()` ✅
**Files**: `my-app/src/components/sections/Skills.jsx` (MODIFY)
**Depends on**: A1
**Description**:
- Destructure `{ t }` from `useT()`
- Replace section title/subtitle ternaries → `t('skills.title')`, `t('skills.subtitle')`
- Replace `categoryTranslations` lookup table: keep the object but use `t(\`skills.categories.\${categoryName}\`)` as fallback; or simplify to call `t()` directly since categories are now in translations
- Replace `.replace()` chain for year strings: `t(\`skills.years.\${skill.years}\`)` where years values are normalized. Note: years strings in data are like `"1+ año"`, `"5+ años"` — use these as-is as keys (e.g., `skill.years.replace(/[\\s+]/g, '')` or map them: `'1+ año' → 'skills.years.1year'`). The design shows 7 translation keys for years.
- Replace skill type ternaries → `t('skills.type.personal')`, `t('skills.type.laboral')`
- Replace languages section: `'Idiomas'` / `'Languages'` → `t('skills.languages')`
- Replace `skill.name` / `skill.name_en` → `t()` (names moved to translations)
- Replace level ternaries (`'Nativo' → 'Native'` etc.) → `t('skills.level.native')`, `t('skills.level.advanced')`, `t('skills.level.intermediate')`
- Replace `'Habilidades Blandas'` / `'Soft Skills'` → `t('skills.softSkills')`
- Remove `getWidthPercent` if untouched — it stays as-is (pure function, not i18n related)
**Verification**: Skills section renders identically. Year strings translate. Skill types translate. Level labels translate. Category headers translate.

### [B5] Projects.jsx — 14 ternaries + `useMemo` → `t()` ✅
**Files**: `my-app/src/components/sections/Projects.jsx` (MODIFY)
**Depends on**: A1
**Description**:
- Destructure `{ t }` from `useT()`
- Replace section title/subtitle → `t('projects.title')`, `t('projects.subtitle')`
- Replace filter labels: `'Todos'` / `'All'` → `t('projects.filterAll')`, etc.
- Replace project-field ternaries inside the map:
  - `project.title` / `project.title_en` → `t(\`projects.\${project.id}.title\`)`
  - `project.description` / `project.description_en` → `t(\`projects.\${project.id}.description\`)`
  - `project.challenge` / `project.challenge_en` → `t(\`projects.\${project.id}.challenge\`)`
  - `project.result` / `project.result_en` → `t(\`projects.\${project.id}.result\`)`
- Replace labels: `'Desafío: '` / `'Challenge: '` → `t('projects.challenge')`, `'Resultado: '` / `'Result: '` → `t('projects.result')`
- Replace aria-labels for GitHub/demo links using template + `t()`
- Replace `'Ver todos los proyectos'` / `'View all projects'` → `t('projects.viewAll')`
- Add `useMemo` wrapping `filteredProjects` with `[activeFilter, lang]` deps (PERF-2 from spec)
- Remove unused `profile` import
**Verification**: Projects render identically. Filter labels translate. All 8 project cards show correct language. `useMemo` present.

### [B6] Experience.jsx — 9 ternaries + date arrays → `t()` ✅
**Files**: `my-app/src/components/sections/Experience.jsx` (MODIFY)
**Depends on**: A1
**Description**:
- Destructure `{ t }` from `useT()`
- Replace section title/subtitle → `t('experience.title')`, `t('experience.subtitle')`
- Replace `formatDate` function: the `'Actual'` / `'Present'` branch → `t('experience.present')`
- Replace month name arrays: the month names are already arrays (not ternaries), but the date formatting logic uses `lang === 'es'` to pick the array. Refactor: create a single `monthNames` array that doesn't depend on lang, or keep both arrays but the function receives `t` and calls `t()` only for month names? Actually, month names are data, not UI translations — they should NOT go in translations.js. Best approach: keep month name arrays hardcoded in the component (they're not user-facing text, they're data formatting). The only change in `formatDate` is the `'Actual'` / `'Present'` branch → `t('experience.present')`. Pass `t` into `formatDate` or make it use the hook value.
- Replace job-field ternaries:
  - `job.company` / `job.company_en` → `t(\`experience.\${job.id}.company\`)`
  - `job.role` / `job.role_en` → `t(\`experience.\${job.id}.role\`)`
  - `job.location` / `job.location_en` → `t(\`experience.\${job.id}.location\`)`
  - `job.achievements` / `job.achievements_en` → map over indices calling `t(\`experience.\${job.id}.achievements.\${i}\`)`
**Verification**: Experience section renders identically. Present/Actual label works. All job fields translate.

### [B7] Education.jsx — 6 ternaries → `t()` ✅
**Files**: `my-app/src/components/sections/Education.jsx` (MODIFY)
**Depends on**: A1
**Description**:
- Destructure `{ t }` from `useT()`
- Replace section title/subtitle → `t('education.title')`, `t('education.subtitle')`
- Replace `'Certificado verificado'` / `'Verified certificate'` aria-label → `t('education.verified')`
- Replace `'Verificado'` / `'Verified'` → `t('education.verified')`
- Replace cert-field ternaries:
  - `cert.institution` / `cert.institution_en` → `t(\`education.\${cert.id}.institution\`)`
  - `cert.degree` / `cert.degree_en` → `t(\`education.\${cert.id}.degree\`)`
  - `cert.description` / `cert.description_en` → `t(\`education.\${cert.id}.description\`)`
**Verification**: Education section renders identically. All certs show translated fields.

### [B8] Contact.jsx — 13 ternaries → `t()` + remove 3 redundant ones ✅
**Files**: `my-app/src/components/sections/Contact.jsx` (MODIFY)
**Depends on**: A1
**Description**:
- Destructure `{ t }` from `useT()`
- Replace section title/subtitle → `t('contact.title')`, `t('contact.subtitle')`
- Replace `profile.tagline` / `profile.tagline_en` → `t('profile.tagline')`
- Replace `'Actualmente estoy'` / `'I am currently'` → `t('contact.currently')`
- Replace availability → `t('profile.availability')`
- Replace CTA paragraph → `t('contact.cta')`
- Replace `'Enviar Email'` / `'Send Email'` → `t('contact.sendEmail')`
- Replace `'Copiar'` / `'Copy'` → `t('contact.copy')`
- Replace `'¡Copiado!'` / `'Copied!'` → `t('contact.copied')`
- Replace copy button aria-label/title → `t('contact.copy')`
- **Remove 3 redundant ternaries** (CLN-3 from spec): Email label (`'Email'` / `'Email'` — same value), GitHub label (`'GitHub'` / `'GitHub'` — same value), LinkedIn label (`'LinkedIn'` / `'LinkedIn'` — same value) → replace with static text `'Email'`, `'GitHub'`, `'LinkedIn'`
**Verification**: Contact section renders identically. Email/GitHub/LinkedIn labels are plain text.

### [B9] Footer.jsx — 3 ternaries → `t()` ✅
**Files**: `my-app/src/components/layout/Footer.jsx` (MODIFY)
**Depends on**: A1
**Description**:
- Destructure `{ t }` from `useT()`
- Replace `profile.fullName` / `profile.fullName_en` → `t('profile.fullName')`
- Replace `profile.tagline` / `profile.tagline_en` → `t('profile.tagline')`
- Replace `profile.availability` / `profile.availability_en` → `t('profile.availability')`
**Verification**: Footer renders identically. Name, tagline, availability translate.

### [B10] BackToTop.jsx — 1 ternary → `t()` ✅
**Files**: `my-app/src/components/common/BackToTop.jsx` (MODIFY)
**Depends on**: A1
**Description**:
- Replace `import { useLanguage }` with `import { useT } from '../../i18n'`
- Destructure `{ t }`
- Replace `'Volver arriba'` / `'Back to top'` → `t('common.backToTop')`
**Verification**: Button tooltip translates. No `=== 'es'` in file.

---

## Group C: JSON Cleanup

Remove all `_en` fields. The values are now in `translations.js`. These can be done any time after A1.

### [C1] Remove `_en` fields from `profile.json` ✅
**Files**: `my-app/src/data/profile.json` (MODIFY)
**Depends on**: A1
**Description**: Remove these fields: `fullName_en`, `title_en`, `tagline_en`, `availability_en`, `bio_en`. Also remove `values[].en` from each value object — only keep `es` (or restructure to just strings). Note: `values` objects become `{ "es": "..." }` only but they're referenced in About.jsx via `t('profile.values.0')` etc., so the values array is no longer used for i18n — it can stay with just `es` values for backward compat, or be removed entirely if nothing reads it directly.
**Verification**: `grep -c "_en" my-app/src/data/profile.json` returns 0.

### [C2] Remove `_en` fields from `projects.json` ✅
**Files**: `my-app/src/data/projects.json` (MODIFY)
**Depends on**: A1
**Description**: Remove `title_en`, `description_en`, `challenge_en`, `result_en` from all 8 project entries. Keep `title`, `description`, `challenge`, `result` (Spanish values).
**Verification**: `grep -c "_en" my-app/src/data/projects.json` returns 0.

### [C3] Remove `_en` fields from `experience.json` ✅
**Files**: `my-app/src/data/experience.json` (MODIFY)
**Depends on**: A1
**Description**: Remove `company_en`, `role_en`, `location_en`, `achievements_en` array from the single experience entry. Keep `company`, `role`, `location`, `achievements` (Spanish).
**Verification**: `grep -c "_en" my-app/src/data/experience.json` returns 0.

### [C4] Remove `_en` fields from `education.json` ✅
**Files**: `my-app/src/data/education.json` (MODIFY)
**Depends on**: A1
**Description**: Remove `institution_en`, `degree_en`, `description_en` from all 11 cert entries. Keep `institution`, `degree`, `description` (Spanish).
**Verification**: `grep -c "_en" my-app/src/data/education.json` returns 0.

### [C5] Remove `name_en` from `skills.json` soft skills ✅
**Files**: `my-app/src/data/skills.json` (MODIFY)
**Depends on**: A1
**Description**: Remove `name_en` field from all 7 soft skills entries (Español/Spanish, Inglés/English, Resolución de problemas/Problem Solving, etc.). Keep `name` (Spanish).
**Verification**: `grep -c "_en" my-app/src/data/skills.json` returns 0.

### [C6] Remove `values` array `{es, en}` objects from `profile.json` ✅
**Files**: `my-app/src/data/profile.json` (MODIFY)
**Depends on**: A1, B3
**Description**: The `values` array contains `{es, en}` objects that are now handled by `t('profile.values.0')` through `t('profile.values.4')` in translations.js. Remove these inline bilingual objects. Can either delete the `values` array entirely (if nothing reads it directly), or flatten to just Spanish strings: `{"values": ["Calidad sobre cantidad", ...]}`. Check if any component reads `profile.values` directly — About.jsx iterates over it: `{profile.values.map(...)}` → must update About.jsx B3 to use the `profile.values` array for iteration count and `t()` for text, OR keep values array with just Spanish text for iteration and use `t()` for display. Best approach: keep `values` as `["Calidad...", "Simplicidad...", ...]` (flat strings) and About.jsx iterates with index to call `t(\`profile.values.\${index}\`)`.
**Verification**: `profile.json` has no `{es, en}` objects in values. Values render correctly through `t()`.

---

## Group D: Theme CSS

### [D1] Refactor `index.css` — move light mode from `@media` to `[data-theme="light"]`
**Files**: `my-app/src/index.css` (MODIFY)
**Depends on**: nothing (CSS only)
**Description**:
- Move the entire `@media (prefers-color-scheme: light)` block content to `[data-theme="light"]` selector
- Keep `:root` as-is (dark theme default)
- Add a `@media (prefers-color-scheme: light)` block that maps to `[data-theme="light"]` to support first-time visitors? NO — spec says default is always dark, system preference is never read (THEME-2). But what about users who never toggle and have system light mode? They get dark by default. That's the decision from THEME-2. Remove the `@media` block entirely.
- Add CSS transitions for smooth switching: `transition: background-color var(--transition-normal), color var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal)` on `*, *::before, *::after`. Do NOT use `transition: all` (per THEME-9/SHOULD).
- Ensure `prefers-reduced-motion` override still works (it sets `transition-duration: 0.01ms !important`)
- Verify the `@media (prefers-color-scheme: light)` block is completely removed
**Verification**: Light mode activates on `[data-theme="light"]`. Dark mode stays default. No `prefers-color-scheme` in CSS. Smooth transitions on color change.

### [D2] Add theme toggle button to Header.jsx (sun/moon SVGs)
**Files**: `my-app/src/components/layout/Header.jsx` (MODIFY), `my-app/src/components/layout/Header.css` (MODIFY)
**Depends on**: A5, D1, B1
**Description**:
- Import `useT` (already added in B1) and `useTheme` from `ThemeContext`
- Destructure `{ theme, toggleTheme }` or use a simple `useContext(ThemeContext)` call
- Add a button next to the language toggle (inside `header__actions`) with:
  - Sun SVG (visible when `theme === 'dark'` — clicking toggles to light)
  - Moon SVG (visible when `theme === 'light'` — clicking toggles to dark)
  - `aria-label` bilingual: `t('theme.toggleLight')` / `t('theme.toggleDark')` → add these keys to translations.js if not already there
- In `Header.css`:
  - Add `.header__theme-toggle` styles — same size/dimension as `.header__lang-toggle`, matching the visual style
  - SVG fill color inheriting from current `--color-text`
  - Hover states matching existing button patterns
**Verification**: Theme toggle button renders in header. Clicking switches theme. Sun icon shown in dark mode, moon icon in light mode. No visual jank.

### [D3] Add smooth CSS transitions for color properties
**Files**: `my-app/src/index.css` (MODIFY)
**Depends on**: D1
**Description**:
- This is partially done in D1. Double-check that transitions are comprehensive:
  - `background-color`, `color`, `border-color`, `box-shadow` on `*, *::before, *::after`
  - Use `var(--transition-normal)` for duration
  - Keep `prefers-reduced-motion: transition-duration: 0.01ms !important` override
**Verification**: All color properties transition smoothly on theme toggle. No `transition: all` usage.

### [D4] Inline flash prevention script in `index.html` `<head>`
**Files**: `my-app/index.html` (MODIFY)
**Depends on**: D1
**Description**:
- Add an inline `<script>` tag before `</head>` (or as first thing in `<head>`) that:
  - Reads `localStorage.getItem('portfolio-theme')`
  - If value is `'light'`, sets `document.documentElement.dataset.theme = 'light'`
  - Wrap in try/catch for localStorage unavailability
  - Runs synchronously before any CSS loads or renders
```html
<script>try{var t=localStorage.getItem('portfolio-theme');if(t==='light'){document.documentElement.dataset.theme='light'}}catch(e){}</script>
```
- This means the `data-theme` default (when not set by script) is already `'dark'` from CSS, so no need to set it explicitly
**Verification**: Refresh with light theme active — no flash of dark theme before React hydrates. Inspect `<html>` immediately on page load to confirm correct `data-theme`.

### [D5] Dynamic `meta[name="theme-color"]` in ThemeContext
**Files**: `my-app/src/context/ThemeContext.jsx` (already created in A5)
**Depends on**: A5
**Description**:
- Already part of A5 implementation. Ensure the effect updates `meta[name="theme-color"]`:
  - Query: `document.querySelector('meta[name="theme-color"]')`
  - On dark: `#0a0a0b`
  - On light: `#fafafa`
  - Update on every theme change
  - Handle missing meta tag (create it if not found)
**Verification**: Browser address bar/theme-color changes on toggle. Matches the current theme's background.

---

## Group E: Integration

### [E1] Wrap app with ThemeProvider in `main.jsx`
**Files**: `my-app/src/main.jsx` (MODIFY)
**Depends on**: A5
**Description**:
- Import `ThemeProvider` from `./context/ThemeContext`
- Wrap `ThemeProvider` as the outermost provider (before `LanguageProvider`):
```jsx
<ThemeProvider>
  <LanguageProvider>
    <App />
  </LanguageProvider>
</ThemeProvider>
```
**Verification**: ThemeProvider wraps the app. No console errors. All consumers have access to theme context.

### [E2] Add `data-theme` attribute binding in App.jsx
**Files**: `my-app/src/App.jsx` (MODIFY)
**Depends on**: A5, D1
**Description**:
- This is already handled by the ThemeContext effect that sets `document.documentElement.dataset.theme`. No additional change needed in App.jsx unless we want to double-bind. Verify that the effect in ThemeContext properly sets `data-theme` on mount and on toggle.
- Actually, THEME-4 already handles this via the flash prevention script. And A5/ThemeContext handles the React-side sync. App.jsx doesn't need a `data-theme` attribute binding — it's set on `<html>`, not on the React root.
- **Skip this task** or mark as "verification only" — no code change needed in App.jsx.
**Verification**: `document.documentElement` has `data-theme="dark|light"` synced with context state.

### [E3] Add `lang` attribute to `<html>` dynamically
**Files**: `my-app/src/context/LanguageContext.jsx` (MODIFY)
**Depends on**: A4
**Description**:
- In LanguageContext/LanguageProvider, add an effect that sets `document.documentElement.lang` whenever `lang` changes:
```jsx
useEffect(() => {
  document.documentElement.lang = lang;
}, [lang]);
```
- On mount, set it from the initial language value
**Verification**: `<html>` has correct `lang="es"` or `lang="en"` attribute. Updates on language toggle.

---

## Group F: Cleanup & Performance

### [F1] Delete `src/styles/` directory
**Files**: `my-app/src/styles/` (DELETE — 3 files: `global.css`, `reset.css`, `variables.css`)
**Depends on**: nothing (but verify no imports from these files first)
**Description**:
- Verify no file imports from `src/styles/` — grep for `'./styles/'` or `'../styles/'` patterns in `my-app/src/`
- Confirm the 3 CSS files are dead code
- Delete `my-app/src/styles/` directory entirely
**Verification**: `Test-Path my-app/src/styles` returns False. No broken imports. Build succeeds.

### [F2] Remove dead project image block from Projects.jsx
**Files**: `my-app/src/components/sections/Projects.jsx` (MODIFY)
**Depends on**: B5
**Description**:
- All `image` fields in `projects.json` are `""` (empty string)
- Remove the entire image block inside the Card map:
  - The `{project.image && (...)}` wrapper
  - The `.project-card__image` div with `<img>` and overlay
  - The `.project-card__overlay` with GitHub/demo action buttons
  - The GitHub/demo action buttons with their SVG links (these are currently only shown on image hover — decide if they should be moved somewhere else or removed entirely)
- Note: GitHub and demo links are ONLY inside the image overlay. Removing the image block removes those links. Evaluate: should GitHub/demo links be relocated to the card content area? Per design and spec, this is a cleanup of dead code. The links are not visible anyway (all images are empty). Remove entirely.
- Also remove `alt` attribute generation for the now-removed image tag
**Verification**: No `project.image` or `project.github` or `project.demo` references remain in the rendered output. Build succeeds.

### [F3] Add `vite-plugin-visualizer` dev dependency
**Files**: `my-app/package.json` (MODIFY), `my-app/vite.config.js` (MODIFY)
**Depends on**: nothing
**Description**:
- Add `"vite-plugin-visualizer": "^1.0.0"` to `devDependencies` in package.json
- Add visualizer config to `vite.config.js`:
```js
import { visualizer } from 'vite-plugin-visualizer';
// in plugins array:
visualizer({ open: true, gzipSize: true, brotliSize: true })
```
- Run `npm install` or `pnpm install` after changes
**Verification**: `npm run build` produces a `stats.html` report with bundle visualization.

### [F4] Add `React.memo` to Skills component
**Files**: `my-app/src/components/sections/Skills.jsx` (MODIFY)
**Depends on**: B4
**Description**:
- Import `memo` from `'react'` (or `import React from 'react'`)
- Wrap the default export: `export default memo(Skills)`
- Add a `displayName` for debugging: `Skills.displayName = 'Skills'`
- Ensure all props are primitive (they are — Skills takes no props, only reads from context and data)
**Verification**: `React.memo(Skills)` present in file. Component renders identically before and after.

---

## Group G: Verification

### [G1] Grep for `=== 'es'` in `src/` returns zero
**Depends on**: All B tasks, A1
**Description**: Run `grep -r "=== 'es'" my-app/src/` and confirm zero matches. This ensures all ternaries have been replaced.
**Verification**: Command returns no output.

### [G2] Grep for `_en` in `src/data/` returns zero
**Depends on**: All C tasks
**Description**: Run `grep -r "_en" my-app/src/data/` and confirm zero matches. This ensures all `_en` JSON fields have been removed.
**Verification**: Command returns no output.

### [G3] `npm run build` succeeds
**Depends on**: ALL tasks
**Description**: Run `npm run build` in `my-app/` directory. Must complete with no errors and no warnings.
**Verification**: Build exits with code 0. No warnings in output.

### [G4] Manual: theme toggle works, language toggle works, no visual regressions
**Depends on**: ALL tasks
**Description**: Manual QA in browser:
- Load site → verify dark theme by default
- Toggle language → all sections render in English with correct translations
- Toggle back → Spanish renders correctly
- Toggle theme → light mode activates, all colors switch smoothly
- Toggle back → dark mode restores
- Toggle both in various orders → no visual glitches
- Check all sections: Hero, About, Skills, Projects, Experience, Education, Contact, Footer, Header, BackToTop
**Verification**: All sections render identically to before (aside from new theme toggle button). No broken layout. No missing text.

### [G5] Manual: localStorage persists language and theme across reloads
**Depends on**: A4, A5, E3
**Description**: Manual QA:
- Set language to EN → reload → stays EN
- Set theme to light → reload → stays light with NO flash of dark mode
- Clear localStorage → reload → defaults to dark/ES
- Test in private/incognito mode → no crashes, graceful fallback to defaults
**Verification**: Language and theme persist. No flash on reload. Private browsing works.

---

## Task Summary

| Task | Group | Files | Type |
|------|-------|-------|------|
| A1 | Foundation | `src/i18n/translations.js` | NEW |
| A2 | Foundation | `src/i18n/useTranslation.js` | NEW |
| A3 | Foundation | `src/i18n/index.js` | NEW |
| A4 | Foundation | `src/context/LanguageContext.jsx` | MODIFY |
| A5 | Foundation | `src/context/ThemeContext.jsx` | NEW |
| B1 | i18n Adoption | `src/components/layout/Header.jsx` | MODIFY |
| B2 | i18n Adoption | `src/components/sections/Hero.jsx` | MODIFY |
| B3 | i18n Adoption | `src/components/sections/About.jsx` | MODIFY |
| B4 | i18n Adoption | `src/components/sections/Skills.jsx` | MODIFY |
| B5 | i18n Adoption | `src/components/sections/Projects.jsx` | MODIFY |
| B6 | i18n Adoption | `src/components/sections/Experience.jsx` | MODIFY |
| B7 | i18n Adoption | `src/components/sections/Education.jsx` | MODIFY |
| B8 | i18n Adoption | `src/components/sections/Contact.jsx` | MODIFY |
| B9 | i18n Adoption | `src/components/layout/Footer.jsx` | MODIFY |
| B10 | i18n Adoption | `src/components/common/BackToTop.jsx` | MODIFY |
| C1 | JSON Cleanup | `src/data/profile.json` | MODIFY |
| C2 | JSON Cleanup | `src/data/projects.json` | MODIFY |
| C3 | JSON Cleanup | `src/data/experience.json` | MODIFY |
| C4 | JSON Cleanup | `src/data/education.json` | MODIFY |
| C5 | JSON Cleanup | `src/data/skills.json` | MODIFY |
| C6 | JSON Cleanup | `src/data/profile.json` (values) | MODIFY |
| D1 | Theme CSS | `src/index.css` | MODIFY |
| D2 | Theme CSS | `src/components/layout/Header.jsx`, `Header.css` | MODIFY |
| D3 | Theme CSS | `src/index.css` (transitions) | MODIFY |
| D4 | Theme CSS | `index.html` (flash script) | MODIFY |
| D5 | Theme CSS | `src/context/ThemeContext.jsx` (dynamic meta) | MODIFY |
| E1 | Integration | `src/main.jsx` | MODIFY |
| E2 | Integration | verification only — handled by A5/D1 | NONE |
| E3 | Integration | `src/context/LanguageContext.jsx` (lang attr) | MODIFY |
| F1 | Cleanup | `src/styles/` (directory + 3 files) | DELETE |
| F2 | Cleanup | `src/components/sections/Projects.jsx` (image block) | MODIFY |
| F3 | Perf | `package.json`, `vite.config.js` (visualizer) | MODIFY |
| F4 | Perf | `src/components/sections/Skills.jsx` (React.memo) | MODIFY |
| G1-G5 | Verification | — | VERIFY |

**Total: 30 tasks** (25 code changes across 38 files + 5 verification steps)
