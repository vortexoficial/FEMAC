/*
   Este arquivo contém toda a lógica de interatividade da página:
   1. Controle do Loader
   2. Controle do Menu Mobile
   3. Lógica de Smooth Scroll (Rolar Suave)
   4. Animação de Fade-in ao rolar a página
   5. Lógica de clique do Seletor de Tema
*/

document.addEventListener('DOMContentLoaded', () => {
            
    // --- 1. Lógica do Loader ---
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
        }, 1000);
    }

    // --- 2. Lógica do Menu Mobile ---
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    
    if (hamburgerBtn && closeMenuBtn && mobileMenu) {
        const mobileMenuLinks = mobileMenu.querySelectorAll('a[href^="#"]');

        // Abrir menu
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('-translate-x-full');
        });

        // Função para fechar o menu
        const closeMenu = () => {
            mobileMenu.classList.add('-translate-x-full');
        };

        // Fechar menu (botão X)
        closeMenuBtn.addEventListener('click', closeMenu);

        // Fechar menu (clicando em link)
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // --- 3. Lógica do Smooth Scroll (links âncora) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href.length > 1) { 
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 4. Lógica de Animação (Fade-in ao rolar) ---
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Ativa quando 10% do elemento está visível
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // --- 5. Lógica de clique do Seletor de Tema ---
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
});