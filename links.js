// ARQUIVO: links.js
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const body = document.body;

    if (loader) {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                loader.style.display = 'none';
                body.classList.add('content-visible');
                setTimeout(() => {
                    body.classList.add('shine-active');
                }, 1500);
            }, 700);
        }, 2000);
    } else {
        body.classList.add('content-visible');
        body.classList.add('shine-active');
    }

    // Tema
    const themeBtn = document.getElementById('theme-toggle-btn');
    const sun = document.getElementById('theme-toggle-sun');
    const moon = document.getElementById('theme-toggle-moon');

    function updateIcon() {
        if (document.documentElement.classList.contains('dark')) {
            moon.classList.remove('hidden'); sun.classList.add('hidden');
        } else {
            sun.classList.remove('hidden'); moon.classList.add('hidden');
        }
    }

    if (themeBtn) {
        updateIcon();
        themeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            updateIcon();
        });
    }
});