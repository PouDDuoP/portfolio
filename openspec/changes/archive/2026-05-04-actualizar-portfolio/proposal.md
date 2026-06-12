# Proposal: Actualizar Portfolio

## Intent

Update the portfolio with new projects from PDF CV (page 3), add new skills (Angular, Tailwind CSS, Flutter, OpenCode), implement email copy button, add CV download button, and provide English translations for all new content.

## Scope

### In Scope
- Add new projects from "ColaboraciÃ³n en proyectos externos" and "Proyectos personales" sections (page 3 of CV PDF)
- Add new skills to skills.json: Angular, Tailwind CSS, Flutter (Front-end), OpenCode (Herramientas)
- Add copy-to-clipboard button for email in contact section
- Add CV download button linking to CV 2026 V1 (SP).pdf
- Add English translations for all new projects, skills, and UI elements
- Update profile.json bio to reflect new skills if needed

### Out of Scope
- Redesign of existing layout or components
- Changes to existing project data
- Adding certifications (separate concern)
- Modifying build configuration

## Capabilities

### New Capabilities
- `cv-download`: Button and functionality to download CV PDF from the portfolio
- `email-copy`: Copy-to-clipboard functionality for contact email

### Modified Capabilities
- `projects-data`: Add new external collaboration and personal projects to projects.json
- `skills-data`: Extend skills.json with new front-end tools and utilities

## Approach

1. **Projects**: Extract projects from CV PDF page 3 (ColaboraciÃ³n en proyectos externos, Proyectos personales). If extraction fails, request user to provide project details manually. Add to projects.json with bilingual titles/descriptions following existing schema.

2. **Skills**: Add to skills.json under appropriate categories:
   - Front-end: Angular (6+ meses), Tailwind CSS (6+ meses), Flutter (6+ meses)
   - Herramientas: OpenCode (2+ meses)
   Each with `type: "personal"` or `"laboral"` as appropriate.

3. **Email Copy Button**: In contact section component, add button with clipboard API:
   ```javascript
   navigator.clipboard.writeText('kevinalvarado.ag+jobs@gmail.com')
   ```
   Include visual feedback (copied state) and bilingual button text.

4. **CV Download**: Add button that triggers download of `/CV/CV 2026 V1 (SP).pdf`. Place button in appropriate UI section (header or contact). Use `<a download>` or programmatic download.

5. **Translations**: All new content gets `_en` variants following existing pattern (title_en, description_en, etc.).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `my-app/src/data/projects.json` | Modified | Add new project entries |
| `my-app/src/data/skills.json` | Modified | Add Angular, Tailwind CSS, Flutter, OpenCode |
| `my-app/src/data/profile.json` | Modified | Potentially update bio to mention new skills |
| `my-app/src/components/Contact.tsx` (or similar) | Modified | Add email copy button |
| `my-app/src/components/Header.tsx` or `Hero.tsx` | Modified | Add CV download button |
| `C:\Users\kevin\Desktop\proyects\portfolio\CV\CV 2026 V1 (SP).pdf` | Referenced | Source for download, ensure accessible in build |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| PDF project extraction incomplete (page 3 not fully captured) | High | Request user to manually provide project details; proceed with available data |
| Clipboard API not supported in older browsers | Low | Add fallback using document.execCommand('copy') for legacy support |
| CV PDF not accessible after build/deployment | Medium | Copy CV to public/ folder; verify download link works in production build |
| Translation inconsistencies | Low | Follow existing `_en` suffix pattern; review all new strings |

## Rollback Plan

1. **Data changes**: Revert projects.json and skills.json to current state (git checkout or backup restore)
2. **Component changes**: Revert Contact and Header/Hero components to remove new buttons
3. **CV file**: If copied to public/, remove the file
4. **Full rollback**: `git revert <commit-hash>` if changes were committed

## Dependencies

- CV PDF must remain accessible at `C:\Users\kevin\Desktop\proyects\portfolio\CV\CV 2026 V1 (SP).pdf` or be copied to `my-app/public/`
- Browser Clipboard API availability (modern browsers supported)

## Success Criteria

- [ ] New projects from PDF page 3 added to projects.json with English translations
- [ ] New skills (Angular, Tailwind CSS, Flutter, OpenCode) added to skills.json with English translations
- [ ] Email copy button functional with visual feedback in both languages
- [ ] CV download button triggers PDF download successfully
- [ ] All new UI elements have proper English translations
- [ ] Build completes without errors after changes
- [ ] Manual testing confirms all functionality works as expected

## Notes

**PDF Extraction Issue**: The PDF was partially read but sections "ColaboraciÃ³n en proyectos externos" and "Proyectos personales" (page 3) were not captured in the extraction. These sections must be obtained manually from the user or via alternative PDF reading method before implementing the projects task.
