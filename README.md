# Tu Mundo Fitness - Landing Page

## 🎯 Proyecto desarrollado con Semantic Driven Design (SDD)

Este proyecto es una implementación completa de la metodología **Semantic Driven Design (SDD)**, un enfoque que prioriza la semántica HTML5 y la estructura lógica del contenido como fundamento de cualquier aplicación web.

---

## 📋 Tabla de Contenidos

1. [Metodología SDD](#metodología-sdd)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Componentes](#componentes)
4. [Principios de Implementación](#principios-de-implementación)
5. [Cómo Ejecutar](#cómo-ejecutar)
6. [Stack Tecnológico](#stack-tecnológico)

---

## 🏗️ Metodología SDD

### ¿Qué es Semantic Driven Design?

**SDD** es una metodología de desarrollo web que establece que:

1. **El contenido es primero**: La estructura semántica del HTML5 debe reflejar el significado y la jerarquía del contenido
2. **Accesibilidad integrada**: El código es accesible por defecto, sin necesidad de "parches"
3. **SEO natural**: Los motores de búsqueda comprenden mejor la estructura del sitio
4. **Mantenibilidad**: El código es más fácil de comprender y mantener
5. **Flexibilidad de diseño**: El styling puede cambiar sin afectar la estructura

### Pilares de SDD en este proyecto

```
┌─────────────────────────────────────┐
│   SEMANTIC HTML5 (Estructura)       │
│  <header>, <nav>, <main>, <section> │
│   <article>, <footer>               │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   TAILWIND CSS (Presentación)       │
│  Utility-first CSS con semántica    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   VUE 3 (Interactividad)            │
│  Reactividad sin comprometer HTML   │
└─────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
App/
├── index.html                 # Punto de entrada (semántica principal)
├── src/
│   ├── app.js                 # Aplicación Vue3
│   ├── components/            # Componentes por región semántica
│   │   ├── Header.js          # <header> - Navegación
│   │   ├── HeroSection.js     # <section hero> - Presentación
│   │   ├── FitnessNews.js     # <section news> - Noticias
│   │   ├── PracticalGuides.js # <section guides> - Guías
│   │   ├── InteractiveTraining.js # <section training> - Entrenamiento
│   │   ├── FitnessGames.js    # <section games> - Juegos
│   │   ├── FitnessPodcast.js  # <section podcast> - Podcast
│   │   ├── Community.js       # <section community> - Comunidad
│   │   └── Footer.js          # <footer> - Pie de página
│   ├── styles/
│   │   └── main.css           # Estilos globales con variables CSS
│   └── assets/
│       └── images/            # Imágenes del proyecto
└── README.md                  # Este archivo
```

### Principio: Una carpeta = Una región semántica

Cada componente corresponde a una sección semántica clara del documento HTML.

---

## 🧩 Componentes

### 1. **Header** (`<header>`)
- Navegación principal con ARIA labels
- Logo y branding
- Barra de búsqueda
- Menú responsivo

**Elementos semánticos:**
```html
<header>
  <nav aria-label="Navegación principal">
    <ul><!-- Links de navegación --></ul>
  </nav>
</header>
```

### 2. **Hero Section** (`<section>`)
- Presentación principal
- Call-to-action
- Imagen de impacto con `<figure>`

**Accesibilidad:**
```html
<section id="home">
  <figure>
    <img alt="descripción semantica" />
    <figcaption>Leyenda de la imagen</figcaption>
  </figure>
</section>
```

### 3. **Fitness News** (`<section>`)
- Grid de artículos (`<article>`)
- Cada tarjeta es un artículo independiente
- Metadatos claros

### 4. **Practical Guides** (`<section>`)
- Listas ordenadas (`<ol>`) con pasos
- Cada guía es un `<article>` semántico
- Estructura: Título → Pasos → Call-to-action

### 5. **Interactive Training** (`<section>`)
- Formulario accesible con `<label>` asociados
- Inputs con ARIA labels
- Resultados dinámicos con Vue

### 6. **Fitness Games** (`<section>`)
- Grid de juegos
- Cada juego es un `<article>`
- Indicadores visuales con barras de dificultad

### 7. **Fitness Podcast** (`<section>`)
- Lista de episodios como `<article>`
- Metadatos: duración, host, descripción
- Botones de acción con aria-label

### 8. **Community** (`<section>`)
- Comentarios recientes
- Foros de discusión
- Rankings con `<details>` semánticos
- Retos interactivos

### 9. **Footer** (`<footer>`)
- Enlaces organizados por `<section>`
- Newsletter con formulario
- Información legal
- Redes sociales con ARIA labels

---

## 🎨 Principios de Implementación

### 1. **Uso de Elementos Semánticos HTML5**

```javascript
// ✅ CORRECTO - Semántico
<header>...</header>
<nav>...</nav>
<main>...</main>
<article>...</article>
<section>...</section>
<footer>...</footer>

// ❌ INCORRECTO - No semántico
<div id="header">...</div>
<div class="nav">...</div>
<div id="content">...</div>
```

### 2. **Accesibilidad (A11y) integrada**

Todos los componentes incluyen:
- `aria-label` en navegación
- `aria-expanded` en menús
- `aria-label` en botones
- Atributos `for` en labels
- `id` correlacionados
- Text alternativo en imágenes

```javascript
<button aria-label="Abrir menú" :aria-expanded="mobileMenuOpen">
  ☰
</button>
```

### 3. **CSS Variables para Tema Consistente**

```css
:root {
    --primary-color: #1e3a8a;      /* Navy Blue */
    --secondary-color: #22c55e;    /* Lime Green */
    --accent-color: #f59e0b;       /* Amber */
}

/* Uso en componentes */
background-color: var(--primary-color);
```

### 4. **Tailwind CSS con enfoque semántico**

Se utiliza Tailwind principalmente para:
- Layout (grid, flex)
- Responsive design
- Estados (hover, focus)
- Espaciamiento consistente

### 5. **Vue 3 sin comprometer semántica**

- Los componentes reflejan regiones semánticas
- `v-for` genera elementos `<article>` semánticos
- Atributos dinámicos (`:aria-label`, `:aria-expanded`)
- Métodos descriptivos que representan acciones semánticas

---

## 🚀 Cómo Ejecutar

### Opción 1: Con Live Server (VS Code)

1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"
4. La aplicación se abrirá en `http://localhost:5500`

### Opción 2: Con Python

```bash
# Python 3
python -m http.server 8000

# Luego abre: http://localhost:8000
```

### Opción 3: Con Node.js (http-server)

```bash
npm install -g http-server
http-server
# Abre: http://localhost:8080
```

---

## 💻 Stack Tecnológico

| Tecnología | Propósito | Versión |
|-----------|-----------|---------|
| **HTML5** | Estructura semántica | 5 |
| **CSS3** | Estilos globales + Tailwind | 3 |
| **Vue** | Framework reactivo | 3 (CDN) |
| **Tailwind CSS** | Utility-first CSS | v3 (CDN) |
| **JavaScript** | Lógica de componentes | ES6+ |

---

## 🔍 Auditoría de Accesibilidad

Para verificar que el proyecto cumple con SDD:

1. **Lighthouse (Chrome DevTools)**
   - F12 → Lighthouse
   - Verificar "Accessibility" ≥ 90

2. **WAVE (WebAIM)**
   - Extensión: https://wave.webaim.org/extension/
   - Debe mostrar 0 errores

3. **Validador HTML**
   - https://validator.w3.org/
   - Validar `index.html`

---

## 📝 Convenciones de Código

### Nombres de clases

Se utiliza **BEM (Block Element Modifier)**:

```css
.news__grid { /* Block */ }
.news__card { /* Element */ }
.news__card--featured { /* Modifier */ }
```

### Estructura de componentes Vue

```javascript
export default {
    template: `<!-- HTML Semántico -->`,
    data() { return { /* Estado */ }; },
    methods: { /* Acciones descriptivas */ }
};
```

---

## 🎓 Lecciones SDD Aplicadas

1. **Estructura primero**: El HTML semántico se define antes de los estilos
2. **Documento viviente**: El HTML es un documento semánticamente válido
3. **Accesibilidad natural**: No requiere "hacks" de accesibilidad
4. **SEO por diseño**: Los motores de búsqueda entienden la estructura
5. **Mantenibilidad**: Código legible y predecible

---

## 🔗 Referencias y Recursos

- [MDN - Semantic HTML](https://developer.mozilla.org/es/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
- [W3C - WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/)
- [Vue.js 3 Documentation](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 👤 Autor

Desarrollado siguiendo la metodología **Semantic Driven Design (SDD)** para demostrar las mejores prácticas en desarrollo web moderno.

---

**Última actualización:** Mayo 2026  
**Estado:** ✅ Completado y funcional
