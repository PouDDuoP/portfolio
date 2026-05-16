# Proposal: i18n + Theme Refactor

## Intent

Replace 80+ inline ternaries and 82 `_en` JSON fields with a centralized `translations.js` + `useT()` hook. Add persistent light/dark theme toggle. Delete dead `src/styles/`. Minor React perf optimizations.

## Scope

### In Scope
- **i18n**: `translations.js` + `useT()`, remove all ternaries + `_en` fields
- **Theme**: `[data-theme="light"]` toggle with localStorage + flash prevention script
- **Cleanup**: delete `src/styles/`, remove redundant Contact ternaries, dead image blocks
- **Perf**: `React.memo(Skills)`, `useMemo(filteredProjects)`, `vite-plugin-visualizer`

### Out of Scope
- CSS modules / component-scoped styles — keep global CSS
- Full i18n framework (i18next, react-intl) — overkill for 2 langs
- SSR/SSG — Vite SPA remains

## Capabilities

### New Capabilities
- **`i18n`**: centralized translations via `translations.js`, `useT()` hook, localStorage-persisted language
- **`theme-toggle`**: light/dark toggle with `prefers-color-scheme` default, localStorage persistence, flash prevention

### Modified Capabilities
- None — implementation-only refactor, no spec-level behavioral change

## Approach

1. **i18n**: Create `src/context/translations.js`. Rewrite `LanguageContext` → expose `useT()`. One pass per component removing ternaries. Strip `_en` from JSON.
2. **Theme**: Light mode vars → `[data-theme="light"]`. Inline `<script>` in `<head>` for flash prevention. Toggle `data-theme` on `<html>` + `meta[theme-color]`.
3. **Cleanup**: Delete `src/styles/`. Remove dead `{project.image && ...}`. Replace `transition: all` with specific props.
4. **Perf**: `React.memo(Skills)`, `useMemo(filteredProjects)`, add `vite-plugin-visualizer`.

## Affected Areas

| Area | Impact | What |
|------|--------|------|
| `my-app/src/context/*` | Modified | New translations.js + useT |
| `my-app/src/components/sections/*` | Modified | 10 files — ternaries → useT |
| `my-app/src/data/*.json` | Modified | Remove _en from 5 files |
| `my-app/src/index.css` | Modified | Light mode → `[data-theme]` |
| `my-app/src/styles/` | Removed | 3 dead files deleted |
| `index.html` | Modified | Flash script + dynamic theme-color |
| `vite.config.js` | Modified | Add visualizer plugin |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Missed ternary in refactor | Med | Manual per-component diff review |
| Theme flash on slow conn | Low | Sync inline script in `<head>` |
| `transition: all` jank | Low | Explicit property transitions |
| Bundle bloat | Low | Visualizer check; revert if needed |

## Rollback Plan

Revert per-file via `git checkout`. Theme toggle is localStorage-backed — clear key. i18n is file-by-file revertable.

## Dependencies

None. `vite-plugin-visualizer` (dev only) — no runtime deps.

## Success Criteria

- [ ] Zero inline ternaries and `_en` fields remain
- [ ] Theme persists across reloads with zero flash
- [ ] `src/styles/` deleted with no broken imports
- [ ] Skills renders identically after React.memo
- [ ] Visualizer shows no unexpected size increase
