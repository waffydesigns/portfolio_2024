// script.js
document.addEventListener('DOMContentLoaded', function() {
    const scrollContent = document.querySelector('.scroll-content');
    const container = document.querySelector('.scroll-container');
    const scrollItems = document.querySelectorAll('.scroll-content img');
    const totalItems = scrollItems.length;
    let offset = 0;
    let speed = 1; // Adjust scrolling speed
    let animationFrame;

    // IntersectionObserver setup for lazy loading
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '0px 0px 50px 0px', // Adjust root margin as needed
        threshold: 0.1 // Adjust threshold as needed
    });

    // Start observing each image
    scrollItems.forEach(img => {
        observer.observe(img);
    });

    // Clone the first set of items to the end for seamless scrolling
    for (let i = 0; i < totalItems; i++) {
        scrollContent.appendChild(scrollItems[i].cloneNode(true));
    }

    function scroll() {
        offset += speed;
        
        if (offset >= container.scrollWidth / 2) {
            offset = 0;
        }

        scrollContent.style.transform = `translateX(${-offset}px)`;
        animationFrame = requestAnimationFrame(scroll);
    }

    // Start scrolling
    scroll();

    // Cancel animation frame on window resize to prevent overlapping
    window.addEventListener('resize', function() {
        cancelAnimationFrame(animationFrame);
    });
});
