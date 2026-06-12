# Spec: actualizar-portfolio

## 1. Requirements

### 1.1 New Projects

Two new projects extracted from page 3 of `CV/CV 2026 V1 (SP).pdf`:

#### Project 1: Stability (ColaboraciÃ³n en proyectos externos)

- **id**: "stability"
- **type**: "laboral"
- **title**: "Stability - Front-end Development"
- **title_en**: "Stability - Front-end Development"
- **description**: "Front-end de Stability (Flutter, Dart, BLoC, GetIt, Dio, Shared Preferences, Table Calendar, Image Picker, Flutter SVG, Pin Code Fields, Intl, Animations)"
- **description_en**: "Stability Front-end (Flutter, Dart, BLoC, GetIt, Dio, Shared Preferences, Table Calendar, Image Picker, Flutter SVG, Pin Code Fields, Intl, Animations)"
- **challenge**: "Aplicar Clean Architecture con BLoC para escalabilidad y mantenibilidad en Flutter"
- **challenge_en**: "Apply Clean Architecture with BLoC for scalability and maintainability in Flutter"
- **result**: "Sistema completo de gestiÃ³n de clases con autenticaciÃ³n, reservas, perfiles y localizaciÃ³n en espaÃ±ol"
- **result_en**: "Complete class management system with authentication, reservations, profiles, and Spanish localization"
- **techStack**: ["Flutter", "Dart", "BLoC", "GetIt", "Dio", "Shared Preferences", "Table Calendar", "Image Picker", "Flutter SVG", "Pin Code Fields", "Intl", "Animations"]
- **featured**: true

#### Project 2: My Store (Proyectos personales)

- **id**: "my-store"
- **type**: "personal"
- **title**: "Desarrollo de My Store"
- **title_en**: "My Store Development"
- **description**: "AplicaciÃ³n Full-stack con back-end en Node.js/Express/PostgreSQL y front-end en Angular/Tailwind CSS. Incluye API REST documentada, autenticaciÃ³n JWT, carrito de compras y panel de administraciÃ³n."
- **description_en**: "Full-stack application with Node.js/Express/PostgreSQL back-end and Angular/Tailwind CSS front-end. Includes documented REST API, JWT authentication, shopping cart, and admin panel."
- **challenge**: "Desarrollar una aplicaciÃ³n completa con arquitectura por capas y dominios, aplicando metodologÃ­a SDD y persistencia con Engram"
- **challenge_en**: "Develop a complete application with layered and domain architecture, applying SDD methodology and Engram persistence"
- **result**: "API REST completa con documentaciÃ³n Swagger, SPA con i18n, pruebas unitarias con Jest, y despliegue con Docker"
- **result_en**: "Complete REST API with Swagger documentation, SPA with i18n, unit tests with Jest, and Docker deployment"
- **techStack**: ["Node.js", "Express.js", "JWT", "Passport", "Bcrypt", "Joi", "Swagger", "Sequelize ORM", "PostgreSQL", "Docker Compose", "Nodemailer", "Jest", "Angular", "TypeScript", "Tailwind CSS", "RxJS", "Signals", "SSR", "i18n"]
- **featured**: true

**Expected structure** (follow existing pattern in `my-app/src/data/projects.json`):
```json
{
  "id": "unique-id",
  "type": "laboral" | "personal",
  "title": "Spanish title",
  "title_en": "English title",
  "description": "Spanish description",
  "description_en": "English description",
  "challenge": "Spanish challenge",
  "challenge_en": "English challenge",
  "result": "Spanish result",
  "result_en": "English result",
  "techStack": ["Tech1", "Tech2"],
  "image": "",
  "github": "",
  "demo": "",
  "featured": false
}
```

### 1.2 New Skills

Add the following entries to `my-app/src/data/skills.json`:

**Front-end category** (add after existing "CSS" entry):
| name | years | type |
|------|-------|------|
| Angular | 6+ meses | laboral |
| Tailwind CSS | 6+ meses | laboral |
| Flutter | 6+ meses | laboral |

**Tools category** (add after existing "Docker" entry):
| name | years | type |
|------|-------|------|
| OpenCode | 2+ meses | personal |

**Note**: The `skills.json` does NOT use `_en` suffix for skill names currently (unlike soft skills). Skill names are language-agnostic (technical terms). Only the `years` field needs translation handled in the component (already done via string replacement in `Skills.jsx` line 54-55).

### 1.3 Email Copy Button

**Location**: Contact section (`my-app/src/components/sections/Contact.jsx`)

**Functionality**:
- Add a button next to or replacing the email `mailto:` link (or as an additional action)
- On click: copy `kevinalvarado.ag+jobs@gmail.com` to clipboard using `navigator.clipboard.writeText()`
- Clipboard API fallback: Use `document.execCommand('copy')` for older browsers
- Visual feedback: Button text changes to "Â¡Copiado!" / "Copied!" for 2 seconds after successful copy
- Bilingual: Button shows "Copiar Email" / "Copy Email" initially, then "Â¡Copiado!" / "Copied!" on success

**Implementation approach**:
1. Add state: `const [copied, setCopied] = useState(false);`
2. Handler function:
```javascript
const handleCopyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = profile.email;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
};
```

### 1.4 CV Download Button

**File source**: `CV/CV 2026 V1 (SP).pdf`
**Target location**: `my-app/public/CV-KevinAlvarado-2026.pdf` (normalized filename for web)

**Button placement decision**: **Hero section** (`my-app/src/components/sections/Hero.jsx`)

**Reasoning**:
- Hero is the first visible section â€” high-impact moment for recruiters
- The Hero already has two CTAs ("Ver proyectos", "Contactar") â€” adding "Descargar CV" creates a natural trio
- Header could become cluttered with another button alongside language toggle and mobile menu
- Contact section is too far down the page (users may not scroll that far)

**Implementation**:
1. Copy PDF to `my-app/public/CV-KevinAlvarado-2026.pdf`
2. Add a third button in `hero__actions` div:
```jsx
<Button href="/CV-KevinAlvarado-2026.pdf" download variant="outline" size="large">
  {lang === 'es' ? 'Descargar CV' : 'Download CV'}
</Button>
```
3. May need a new `outline` variant in Button component, or use `variant="secondary"` with custom styling

**Button variant**: Use `variant="secondary"` or add new `variant="outline"` to maintain visual hierarchy (primary = main CTA, secondary = CV download, outline/text = less important).

### 1.5 Translations

All NEW content must follow existing bilingual pattern:

| Content Type | Pattern | Example |
|-------------|---------|---------|
| Project fields | `field_en` suffix | `title_en`, `description_en` |
| Skill years | Component handles translation | `6+ meses` â†’ `6+ months` (already in Skills.jsx) |
| UI buttons | Ternary with `lang` | `lang === 'es' ? 'Descargar CV' : 'Download CV'` |
| Section titles | Ternary with `lang` | Already used throughout components |

**No changes needed to skills.json structure** â€” skill names are technical terms that don't need translation.

---

## 2. Scenarios

### Scenario 1: User copies email to clipboard
**Given** the user is viewing the Contact section  
**When** the user clicks the "Copiar Email" / "Copy Email" button  
**Then** the email `kevinalvarado.ag+jobs@gmail.com` is copied to clipboard  
**And** the button text changes to "Â¡Copiado!" / "Copied!" for 2 seconds  
**And** after 2 seconds, the button returns to its original text

### Scenario 2: User downloads CV
**Given** the user is viewing the Hero section  
**When** the user clicks "Descargar CV" / "Download CV"  
**Then** the file `CV-KevinAlvarado-2026.pdf` is downloaded to the user's device  
**And** the download attribute triggers a direct file download (not opening in browser)

### Scenario 3: User views projects in Spanish
**Given** the user is viewing the Projects section with language set to Spanish  
**When** the page loads  
**Then** all project titles, descriptions, challenges, and results are shown in Spanish  
**And** new projects (Stability and My Store) are included in the grid

### Scenario 4: User views projects in English
**Given** the user is viewing the Projects section with language set to English  
**When** the page loads  
**Then** all project titles, descriptions, challenges, and results are shown in English  
**And** new projects (Stability and My Store) are included in the grid with English translations

### Scenario 5: User views skills with new entries
**Given** the user is viewing the Skills section  
**When** the page loads  
**Then** Angular, Tailwind CSS, and Flutter appear under "Front-end" / "Front-end"  
**And** OpenCode appears under "Herramientas" / "Tools"  
**And** each new skill shows the correct years experience and type badge

### Scenario 6: Clipboard API not available (legacy browser)
**Given** the user is on an older browser without Clipboard API support  
**When** the user clicks the email copy button  
**Then** the fallback `document.execCommand('copy')` method is used  
**And** the email is still successfully copied to clipboard

---

## 3. Data Structure Changes

### 3.1 `my-app/src/data/projects.json`

**Current structure** (6 projects):
```json
[
  { "id": "qualitas-assitance", "type": "laboral", ... },
  { "id": "globalmate", "type": "laboral", ... },
  { "id": "mankind", "type": "laboral", ... },
  { "id": "inventario", "type": "personal", ... },
  { "id": "buzon", "type": "personal", ... },
  { "id": "control-incidencias", "type": "personal", ... }
]
```

**After change**: Append new projects from PDF page 3 to the array.

**NEW PROJECTS (DATA EXTRACTED)**:
```json
[
  // ... existing 6 projects ...,
  
  {
    "id": "stability",
    "type": "laboral",
    "title": "Stability - Front-end Development",
    "title_en": "Stability - Front-end Development",
    "description": "Front-end de Stability (Flutter, Dart, BLoC, GetIt, Dio, Shared Preferences, Table Calendar, Image Picker, Flutter SVG, Pin Code Fields, Intl, Animations)",
    "description_en": "Stability Front-end (Flutter, Dart, BLoC, GetIt, Dio, Shared Preferences, Table Calendar, Image Picker, Flutter SVG, Pin Code Fields, Intl, Animations)",
    "challenge": "Aplicar Clean Architecture con BLoC para escalabilidad y mantenibilidad en Flutter",
    "challenge_en": "Apply Clean Architecture with BLoC for scalability and maintainability in Flutter",
    "result": "Sistema completo de gestiÃ³n de clases con autenticaciÃ³n, reservas, perfiles y localizaciÃ³n en espaÃ±ol",
    "result_en": "Complete class management system with authentication, reservations, profiles, and Spanish localization",
    "techStack": ["Flutter", "Dart", "BLoC", "GetIt", "Dio", "Shared Preferences", "Table Calendar", "Image Picker", "Flutter SVG", "Pin Code Fields", "Intl", "Animations"],
    "image": "",
    "github": "",
    "demo": "",
    "featured": true
  },
  {
    "id": "my-store",
    "type": "personal",
    "title": "Desarrollo de My Store",
    "title_en": "My Store Development",
    "description": "AplicaciÃ³n Full-stack con back-end en Node.js/Express/PostgreSQL y front-end en Angular/Tailwind CSS. Incluye API REST documentada, autenticaciÃ³n JWT, carrito de compras y panel de administraciÃ³n.",
    "description_en": "Full-stack application with Node.js/Express/PostgreSQL back-end and Angular/Tailwind CSS front-end. Includes documented REST API, JWT authentication, shopping cart, and admin panel.",
    "challenge": "Desarrollar una aplicaciÃ³n completa con arquitectura por capas y dominios, aplicando metodologÃ­a SDD y persistencia con Engram",
    "challenge_en": "Develop a complete application with layered and domain architecture, applying SDD methodology and Engram persistence",
    "result": "API REST completa con documentaciÃ³n Swagger, SPA con i18n, pruebas unitarias con Jest, y despliegue con Docker",
    "result_en": "Complete REST API with Swagger documentation, SPA with i18n, unit tests with Jest, and Docker deployment",
    "techStack": ["Node.js", "Express.js", "JWT", "Passport", "Bcrypt", "Joi", "Swagger", "Sequelize ORM", "PostgreSQL", "Docker Compose", "Nodemailer", "Jest", "Angular", "TypeScript", "Tailwind CSS", "RxJS", "Signals", "SSR", "i18n"],
    "image": "",
    "github": "",
    "demo": "",
    "featured": true
  }
]
```

### 3.2 `my-app/src/data/skills.json`

**Current Front-end skills** (5 items):
```json
{ "name": "JavaScript", "years": "5+ aÃ±os", "type": "laboral" },
{ "name": "jQuery", "years": "5+ aÃ±os", "type": "laboral" },
{ "name": "Bootstrap", "years": "5+ aÃ±os", "type": "laboral" },
{ "name": "CSS", "years": "5+ aÃ±os", "type": "laboral" },
{ "name": "HTML", "years": "5+ aÃ±os", "type": "laboral" }
```

**After change** (8 items â€” add 3 new):
```json
{ "name": "JavaScript", "years": "5+ aÃ±os", "type": "laboral" },
{ "name": "jQuery", "years": "5+ aÃ±os", "type": "laboral" },
{ "name": "Bootstrap", "years": "5+ aÃ±os", "type": "laboral" },
{ "name": "CSS", "years": "5+ aÃ±os", "type": "laboral" },
{ "name": "HTML", "years": "5+ aÃ±os", "type": "laboral" },
{ "name": "Angular", "years": "6+ meses", "type": "laboral" },
{ "name": "Tailwind CSS", "years": "6+ meses", "type": "laboral" },
{ "name": "Flutter", "years": "6+ meses", "type": "laboral" }
```

**Current Tools skills** (4 items):
```json
{ "name": "Git", "years": "3+ aÃ±os", "type": "laboral" },
{ "name": "SourceTree", "years": "2+ aÃ±os", "type": "laboral" },
{ "name": "Jira", "years": "2+ aÃ±os", "type": "laboral" },
{ "name": "Docker", "years": "6+ meses", "type": "laboral" }
```

**After change** (5 items â€” add 1 new):
```json
{ "name": "Git", "years": "3+ aÃ±os", "type": "laboral" },
{ "name": "SourceTree", "years": "2+ aÃ±os", "type": "laboral" },
{ "name": "Jira", "years": "2+ aÃ±os", "type": "laboral" },
{ "name": "Docker", "years": "6+ meses", "type": "laboral" },
{ "name": "OpenCode", "years": "2+ meses", "type": "personal" }
```

### 3.3 CV File

**Action**: Copy `CV/CV 2026 V1 (SP).pdf` â†’ `my-app/public/CV-KevinAlvarado-2026.pdf`

**Reason**: Files in `public/` are served at the root of the site by Vite/React build process. Using a normalized filename avoids URL encoding issues with spaces and parentheses.

---

## 4. Component Changes

### 4.1 `my-app/src/components/sections/Contact.jsx`

**Changes**:
1. Add `useState` import and `copied` state
2. Add `handleCopyEmail` function with Clipboard API + fallback
3. Add copy button in the `contact__cards` section (alongside email, GitHub, LinkedIn cards)
4. Show visual feedback when copied

**Modified section** (add after email card, around line 48):
```jsx
{/* Email copy button card */}
<div className="contact__card" onClick={handleCopyEmail} role="button" tabIndex={0} 
     onKeyDown={(e) => e.key === 'Enter' && handleCopyEmail()}>
  <div className="contact__card-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {copied 
        ? <path d="M20 6L9 17l-5-5"/>
        : <path d="M16 1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7z"/>
      }
    </svg>
  </div>
  <div className="contact__card-content">
    <span className="contact__card-label">
      {lang === 'es' ? 'Email' : 'Email'}
    </span>
    <span className="contact__card-value">
      {copied 
        ? (lang === 'es' ? 'Â¡Copiado!' : 'Copied!') 
        : (lang === 'es' ? 'Copiar al portapapeles' : 'Copy to clipboard')}
    </span>
  </div>
</div>
```

### 4.2 `my-app/src/components/sections/Hero.jsx`

**Changes**:
1. Add a third button in `hero__actions` div for CV download
2. Use `Button` component with `download` prop or `href` with `download` attribute

**Modified section** (after line 61):
```jsx
<div className="hero__actions">
  <Button href="#projects" variant="primary" size="large">
    {lang === 'es' ? 'Ver proyectos' : 'View projects'}
  </Button>
  <Button href="#contact" variant="secondary" size="large">
    {lang === 'es' ? 'Contactar' : 'Contact'}
  </Button>
  <Button href="/CV-KevinAlvarado-2026.pdf" download variant="outline" size="large">
    {lang === 'es' ? 'Descargar CV' : 'Download CV'}
  </Button>
</div>
```

**Note**: May need to add `variant="outline"` support in `Button.jsx` if not already present.

### 4.3 `my-app/src/components/common/Button.jsx`

**Potential change**: Add `outline` variant if needed for CV download button.

**Current variants**: `primary`, `secondary` (from `btn--primary`, `btn--secondary` CSS classes)

**If adding outline variant**:
```jsx
// No changes needed if using variant="secondary" for CV button
// OR add outline support:
const classNames = `btn btn--${variant} btn--${size} ${className}`.trim();
// CSS: .btn--outline { background: transparent; border: 2px solid var(--primary); color: var(--primary); }
```

**Decision**: Use `variant="secondary"` for CV download to avoid adding new CSS, unless user prefers a different visual style.

### 4.4 `my-app/src/components/sections/Skills.jsx`

**No changes needed** â€” the component dynamically renders all skills from the JSON data. Adding entries to `skills.json` will automatically display them.

The `getWidthPercent` function (line 8) already handles `'6+ meses'` â†’ returns 10% width, which is correct for the new skills.

The `categoryTranslations` object (line 16-23) already has entries for 'Front-end' and 'Tools' (mapped to 'Herramientas' in Spanish), so no changes needed.

---

## 5. Asset Changes

| Asset | Action | Source | Destination |
|-------|--------|--------|-------------|
| CV PDF | Copy | `CV/CV 2026 V1 (SP).pdf` | `my-app/public/CV-KevinAlvarado-2026.pdf` |

**Note**: The original PDF filename has spaces and parentheses which can cause issues in URLs. The normalized name `CV-KevinAlvarado-2026.pdf` is web-safe.

---

## 6. Summary of Changes

| File | Change Type | Description |
|------|-------------|-------------|
| `my-app/src/data/projects.json` | Modified | Add Stability (laboral) and My Store (personal) projects from PDF page 3 |
| `my-app/src/data/skills.json` | Modified | Add Angular, Tailwind CSS, Flutter (Front-end), OpenCode (Tools) |
| `my-app/src/components/sections/Contact.jsx` | Modified | Add email copy button with clipboard API + fallback |
| `my-app/src/components/sections/Hero.jsx` | Modified | Add CV download button |
| `my-app/public/CV-KevinAlvarado-2026.pdf` | New file | CV PDF copied from source location |
| `my-app/src/components/common/Button.jsx` | Potentially modified | Add outline variant if needed for CV button |

---

## 7. Open Questions

1. **CV Button Style**: Should the CV download button use `variant="secondary"` (existing) or should we add a new `variant="outline"` for visual distinction?

2. **Project Featured Status**: Both new projects (Stability and My Store) have been marked as `"featured": true` based on their significance. Confirm if this is correct.
