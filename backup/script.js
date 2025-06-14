/**
 * Script per le interazioni della pagina MOVE&MIND
 * 
 * Gestisce:
 * 1. Cambio stile dell'header allo scroll.
 * 2. Logica delle tab nella sezione "Come Funziona".
 * 3. Animazioni degli elementi all'entrata nel viewport.
 * 4. Navigazione fluida (smooth scroll) per i link interni.
 */
document.addEventListener('DOMContentLoaded', function() {

    // 1. Header che cambia colore e ombra durante lo scroll
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Logica delle Tab per la sezione "Come Funziona"
    const tabContainer = document.querySelector('.how-it-works-container');
    if (tabContainer) {
        const tabButtons = tabContainer.querySelectorAll('.tab-button');
        const tabContents = tabContainer.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');

                // Rimuove 'active' da tutti i bottoni e contenuti
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Aggiunge 'active' al bottone cliccato e al contenuto corrispondente
                button.classList.add('active');
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // 3. Animazioni degli elementi allo scroll (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Opzionale: smette di osservare dopo l'animazione
                }
            });
        }, {
            threshold: 0.1 // L'animazione parte quando il 10% dell'elemento è visibile
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback per browser vecchi: mostra subito gli elementi
        animatedElements.forEach(el => el.classList.add('visible'));
    }
    
    // 4. Navigazione fluida per i link ancora (ancore)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});