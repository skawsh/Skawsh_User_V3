
// Utility functions for animations

/**
 * Creates a water bubble element with random properties
 * @returns HTMLDivElement representing a bubble
 */
export const createBubble = (): HTMLDivElement => {
  const bubble = document.createElement('div');
  
  // Random size between 5px and 20px
  const size = Math.floor(Math.random() * 16) + 5;
  
  // Random opacity between 0.1 and 0.5
  const opacity = (Math.random() * 0.4) + 0.1;
  
  // Set bubble styles
  bubble.style.position = 'absolute';
  bubble.style.bottom = '0';
  bubble.style.left = `${Math.random() * 20}%`; // Start from bottom left area
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.borderRadius = '50%';
  bubble.style.backgroundColor = 'rgba(255, 255, 255, ' + opacity + ')';
  bubble.style.animation = `rise ${3 + Math.random() * 4}s linear`;
  bubble.style.zIndex = '1';
  
  return bubble;
}

/**
 * Creates and adds bubbles to the container element
 * @param container - The element to add bubbles to
 */
export const startBubblesAnimation = (container: HTMLDivElement) => {
  if (!container) return;
  
  // Create keyframes for bubble animation if not already added
  if (!document.querySelector('#bubble-keyframes')) {
    const keyframes = document.createElement('style');
    keyframes.id = 'bubble-keyframes';
    keyframes.innerHTML = `
      @keyframes rise {
        0% {
          transform: translateY(0) translateX(0) scale(0.5);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 0.7;
        }
        100% {
          transform: translateY(-${container.offsetHeight}px) translateX(${container.offsetWidth * 0.8}px) scale(1.2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(keyframes);
  }
  
  // Clear existing bubble interval if any
  const existingInterval = (window as any).__bubblesInterval;
  if (existingInterval) {
    clearInterval(existingInterval);
  }
  
  // Create bubbles at random intervals
  const interval = setInterval(() => {
    const bubble = createBubble();
    container.appendChild(bubble);
    
    // Remove bubble after animation completes
    setTimeout(() => {
      if (bubble.parentNode === container) {
        container.removeChild(bubble);
      }
    }, 7000);
  }, 800);
  
  // Store interval ID for cleanup
  (window as any).__bubblesInterval = interval;
  
  return interval;
}

/**
 * Stops the bubbles animation and cleans up
 */
export const stopBubblesAnimation = () => {
  const interval = (window as any).__bubblesInterval;
  if (interval) {
    clearInterval(interval);
    (window as any).__bubblesInterval = null;
  }
}
