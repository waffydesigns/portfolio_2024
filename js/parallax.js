document.addEventListener('scroll', () => {
    const image = document.querySelector('.prlx-image');
    if (image) {
        // Use scrollY and apply parallax effect conditionally for screen sizes
        let scrollOffset = window.scrollY-4000;

        // Reduce or disable parallax on smaller screens
        if (window.innerWidth > 768) {
            image.style.transform = `translateY(${scrollOffset * 0.5}px)`; // Normal parallax for desktops
        } else {
            
            let scrollOffset = window.scrollY-2600;
            image.style.transform = `scale(1.4) translateY(${scrollOffset * 0.2}px)`; // Reduced effect for smaller screens
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const openPopupButton = document.getElementById('openPopup');
    const closePopupButton = document.getElementById('closePopup');
    const popupOverlay = document.getElementById('popupOverlay');
    const body = document.body;

    // Open the popup
    openPopupButton.addEventListener('click', () => {
        popupOverlay.style.display = 'flex'; // Show the popup
        body.classList.add('no-scroll'); // Disable scrolling on the page
    });

    // Close the popup
    closePopupButton.addEventListener('click', () => {
        popupOverlay.style.display = 'none'; // Hide the popup
        body.classList.remove('no-scroll'); // Re-enable scrolling on the page
    });

    // Close popup when clicking outside the container
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
            body.classList.remove('no-scroll'); // Re-enable scrolling
        }
    });
});
