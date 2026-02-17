// ============================================
// TripYa Travel - Configuración de Contenido
// ============================================
// Edita este archivo para agregar o modificar el contenido del sitio

// CONTENIDO DEL CARRUSEL (Sección Inicio)
// ========================================
// Formatos soportados:
// - Imágenes: .jpg, .jpeg, .png, .gif, .webp
// - Videos: .mp4, .webm, .mov

const CONTENIDO_CARRUSEL = [
    {
        type: 'image',                                    // 'image' o 'video'
        media: 'inicio/MULTIMEDIA_IMG_1.jpeg',           // Ruta al archivo
        title: 'Descubre el Caribe con Tu Familia',     // Título que se muestra
        text: 'Vive unas vacaciones inolvidables en los mejores resorts All Inclusive del Caribe. Te asesoramos en cada detalle para que solo te preocupes de disfrutar con tu familia.'
    }
    // IMPORTANTE: Para agregar más contenido, copia el bloque de arriba y pégalo aquí
    // Ejemplo con video:
    /*
    ,{
        type: 'video',
        media: 'inicio/MULTIMEDIA_VID_2.mp4',
        title: 'Experiencias All Inclusive',
        text: 'Hoteles de 5 estrellas, comida ilimitada, bebidas premium y actividades para toda la familia.'
    }
    */
];

// HISTORIAS DE ÉXITO (Testimonios)
// ========================================
const CONTENIDO_HISTORIAS = [
    {
        type: 'image',
        media: 'casos/MULTIMEDIA_IMG_1.jpeg',
        title: 'Familia González Punta Cana',
        text: 'Resort all inclusive, transfers privados y actividades para niños. Planificación clara y acompañamiento permanente.'
    }
    // Para agregar más historias, copia el bloque de arriba
    /*
    ,{
        type: 'image',
        media: 'casos/MULTIMEDIA_IMG_2.jpg',
        title: 'Familia Rodríguez - Cancún 2024',
        text: '"Nuestra experiencia con TripYa Travel fue excepcional. Nos asesoraron en cada paso."'
    }
    */
];

// NO EDITES DEBAJO DE ESTA LÍNEA
// ========================================

// Cache-busting: fuerza al navegador a pedir siempre la versión más nueva
// Cambia este número cada vez que actualices imágenes en el repo
// Ejemplo: si hoy es 17/02/2026, pon: const CACHE_VERSION = '20260217';
const CACHE_VERSION = '202602171132';
