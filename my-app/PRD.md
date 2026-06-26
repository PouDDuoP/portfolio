# Portfolio Personal - Product Requirements Document (PRD)

## 1. Resumen Ejecutivo

**Nombre del Producto:** Portfolio Personal (Frontend)

**Tipo de Producto:** Sitio web estático - Single Page Application (SPA)

**Descripción Breve:**
Sitio web personal estático que presenta la información profesional, proyectos, habilidades y experiencia de un desarrollador. Funciona como carta de presentación digital y escaparate profesional, sin necesidad de backend.

**Problema que Resuelve:**
La necesidad de tener una presencia profesional en línea que muestre el trabajo, habilidades y trayectoria de un desarrollador de manera accesible, atractiva y profesional para potenciales empleadores o clientes.

**Público Objetivo:**
- Reclutadores y Manager de RRHH de empresas de tecnología
- CTOs y líderes técnicos buscando talento
- Clientes potenciales que buscan servicios de desarrollo
- Otros desarrolladores y profesionales del sector

---

## 2. Objetivos del Producto

### Objetivos Principales (MOPS)

| Objetivo | Métrica de Éxito | Prioridad |
|---------|------------------|-----------|
| Presentar información profesional de manera clara | El usuario encuentra la información en < 3 clics | Alta |
| Mostrar proyectos realizados con evidencia visual | Galerías de proyectos accesibles con screenshots/code | Alta |
| Demostrar habilidades técnicas y blandas | Sección de skills con indicadores visuales | Alta |
| Facilitar contacto profesional | Botones de contacto visibles sin fricción | Alta |
| Posicionar en buscadores (SEO) | Indexación correcta en Google, Bing | Media |

### Objetivos Secundarios

- Demostrar capacidades de diseño y frontend
- Crear una identidad profesional memorable
- Facilitar networking profesional
- Servir como documento de referencia personal

---

## 3. Alcance del Proyecto

### In-Scope (Included)

| Módulo | Descripción |
|--------|-------------|
| **Hero Section** | Presentación personal con nombre, título profesional y tagline |
| **About** | Biografía profesional, historia, valores |
| **Skills** | Habilidades técnicas y blandas con niveles |
| **Proyectos** | Portafolio de proyectos con screenshots, DESC, tech stack |
| **Experiencia** | Historial laboral/freelance con fechas y logros |
| **Educación** | Formación académica y certificaciones |
| **Contacto** | Formas de contacto (email, redes sociales, LinkedIn) |
| **Footer** | Enlaces legales, redes sociales, copyright |

### Out-of-Scope (Excluded)

| Módulo | Razón de Exclusión |
|--------|-------------------|
| **Backend/API** | Portfolio estático, no requiere servidor dinámico |
| **Base de datos** | Contenido hardcoded o JSON estático |
| **Autenticación** | No requiere usuarios ni login |
| **CMS** | Contenido se edita directamente en código |
| **Blog/Dynamic Content** | No hay publicaciones dinámicas |
| **Dashboard Admin** | No hay panel de administración |
| **Formulario de contacto con DB** | Solo mailto o enlaces externos |

### Nice-to-have (Futuro)

- Modo oscuro/claro con toggle
- Animaciones suaves (framer-motion o CSS)
- Multilenguaje (i18n)
- Modo impresión optimizado

---

## 4. Requisitos Funcionales

### 4.1 Navegación

| ID | Requisito | Criterio de Aceptación |
|---|----------|----------------------|
| RF-01 | Navegación fija (sticky header) | El menú permanece visible al hacer scroll |
| RF-02 | Navegación suave (smooth scroll) | Desplazamiento animado entre secciones |
| RF-03 | Navegación responsiva | Menú hamburguesa en móvil (< 768px) |
| RF-04 | Links funcionales | Todos los enlaces navegan a la sección correcta |

### 4.2 Hero Section

| ID | Requisito | Criterio de Aceptación |
|---|----------|----------------------|
| RF-05 | Nombre y título profesional | Texto visible y legible en todos los dispositivos |
| RF-06 | Foto de perfil | Imagen optimizada para web |
| RF-07 | Tagline personal | Frase descriptiva de valor único |
| RF-08 | CTA (Call to Action) | Botón para ir a proyectos o contacto |

### 4.3 Sección About

| ID | Requisito | Criterio de Aceptación |
|---|----------|----------------------|
| RF-09 | Biografía | Texto de 150-300 palabras |
| RF-10 | Foto profesional | Imagen de calidad correcta |
| RF-11 | Valores/misión | Declaración de valores profesionales |

### 4.4 Skills

| ID | Requisito | Criterio de Aceptación |
|---|----------|----------------------|
| RF-12 | Categorización | Skills agrupados por categoría (Frontend, Backend, Tools, Soft Skills) |
| RF-13 | Indicadores visuales | Barras, badges o niveles para representar nivel |
| RF-14 | Tech stack principal | Lista de tecnologías principales |

### 4.5 Proyectos

| ID | Requisito | Criterio de Aceptación |
|---|----------|----------------------|
| RF-15 | Grid de proyectos | Malla visual de tarjetas de proyectos |
| RF-16 | Información por proyecto | Título, descripción, tech stack, enlaces |
| RF-17 | Imágenes/screenshots | Capturas visuales de cada proyecto |
| RF-18 | Enlaces externos | Links a GitHub, Demo, caso de estudio |
| RF-19 | Modal o expandable | Ver detalles sin salir de la página |

### 4.6 Experiencia

| ID | Requisito | Criterio de Aceptación |
|---|----------|----------------------|
| RF-20 | Chronological timeline | Línea de tiempo cronológica |
| RF-21 | Info por posición | Empresa, rol, fechas, logros destacados |
| RF-22 | Enlace a empresa (opcional) | Link al sitio de la empresa |

### 4.7 Educación

| ID | Requisito | Criterio de Aceptación |
|---|----------|----------------------|
| RF-23 | Lista de certificaciones | Cursos, certificaciones obtenidas |
| RF-24 | Fechas relevantes | Fecha de obtención/caducidad |

### 4.8 Contacto

| ID | Requisito | Criterio de Aceptación |
|---|----------|----------------------|
| RF-25 | Email clickeable | mailto: con dirección prellenada |
| RF-26 | Redes sociales | GitHub, LinkedIn, Twitter/X, Bluesky |
| RF-27 | QR Code (opcional) | Código QR con vCard o email |
| RF-28 | Ubicación (opcional) | Ciudad/país sin datos precisos por privacidad |

---

## 5. Requisitos No Funcionales

### 5.1 Rendimiento

| ID | Requisito | Meta |
|---|----------|------|
| RNF-01 | First Contentful Paint (FCP) | < 1.5s |
| RNF-02 | Largest Contentful Paint (LCP) | < 2.5s |
| RNF-03 | Time to Interactive (TTI) | < 3.5s |
| RNF-04 | Cumulative Layout Shift (CLS) | < 0.1 |
| RNF-05 | Tamaño total (sin comprimir) | < 500KB (JS + CSS + Imágenes) |
| RNF-06 | Imágenes optimizadas | WebP con fallback, lazy loading |

### 5.2 Accesibilidad (WCAG 2.2 AA)

| ID | Requisito | Criterio |
|---|----------|----------|
| RNF-07 | Contraste | Ratio mínimo 4.5:1 para texto |
| RNF-08 | Navegación por teclado | Todos los elementos accesibles con Tab |
| RNF-09 | Screen readers | Etiquetas ARIA correctas |
| RNF-10 | Focus visible | Indicador de focus claro |
| RNF-11 | Alt text | Textos alternativos en todas las imágenes |
| RNF-12 | Motion reduced | Respetar prefers-reduced-motion |

### 5.3 Compatibilidad

| ID | Requisito | Browsers/Versiones |
|---|----------|-------------------|
| RNF-13 | Navegadores modernos | Chrome (last 2), Firefox (last 2), Safari (last 2), Edge (last 2) |
| RNF-14 | Dispositivos | Desktop, Tablet (≥ 768px), Mobile (≥ 320px) |

### 5.4 SEO

| ID | Requisito | Implementación |
|---|----------|---------------|
| RNF-15 | Meta tags | Title, description, Open Graph, Twitter Cards |
| RNF-16 | Semantic HTML | Header, main, section, article, footer |
| RNF-17 | Sitemap | sitemap.xml generado |
| RNF-18 | Robots.txt | Allow correct |
| RNF-19 | Structured data | Schema.org Person o ProfilePage |
| RNF-20 | URLs amigables | Estáticas, sin hashes (#) |

### 5.5 Seguridad

| ID | Requisito | Implementación |
|---|----------|---------------|
| RNF-21 | HTTPS | enforced por hosting (Vercel/Netlify/GitHub Pages) |
| RNF-22 | CSP | Headers de Content Security Policy |
| RNF-23 | No info sensible | Sin datos personales sensibles expuestos |

### 5.6 Mantenibilidad

| ID | Requisito | Criterio |
|---|----------|----------|
| RNF-24 | Código estructurado | Componentes separados por función |
| RNF-25 | Documentación | Guía de contribuciones y estructura |
| RNF-26 | Versionado | Conventional Commits |

---

## 6. Arquitectura y Tech Stack

### 6.1 Stack Propuesto

| Capa | Tecnología | Versión Recomendada |
|-----|------------|-------------------|
| **Framework** | React | 19.x |
| **Build Tool** | Vite | 8.x |
| **Lenguaje** | JavaScript (o TypeScript) | ES6+ |
| **Styling** | CSS Modules / CSS Vanilla | - |
| **Routing** | React Router DOM (SPA) | 7.x |
| **Icons** | Lucide React | Latest |
| **Animations** | Framer Motion (opcional) | Latest |
| **SEO** | React Helmet Async | Latest |

### 6.2 Estructura de Proyecto Propuesta

```
my-app/
├── public/
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── projects/
│   │   │   ├── project-1.png
│   │   │   └── project-2.png
│   │   └── favicon.svg
│   ├── icons.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Section.jsx
│   │   │   └── Card.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   └── sections/
│   │       ├── Hero.jsx
│   │       ├── About.jsx
│   │       ├── Skills.jsx
│   │       ├── Projects.jsx
│   │       ├── Experience.jsx
│   │       ├── Education.jsx
│   │       └── Contact.jsx
│   ├── data/
│   │   ├── profile.json
│   │   ├── projects.json
│   │   ├── experience.json
│   │   ├── education.json
│   │   └── skills.json
│   ├── hooks/
│   │   └── useScrollToSection.js
│   ├── styles/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   └── global.css
│   ├── utils/
│   │   └── seo.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

### 6.3 Contenido Estático (JSON Data)

Todo el contenido se gestionará desde archivos JSON estáticos para facilitar edición sin modificar componentes:

- `profile.json`: Nombre, tagline, email, redes sociales
- `projects.json`: Array de proyectos
- `experience.json`: Historial laboral
- `education.json`: Formación académica
- `skills.json`: Habilidades por categoría

---

## 7. Diseño UX/UI Guidelines

### 7.1 Principios de Diseño

1. **Minimalista**: Espacios en blanco, jerarquía visual clara
2. **Profesional pero memorable**: Evitar clones genéricos de AI
3. **Accesible**: WCAG 2.2 AA como mínimo
4. **Responsivo-first**: Mobile first approach
5. **Performance**: Carga rápida ante diseño complejo

### 7.2 Paleta de Colores

| Propósito | Color | Hex |
|----------|-------|-----|
| Primary | [A definir] | #XXXXXX |
| Secondary | [A definir] | #XXXXXX |
| Accent | [A definir] | #XXXXXX |
| Background | [A definir] | #XXXXXX |
| Text Primary | [A definir] | #XXXXXX |
| Text Secondary | [A definir] | #XXXXXX |
| Error | [A definir] | #XXXXXX |

*(Los colores se definirán en fase de diseño)*

### 7.3 Tipografía

| Uso | Familia | Tamaño |
|----|---------|-------|
| Headings | [A definir] | H1: 48px, H2: 36px, H3: 28px |
| Body | [A definir] | 16px |
| Caption | [A definir] | 14px |

### 7.4 Componentes UI

- **Buttons**: Primary, Secondary, Ghost variants
- **Cards**: Project cards con hover states
- **Tags**: Tech stack badges
- **Timeline**: Experiencia vertical
- **Modal**: Detalles de proyecto

### 7.5 Breakpoints

| Breakpoint | Ancho | Layout |
|----------|------|--------|
| Mobile | < 768px | Single column |
| Tablet | 768px - 1024px | 2 columnas |
| Desktop | > 1024px | Grid completo |

---

## 8. Contenido Requerido

### 8.1 Datos Personales (Reemplazables)

| Campo | Ejemplo | Obligatorio |
|-------|--------|-------------|
| Nombre completo | Kevin | ✅ |
| Título profesional | Frontend Developer | ✅ |
| Tagline | "Building digital experiences" | ✅ |
| Email | kevin@ejemplo.com | ✅ |
| Ubicación | Ciudad, País | ✅ |
| Foto de perfil | imagen JPG/WebP | ✅ |
| GitHub | @usuario | ✅ |
| LinkedIn | /in/usuario | ✅ |
| Twitter/X | @usuario | Opcional |
| Bluesky | @usuario.bsky.social | Opcional |

### 8.2 Proyectos (Mínimo 3)

| Campo | Descripción |
|------|-----------|
| Título | Nombre del proyecto |
| Descripción | 1-2 oraciones |
| Tech Stack | Array de tecnologías |
| Desafío | Problema que resuelve |
| Resultado | Impacto/medición |
| screenshots | Imágenes del proyecto |
| Enlace demo | URL (si aplica) |
| Enlace repo | URL de GitHub |

### 8.3 Experiencia (Mínimo 2)

| Campo | Descripción |
|------|-----------|
| Empresa | Nombre de la empresa |
| Rol | Puesto ocupado |
| Fecha inicio | MM/AAAA |
| Fecha fin | MM/AAAA o "Actual" |
| Logros | 2-3 bullet points |

---

## 9. Plan de Implementación

### 9.1 Fases

| Fase | Entregable | Estimación |
|------|------------|-------------|
| 1. Setup | Repo configurado, boilerplate | 1 día |
| 2. Estructura | Componentes base, routing | 1-2 días |
| 3. Contenido | JSON con datos completos | 1-2 días |
| 4. Estilos | CSS, diseño responsive | 2-3 días |
| 5. SEO/A11y | Meta tags, accesibilidad | 0.5 días |
| 6. Deploy | Hosting configurado | 0.5 días |

### 9.2 Total Estimado

**Tiempo total: 6-9 días** (varía según scope)

---

## 10. Criterios de Éxito del Proyecto

### Done Criteria

- [ ] El sitio carga sin errores en Chrome, Firefox, Safari, Edge
- [ ] Lighthouse score ≥ 90 en Performance, Accessibility, SEO
- [ ] Navegación funciona correctamente en todos los dispositivos
- [ ] Todos los enlaces externos funcionales
- [ ] Imágenes cargan con lazy loading
- [ ] Modo oscuro/claro funciona (si implementado)
- [ ] SEO valida en Google Search Console
- [ ] Desplegado en producción (Vercel/Netlify/GitHub Pages)

### Quality Gates

- [ ] Sin errores de ESLint
- [ ] Sin console.errors en producción
- [ ] WCAG 2.2 AA compliant (verificado con axe DevTools)
- [ ] Mobile responsive sin overflow horizontal
- [ ] Lighthouse Performance ≥ 90

---

## 11. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|--------|------------|
| Contenido no disponible | Media | Alto | Templates con placeholder data |
| Imágenes de baja calidad | Media | Medio | Generar con herramientas AI o stock |
| Costos de hosting | Baja | Bajo | Usar servicios gratuitos |
| Actualización compleja | Alta | Medio | JSON separado del código |
| SEO no funciona | Media | Alto | Validar pre-deploy |

---

## 12. Anexos

### Glosario

| Término | Definición |
|---------|-----------|
| SPA | Single Page Application |
| CTA | Call to Action |
| FCP | First Contentful Paint |
| LCP | Largest Contentful Paint |
| CLS | Cumulative Layout Shift |
| WCAG | Web Content Accessibility Guidelines |
| SEO | Search Engine Optimization |

### Referencias

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Lighthouse](https://developer.chrome.com/docs/lighthouse)
- [Schema.org Person](https://schema.org/Person)

---

## Historial de Cambios

| Versión | Fecha | Descripción |
|---------|-------|-------------|
| 1.0.0 | [Fecha] | Versión inicial del PRD |

---

*Documento creado para el proyecto portfolio - Kevin Alvarado*
