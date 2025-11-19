/*
   ARQUIVO: script.js
   CONTÉM TODA A LÓGICA DO SITE FEMAC ENGENHARIA
*/

document.addEventListener('DOMContentLoaded', () => {
            
    // ============================================================
    // 1. LÓGICA DO LOADER
    // ============================================================
    const loader = document.getElementById('loader');
    
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 700);
        }, 2200);
    }

    // ============================================================
    // 2. MENU MOBILE
    // ============================================================
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    
    if (hamburgerBtn && closeMenuBtn && mobileMenu) {
        const mobileMenuLinks = mobileMenu.querySelectorAll('a[href^="#"]');

        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('-translate-x-full');
        });

        const closeMenu = () => {
            mobileMenu.classList.add('-translate-x-full');
        };

        closeMenuBtn.addEventListener('click', closeMenu);

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // ============================================================
    // 3. SMOOTH SCROLL (Rolar Suave)
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1) { 
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ============================================================
    // 4. ANIMAÇÃO FADE-IN AO ROLAR
    // ============================================================
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // ============================================================
    // 5. DARK MODE (TEMA)
    // ============================================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('theme-toggle-sun');
    const moonIcon = document.getElementById('theme-toggle-moon');

    const updateIcon = () => {
        if (document.documentElement.classList.contains('dark')) {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    };

    if (themeToggleBtn && sunIcon && moonIcon) {
        updateIcon();
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            updateIcon();
        });
    }

    // ============================================================
    // 6. SLIDER DE DEPOIMENTOS (Infinito + Drag Mobile/PC)
    // ============================================================
    const testimonialsSlider = document.getElementById('testimonials-slider');

    if (testimonialsSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let autoScrollFrame;
        let isAutoScrolling = true;

        const animateTestimonials = () => {
            if (!isAutoScrolling) return;
            testimonialsSlider.scrollLeft += 1;
            if (testimonialsSlider.scrollLeft >= (testimonialsSlider.scrollWidth / 2)) {
                testimonialsSlider.scrollLeft = 0;
            }
            autoScrollFrame = requestAnimationFrame(animateTestimonials);
        };

        autoScrollFrame = requestAnimationFrame(animateTestimonials);

        const stopAutoScroll = () => { isAutoScrolling = false; cancelAnimationFrame(autoScrollFrame); };
        const startAutoScroll = () => { if(!isAutoScrolling) { isAutoScrolling = true; autoScrollFrame = requestAnimationFrame(animateTestimonials); }};

        // --- Eventos MOUSE (PC) ---
        testimonialsSlider.addEventListener('mousedown', (e) => {
            stopAutoScroll();
            isDown = true;
            testimonialsSlider.classList.add('cursor-grabbing');
            testimonialsSlider.classList.remove('cursor-grab');
            startX = e.pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });
        testimonialsSlider.addEventListener('mouseleave', () => { isDown = false; testimonialsSlider.classList.remove('cursor-grabbing'); startAutoScroll(); });
        testimonialsSlider.addEventListener('mouseup', () => { isDown = false; testimonialsSlider.classList.remove('cursor-grabbing'); startAutoScroll(); });
        testimonialsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });

        // --- Eventos TOUCH (MOBILE) ---
        testimonialsSlider.addEventListener('touchstart', (e) => {
            stopAutoScroll();
            isDown = true;
            startX = e.touches[0].pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        }, { passive: true });

        testimonialsSlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        }, { passive: true });

        testimonialsSlider.addEventListener('touchend', () => {
            isDown = false;
            startAutoScroll();
        });
    }

    // ============================================================
    // 7. GALERIA DE PROJETOS (Vertical 380x600px + Touch)
    // ============================================================
    const gallerySlider = document.getElementById('gallery-slider');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeLightboxBtn = document.getElementById('close-lightbox');

    let galleryScrollFrame;
    let isGalleryScrolling = true;

    // --- 7.1 Funções de Animação ---
    const animateGallery = () => {
        if (!gallerySlider || !isGalleryScrolling) return;
        gallerySlider.scrollLeft += 0.8;
        if (gallerySlider.scrollLeft >= (gallerySlider.scrollWidth / 2) - 10) {
            gallerySlider.scrollLeft = 0;
        }
        galleryScrollFrame = requestAnimationFrame(animateGallery);
    };

    const stopGallery = () => { isGalleryScrolling = false; cancelAnimationFrame(galleryScrollFrame); };
    const startGallery = () => { if (!isGalleryScrolling) { isGalleryScrolling = true; galleryScrollFrame = requestAnimationFrame(animateGallery); }};

    // --- 7.2 Função para carregar imagem ---
    const tryLoadImage = (imgElement, imageNumber) => {
        const extensions = ['.png', '.jpg', '.jpeg', '.JPG', '.PNG']; 
        let currentExtIndex = 0;

        function loadNext() {
            if (currentExtIndex >= extensions.length) {
                imgElement.style.display = 'none';
                imgElement.parentElement.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-gray-400 text-xs p-2 text-center"><i class="fas fa-image text-xl mb-1"></i><br>Img ${imageNumber}</div>`;
                return;
            }
            const nextSrc = `galeria/${imageNumber}${extensions[currentExtIndex]}`;
            currentExtIndex++;
            imgElement.src = nextSrc;
        }
        imgElement.onerror = function() { loadNext(); };
        loadNext();
    };

    // --- 7.3 Geração do HTML da Galeria ---
    if (gallerySlider) {
        const totalImages = 31;
        let htmlContent = '';

        const createSlide = (num) => `
            <div class="relative shrink-0 rounded-xl overflow-hidden group/item shadow-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        w-[300px] h-[480px]
                        md:w-[380px] md:h-[600px]">
                <img data-num="${num}" 
                     alt="Projeto ${num}" 
                     class="gallery-img-load w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110 pointer-events-none">
                
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer lightbox-trigger">
                    <i class="fas fa-search-plus text-white text-3xl drop-shadow-lg"></i>
                </div>
            </div>
        `;

        for (let i = 1; i <= totalImages; i++) { htmlContent += createSlide(i); }
        for (let i = 1; i <= totalImages; i++) { htmlContent += createSlide(i); }

        gallerySlider.innerHTML = htmlContent;

        const imagesToLoad = gallerySlider.querySelectorAll('.gallery-img-load');
        imagesToLoad.forEach(img => {
            tryLoadImage(img, img.getAttribute('data-num'));
        });

        galleryScrollFrame = requestAnimationFrame(animateGallery);

        let isDown = false, startX, scrollLeft;

        // --- Eventos MOUSE ---
        gallerySlider.addEventListener('mousedown', (e) => { stopGallery(); isDown = true; gallerySlider.classList.add('cursor-grabbing'); startX = e.pageX - gallerySlider.offsetLeft; scrollLeft = gallerySlider.scrollLeft; });
        gallerySlider.addEventListener('mouseleave', () => { isDown = false; gallerySlider.classList.remove('cursor-grabbing'); if (lightboxModal && lightboxModal.classList.contains('hidden')) startGallery(); });
        gallerySlider.addEventListener('mouseup', () => { isDown = false; gallerySlider.classList.remove('cursor-grabbing'); if (lightboxModal && lightboxModal.classList.contains('hidden')) startGallery(); });
        gallerySlider.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - gallerySlider.offsetLeft; const walk = (x - startX) * 2; gallerySlider.scrollLeft = scrollLeft - walk; });

        // --- Eventos TOUCH (Para Mobile) ---
        gallerySlider.addEventListener('touchstart', (e) => {
            stopGallery();
            isDown = true;
            startX = e.touches[0].pageX - gallerySlider.offsetLeft;
            scrollLeft = gallerySlider.scrollLeft;
        }, { passive: true });

        gallerySlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - gallerySlider.offsetLeft;
            const walk = (x - startX) * 2;
            gallerySlider.scrollLeft = scrollLeft - walk;
        }, { passive: true });

        gallerySlider.addEventListener('touchend', () => {
            isDown = false;
            if (lightboxModal && lightboxModal.classList.contains('hidden')) startGallery();
        });
    }

    // --- 7.4 Lógica do Lightbox ---
    setTimeout(() => {
        const triggers = document.querySelectorAll('.lightbox-trigger');

        if (lightboxModal && lightboxImg) {
            triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    stopGallery();
                    const imgElement = trigger.previousElementSibling;
                    if (imgElement && imgElement.tagName === 'IMG') {
                         lightboxImg.src = imgElement.src;
                         lightboxModal.classList.remove('hidden');
                         setTimeout(() => {
                             lightboxModal.classList.remove('opacity-0');
                             lightboxImg.classList.remove('scale-95');
                             lightboxImg.classList.add('scale-100');
                         }, 10);
                    }
                });
            });

            const closeLightbox = () => {
                lightboxModal.classList.add('opacity-0');
                lightboxImg.classList.remove('scale-100');
                lightboxImg.classList.add('scale-95');
                setTimeout(() => { lightboxModal.classList.add('hidden'); lightboxImg.src = ''; startGallery(); }, 300);
            };

            if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
            lightboxModal.addEventListener('click', (e) => { if (e.target === lightboxModal) closeLightbox(); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) closeLightbox(); });
        }
    }, 500);
});