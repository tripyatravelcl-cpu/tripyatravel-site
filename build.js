// ============================================
// TripYa Travel - Script de Build
// Escanea las carpetas inicio/ y casos/ y
// genera js/config.js automáticamente
// ============================================

const fs = require('fs');
const path = require('path');

// Extensiones soportadas
const IMG_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const VID_EXTENSIONS = ['.mp4', '.webm', '.mov'];

function esImagen(ext) {
    return IMG_EXTENSIONS.includes(ext.toLowerCase());
}

function esVideo(ext) {
    return VID_EXTENSIONS.includes(ext.toLowerCase());
}

function leerTxt(rutaBase, correlativo) {
    // Intenta leer el archivo de texto, devuelve '' si no existe
    const ruta = path.join(rutaBase, `${correlativo}.txt`);
    try {
        return fs.readFileSync(ruta, 'utf-8').trim();
    } catch {
        return '';
    }
}

function escanearCarpeta(carpeta, rutaRelativa) {
    const resultados = [];

    if (!fs.existsSync(carpeta)) {
        console.warn(`⚠️  Carpeta no encontrada: ${carpeta}`);
        return resultados;
    }

    const archivos = fs.readdirSync(carpeta);

    // Filtrar solo archivos multimedia con el formato MULTIMEDIA_XXX_YY.EXT
    const multimedia = archivos.filter(archivo => {
        const nombre = archivo.toUpperCase();
        return nombre.startsWith('MULTIMEDIA_');
    });

    if (multimedia.length === 0) {
        console.warn(`⚠️  No se encontraron archivos multimedia en: ${carpeta}`);
        return resultados;
    }

    // Ordenar por número correlativo
    multimedia.sort((a, b) => {
        const numA = extraerCorrelativo(a);
        const numB = extraerCorrelativo(b);
        return numA - numB;
    });

    for (const archivo of multimedia) {
        const ext = path.extname(archivo);
        const nombreSinExt = path.basename(archivo, ext);
        const partes = nombreSinExt.split('_'); // ['MULTIMEDIA', 'IMG', '1']

        if (partes.length < 3) {
            console.warn(`⚠️  Nombre inválido ignorado: ${archivo}`);
            continue;
        }

        const tipo = partes[1].toUpperCase(); // 'IMG' o 'VID'
        const correlativo = partes[2];        // '1', '2', etc.

        let typeStr = '';
        if (tipo === 'IMG' && esImagen(ext)) {
            typeStr = 'image';
        } else if (tipo === 'VID' && esVideo(ext)) {
            typeStr = 'video';
        } else {
            console.warn(`⚠️  Tipo no reconocido para: ${archivo}`);
            continue;
        }

        const titulo = leerTxt(path.join(carpeta, `TITULO_${correlativo}`), '');
        const texto  = leerTxt(path.join(carpeta, `TEXTO_${correlativo}`), '');

        // Leer directamente los archivos txt con nombre correcto
        const tituloPath = path.join(carpeta, `TITULO_${correlativo}.txt`);
        const textoPath  = path.join(carpeta, `TEXTO_${correlativo}.txt`);

        let tituloFinal = '';
        let textoFinal  = '';

        try {
            tituloFinal = fs.readFileSync(tituloPath, 'utf-8').trim();
        } catch {
            tituloFinal = `Contenido ${correlativo}`;
            console.warn(`⚠️  No se encontró TITULO_${correlativo}.txt en ${carpeta}`);
        }

        try {
            textoFinal = fs.readFileSync(textoPath, 'utf-8').trim();
        } catch {
            textoFinal = '';
            console.warn(`⚠️  No se encontró TEXTO_${correlativo}.txt en ${carpeta}`);
        }

        // Escapar comillas para JSON
        const tituloEscapado = tituloFinal.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        const textoEscapado  = textoFinal.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

        resultados.push({
            type:  typeStr,
            media: `${rutaRelativa}/${archivo}`,
            title: tituloEscapado,
            text:  textoEscapado
        });

        console.log(`  ✅ ${archivo} → [${typeStr}] "${tituloFinal.substring(0, 40)}..."`);
    }

    return resultados;
}

function extraerCorrelativo(nombreArchivo) {
    const match = nombreArchivo.match(/_(\d+)\./);
    return match ? parseInt(match[1], 10) : 999;
}

function generarConfigJs(carrusel, historias) {
    const timestamp = new Date().toISOString();

    const formatearArray = (items) => {
        if (items.length === 0) return '[]';
        const lineas = items.map(item => `    {
        type:  '${item.type}',
        media: '${item.media}',
        title: '${item.title}',
        text:  '${item.text}'
    }`);
        return `[\n${lineas.join(',\n')}\n]`;
    };

    return `// ============================================
// TripYa Travel - Configuración de Contenido
// ARCHIVO GENERADO AUTOMÁTICAMENTE por build.js
// Fecha de generación: ${timestamp}
// NO EDITAR MANUALMENTE
// ============================================

const CONTENIDO_CARRUSEL = ${formatearArray(carrusel)};

const CONTENIDO_HISTORIAS = ${formatearArray(historias)};

// Versión para cache-busting (se regenera en cada build)
const CACHE_VERSION = '${Date.now()}';
`;
}

// ============================================
// EJECUCIÓN PRINCIPAL
// ============================================

console.log('\n🚀 TripYa Travel - Build Script');
console.log('================================');

console.log('\n📂 Escaneando carpeta: inicio/');
const carrusel = escanearCarpeta(
    path.join(__dirname, 'inicio'),
    'inicio'
);

console.log(`\n📂 Escaneando carpeta: casos/`);
const historias = escanearCarpeta(
    path.join(__dirname, 'casos'),
    'casos'
);

console.log('\n📝 Generando js/config.js...');
const configContent = generarConfigJs(carrusel, historias);

const configPath = path.join(__dirname, 'js', 'config.js');
fs.writeFileSync(configPath, configContent, 'utf-8');

console.log('\n✅ js/config.js generado exitosamente');
console.log(`   → ${carrusel.length} elemento(s) en carrusel`);
console.log(`   → ${historias.length} historia(s) de éxito`);
console.log('\n================================\n');
