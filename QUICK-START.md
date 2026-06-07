# 🚀 Quick Start Guide - Tu Mundo Fitness

## 1️⃣ Visualizar el Proyecto

### Opción A: Live Server (Recomendado - VS Code)
```
1. Abre VS Code
2. Abre la carpeta: g:\My Drive\UdeA\Semestre 20261\Cod 4 Cibermedios\App
3. Instala extensión "Live Server" (búscala en Extensions)
4. Click derecho en index.html → "Open with Live Server"
5. Se abrirá en http://localhost:5500
```

### Opción B: Python
```bash
cd g:\My Drive\UdeA\Semestre 20261\Cod 4 Cibermedios\App
python -m http.server 8000
# Luego abre: http://localhost:8000
```

### Opción C: Node.js
```bash
npm install -g http-server
cd g:\My Drive\UdeA\Semestre 20261\Cod 4 Cibermedios\App
http-server
# Se abrirá en: http://localhost:8080
```

---

## 📁 Estructura de Archivos

```
App/
├── index.html                          # 👈 Abre este archivo
├── README.md                           # Documentación principal
├── SDD-METHODOLOGY.md                  # Guía de metodología SDD
├── package.json                        # Metadatos del proyecto
├── QUICK-START.md                      # Este archivo
└── src/
    ├── app.js                          # Aplicación Vue3 (punto de entrada)
    ├── styles/
    │   └── main.css                    # Estilos globales
    ├── components/
    │   ├── Header.js                   # Encabezado y navegación
    │   ├── HeroSection.js              # Sección principal
    │   ├── FitnessNews.js              # Noticias
    │   ├── PracticalGuides.js          # Guías de entrenamiento
    │   ├── InteractiveTraining.js      # Calculadora de calorías
    │   ├── FitnessGames.js             # Juegos de fitness
    │   ├── FitnessPodcast.js           # Podcasts
    │   ├── Community.js                # Sección comunidad
    │   └── Footer.js                   # Pie de página
    └── assets/
        └── images/                     # 👈 Añade imágenes aquí
```

---

## 🎨 Personalización

### 1. Cambiar Colores
Edita [src/styles/main.css](src/styles/main.css#L8-L13):

```css
:root {
    --primary-color: #1e3a8a;       /* Cambiar azul */
    --secondary-color: #22c55e;     /* Cambiar verde */
    --accent-color: #f59e0b;        /* Cambiar dorado */
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
}
```

### 2. Añadir Imágenes
1. Descarga imágenes de [Picsum](https://picsum.photos/) o [Unsplash](https://unsplash.com/)
2. Guárdalas en `src/assets/images/`
3. Actualiza las rutas en los componentes

**Ejemplo:**
```javascript
// En FitnessNews.js, cambia:
image: 'src/assets/images/news-1.jpg'
// Por tu imagen descargada
```

### 3. Modificar Contenido
Edita el archivo del componente deseado:

#### Cambiar texto del header:
Abre [src/components/Header.js](src/components/Header.js#L17-L19)

#### Cambiar contenido de noticias:
Abre [src/components/FitnessNews.js](src/components/FitnessNews.js#L62-L85)

#### Añadir nuevas guías:
Edita el array `guides` en [src/components/PracticalGuides.js](src/components/PracticalGuides.js#L76-L110)

---

## 📝 Cambios Comunes

### ✏️ Cambiar Logo/Branding
```javascript
// En Header.js línea 15
<span class="text-2xl">🌍</span>  <!-- Cambiar emoji -->
<h1 class="text-white text-xl font-bold m-0">
  TU MUNDO FITNESS  <!-- Cambiar nombre -->
</h1>
<p class="text-blue-100 text-sm m-0">
  Entrena, Nutre, Vive.  <!-- Cambiar tagline -->
</p>
```

### ✏️ Cambiar Enlaces de Navegación
```javascript
// En Header.js línea 24
<li><a href="#home" class="...">Inicio</a></li>
<!-- Cambiar href según tus secciones -->
```

### ✏️ Añadir Nueva Sección
1. Crea nuevo componente en `src/components/MiSeccion.js`
2. Importe en [src/app.js](src/app.js)
3. Registra el componente globalmente
4. Añade a la plantilla

**Ejemplo:**
```javascript
// 1. Crear src/components/NuevoComponente.js
export default {
    template: `<section id="mi-seccion"><h2>Mi Sección</h2></section>`
};

// 2. Importar en src/app.js
import NuevoComponente from './components/NuevoComponente.js';

// 3. Registrar globalmente
app.component('NuevoComponente', NuevoComponente);

// 4. Usar en template
<NuevoComponente />
```

---

## 🎯 Características Implementadas

✅ **Navegación responsiva** - Adapta a móvil/tablet/desktop  
✅ **Accesibilidad WCAG AA** - ARIA labels, contraste, skip links  
✅ **SEO optimizado** - Headings semánticos, meta tags  
✅ **Diseño semántico** - HTML5 estructurado correctamente  
✅ **Tailwind CSS** - Estilos modernos con utility classes  
✅ **Vue 3 reactivo** - Interactividad sin compilación  
✅ **Calculadora interactiva** - Calcular calorías recomendadas  
✅ **Comunidad funcional** - Comentarios, foros, retos  
✅ **Newsletter** - Formulario de suscripción  
✅ **Responsive grid** - Layouts adaptativos  

---

## 🔧 Funcionalidades por Componente

| Componente | Funcionalidad | Ubicación |
|-----------|----------------|-----------|
| **Header** | Navegación, búsqueda, responsivo | src/components/Header.js |
| **Hero** | Presentación principal, CTA | src/components/HeroSection.js |
| **News** | Grid de noticias con detalles | src/components/FitnessNews.js |
| **Guides** | Guías con pasos ordenados | src/components/PracticalGuides.js |
| **Training** | Calculadora de calorías con Vue | src/components/InteractiveTraining.js |
| **Games** | Grid de juegos con dificultad | src/components/FitnessGames.js |
| **Podcast** | Lista de episodios con duración | src/components/FitnessPodcast.js |
| **Community** | Comentarios, foros, rankings | src/components/Community.js |
| **Footer** | Enlaces, newsletter, legal | src/components/Footer.js |

---

## 💻 Desarrollo Avanzado

### Añadir más interactividad con Vue

```javascript
// Ejemplo: Añadir contador de "me gusta" a artículos
export default {
    template: `
        <article @click="toggleLike" class="cursor-pointer">
            <p>{{ likes }} personas les gusta esto</p>
            <button>❤️ Me gusta</button>
        </article>
    `,
    data() {
        return { likes: 0 };
    },
    methods: {
        toggleLike() {
            this.likes++;
        }
    }
};
```

### Usar datos desde API externa

```javascript
// Ejemplo: Cargar noticias desde API
data() {
    return {
        newsItems: []
    };
},
mounted() {
    // Llamada a API cuando componente está listo
    fetch('https://api.ejemplo.com/noticias')
        .then(res => res.json())
        .then(data => {
            this.newsItems = data;
        });
}
```

---

## 🧪 Testing y Validación

### Validar HTML
```
1. Abre https://validator.w3.org/
2. Copy-paste el HTML de index.html
3. Debe mostrar "Document checking completed. No errors or warnings to show."
```

### Verificar Accesibilidad
```
1. Abre el proyecto en navegador
2. Presiona F12 → Lighthouse
3. Clic en "Accessibility"
4. Score debe ser ≥ 90
```

### Revisar SEO
```
1. F12 → Lighthouse → SEO
2. Verifica:
   - Meta viewport tag
   - Document title
   - Meta description
   - Headings estruturados
```

---

## 🐛 Solución de Problemas

### ❌ Proyecto no carga
- Verifica que `index.html` abra correctamente
- Asegurate que la ruta sea absoluta: `g:\My Drive\...`
- Intenta con Live Server en lugar de abrir archivo directamente

### ❌ Estilos no aparecen
- Verifica que Tailwind CSS CDN esté activo
- F12 → Network → Busca `tailwindcss`
- Intenta forzar recarga: `Ctrl + Shift + R`

### ❌ Vue no funciona
- Verifica que Vue 3 CDN esté cargado
- F12 → Console → Busca errores de Vue
- Asegúrate que `src/app.js` se ejecute

### ❌ Imágenes no cargan
- Verifica rutas: `src/assets/images/...`
- Asegúrate que los archivos existan en esa carpeta
- Usa rutas relativas, no absolutas

---

## 📚 Documentación Adicional

- **SDD Completo:** Lee [SDD-METHODOLOGY.md](SDD-METHODOLOGY.md)
- **Documentación completa:** Consulta [README.md](README.md)
- **Vue 3 Docs:** https://vuejs.org/
- **Tailwind Docs:** https://tailwindcss.com/
- **HTML Semántico:** https://developer.mozilla.org/es/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure

---

## 🎓 Próximos Pasos

1. **Personaliza contenido** - Edita componentes con tu contenido
2. **Añade imágenes** - Descarga y reemplaza imágenes placeholder
3. **Conecta API** - Integra datos dinámicos desde backend
4. **Deploy** - Sube a Vercel, Netlify, GitHub Pages, etc.
5. **Monitoreo** - Configura Analytics para tracking

---

## ✅ Checklist antes de entregar

- [ ] Todas las imágenes cargan correctamente
- [ ] Navegación funciona en móvil y desktop
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Lighthouse Performance ≥ 80
- [ ] SEO score ≥ 80
- [ ] Sin errores en consola (F12)
- [ ] Contenido actualizado y relevante
- [ ] Links internos funcionan
- [ ] Formulario de newsletter funciona
- [ ] Responsivo en todos los breakpoints

---

## 🎉 ¡Felicidades!

Tu proyecto **Tu Mundo Fitness** está listo usando **Semantic Driven Design**. 

**Recuerda:** La semántica HTML es el fundamento de todo buen desarrollo web.

---

**Última actualización:** Mayo 2026  
**Versión:** 1.0.0  
**Estado:** ✅ Listo para usar
