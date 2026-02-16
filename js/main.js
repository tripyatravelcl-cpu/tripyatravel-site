// ============================================
// TripYa Travel - JavaScript Principal
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar módulos
    NavigationModule.init();
    CarouselModule.init();
    StoriesModule.init();
});

// ============================================
// Módulo de Navegación
// ============================================
const NavigationModule = {
    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.handleHashChange();
    },

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                
                // Actualizar clases activas
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetId) {
                        section.classList.add('active');
                    }
                });

                // Actualizar URL sin recargar
                window.history.pushState(null, '', `#${targetId}`);

                // Scroll suave al top
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Cerrar menú móvil si está abierto
                this.closeMobileMenu();

                // Reproducir videos en historias si la sección está activa
                if (targetId === 'historias') {
                    StoriesModule.handleVideoPlayback();
                }
            });
        });

        // Manejar enlaces del footer
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
                    if (targetLink) {
                        targetLink.click();
                    }
                }
            });
        });
    },

    setupMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.main-nav');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        }
    },

    closeMobileMenu() {
        const nav = document.querySelector('.main-nav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (nav) nav.classList.remove('active');
        if (toggle) toggle.classList.remove('active');
    },

    handleHashChange() {
        // Manejar URL inicial con hash
        const hash = window.location.hash;
        if (hash) {
            const targetLink = document.querySelector(`.nav-link[href="${hash}"]`);
            if (targetLink) {
                setTimeout(() => targetLink.click(), 100);
            }
        }
    }
};

// ============================================
// Módulo de Carrusel
// ============================================
const CarouselModule = {
    currentSlide: 0,
    slides: [],
    autoplayInterval: null,
    progressAnimation: null,

    init() {
        this.loadCarouselContent();
    },

    async loadCarouselContent() {
        try {
            // Intentar cargar contenido de la carpeta "inicio"
            const content = await this.fetchCarouselData();
            
            if (content && content.length > 0) {
                this.slides = content;
                this.renderCarousel();
                this.setupCarouselControls();
                this.startAutoplay();
            } else {
                // Mostrar mensaje de placeholder si no hay contenido
                this.showPlaceholder();
            }
        } catch (error) {
            console.error('Error al cargar el carrusel:', error);
            this.showPlaceholder();
        }
    },

    async fetchCarouselData() {
        // Esta función simula la carga de archivos desde la carpeta "inicio"
        // En un entorno real con servidor, haría fetch a un endpoint que lea los archivos
        
        // Simulación: intentar cargar archivos conocidos
        const testFiles = [];
        
        // Intentar cargar archivos de ejemplo (del 1 al 5)
        for (let i = 1; i <= 5; i++) {
            try {
                // Intentar cargar imagen
                const imgResponse = await fetch(`inicio/MULTIMEDIA_IMG_${i}.jpg`);
                if (imgResponse.ok) {
                    const titleResponse = await fetch(`inicio/TITULO_${i}.txt`);
                    const textResponse = await fetch(`inicio/TEXTO_${i}.txt`);
                    
                    testFiles.push({
                        type: 'image',
                        media: `inicio/MULTIMEDIA_IMG_${i}.jpg`,
                        title: titleResponse.ok ? await titleResponse.text() : `Contenido ${i}`,
                        text: textResponse.ok ? await textResponse.text() : ''
                    });
                    continue;
                }

                // Intentar cargar video
                const vidResponse = await fetch(`inicio/MULTIMEDIA_VID_${i}.mp4`);
                if (vidResponse.ok) {
                    const titleResponse = await fetch(`inicio/TITULO_${i}.txt`);
                    const textResponse = await fetch(`inicio/TEXTO_${i}.txt`);
                    
                    testFiles.push({
                        type: 'video',
                        media: `inicio/MULTIMEDIA_VID_${i}.mp4`,
                        title: titleResponse.ok ? await titleResponse.text() : `Contenido ${i}`,
                        text: textResponse.ok ? await textResponse.text() : ''
                    });
                }
            } catch (e) {
                // Archivo no encontrado, continuar
            }
        }

        return testFiles;
    },

    renderCarousel() {
        const container = document.getElementById('carouselSlides');
        const dotsContainer = document.getElementById('carouselDots');
        
        container.innerHTML = '';
        dotsContainer.innerHTML = '';

        this.slides.forEach((slide, index) => {
            // Crear slide
            const slideElement = document.createElement('div');
            slideElement.className = 'carousel-slide';
            
            const mediaElement = document.createElement('div');
            mediaElement.className = 'carousel-slide-media';
            
            if (slide.type === 'image') {
                const img = document.createElement('img');
                img.src = slide.media;
                img.alt = slide.title;
                mediaElement.appendChild(img);
            } else if (slide.type === 'video') {
                const video = document.createElement('video');
                video.src = slide.media;
                video.controls = false;
                video.muted = true;
                video.playsInline = true;
                video.dataset.slideIndex = index;
                
                // Evento cuando el video termina
                video.addEventListener('ended', () => {
                    this.nextSlide();
                });
                
                mediaElement.appendChild(video);
            }
            
            const contentElement = document.createElement('div');
            contentElement.className = 'carousel-slide-content';
            contentElement.innerHTML = `
                <h2 class="carousel-slide-title">${slide.title}</h2>
                <p class="carousel-slide-text">${slide.text}</p>
            `;
            
            slideElement.appendChild(mediaElement);
            slideElement.appendChild(contentElement);
            container.appendChild(slideElement);

            // Crear dot
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Ir a slide ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        this.updateCarousel();
    },

    setupCarouselControls() {
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

        // Pausar autoplay al hover
        const container = document.querySelector('.carousel-container');
        if (container) {
            container.addEventListener('mouseenter', () => this.pauseAutoplay());
            container.addEventListener('mouseleave', () => this.resumeAutoplay());
        }
    },

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
        this.resetAutoplay();
    },

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
        this.resetAutoplay();
    },

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateCarousel();
        this.resetAutoplay();
    },

    updateCarousel() {
        const container = document.getElementById('carouselSlides');
        const dots = document.querySelectorAll('.carousel-dot');
        const progress = document.getElementById('carouselProgress');

        if (container) {
            container.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        }

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        // Manejar reproducción de videos
        const allVideos = container.querySelectorAll('video');
        allVideos.forEach((video, index) => {
            if (index === this.currentSlide) {
                video.currentTime = 0;
                video.play().catch(e => console.log('Autoplay prevented:', e));
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });

        // Manejar barra de progreso (solo para imágenes)
        const currentSlideType = this.slides[this.currentSlide]?.type;
        if (currentSlideType === 'image') {
            progress.classList.add('active');
            // Reiniciar animación
            progress.style.animation = 'none';
            setTimeout(() => {
                progress.style.animation = '';
            }, 10);
        } else {
            progress.classList.remove('active');
        }
    },

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            const currentSlideType = this.slides[this.currentSlide]?.type;
            // Solo avanzar automáticamente si es imagen (los videos avanzan cuando terminan)
            if (currentSlideType === 'image') {
                this.nextSlide();
            }
        }, 5000); // 5 segundos para imágenes
    },

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    },

    resumeAutoplay() {
        if (!this.autoplayInterval && this.slides.length > 0) {
            this.startAutoplay();
        }
    },

    resetAutoplay() {
        this.pauseAutoplay();
        this.resumeAutoplay();
    },

    showPlaceholder() {
        // El placeholder ya está en el HTML, no hacer nada
        console.log('No se encontró contenido para el carrusel. Mostrando mensaje de placeholder.');
    }
};

// ============================================
// Módulo de Historias de Éxito
// ============================================
const StoriesModule = {
    stories: [],
    observerCreated: false,

    init() {
        this.loadStories();
    },

    async loadStories() {
        try {
            const content = await this.fetchStoriesData();
            
            if (content && content.length > 0) {
                this.stories = content;
                this.renderStories();
                this.setupVideoObserver();
            } else {
                this.showPlaceholder();
            }
        } catch (error) {
            console.error('Error al cargar historias:', error);
            this.showPlaceholder();
        }
    },

    async fetchStoriesData() {
        // Simulación: intentar cargar archivos de la carpeta "casos"
        const testFiles = [];
        
        for (let i = 1; i <= 10; i++) {
            try {
                // Intentar cargar imagen
                const imgResponse = await fetch(`casos/MULTIMEDIA_IMG_${i}.jpg`);
                if (imgResponse.ok) {
                    const titleResponse = await fetch(`casos/TITULO_${i}.txt`);
                    const textResponse = await fetch(`casos/TEXTO_${i}.txt`);
                    
                    testFiles.push({
                        type: 'image',
                        media: `casos/MULTIMEDIA_IMG_${i}.jpg`,
                        title: titleResponse.ok ? await titleResponse.text() : `Historia ${i}`,
                        text: textResponse.ok ? await textResponse.text() : ''
                    });
                    continue;
                }

                // Intentar cargar video
                const vidResponse = await fetch(`casos/MULTIMEDIA_VID_${i}.mp4`);
                if (vidResponse.ok) {
                    const titleResponse = await fetch(`casos/TITULO_${i}.txt`);
                    const textResponse = await fetch(`casos/TEXTO_${i}.txt`);
                    
                    testFiles.push({
                        type: 'video',
                        media: `casos/MULTIMEDIA_VID_${i}.mp4`,
                        title: titleResponse.ok ? await titleResponse.text() : `Historia ${i}`,
                        text: textResponse.ok ? await textResponse.text() : ''
                    });
                }
            } catch (e) {
                // Archivo no encontrado, continuar
            }
        }

        return testFiles;
    },

    renderStories() {
        const container = document.getElementById('storiesContainer');
        container.innerHTML = '';

        this.stories.forEach((story, index) => {
            const storyCard = document.createElement('div');
            storyCard.className = 'story-card';
            
            const mediaElement = document.createElement('div');
            mediaElement.className = 'story-media';
            
            if (story.type === 'image') {
                const img = document.createElement('img');
                img.src = story.media;
                img.alt = story.title;
                img.loading = 'lazy';
                mediaElement.appendChild(img);
            } else if (story.type === 'video') {
                const video = document.createElement('video');
                video.src = story.media;
                video.controls = false;
                video.muted = true;
                video.playsInline = true;
                video.loop = false;
                video.dataset.storyIndex = index;
                mediaElement.appendChild(video);
            }
            
            const contentElement = document.createElement('div');
            contentElement.className = 'story-content';
            contentElement.innerHTML = `
                <h3 class="story-title">${story.title}</h3>
                <p class="story-text">${story.text}</p>
            `;
            
            storyCard.appendChild(mediaElement);
            storyCard.appendChild(contentElement);
            container.appendChild(storyCard);
        });
    },

    setupVideoObserver() {
        if (this.observerCreated) return;

        // Intersection Observer para reproducir videos cuando son visibles
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log('Autoplay prevented:', e));
                } else {
                    video.pause();
                }
            });
        }, options);

        // Observar todos los videos en historias
        const videos = document.querySelectorAll('.story-media video');
        videos.forEach(video => observer.observe(video));

        this.observerCreated = true;
    },

    handleVideoPlayback() {
        // Forzar revisión de videos cuando la sección se activa
        const videos = document.querySelectorAll('.story-media video');
        videos.forEach(video => {
            const rect = video.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (isVisible) {
                video.play().catch(e => console.log('Autoplay prevented:', e));
            }
        });
    },

    showPlaceholder() {
        console.log('No se encontraron historias de éxito. Mostrando mensaje de placeholder.');
    }
};
