// script.js /*
document.addEventListener('DOMContentLoaded', function() {
    const scrollContent = document.querySelector('.client-item-wrap');
    const container = document.querySelector('.client-carousel');
    const scrollItems = document.querySelectorAll('.scroll-content');
    const totalItems = scrollItems.length;
    let offset = 0;
    let speed = .8; // Adjust scrolling speed
    let animationFrame;

    

   

    // Clone the first set of items to the end for seamless scrolling
   for (let i = 0; i < totalItems; i++) {
        scrollContent.appendChild(scrollItems[i].cloneNode(true));
    }

    function scroll() {
        offset += speed;
        
      if (offset >= container.scrollWidth + 3750) {
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
