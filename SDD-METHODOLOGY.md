<!-- 
    ============================================================
    GUÍA TÉCNICA: SEMANTIC DRIVEN DESIGN (SDD)
    Implementación en Tu Mundo Fitness
    ============================================================
-->

# Semantic Driven Design - Guía de Implementación Completa

## 📖 ¿Qué es Semantic Driven Design?

**SDD** es un enfoque metodológico en desarrollo web que prioriza:

1. **Significado semántico** sobre presentación visual
2. **Estructura lógica** sobre layout cosmético
3. **Accesibilidad nativa** sobre características agregadas
4. **Mantenibilidad** sobre funcionalidades complejas
5. **SEO natural** sobre optimizaciones externas

---

## 🏛️ Principios Fundamentales de SDD

### Principio 1: El HTML es un Documento

```html
<!-- SDD: HTML es un documento con estructura -->
<html>
  <head><!-- Metadatos del documento --></head>
  <body>
    <header><!-- Encabezado del sitio --></header>
    <main><!-- Contenido principal --></main>
    <footer><!-- Pie de página --></footer>
  </body>
</html>
```

**No es:**
```html
<!-- Anti-patrón: Todo es divs -->
<div class="wrapper">
  <div class="header-container">
    <div class="logo-div"></div>
    <div class="nav-div"></div>
  </div>
  <div class="main-container"></div>
  <div class="footer-container"></div>
</div>
```

### Principio 2: La Jerarquía es Clara

```html
<!-- SDD: Estructura jerárquica clara -->
<h1>Tu Mundo Fitness</h1>           <!-- h1: Título del sitio -->
<h2>Fitness News</h2>              <!-- h2: Sección principal -->
<h3>Noticias Recientes</h3>        <!-- h3: Subsección -->

<!-- Anti-patrón: Jerarquía confusa -->
<span class="titulo-grande">Tu Mundo Fitness</span>
<span class="titulo-seccion">Fitness News</span>
<span class="titulo-pequeno">Noticias Recientes</span>
```

### Principio 3: Semántica de Lista

```html
<!-- SDD: Listas semánticas -->
<nav>
  <ul>
    <li><a href="#home">Inicio</a></li>
    <li><a href="#news">Noticias</a></li>
    <li><a href="#guides">Guías</a></li>
  </ul>
</nav>

<!-- Anti-patrón: Divs disfrazados de nav -->
<div class="navigation">
  <span>Inicio |</span>
  <span>Noticias |</span>
  <span>Guías</span>
</div>
```

### Principio 4: Metadatos Accesibles

```html
<!-- SDD: Metadatos claros con ARIA -->
<article>
  <h2>Noticias Fitness</h2>
  <time datetime="2026-05-22">22 de mayo de 2026</time>
  <span aria-label="Categoría">Tendencias</span>
  <p>Contenido del artículo...</p>
</article>

<!-- Anti-patrón: Información oculta en clases -->
<div class="news-card trending">
  <h2>Noticias Fitness</h2>
  <p>22-05-2026</p>
  <p>Contenido...</p>
</div>
```

---

## 🎯 Aplicación en Tu Mundo Fitness

### Región 1: HEADER

**Estructura Semántica:**
```html
<header>
  <!-- Logo/Branding como heading -->
  <h1>TU MUNDO FITNESS</h1>
  <p>Tagline: Entrena, Nutre, Vive.</p>
  
  <!-- Navegación explícita -->
  <nav aria-label="Navegación principal">
    <ul>
      <li><a href="#home">Inicio</a></li>
      <li><a href="#nutrition">Nutrición</a></li>
      <li><a href="#fitness">Fitness</a></li>
      <li><a href="#about">Sobre nosotros</a></li>
      <li><a href="#contact">Contactos</a></li>
    </ul>
  </nav>
  
  <!-- Search y usuario -->
  <form>
    <input type="search" aria-label="Buscar contenido" />
  </form>
</header>
```

**Ventajas SDD:**
✅ Los motores de búsqueda identifican `<header>` como encabezado  
✅ Lectores de pantalla anuncian "Navegación principal"  
✅ Estructura clara sin `<div>` innecesarios  
✅ Fácil mantenimiento y reutilización  

---

### Región 2: MAIN CONTENT

**Estructura Semántica:**
```html
<main id="main-content">
  <!-- Skip link para accesibilidad -->
  <a href="#main-content" class="skip-to-main">
    Saltar al contenido principal
  </a>
  
  <!-- Cada sección es un <section> -->
  <section id="hero">
    <h2>Transforma tu cuerpo y tu vida</h2>
    <p>Descripción...</p>
  </section>
  
  <section id="fitness-news">
    <h2>Fitness News</h2>
    
    <!-- Cada noticia es un <article> -->
    <article>
      <h3>Noticias Fitness</h3>
      <p>Contenido...</p>
    </article>
  </section>
</main>
```

**Cómo Vue respeta la semántica:**
```javascript
// Cada item genera un <article> semántico
<article v-for="news in newsItems" :key="news.id">
  <h3>{{ news.title }}</h3>
  <p>{{ news.excerpt }}</p>
</article>
```

---

### Región 3: FOOTER

**Estructura Semántica:**
```html
<footer>
  <!-- Cada sección temática es un <section> -->
  <section>
    <h3>Sobre Tu Mundo Fitness</h3>
    <p>Contenido...</p>
  </section>
  
  <section>
    <h3>Enlaces Rápidos</h3>
    <nav aria-label="Footer navigation">
      <ul>
        <li><a href="#home">Inicio</a></li>
        <li><a href="#news">Noticias</a></li>
      </ul>
    </nav>
  </section>
  
  <!-- Información legal -->
  <div class="legal">
    <p>&copy; 2026 Tu Mundo Fitness</p>
    <p>Todos los derechos reservados</p>
  </div>
</footer>
```

---

## ♿ Accesibilidad Integrada (WCAG 2.1 AA)

### Ejemplo 1: Botón Accesible

```javascript
// ✅ SDD: Accesible por defecto
<button 
  @click="readMore(news.id)"
  :aria-label="'Leer artículo: ' + news.title"
>
  Leer Artículo →
</button>

// ❌ No accesible: Solo un enlace sin contexto
<a href="#">Leer →</a>
```

### Ejemplo 2: Formulario Accesible

```javascript
// ✅ SDD: Labels asociados correctamente
<form @submit.prevent="subscribeNewsletter">
  <label for="email-input">Tu Email:</label>
  <input 
    id="email-input"
    type="email"
    aria-label="Email para newsletter"
    required
  />
  <button type="submit">Suscribirse</button>
</form>

// ❌ Anti-patrón: Sin labels
<form>
  <input type="email" placeholder="Email" />
  <button>Enviar</button>
</form>
```

### Ejemplo 3: Navegación Accesible

```javascript
// ✅ SDD: Navegación explícita con ARIA
<nav aria-label="Navegación principal">
  <ul>
    <li><a href="#home">Inicio</a></li>
    <li><a href="#about">Sobre nosotros</a></li>
  </ul>
</nav>

// ❌ Anti-patrón: Nav implícita
<div class="top-menu">
  <a href="#home">Inicio</a>
  <a href="#about">Sobre nosotros</a>
</div>
```

---

## 🔍 SEO Integrado por SDD

### Document Outline (Esquema del Documento)

```
1. TU MUNDO FITNESS (h1 - Título principal)
   1.1 Transforma tu cuerpo (h2 - Sección hero)
   1.2 Fitness News (h2 - Sección noticias)
       1.2.1 Noticias Fitness (h3 - Artículo 1)
       1.2.2 Tendencias (h3 - Artículo 2)
   1.3 Guías Prácticas (h2 - Sección guías)
```

**Ventajas:**
- Motores de búsqueda entienden la importancia de cada sección
- Google genera mejores snippets en resultados
- Estructura visible en Google Search Console

---

## 📊 Patrones SDD Aplicados

### Patrón 1: Card Component

```javascript
// ✅ SDD: Card como <article>
<article class="card">
  <h3>Título</h3>
  <p>Descripción</p>
  <button>Acción</button>
</article>

// Cada card es un contenido independiente
// Puede ser distribuido en redes sociales, email, etc.
// Mantiene significado sin contexto
```

### Patrón 2: Comments Section

```javascript
// ✅ SDD: Comentarios como lista
<section class="comments">
  <h2>Comentarios</h2>
  <ol>
    <li>
      <article class="comment">
        <h3>Autor del comentario</h3>
        <time datetime="2026-05-22">22 de mayo</time>
        <p>Texto del comentario</p>
      </article>
    </li>
  </ol>
</section>
```

### Patrón 3: Formulario Accesible

```javascript
// ✅ SDD: Formulario con fieldset y legend
<form @submit.prevent="submitForm">
  <fieldset>
    <legend>Información Personal</legend>
    
    <div class="form-group">
      <label for="age">¿Cuál es tu edad?</label>
      <input id="age" type="number" required />
    </div>
    
    <div class="form-group">
      <label for="weight">Peso (kg)</label>
      <input id="weight" type="number" required />
    </div>
  </fieldset>
  
  <button type="submit">Enviar</button>
</form>
```

---

## 🎨 CSS y SDD

### Variables CSS para Semántica

```css
:root {
    --primary-color: #1e3a8a;      /* Azul primario */
    --secondary-color: #22c55e;    /* Verde secundario */
    --text-primary: #1f2937;       /* Texto principal */
    --text-secondary: #6b7280;     /* Texto secundario */
    --border-color: #e5e7eb;       /* Bordes */
}

/* Uso semántico */
h1, h2, h3 { color: var(--primary-color); }
p, span { color: var(--text-primary); }
```

### Estados y Pseudo-clases

```css
/* Focus state para accesibilidad */
a:focus,
button:focus {
    outline: 2px solid var(--secondary-color);
    outline-offset: 2px;
}

/* Hover state transparente */
a:hover::after {
    width: 100%;
    transition: width 0.3s ease;
}
```

---

## 🚀 Mejores Prácticas SDD

### 1. Skip Links
```html
<!-- Permite saltar a contenido principal -->
<a href="#main-content" class="skip-to-main">
  Saltar al contenido principal
</a>
```

### 2. ARIA Landmarks
```html
<header role="banner">...</header>
<nav role="navigation" aria-label="Main">...</nav>
<main role="main">...</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">...</footer>
```

### 3. Semantic Headings
```html
<!-- Una h1 por página -->
<h1>Tu Mundo Fitness</h1>

<!-- H2 para secciones principales -->
<h2>Fitness News</h2>
<h2>Guías Prácticas</h2>

<!-- H3 para subsecciones -->
<h3>Noticias Recientes</h3>
```

### 4. List Semantics
```html
<!-- Navegación: <ul> + <li> -->
<nav>
  <ul>
    <li><a href="#home">Inicio</a></li>
  </ul>
</nav>

<!-- Pasos: <ol> + <li> -->
<ol>
  <li>Paso 1</li>
  <li>Paso 2</li>
</ol>
```

### 5. Time Element
```html
<!-- Fecha legible por máquinas -->
<article>
  <time datetime="2026-05-22">
    22 de mayo de 2026
  </time>
  <p>Contenido...</p>
</article>
```

---

## 📱 Responsive + SDD

La semántica se mantiene en todos los breakpoints:

```javascript
// Componente responsivo
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- La estructura semántica no cambia -->
  <!-- Solo el layout visual se adapta -->
  <article v-for="item in items" :key="item.id">
    <h3>{{ item.title }}</h3>
  </article>
</div>
```

---

## ✅ Checklist SDD

- [ ] Validar HTML en https://validator.w3.org/
- [ ] Cada página tiene solo UNA `<h1>`
- [ ] Headings siguen orden jerárquico (h1 → h2 → h3)
- [ ] Navegación usa `<nav>` + `<ul>` + `<li>`
- [ ] Artículos usan `<article>` elemento
- [ ] Formularios tienen `<label>` con `for` atributo
- [ ] Imágenes tienen `alt` atributo descriptivo
- [ ] Enlaces tienen texto significativo (no "aquí" o "click")
- [ ] ARIA labels en elementos interactivos
- [ ] Contraste de colores ≥ 4.5:1 (AA)
- [ ] Lighthouse Accessibility ≥ 90

---

## 🎓 Conclusión

SDD no es solo una metodología, es una **filosofía** de desarrollo web que:

1. **Prioriza el usuario** sobre la tecnología
2. **Facilita el mantenimiento** a largo plazo
3. **Mejora automáticamente** SEO y accesibilidad
4. **Reduce deuda técnica** desde el inicio
5. **Respeta los estándares** web

**Tu Mundo Fitness** es un ejemplo de cómo implementar SDD de manera práctica y eficiente usando tecnologías modernas como Vue 3 y Tailwind CSS sin comprometer los principios fundamentales.

---

**Fecha de creación:** Mayo 2026  
**Versión SDD:** 1.0.0  
**Status:** ✅ Completamente implementado
