const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel-image');
const leftArrow = document.querySelector('.carousel-arrow-left');
const rightArrow = document.querySelector('.carousel-arrow-right');
const indicatorsContainer = document.querySelector('.carousel-indicators');
let currentIndex = 1; // Start from the first actual image (accounting for clones)
let isTransitioning = false;
let autoSlideInterval;

// Function to change dot colors dynamically
function setDotColors(activeColor, inactiveColor) {
    document.documentElement.style.setProperty('--dot-active-color', activeColor);
    document.documentElement.style.setProperty('--dot-inactive-color', inactiveColor);
}

// Clone the first and last images for seamless looping
function cloneImages() {
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[images.length - 1].cloneNode(true);

    firstClone.classList.add('clone');
    lastClone.classList.add('clone');
    carousel.appendChild(firstClone);
    carousel.prepend(lastClone);
}

// Function to update the carousel position
function updateCarousel() {
    if (isTransitioning) return;
    isTransitioning = true;

    const offset = -currentIndex * 100;
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(${offset}%)`;

    carousel.addEventListener(
        'transitionend',
        () => {
            isTransitioning = false;

            if (currentIndex === 0) {
                currentIndex = images.length;
                carousel.style.transition = 'none';
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
            if (currentIndex === images.length + 1) {
                currentIndex = 1;
                carousel.style.transition = 'none';
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        },
        { once: true }
    );

    updateIndicators();
}

// Create indicators dynamically
function createIndicators() {
    indicatorsContainer.innerHTML = '';
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            stopAutoSlide(); // Stop auto slide on manual interaction
            goToImage(index + 1);
        });
        indicatorsContainer.appendChild(dot);
    });
}

// Update active indicator
function updateIndicators() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex - 1) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Show next image
function showNextImage() {
    if (isTransitioning) return;
    currentIndex++;
    updateCarousel();
}

// Show previous image
function showPrevImage() {
    if (isTransitioning) return;
    currentIndex--;
    updateCarousel();
}

// Go to a specific image
function goToImage(index) {
    currentIndex = index;
    updateCarousel();
}

// Add event listeners to arrows
rightArrow.addEventListener('click', () => {
    stopAutoSlide(); // Stop auto slide on manual interaction
    showNextImage();
});
leftArrow.addEventListener('click', () => {
    stopAutoSlide(); // Stop auto slide on manual interaction
    showPrevImage();
});

// Automatically move the carousel every 3 seconds
function startAutoSlide(interval = 5000) {
    stopAutoSlide(); // Clear any existing interval
    autoSlideInterval = setInterval(() => {
        if (!isTransitioning) {
            showNextImage();
        }
    }, interval);
}

// Stop automatic sliding
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Initialize the carousel
function initializeCarousel() {
    cloneImages();
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    createIndicators();
    updateIndicators();
    startAutoSlide(); // Start the automatic sliding
}

// Start the carousel
initializeCarousel();

