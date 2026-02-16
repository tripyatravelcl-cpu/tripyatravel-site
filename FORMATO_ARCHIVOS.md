# Guía de Formato de Archivos - TripYa Travel

## 📋 Resumen del Sistema de Nombres

El sitio web utiliza un sistema de nomenclatura específico para cargar contenido dinámicamente sin necesidad de editar código.

## 📁 Carpeta: inicio/ (Carrusel Principal)

### Formato de Nombres

Cada contenido del carrusel requiere **3 archivos** con el mismo número correlativo:

```
MULTIMEDIA_[TIPO]_[NÚMERO].[EXTENSIÓN]
TITULO_[NÚMERO].txt
TEXTO_[NÚMERO].txt
```

### Tipos de Multimedia

**Para imágenes:**
- Tipo: `IMG`
- Extensiones soportadas: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- Ejemplo: `MULTIMEDIA_IMG_1.jpg`

**Para videos:**
- Tipo: `VID`
- Extensiones soportadas: `.mp4`, `.webm`, `.mov`
- Ejemplo: `MULTIMEDIA_VID_2.mp4`

### Ejemplos Completos

#### Ejemplo 1: Imagen
```
inicio/
  MULTIMEDIA_IMG_1.jpg     ← Imagen del resort
  TITULO_1.txt            ← Contiene: "Descubre el Caribe"
  TEXTO_1.txt             ← Contiene: "Vive experiencias únicas..."
```

#### Ejemplo 2: Video
```
inicio/
  MULTIMEDIA_VID_2.mp4     ← Video del destino
  TITULO_2.txt            ← Contiene: "Punta Cana te espera"
  TEXTO_2.txt             ← Contiene: "Playas paradisíacas..."
```

#### Ejemplo 3: Múltiples contenidos
```
inicio/
  MULTIMEDIA_IMG_1.jpg
  TITULO_1.txt
  TEXTO_1.txt
  MULTIMEDIA_VID_2.mp4
  TITULO_2.txt
  TEXTO_2.txt
  MULTIMEDIA_IMG_3.png
  TITULO_3.txt
  TEXTO_3.txt
```

### ⚙️ Comportamiento del Carrusel

**Imágenes:**
- Se muestran por **5 segundos**
- Incluyen barra de progreso visual
- Avanzan automáticamente al terminar

**Videos:**
- Se reproducen **completos** (sin límite de tiempo)
- NO muestran barra de progreso
- Avanzan automáticamente cuando terminan
- Se reproducen automáticamente (autoplay)

### 📝 Contenido de Archivos .txt

**TITULO_[N].txt:**
- Una línea de texto
- Título corto y llamativo
- Máximo recomendado: 50 caracteres
- Ejemplo: `Descubre Cancún con Tu Familia`

**TEXTO_[N].txt:**
- Texto descriptivo
- Puede tener múltiples líneas
- Máximo recomendado: 200 caracteres
- Ejemplo:
  ```
  Vive unas vacaciones inolvidables en los mejores 
  resorts All Inclusive del Caribe. Te asesoramos 
  en cada detalle para que solo disfrutes.
  ```

## 📁 Carpeta: casos/ (Historias de Éxito)

Utiliza **exactamente el mismo formato** que la carpeta inicio:

```
MULTIMEDIA_[TIPO]_[NÚMERO].[EXTENSIÓN]
TITULO_[NÚMERO].txt
TEXTO_[NÚMERO].txt
```

### Ejemplos para Casos de Éxito

#### Testimonio con Imagen
```
casos/
  MULTIMEDIA_IMG_1.jpg     ← Foto de la familia
  TITULO_1.txt            ← "Familia Rodríguez - Cancún 2024"
  TEXTO_1.txt             ← Testimonio completo del cliente
```

#### Testimonio con Video
```
casos/
  MULTIMEDIA_VID_2.mp4     ← Video testimonio
  TITULO_2.txt            ← "Familia González - Punta Cana"
  TEXTO_2.txt             ← Descripción de la experiencia
```

### ⚙️ Comportamiento de Historias

**Videos:**
- Se reproducen **automáticamente** cuando el usuario hace scroll y los ve
- Se pausan cuando salen de la vista
- Mejora la experiencia del usuario

**Orden:**
- Las historias se muestran en orden numérico (1, 2, 3...)
- De arriba hacia abajo
- Cada historia está claramente separada

## ✅ Reglas Importantes

### 1. Numeración Correlativa
```
✅ CORRECTO:
  MULTIMEDIA_IMG_1.jpg
  MULTIMEDIA_VID_2.mp4
  MULTIMEDIA_IMG_3.jpg

❌ INCORRECTO:
  MULTIMEDIA_IMG_1.jpg
  MULTIMEDIA_VID_5.mp4  ← Salto en numeración
  MULTIMEDIA_IMG_3.jpg
```

### 2. Mayúsculas Obligatorias
```
✅ CORRECTO:
  MULTIMEDIA_IMG_1.jpg
  TITULO_1.txt
  TEXTO_1.txt

❌ INCORRECTO:
  multimedia_img_1.jpg  ← Minúsculas
  titulo_1.txt          ← Minúsculas
```

### 3. Mismo Número para Archivos Relacionados
```
✅ CORRECTO:
  MULTIMEDIA_IMG_1.jpg
  TITULO_1.txt         ← Mismo número
  TEXTO_1.txt          ← Mismo número

❌ INCORRECTO:
  MULTIMEDIA_IMG_1.jpg
  TITULO_2.txt         ← Número diferente
  TEXTO_1.txt
```

### 4. Tipo Correcto
```
✅ CORRECTO:
  MULTIMEDIA_IMG_1.jpg  ← IMG para imagen
  MULTIMEDIA_VID_2.mp4  ← VID para video

❌ INCORRECTO:
  MULTIMEDIA_VID_1.jpg  ← VID con extensión de imagen
  MULTIMEDIA_IMG_2.mp4  ← IMG con extensión de video
```

## 🎨 Recomendaciones de Contenido

### Imágenes
- **Resolución mínima:** 1920x1080px (Full HD)
- **Formato recomendado:** JPG (optimizado)
- **Peso máximo:** 500KB (optimiza para web)
- **Aspecto:** 16:9 (horizontal)

### Videos
- **Resolución máxima:** 1920x1080px
- **Formato recomendado:** MP4 (H.264)
- **Duración recomendada:** 15-45 segundos
- **Peso máximo:** 10MB
- **Incluir audio:** Opcional (se reproduce con sonido)

### Textos
- **Títulos:** Concisos y llamativos
- **Descripciones:** Clara y persuasiva
- **Tono:** Cálido, profesional, cercano
- **Evitar:** Errores ortográficos, textos demasiado largos

## 🔄 Proceso de Actualización

### Para Agregar Nuevo Contenido:

1. **Identifica el siguiente número disponible**
   - Revisa la carpeta
   - Usa el próximo número consecutivo

2. **Prepara tus archivos**
   - Imagen o video optimizado
   - Título en un .txt
   - Descripción en otro .txt

3. **Renombra con el formato correcto**
   ```
   MULTIMEDIA_IMG_[N].jpg
   TITULO_[N].txt
   TEXTO_[N].txt
   ```

4. **Sube a la carpeta correspondiente**
   - inicio/ para carrusel
   - casos/ para historias

5. **Prueba en el sitio**
   - Recarga la página
   - Verifica que aparezca correctamente

### Para Eliminar Contenido:

1. **Elimina los 3 archivos relacionados**
2. **Renumera los archivos restantes** para mantener secuencia
3. **Verifica que no haya saltos en la numeración**

## ❓ Solución de Problemas

### El contenido no aparece:

✅ **Verifica:**
- Nombres de archivos exactos (mayúsculas, guiones bajos)
- Numeración correlativa sin saltos
- Los 3 archivos existen para cada contenido
- Las extensiones son correctas para el tipo

### El video no se reproduce:

✅ **Verifica:**
- Formato MP4 con codec H.264
- Tamaño no excesivo (< 10MB recomendado)
- Nombre usa VID no IMG
- El navegador soporta el formato

### El título/texto no se muestra correctamente:

✅ **Verifica:**
- Archivos .txt están en UTF-8
- No hay caracteres especiales raros
- El número coincide con el multimedia

## 📞 Contacto

Si necesitas ayuda con el formato de archivos:
- WhatsApp: +56 9 4227 7576
- Instagram: @tripyatravelcl

---

**Última actualización:** Febrero 2024
