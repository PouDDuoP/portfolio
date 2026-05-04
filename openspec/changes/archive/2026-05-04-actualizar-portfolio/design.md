# Design: Actualizar Portfolio

## Technical Approach

La actualización del portfolio se basa en modificar archivos de datos JSON (skills.json, projects.json, profile.json) y componentes React existentes (Contact.jsx, Hero.jsx) siguiendo los patrones establecidos del proyecto. Se utiliza el sistema de traducciones existente basado en `useLanguage()` context y campos con sufijo `_en`. Los nuevos proyectos requieren datos pendientes del usuario (PDF página 3).

## Architecture Decisions

| Decisión | Alternativa | Tradeoff | Decisión |
|----------|-------------|----------|----------|
| CV download: `<a download>` vs programático | Programático con fetch/blob | Simplicidad vs control total | **`<a download>`**: Menos código, nativo, soportado por Vite en `public/` |
| Email copy: Card click vs botón separado | Botón separado en CTA | Consistencia vs UX familiar | **Card click**: Mantiene patrón visual de `contact__card`, familiar para usuarios |
| CV button style: secondary vs outline | Nuevo variant outline | Reutilizar vs distinción visual | **Secondary**: Evita modificar Button.jsx y Button.css innecesariamente |
| Projects placement: Append al final vs insertar | Insertar después de laborales | Orden cronológico vs por tipo | **Append al final**: Sigue patrón natural del array, JSON no tiene orden estricto |

### Decision: Clipboard API con Fallback

**Choice**: Usar `navigator.clipboard.writeText()` con fallback a `document.execCommand('copy')`
**Alternatives considered**: Solo Clipboard API (rompe en Safari < 13.1, IE), solo execCommand (deprecated)
**Rationale**: Soporte amplio manteniendo compatibilidad legacy. El fallback crea textarea temporal, selecciona y ejecuta comando.

### Decision: No modificar skills.json structure

**Choice**: Mantener estructura actual sin agregar campos `_en` para nombres de skills
**Alternatives considered**: Agregar `name_en` para cada skill (como soft skills)
**Rationale**: Los nombres de tecnologías son términos técnicos universales (Angular, Flutter). La traducción de años ya está resuelta en Skills.jsx líneas 54-55.

## Data Flow

### Flujo de Copiado de Email

```
User Click → handleCopyEmail()
     ├── navigator.clipboard.writeText(profile.email)
     │         └── Success → setCopied(true) → setTimeout(reset, 2000)
     └── Catch error
               └── Fallback: createTextarea → select → execCommand('copy')
                         └── setCopied(true) → setTimeout(reset, 2000)
```

### Flujo de Descarga de CV

```
User Click → Button (href="/CV-KevinAlvarado-2026.pdf" download)
     └── Browser nativo: descarga archivo desde /public/
```

### Flujo de Datos de Skills (Existente)

```
skills.json → Skills.jsx → useState/useEffect → Renderizado
     ├── categories[] → Mapeo por categoría
     │         └── category.skills[] → Barra de progreso (widthPercent)
     └── soft[] → Tags para idiomas y habilidades blandas
```

### Flujo de Traducciones (Patrón Existente)

```
LanguageContext (lang: 'es' | 'en')
     └── Componente usa: lang === 'es' ? valor_es : valor_en
           ├── Para UI: ternarias inline
           └── Para datos JSON: campos con sufijo _en (title_en, description_en)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `my-app/src/data/skills.json` | Modify | Agregar Angular, Tailwind CSS, Flutter (Front-end), OpenCode (Tools) |
| `my-app/src/data/projects.json` | Modify | **PENDIENTE**: Agregar proyectos de PDF página 3 cuando usuario provea datos |
| `my-app/src/data/profile.json` | Modify | Actualizar bio y bio_en para mencionar nuevas skills |
| `my-app/src/components/sections/Contact.jsx` | Modify | Agregar handleCopyEmail, estado copied, card interactivo |
| `my-app/src/components/sections/Hero.jsx` | Modify | Agregar tercer botón para descarga de CV |
| `my-app/public/CV-KevinAlvarado-2026.pdf` | Create | Copiar desde `CV/CV 2026 V1 (SP).pdf` con nombre normalizado |
| `my-app/src/components/sections/Skills.jsx` | No change | Renderizado dinámico, no requiere cambios |
| `my-app/src/components/common/Button.jsx` | No change | Usar variant="secondary" para CV download |

## Interfaces / Contracts

### Estructura de Nuevos Skills (skills.json)

```json
// En categories[1] (Front-end), después de HTML:
{ "name": "Angular", "years": "6+ meses", "type": "laboral" },
{ "name": "Tailwind CSS", "years": "6+ meses", "type": "laboral" },
{ "name": "Flutter", "years": "6+ meses", "type": "laboral" }

// En categories[3] (Tools), después de Docker:
{ "name": "OpenCode", "years": "2+ meses", "type": "personal" }
```

### Estructura de Nuevos Proyectos (projects.json) - PENDIENTE DE DATOS

```json
{
  "id": "unique-id-from-pdf",
  "type": "laboral",  // o "personal"
  "title": "[Título en español del PDF]",
  "title_en": "[English title from PDF]",
  "description": "[Descripción en español]",
  "description_en": "[English description]",
  "challenge": "[Reto en español]",
  "challenge_en": "[English challenge]",
  "result": "[Resultado en español]",
  "result_en": "[English result]",
  "techStack": ["Tech1", "Tech2"],
  "image": "",
  "github": "",
  "demo": "",
  "featured": false  // o true, por definir
}
```

### Componente Contact.jsx - Nueva Interfaz

```jsx
// Nuevos imports necesarios:
import { useState } from 'react';

// Nuevo estado:
const [copied, setCopied] = useState(false);

// Nueva función:
const handleCopyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
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

### Componente Hero.jsx - Nuevo Botón

```jsx
// En hero__actions, después del botón de Contactar:
<Button 
  href="/CV-KevinAlvarado-2026.pdf" 
  download 
  variant="secondary" 
  size="large"
>
  {lang === 'es' ? 'Descargar CV' : 'Download CV'}
</Button>
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Manual UI | Email copy muestra "Copiado!" / "Copied!" por 2 seg | Click manual, verificar estado visual |
| Manual UI | CV download inicia descarga (no abre en navegador) | Click en botón, verificar descarga |
| Data | skills.json tiene nuevas entradas válidas | Revisar JSON, verificar en navegador |
| Data | projects.json (cuando se agregue) tiene estructura válida | Validar JSON, verificar campos `_en` |
| Translation | Todos los nuevos elementos UI cambian con toggle idioma | Click toggle, verificar textos |
| Responsive | Botones y cards se ven correctamente en móvil | Browser DevTools, probar viewport móvil |

## Migration / Rollout

No migration required para datos JSON (append simple). Para rollback:
1. `git checkout -- my-app/src/data/skills.json`
2. `git checkout -- my-app/src/components/sections/Contact.jsx`
3. `git checkout -- my-app/src/components/sections/Hero.jsx`
4. Eliminar `my-app/public/CV-KevinAlvarado-2026.pdf`

## Open Questions

- [ ] **CRÍTICO**: Usuario debe proveer datos de proyectos de "Colaboración en proyectos externos" y "Proyectos personales" (PDF página 3). Sin esto, no se pueden agregar proyectos.
- [ ] ¿Cuál de los nuevos proyectos debe marcarse como `"featured": true`?
- [ ] ¿Actualizar `profile.json` bio para mencionar Angular, Tailwind CSS, Flutter, OpenCode?
- [ ] ¿El botón de CV download debe usar `variant="secondary"` o prefieres `variant="outline"` (requiere modificar Button.jsx y Button.css)?
- [ ] ¿Actualizar estadística de "6 Proyectos" en Hero.jsx cuando se agreguen nuevos?

## Component Diagram (Text-Based)

```
┌─────────────────────────────────────────────────────────────┐
│                     App (Portfolio)                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐     ┌───────────┐ │
│  │ LanguageContext│      │ profile.json │     │ CV PDF    │ │
│  │ (lang state)  │      │ (email, bio) │     │ (public/) │ │
│  └───────┬──────┘      └──────┬───────┘     └─────┬─────┘ │
│          │                    │                    │       │
│  ┌───────▼──────────────────▼────────────────────▼──────┐ │
│  │              Components (React)                       │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │ │
│  │  │ Hero.jsx │  │Contact.jsx│  │ Skills.jsx       │  │ │
│  │  │          │  │           │  │                  │  │ │
│  │  │ - CV btn │  │ - Email   │  │ - skills.json    │  │ │
│  │  │ (download)│  │   copy   │  │ - categoryTransl.│ │ │
│  │  │          │  │   (new)   │  │ - getWidthPct   │  │ │
│  │  └──────────┘  └─────┬─────┘  └──────────────────┘  │ │
│  │                      │                                │ │
│  │           ┌──────────▼──────────┐                     │ │
│  │           │ Button.jsx          │                     │ │
│  │           │ (variant, size,    │                     │ │
│  │           │  href, onClick)     │                     │ │
│  │           └─────────────────────┘                     │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Data Layer (JSON)                                       │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │ │
│  │  │ skills.json  │  │projects.json │  │ profile.json │  │ │
│  │  │ (MODIFY)     │  │ (MODIFY*)    │  │ (MODIFY)     │  │ │
│  │  │ +3 Front-end │  │ (*PENDING    │  │ +bio update? │  │ │
│  │  │ +1 Tools     │  │  user data)  │  │              │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```
