// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle video play/pause with delay
function handleVideoVisibility() {
    const videos = document.querySelectorAll('video'); // Select all video elements
    videos.forEach((video) => {
        if (isInViewport(video)) {
            setTimeout(() => {
                // Check visibility again before playing
                if (isInViewport(video)) {
                    video.play().catch((error) => {
                        console.error('Video playback failed:', error);
                    });
                }
            }, 6000); // Delay playback by 2000ms (2 seconds)
        } else {
            video.pause(); // Pause video if not in the viewport
        }
    });
}

// Add event listeners for scroll and resize events
window.addEventListener('scroll', handleVideoVisibility);
window.addEventListener('resize', handleVideoVisibility);

// Initial check on page load
document.addEventListener('DOMContentLoaded', handleVideoVisibility);
