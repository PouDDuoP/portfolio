# Archive Report: i18n + Theme Refactor

**Change**: i18n-theme-refactor  
**Archived**: 2026-05-16  
**Archive location**: `openspec/changes/archive/2026-05-16-i18n-theme-refactor/`  
**Engram observation IDs**: proposal=#183, spec=#184, design=#185, tasks=#186, apply-progress=#188, verify-report=#190  
**Build status**: ✅ Passes (55 modules, 257ms, zero errors)  
**Verification verdict**: ✅ PASS WITH WARNINGS (24/26 requirements fully compliant, 2 partial)

---

## What Was Done

### 1. Centralized i18n (Capability 1)
Replaced 80+ inline ternaries (`lang === 'es' ? X : Y`) and 82 `_en` JSON fields with a centralized `translations.js` exporting ~90 flat translation keys, a `useT()` hook returning `t(key)` for dot-notation resolution, and localStorage-persisted language selection. The `LanguageContext` was rewritten to use the new system while maintaining the same public API.

**Key files**: `src/i18n/translations.js`, `src/i18n/useTranslation.js`, `src/context/LanguageContext.jsx` (rewritten), all 10 section/layout/common components (ternaries → `t()`), 5 JSON data files (`_en` fields removed)

### 2. Light/Dark Theme Toggle (Capability 2)
Added `ThemeContext` with localStorage-persisted theme (default: `'dark'`), flash prevention inline `<script>` in `<head>`, CSS `[data-theme="dark"]` / `[data-theme="light"]` selectors replacing `@media (prefers-color-scheme)`, 15 custom properties moved to `[data-theme="light"]`, sun/moon toggle button in Header, dynamic `meta[theme-color]`, and smooth CSS transitions.

**Key files**: `src/context/ThemeContext.jsx`, `src/index.css` (refactored), `index.html` (flash script), `src/components/layout/Header.jsx` + `Header.css` (toggle button)

### 3. Cleanup & Performance (Capabilities 3 & 4)
Deleted `src/styles/` directory (3 dead files: `variables.css`, `reset.css`, `global.css`), removed dead project image/github/demo block from `Projects.jsx` (all 8 projects had empty strings), replaced 3 redundant Contact.jsx ternaries with static text, wrapped `Skills` with `React.memo`, added `useMemo` for `filteredProjects`, and added `rollup-plugin-visualizer` for bundle analysis.

**Key files**: `src/styles/` (deleted), `src/components/sections/Projects.jsx` (dead code removed), `src/components/sections/Contact.jsx` (ternaries cleaned), `src/components/sections/Skills.jsx` (memo), `package.json` + `vite.config.js` (visualizer)

---

## Files Changed (Summary)

| Change Type | Count | Details |
|-------------|-------|---------|
| New files | 4 | `translations.js`, `useTranslation.js`, `ThemeContext.jsx`, `rollup-plugin-visualizer` dep |
| Modified | ~25 | All section components, context files, CSS, data JSONs, index.html, Header, config |
| Deleted | 3 | `src/styles/variables.css`, `reset.css`, `global.css` |
| Dead code removed | 2 blocks | Project image overlay (Projects.jsx), redundant ternaries (Contact.jsx) |
| **Total affected** | **~32 files** | Across all groups A-G |

---

## New Capabilities Added

| Capability | Status | Description |
|------------|--------|-------------|
| `i18n` | ✅ Live | `translations.js` + `useT()` hook, localStorage-persisted language, ~90 keys |
| `theme-toggle` | ✅ Live | Light/dark toggle with localStorage, flash prevention, CSS `[data-theme]` selectors |

---

## Verification Summary

| Check | Result | Details |
|-------|--------|---------|
| All 30 tasks complete | ✅ | All groups A-G finished |
| Build passes | ✅ | 55 modules, 257ms, zero errors |
| Spec compliance | ✅ 24/26 full, 2 partial | I18N-5: 1 `=== 'es'` remains (language toggle button — intentional per B1). PERF-2: `useMemo` deps `[activeFilter]` (correct — lang not needed) |
| Zero `=== 'es'` in src/ | ⚠️ 1 remaining | Language toggle button in Header shows opposite language — allowed per task B1 |
| Zero `_en` fields | ✅ | All 82+ fields removed from JSON |
| Theme flash prevention | ✅ | Inline script in `<head>` before font preloads |
| Dead code removed | ✅ | `src/styles/` deleted, project image block removed |
| Bundle visualizer | ✅ | `rollup-plugin-visualizer` (correct package — `vite-plugin-visualizer` doesn't exist on npm) |

---

## Knowledge Saved (Gotchas & Decisions)

### Gotchas
- **`vite-plugin-visualizer` doesn't exist on npm** — the correct package is `rollup-plugin-visualizer`. This was discovered during apply and used throughout.
- **All 8 projects have empty `image: ""`, `github: ""`, AND `demo: ""`** — the entire image overlay block in Projects.jsx was dead code with zero visibility impact.
- **Source root is `my-app/src/` not `src/`** — all implementation paths relative to `my-app/`.
- **Skills years `.replace()` handles 7 variants** — each maps to a `t()` key in translations.
- **Month names in Experience.jsx** are data-formatting arrays, not UI translations — stayed hardcoded.
- **Email/GitHub/LinkedIn labels in Contact.jsx** are identical in ES/EN — made static text, not translation keys.
- **GitHub/demo links** in Projects.jsx existed ONLY inside the image overlay — removing it removed those links entirely.

### Decisions
- **Custom i18n over react-i18next**: 2 languages, ~90 keys → custom hook is simpler and zero-dependency.
- **`[data-theme]` over CSS-in-JS**: Global CSS with attribute selectors is sufficient; no CSS modules added.
- **`useMemo` deps `[activeFilter]` not `[activeFilter, lang]`**: The filter function doesn't use `lang`, so the shorter deps array is more correct.
- **Default theme `'dark'`**: System preference is never read — default is always dark.
- **`lang === 'es'` kept in Header**: The language toggle button shows the opposite language name — this is inherently a ternary and the task (B1) explicitly allows it.

---

## SDD Artifact Traceability

| Artifact | Observation ID | File Location |
|----------|---------------|---------------|
| Proposal | #183 | `proposal.md` |
| Spec | #184 | `spec.md` |
| Design | #185 | `design.md` |
| Tasks | #186 | `tasks.md` |
| Apply Progress | #188 | `apply-progress.md` |
| Verify Report | #190 | `verify-report.md` |
| Archive Report | (this) | `archive-report.md` |

---

## SDD Cycle Complete

The i18n-theme-refactor change has been fully planned, designed, implemented, verified, and archived. Ready for the next change.
