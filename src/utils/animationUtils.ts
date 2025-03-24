
// Utility functions for animations

/**
 * Creates a water bubble element with random properties
 * @returns HTMLDivElement representing a bubble
 */
export const createBubble = (): HTMLDivElement => {
  const bubble = document.createElement('div');
  
  // Random size between 5px and 25px (increased max size)
  const size = Math.floor(Math.random() * 21) + 5;
  
  // Random opacity between 0.1 and 0.5
  const opacity = (Math.random() * 0.4) + 0.1;
  
  // Random starting position across the bottom (wider range)
  const startPosition = Math.random() * 40; // Increased from 20% to 40%
  
  // Set bubble styles
  bubble.style.position = 'absolute';
  bubble.style.bottom = '0';
  bubble.style.left = `${startPosition}%`;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.borderRadius = '50%';
  bubble.style.backgroundColor = 'rgba(255, 255, 255, ' + opacity + ')';
  
  // Add random path variation with randomized animation duration
  const duration = 3 + Math.random() * 5; // Between 3-8 seconds
  bubble.style.animation = `rise ${duration}s linear`;
  
  // Add random z-index for layering effect
  bubble.style.zIndex = `${Math.floor(Math.random() * 5) + 1}`;
  
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
  
  // Create random path variations keyframes
  if (!document.querySelector('#bubble-random-paths')) {
    const randomPaths = document.createElement('style');
    randomPaths.id = 'bubble-random-paths';
    randomPaths.innerHTML = `
      @keyframes rise-path1 {
        0% {
          transform: translateY(0) translateX(0) scale(0.5);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        40% {
          transform: translateY(-${container.offsetHeight * 0.4}px) translateX(${container.offsetWidth * 0.2}px) scale(0.8);
        }
        90% {
          opacity: 0.7;
        }
        100% {
          transform: translateY(-${container.offsetHeight}px) translateX(${container.offsetWidth * 0.9}px) scale(1.2);
          opacity: 0;
        }
      }
      @keyframes rise-path2 {
        0% {
          transform: translateY(0) translateX(0) scale(0.5);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        30% {
          transform: translateY(-${container.offsetHeight * 0.3}px) translateX(${container.offsetWidth * 0.5}px) scale(0.9);
        }
        60% {
          transform: translateY(-${container.offsetHeight * 0.6}px) translateX(${container.offsetWidth * 0.3}px) scale(1.1);
        }
        90% {
          opacity: 0.7;
        }
        100% {
          transform: translateY(-${container.offsetHeight}px) translateX(${container.offsetWidth * 0.7}px) scale(1.2);
          opacity: 0;
        }
      }
      @keyframes rise-path3 {
        0% {
          transform: translateY(0) translateX(0) scale(0.5);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        50% {
          transform: translateY(-${container.offsetHeight * 0.5}px) translateX(${container.offsetWidth * 0.1}px) scale(1);
        }
        75% {
          transform: translateY(-${container.offsetHeight * 0.75}px) translateX(${container.offsetWidth * 0.6}px) scale(1.1);
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
    document.head.appendChild(randomPaths);
  }
  
  // Clear existing bubble interval if any
  const existingInterval = (window as any).__bubblesInterval;
  if (existingInterval) {
    clearInterval(existingInterval);
  }
  
  // Create bubbles at random intervals (more frequently)
  const interval = setInterval(() => {
    const bubble = createBubble();
    
    // Randomly assign one of the different path animations
    const pathNumber = Math.floor(Math.random() * 4); // 0-3
    if (pathNumber > 0) {
      bubble.style.animation = `rise-path${pathNumber} ${3 + Math.random() * 5}s ease-out`;
    }
    
    container.appendChild(bubble);
    
    // Remove bubble after animation completes
    setTimeout(() => {
      if (bubble.parentNode === container) {
        container.removeChild(bubble);
      }
    }, 8000); // Increased from 7000 to account for longer animations
  }, 500); // Reduced interval from 800 to 500ms to create more bubbles
  
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
