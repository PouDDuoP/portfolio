# Kevin Alvarado - Portfolio

Portafolio personal de Kevin Alvarado, Desarrollador Full Stack con más de 5 años de experiencia en la industria, especializado en soluciones back-end y front-end.

## 🚀 Stack Tecnológico

### Back-end
- ASP Classic / VBScript
- PHP
- Python / Django
- Node.js / Express

### Front-end
- JavaScript / jQuery
- HTML / CSS
- Bootstrap
- Angular
- Tailwind CSS
- Flutter

### Bases de Datos
- SQL Server
- Oracle Database
- PostgreSQL
- MySQL

### Herramientas
- Git / GitHub / Bitbucket
- SourceTree
- Jira
- Docker
- OpenCode

## 📁 Proyectos

### Laborales
1. **Sistema de Qualitas Assistance** (Humanitas Administradora de Riesgos)
   - ASP Classic, VBScript, PHP, Git, Bitbucket, Bootstrap 3, jQuery, JavaScript, HTML5, CSS, SQL Server
   - Gestión de comisiones, pagos, upgrades de productos y reportes de data extensa

2. **Sistema de Globalmate**
   - PHP, Bootstrap 3, jQuery, JavaScript, HTML5, CSS, Oracle Database, Bitbucket
   - Diseño responsive y soporte multi-idiomas

3. **Sistema de Mankind**
   - Python, Django, Git, Bitbucket, Bootstrap 3, jQuery, JavaScript, HTML5, CSS, Oracle Database, Docker
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
- Email: kevinalvarado.ag+jobs@gmail.com (botón de copia disponible)
- GitHub: [@PouDDuoP](https://github.com/PouDDuoP)
- LinkedIn: [/in/kevin-alvarado-graterol](https://linkedin.com/in/kevin-alvarado-graterol)
- Ubicación: Caracas, Venezuela
- **CV disponible**: [Descargar PDF](https://kevin-alvarado.vercel.app) (sección Hero)

## 🛠️ Stack Técnico del Portafolio

- Vite (build tool)
- Vite 8.0.14
- CSS3 con Variables CSS
- Diseño Responsive
- Animaciones CSS
- Context API para gestión de idioma (ES/EN) y tema (dark/light)
- Traducción dinámica completa (ES/EN)
- Google Analytics 4 (gtag nativo) + @vercel/analytics — event tracking personalizado
- Desplegado en Vercel
- Optimización LCP (Code Splitting con lazy loading)
- Accesibilidad WCAG 2.2 AA (contraste verificado)
- Carga optimizada de fuentes (preconnect + preload)
- Imagen de perfil en WebP (mejor compresión)

## ✨ Funcionalidades

### Botón de Copia de Email
- Implementado en la sección de Contacto
- Permite copiar el email al portapapeles con un solo clic
- Usa Clipboard API con fallback para navegadores antiguos
- Feedback visual: "¡Copiado!" / "Copied!" por 2 segundos

### Descarga de CV
- Botón de descarga directa del CV actualizado
- Servido desde almacenamiento externo — se actualiza sin redeploy
- Traducciones: "Descargar CV" / "Download CV"

### Event Tracking con Google Analytics 4
- Tracking de descarga de CV
- Tracking de clics en redes sociales (GitHub, LinkedIn)
- Tracking de interacciones de contacto: email, copiar email
- Tracking de cambio de idioma (ES/EN)

### Carousel de Proyectos y Educación
- Componente CarouselShell reutilizable con scroll horizontal
- Flechas de navegación animadas
- Integración independiente en Projects y Education

### Componente Icon
- Sistema de iconos centralizado con 7 iconos SVG
- Fácilmente extensible para nuevos iconos

### Skip to Content
- Enlace de accesibilidad para saltar la navegación
- Optimizado para lectores de pantalla y navegación por teclado

## 📁 Estructura del Proyecto

```
my-app/
├── public/
│   ├── images/
│   │   └── profile.webp    # Imagen de perfil optimizada (WebP)
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── common/         # Button, Card, Section, BackToTop, CarouselShell, Icon
│   │   ├── layout/         # Header, Footer, Layout
│   │   └── sections/       # Hero, About, Skills, Projects, Experience, Education, FAQ, Contact
│   ├── context/            # LanguageContext (ES/EN), ThemeContext
│   ├── data/               # JSON con información del perfil
│   ├── i18n/               # Traducciones dinámicas ES/EN
│   ├── utils/              # analytics.js
│   └── index.css           # Estilos globales (CSS Variables)
├── index.html              # Optimizado: preconnect + preload para fuentes
├── vercel.json             # Configuración de despliegue
└── README.md
```

## 🚀 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (http://localhost:5173)
npm run build    # Build de producción optimizado (code splitting)
npm run preview  # Previsualizar build
```

## ⚡ Optimizaciones de Rendimiento

- **LCP Optimizado**: Code splitting con lazy loading — El bundle se divide en chunks bajo demanda
- **Suspense boundaries individuales**: Cada sección carga en paralelo sin bloquear a las demás
- **Fuentes optimizadas**: Preconexión temprana a Google Fonts + precarga no bloqueante
- **Accesibilidad**: Contraste WCAG 2.0 AA verificado, skip-to-content, aria-controls en FAQ
- **Imágenes**: Perfil convertido a WebP para mejor compresión
- **Assets sin usar eliminados**: hero.png, vite.svg
- **Vercel**: Despliegue automático con configuración optimizada
- **0 errores críticos** en PageSpeed Insights y Accesibility Checker

## 📄 Licencia

MIT

---

**Kevin Alvarado** - Desarrollador Full Stack
Desarrollador Full Stack versátil con más de 5 años de experiencia en la industria
En búsqueda activa de empleo

🌐 **Live Demo**: [kevin-alvarado.vercel.app](https://kevin-alvarado.vercel.app)
