# Kevin Alvarado - Portfolio

Portafolio personal de Kevin Alvarado, Desarrollador Web con más de 5 años de experiencia en la industria, especializado en soluciones back-end y front-end.

## 🚀 Tecnologías

### Back-end
- ASP Classic / VBScript (5+ años)
- PHP (5+ años)
- Python (2+ años)
- Django (1+ año)
- Node.js (1+ año)
- Express (1+ año)

### Front-end
- JavaScript (5+ años)
- jQuery (5+ años)
- Bootstrap (5+ años)
- CSS (5+ años)
- HTML (5+ años)
- Angular (6+ meses)
- Tailwind CSS (6+ meses)
- Flutter (6+ meses)

### Bases de Datos
- SQL Server (5+ años)
- Oracle (5+ años)
- PostgreSQL (5+ años)
- MySQL (2+ años)

### Herramientas
- Git (3+ años)
- SourceTree (2+ años)
- Jira (2+ años)
- Docker (6+ meses)
- OpenCode (2+ meses)

## 📁️ Proyectos

### Laborales
1. **Sistema de Qualitas Assistance** (Humanitas Administradora de Riesgos)
   - ASP Classic, VBScript, PHP, Git, Bootstrap 3, jQuery, JavaScript, HTML5, CSS, SQL Server
   - Gestión de comisiones, pagos, upgrades de productos y reportes de data extensa

2. **Sistema de Globalmate**
   - PHP, Bootstrap 3, jQuery, JavaScript, HTML5, CSS, Oracle Database
   - Diseño responsive y soporte multi-idiomas

3. **Sistema de Mankind**
   - Python, Django, Git, Bootstrap 3, jQuery, JavaScript, HTML5, CSS, Oracle Database, Docker
   - Cotizador de planes con generación de PDF y despliegue con Gunicorn/Nginx

### Personales
1. **Sistema de Control de Inventario** - C++
2. **Sistema de Buzón para Reporte de Incidencias** - PHP, JavaScript, PostgreSQL, HTML5, CSS3, MVC
3. **Sistema de Control de Incidencias** - PHP, JavaScript, PostgreSQL, HTML5, CSS3, Bootstrap 3, jQuery, MVC
4. **Stability - Desarrollo Front-end** (Colaboración externa) - Flutter, Dart, BLoC, GetIt, Dio
5. **My Store** (Personal) - Node.js, Express, PostgreSQL, Angular, TypeScript, Tailwind CSS

## 💼 Experiencia

**Especialista Web** (2017-2024)  
Humanitas Administradora de Riesgos / Qualitas Assistance  
Caracas, Venezuela

- Diseño y desarrollo de software con patrones MVC y MVT
- Refactorización y depuración de código
- Integración de APIs y Web Services (REST/SOAP)
- Gestión y optimización de bases de datos relacionales
- Consumo de APIs externas
- Entrenamiento de nuevos desarrolladores

## 🎓 Educación

- **Ingeniero en Informática** (2012-2017)  
  Colegio Universitario de Caracas (CUC)

### Certificaciones
- SQL (Advanced) Certificate - HackerRank (2022)
- Fundamentos de Angular - Platzi (2023)
- Angular: Componentes y Servicios - Platzi (2023)
- API REST con Django desde cero - OpenWebinars (2023)
- Fundamentos de Node.js - Platzi (2023)
- Backend Node.js + API REST con Express.js - Platzi (2023)
- Backend Node.js + PostgreSQL - Platzi (2023)
- Backend Node.js + Autenticación con Passport.js y JWT - Platzi (2024)
- Angular 17: Creación de Aplicaciones Web - Platzi (2025)
- Curso Profesional de Scrum - Platzi (2025)

## 🌐 Idiomas
- Español (Nativo)
- Inglés (B1)

## 📬 Contacto
- Email: kevinalvarado.ag@gmail.com (botón de copia disponible)
- Teléfono: +58 414 2321163
- GitHub: [@PouDDuoP](https://github.com/PouDDuoP)
- LinkedIn: [/in/kevin-alvarado-graterol](https://linkedin.com/in/kevin-alvarado-graterol)
- Ubicación: Caracas, Venezuela
- **CV disponible**: [Descargar PDF](https://kevin-alvarado.vercel.app) (sección Hero)

## 🚀 Stack Técnico del Portafolio

- React 19.2.6
- Vite 8.0.14
- CSS3 con Variables CSS
- Diseño Responsive
- Animaciones CSS
- Context API para gestión de idioma (ES/EN) y tema (dark/light)
- Traducción dinámica completa (ES/EN)
- Google Analytics 4 (react-ga4) — event tracking personalizado
- @vercel/analytics
- Vercel Blob Storage para alojamiento del CV (independiente del deploy)
- Desplegado en Vercel
- Optimización LCP (Code Splitting con React.lazy)
- Accesibilidad WCAG 2.2 AA (contraste verificado)
- Carga optimizada de fuentes (preconnect + preload)
- Imagen de perfil en WebP (mejor compresión)

## ✨ Nuevas Funcionalidades (2026)

### Botón de Copia de Email
- Implementado en la sección de Contacto
- Permite copiar el email al portapapeles con un solo clic
- Usa Clipboard API con fallback para navegadores antiguos
- Feedback visual: "¡Copiado!" / "Copied!" por 2 segundos

### Descarga de CV
- Botón de descarga directa del CV actualizado (2026)
- Servido desde **Vercel Blob** — independiente del deploy, se actualiza sin redeploy
- Alojado en almacenamiento público de Vercel para disponibilidad permanente
- Visible en la sección Hero para fácil acceso de reclutadores
- Traducciones: "Descargar CV" / "Download CV"

### Migración a Vercel Blob (2026)
- CV movido de `public/` a Vercel Blob Storage
- Botón se oculta automáticamente si no hay URL configurada
- Configurable vía `VITE_CV_BLOB_URL` en variables de entorno
- El PDF local fue eliminado del repositorio

### Event Tracking con Google Analytics 4 (2026)
- Tracking de descarga de CV (categoría: CV)
- Tracking de clics en GitHub y LinkedIn (categoría: Social)
- Tracking de interacciones de contacto: email, copiar email, enviar email (categoría: Contact)
- Tracking de cambio de idioma (categoría: Language)
- Utility centralizado en `src/utils/analytics.js` para facilitar futuros eventos

## 📁️ Estructura del Proyecto

```
my-app/
├── public/
│   ├── images/
│   │   └── profile.webp    # Imagen de perfil optimizada (WebP)
│   │   └── projects/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/           # Recursos estáticos (hero.png, react.svg, vite.svg)
│   ├── components/
│   │   ├── common/       # Button, Card, Section, BackToTop
│   │   ├── layout/       # Header, Footer, Layout
│   │   └── sections/     # Hero, About, Skills, Projects, Experience, Education, Contact
│   ├── context/          # LanguageContext (ES/EN), ThemeContext
│   ├── data/             # JSON con información
│   │   ├── profile.json
│   │   ├── projects.json
│   │   ├── experience.json
│   │   ├── skills.json
│   │   └── education.json
│   ├── i18n/             # Traducciones dinámicas ES/EN
│   └── index.css         # Estilos globales (CSS Variables)
├── .env                  # Variables de entorno (gitignored)
├── .env.development      # Overrides para desarrollo (gitignored)
├── index.html            # Optimizado: preconnect + preload para fuentes
├── vercel.json           # Configuración de despliegue
└── ⚡ CV servido desde Vercel Blob (no en public/)
```

## 🚀 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (http://localhost:5173)
npm run build    # Build de producción optimizado (code splitting)
npm run preview  # Previsualizar build
npm run lint     # Linter
```

## 🚀 Optimizaciones de Rendimiento

- **LCP Optimizado**: Code splitting con `React.lazy()` - El bundle se divide en chunks bajo demanda
- **Fuentes optimizadas**: Preconexión temprana a Google Fonts + precarga no bloqueante
- **Accesibilidad**: Contraste WCAG 2.0 AA verificado (contraste > 4.5:1)
- **Imagenes**: Perfil convertido a WebP para mejor compresión
- **Vercel**: Despliegue automático con configuración optimizada
- **0 errores críticos** en PageSpeed Insights y Accesibility Checker

## 📄 Licencia

MIT

---

**Kevin Alvarado** - Desarrollador Web  
Desarrollador web versátil con más de 5 años de experiencia en la industria  
Disponible para proyectos

🌐 **Live Demo**: [kevin-alvarado.vercel.app](https://kevin-alvarado.vercel.app)