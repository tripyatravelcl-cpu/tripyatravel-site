// ============================================
// TripYa Travel - JavaScript Principal
// ============================================

document.addEventListener('DOMContentLoaded', function() {
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
                
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetId) {
                        section.classList.add('active');
                    }
                });

                window.history.pushState(null, '', `#${targetId}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                this.closeMobileMenu();

                if (targetId === 'historias') {
                    StoriesModule.handleVideoPlayback();
                }
            });
        });

        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
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

    init() {
        this.loadCarouselContent();
    },

    loadCarouselContent() {
        // Usar contenido de la configuración
        this.slides = CONTENIDO_CARRUSEL;
        
        if (this.slides && this.slides.length > 0) {
            this.renderCarousel();
            this.setupCarouselControls();
            this.startAutoplay();
        }
    },

    bustCache(url) {
        const v = (typeof CACHE_VERSION !== 'undefined') ? CACHE_VERSION : Date.now();
        return `${url}?v=${v}`;
    },

    renderCarousel() {
        const container = document.getElementById('carouselSlides');
        const dotsContainer = document.getElementById('carouselDots');
        
        if (!container || !dotsContainer) return;
        
        container.innerHTML = '';
        dotsContainer.innerHTML = '';

        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'carousel-slide';
            
            const mediaElement = document.createElement('div');
            mediaElement.className = 'carousel-slide-media';
            
            if (slide.type === 'image') {
                const img = document.createElement('img');
                img.src = this.bustCache(slide.media);
                img.alt = slide.title;
                img.onerror = () => {
                    console.error(`Error al cargar imagen: ${slide.media}`);
                    mediaElement.innerHTML = '<div style="color: white; padding: 20px;">Error al cargar la imagen</div>';
                };
                mediaElement.appendChild(img);
            } else if (slide.type === 'video') {
                const video = document.createElement('video');
                video.src = this.bustCache(slide.media);
                video.controls = false;
                video.muted = true;
                video.playsInline = true;
                video.dataset.slideIndex = index;
                
                video.addEventListener('ended', () => {
                    this.nextSlide();
                });
                
                video.onerror = () => {
                    console.error(`Error al cargar video: ${slide.media}`);
                    mediaElement.innerHTML = '<div style="color: white; padding: 20px;">Error al cargar el video</div>';
                };
                
                mediaElement.appendChild(video);
            }
            
            const contentElement = document.createElement('div');
            contentElement.className = 'carousel-slide-content';
            contentElement.innerHTML = `
                <h2 class="carousel-slide-title">${this.escapeHtml(slide.title)}</h2>
                <p class="carousel-slide-text">${this.escapeHtml(slide.text)}</p>
            `;
            
            slideElement.appendChild(mediaElement);
            slideElement.appendChild(contentElement);
            container.appendChild(slideElement);

            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Ir a slide ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        this.updateCarousel();
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    setupCarouselControls() {
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

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

        if (!container) return;

        container.style.transform = `translateX(-${this.currentSlide * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

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

        const currentSlideType = this.slides[this.currentSlide]?.type;
        if (currentSlideType === 'image') {
            // Remover la clase, forzar reflow y volver a agregar para reiniciar animación
            progress.classList.remove('active');
            void progress.offsetWidth; // Forzar reflow
            progress.classList.add('active');
        } else {
            progress.classList.remove('active');
        }
    },

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            const currentSlideType = this.slides[this.currentSlide]?.type;
            if (currentSlideType === 'image') {
                this.nextSlide();
            }
        }, 10000); // 10 segundos para imágenes
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

    loadStories() {
        this.stories = CONTENIDO_HISTORIAS;
        
        if (this.stories && this.stories.length > 0) {
            this.renderStories();
            this.setupVideoObserver();
        }
    },

    bustCache(url) {
        const v = (typeof CACHE_VERSION !== 'undefined') ? CACHE_VERSION : Date.now();
        return `${url}?v=${v}`;
    },

    renderStories() {
        const container = document.getElementById('storiesContainer');
        if (!container) return;
        
        container.innerHTML = '';

        this.stories.forEach((story, index) => {
            const storyCard = document.createElement('div');
            storyCard.className = 'story-card';
            
            const mediaElement = document.createElement('div');
            mediaElement.className = 'story-media';
            
            if (story.type === 'image') {
                const img = document.createElement('img');
                img.src = this.bustCache(story.media);
                img.alt = story.title;
                img.loading = 'lazy';
                img.onerror = () => {
                    console.error(`Error al cargar imagen: ${story.media}`);
                    mediaElement.innerHTML = '<div style="padding: 20px;">Error al cargar la imagen</div>';
                };
                mediaElement.appendChild(img);
            } else if (story.type === 'video') {
                const video = document.createElement('video');
                video.src = this.bustCache(story.media);
                video.controls = false;
                video.muted = true;
                video.playsInline = true;
                video.loop = false;
                video.dataset.storyIndex = index;
                video.onerror = () => {
                    console.error(`Error al cargar video: ${story.media}`);
                    mediaElement.innerHTML = '<div style="padding: 20px;">Error al cargar el video</div>';
                };
                mediaElement.appendChild(video);
            }
            
            const contentElement = document.createElement('div');
            contentElement.className = 'story-content';
            contentElement.innerHTML = `
                <h3 class="story-title">${this.escapeHtml(story.title)}</h3>
                <p class="story-text">${this.escapeHtml(story.text)}</p>
            `;
            
            storyCard.appendChild(mediaElement);
            storyCard.appendChild(contentElement);
            container.appendChild(storyCard);
        });
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    setupVideoObserver() {
        if (this.observerCreated) return;

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

        const videos = document.querySelectorAll('.story-media video');
        videos.forEach(video => observer.observe(video));

        this.observerCreated = true;
    },

    handleVideoPlayback() {
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
    }
};
