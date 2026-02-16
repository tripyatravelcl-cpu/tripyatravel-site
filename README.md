# TripYa Travel - Sitio Web Estático

Sitio web corporativo para TripYa Travel, agencia especializada en vacaciones familiares All Inclusive al Caribe.

## 📁 Estructura del Proyecto

```
tripya-website/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos principales
├── js/
│   └── main.js           # JavaScript principal
├── images/
│   └── TripYaLogo_v1.png # Logo de la empresa
├── inicio/               # Carpeta para contenido del carrusel
│   ├── MULTIMEDIA_IMG_1.jpg
│   ├── TITULO_1.txt
│   ├── TEXTO_1.txt
│   ├── MULTIMEDIA_VID_2.mp4
│   ├── TITULO_2.txt
│   └── TEXTO_2.txt
└── casos/                # Carpeta para historias de éxito
    ├── MULTIMEDIA_IMG_1.jpg
    ├── TITULO_1.txt
    ├── TEXTO_1.txt
    └── ...
```

## 🎨 Manual de Marca

El sitio respeta completamente el manual de marca de TripYa Travel:

**Colores:**
- Azul Caribe Profundo: #1F4FA3
- Turquesa Caribe: #12B6C8
- Gris Grafito: #2E2E2E
- Blanco: #FFFFFF
- Arena Clara: #F2E6D8

**Tipografías:**
- Principal: Montserrat (títulos y menú)
- Secundaria: Open Sans (textos)

## 📝 Cómo Agregar Contenido

### Carrusel de Inicio

Para agregar contenido al carrusel de la página de inicio:

1. Coloca tus archivos multimedia en la carpeta `inicio/`
2. Usa el siguiente formato de nombres:

**Para imágenes:**
```
MULTIMEDIA_IMG_1.jpg (o .png, .gif, .webp)
TITULO_1.txt
TEXTO_1.txt
```

**Para videos:**
```
MULTIMEDIA_VID_2.mp4 (o .webm, .mov)
TITULO_2.txt
TEXTO_2.txt
```

**Reglas importantes:**
- El número (YY) debe ser el mismo para multimedia, título y texto relacionados
- Los números deben ser consecutivos (1, 2, 3, 4...)
- Las imágenes se muestran por 5 segundos con barra de progreso
- Los videos se reproducen completos sin límite de tiempo
- El carrusel avanza automáticamente

**Ejemplo de contenido en TITULO_1.txt:**
```
Descubre el Caribe con Tu Familia
```

**Ejemplo de contenido en TEXTO_1.txt:**
```
Vive unas vacaciones inolvidables en los mejores resorts All Inclusive del Caribe. 
Te asesoramos en cada detalle para que solo te preocupes de disfrutar.
```

### Historias de Éxito

Para agregar testimonios y casos de éxito:

1. Coloca tus archivos multimedia en la carpeta `casos/`
2. Usa el mismo formato que el carrusel:

```
MULTIMEDIA_IMG_1.jpg
TITULO_1.txt
TEXTO_1.txt

MULTIMEDIA_VID_2.mp4
TITULO_2.txt
TEXTO_2.txt
```

**Características:**
- Las historias se muestran en orden vertical
- Los videos se reproducen automáticamente cuando el usuario los ve en pantalla
- Cada historia aparece separada con su título y descripción

## 🚀 Despliegue en Cloudflare Pages

### Método 1: Mediante Git (Recomendado)

1. Sube el proyecto a un repositorio de GitHub
2. Ve a Cloudflare Pages
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio
5. Configura el despliegue:
   - **Framework preset:** None
   - **Build command:** (dejar vacío)
   - **Build output directory:** /
6. Click en "Save and Deploy"

### Método 2: Carga Directa

1. Ve a Cloudflare Pages Dashboard
2. Click en "Create a project"
3. Click en "Upload assets"
4. Arrastra toda la carpeta `tripya-website`
5. Click en "Deploy site"

## 🎯 Características del Sitio

### Carrusel Inteligente
- Reproducción automática
- Barra de progreso para imágenes
- Videos que se reproducen completos
- Controles manuales (flechas y puntos)
- Pausa automática al hacer hover

### Navegación
- Menú sticky que permanece visible al hacer scroll
- Navegación suave entre secciones
- URLs con hash (#inicio, #quienes-somos, etc.)
- Menú móvil responsive

### Secciones

**1. Inicio (Carrusel)**
- Contenido multimedia dinámico
- Títulos y descripciones personalizables
- Transiciones suaves

**2. Quiénes Somos**
- 4 tarjetas: Nosotros, Misión, Visión, Valores
- Íconos SVG minimalistas
- Efecto hover con elevación

**3. Contáctanos**
- Enlaces directos a redes sociales
- Instagram, WhatsApp, TikTok
- Íconos interactivos

**4. Historias de Éxito**
- Testimonios con multimedia
- Videos con reproducción automática al estar visibles
- Formato vertical tipo feed

### Footer
- Mapa del sitio
- Enlaces a redes sociales
- Logo y eslogan de la empresa

## 📱 Responsive Design

El sitio es completamente responsive y se adapta a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Móvil (hasta 767px)

### Características móviles:
- Menú hamburguesa
- Carrusel optimizado
- Grid de una columna
- Botones táctiles grandes

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con variables CSS, Grid, Flexbox
- **JavaScript Vanilla** - Sin dependencias externas
- **Google Fonts** - Montserrat y Open Sans
- **SVG** - Íconos vectoriales escalables

## ⚡ Rendimiento

- Carga rápida (HTML, CSS, JS minificados en producción)
- Imágenes con lazy loading
- Videos optimizados
- Sin frameworks pesados
- Compatible con Cloudflare Pages CDN

## 🔧 Mantenimiento

### Agregar nuevo contenido al carrusel:
1. Sube archivos con formato correcto a `/inicio/`
2. El sitio detectará y mostrará automáticamente

### Agregar nueva historia:
1. Sube archivos con formato correcto a `/casos/`
2. El sitio detectará y mostrará automáticamente

### Modificar textos fijos:
1. Edita `index.html` para cambiar textos de secciones
2. Edita `css/styles.css` para cambiar estilos

## 📞 Soporte

Para preguntas o soporte, contacta a:
- Instagram: [@tripyatravelcl](https://www.instagram.com/tripyatravelcl)
- WhatsApp: +56 9 4227 7576
- TikTok: [@tripyatravel](https://www.tiktok.com/@tripyatravel)

## 📄 Licencia

© 2024 TripYa Travel. Todos los derechos reservados.

---

**Nota:** Este sitio web fue diseñado siguiendo estrictamente el Manual de Marca de TripYa Travel, asegurando consistencia visual y profesionalismo en todas las comunicaciones de la marca.
