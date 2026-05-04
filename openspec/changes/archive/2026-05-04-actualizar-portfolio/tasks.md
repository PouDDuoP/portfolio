# Tasks: Actualizar Portfolio

## Phase 1: Data Layer (Foundation)

- [x] 1.1 Add Angular, Tailwind CSS, Flutter to Front-end category in `my-app/src/data/skills.json` (after HTML entry); add OpenCode to Tools category (after Docker entry)
  - Dependencies: None
  - Files: `my-app/src/data/skills.json`
  - Complexity: Low

- [x] 1.2 Add Stability project (id: stability, type: laboral, featured: true) to `my-app/src/data/projects.json` with ES/EN fields per spec
  - Dependencies: None (independent of 1.1)
  - Files: `my-app/src/data/projects.json`
  - Complexity: Low

- [x] 1.3 Add My Store project (id: my-store, type: personal, featured: true) to `my-app/src/data/projects.json` with ES/EN fields per spec
  - Dependencies: None (independent of 1.1, 1.2)
  - Files: `my-app/src/data/projects.json`
  - Complexity: Low

- [x] 1.4 Copy CV PDF from `CV/CV 2026 V1 (SP).pdf` to `my-app/public/CV-KevinAlvarado-2026.pdf`
  - Dependencies: None
  - Files: `my-app/public/CV-KevinAlvarado-2026.pdf` (new)
  - Complexity: Low

## Phase 2: Component Implementation (Core)

- [x] 2.1 Add email copy button to `my-app/src/components/sections/Contact.jsx` with Clipboard API + `execCommand` fallback, 2s "Copiado!/Copied!" feedback
  - Dependencies: None
  - Files: `my-app/src/components/sections/Contact.jsx`
  - Complexity: Medium

- [x] 2.2 Add CV download button to `my-app/src/components/sections/Hero.jsx` (variant="secondary") linking to `/CV-KevinAlvarado-2026.pdf`
  - Dependencies: 1.4 → (CV file must exist for download to work)
  - Files: `my-app/src/components/sections/Hero.jsx`
  - Complexity: Low

## Phase 3: Translation Integration

- [x] 3.1 Ensure all new content has ES/EN versions: projects have `_en` fields, UI buttons use `lang` ternary per existing patterns
  - Dependencies: 1.1, 1.2, 1.3, 2.1, 2.2 → (all content must exist first)
  - Files: All modified files above
  - Complexity: Low

## Phase 4: Testing & Verification

- [ ] 4.1 Test email copy: click button, verify clipboard contains email, "Copiado!/Copied!" shows for 2 seconds
  - Dependencies: 2.1 →
  - Files: `my-app/src/components/sections/Contact.jsx`
  - Complexity: Low

- [ ] 4.2 Test CV download: click button, verify PDF downloads to device (not opened in browser)
  - Dependencies: 2.2 →
  - Files: `my-app/src/components/sections/Hero.jsx`, `my-app/public/CV-KevinAlvarado-2026.pdf`
  - Complexity: Low

- [ ] 4.3 Verify new projects (Stability, My Store) appear in portfolio grid with correct ES/EN text
  - Dependencies: 1.2, 1.3 →
  - Files: `my-app/src/data/projects.json`
  - Complexity: Low

- [ ] 4.4 Verify new skills (Angular, Tailwind CSS, Flutter, OpenCode) appear in skills section with correct years/type
  - Dependencies: 1.1 →
  - Files: `my-app/src/data/skills.json`
  - Complexity: Low

- [ ] 4.5 Verify all translations: toggle language, confirm new content switches between ES/EN correctly
  - Dependencies: 3.1 →
  - Files: All modified files above
  - Complexity: Low

- [ ] 1.2 Add Stability project (id: stability, type: laboral, featured: true) to `my-app/src/data/projects.json` with ES/EN fields per spec
  - Dependencies: None (independent of 1.1)
  - Files: `my-app/src/data/projects.json`
  - Complexity: Low

- [ ] 1.3 Add My Store project (id: my-store, type: personal, featured: true) to `my-app/src/data/projects.json` with ES/EN fields per spec
  - Dependencies: None (independent of 1.1, 1.2)
  - Files: `my-app/src/data/projects.json`
  - Complexity: Low

- [ ] 1.4 Copy CV PDF from `CV/CV 2026 V1 (SP).pdf` to `my-app/public/CV-KevinAlvarado-2026.pdf`
  - Dependencies: None
  - Files: `my-app/public/CV-KevinAlvarado-2026.pdf` (new)
  - Complexity: Low

## Phase 2: Component Implementation (Core)

- [ ] 2.1 Add email copy button to `my-app/src/components/sections/Contact.jsx` with Clipboard API + `execCommand` fallback, 2s "Copiado!/Copied!" feedback
  - Dependencies: None
  - Files: `my-app/src/components/sections/Contact.jsx`
  - Complexity: Medium

- [ ] 2.2 Add CV download button to `my-app/src/components/sections/Hero.jsx` (variant="secondary") linking to `/CV-KevinAlvarado-2026.pdf`
  - Dependencies: 1.4 → (CV file must exist for download to work)
  - Files: `my-app/src/components/sections/Hero.jsx`
  - Complexity: Low

## Phase 3: Translation Integration

- [ ] 3.1 Ensure all new content has ES/EN versions: projects have `_en` fields, UI buttons use `lang` ternary per existing patterns
  - Dependencies: 1.1, 1.2, 1.3, 2.1, 2.2 → (all content must exist first)
  - Files: All modified files above
  - Complexity: Low

## Phase 4: Testing & Verification

- [ ] 4.1 Test email copy: click button, verify clipboard contains email, "Copiado!/Copied!" shows for 2 seconds
  - Dependencies: 2.1 →
  - Files: `my-app/src/components/sections/Contact.jsx`
  - Complexity: Low

- [ ] 4.2 Test CV download: click button, verify PDF downloads to device (not opened in browser)
  - Dependencies: 2.2 →
  - Files: `my-app/src/components/sections/Hero.jsx`, `my-app/public/CV-KevinAlvarado-2026.pdf`
  - Complexity: Low

- [ ] 4.3 Verify new projects (Stability, My Store) appear in portfolio grid with correct ES/EN text
  - Dependencies: 1.2, 1.3 →
  - Files: `my-app/src/data/projects.json`
  - Complexity: Low

- [ ] 4.4 Verify new skills (Angular, Tailwind CSS, Flutter, OpenCode) appear in skills section with correct years/type
  - Dependencies: 1.1 →
  - Files: `my-app/src/data/skills.json`
  - Complexity: Low

- [ ] 4.5 Verify all translations: toggle language, confirm new content switches between ES/EN correctly
  - Dependencies: 3.1 →
  - Files: All modified files above
  - Complexity: Low
