
// Utility functions for animations

/**
 * Creates a water bubble element with random properties
 * @returns HTMLDivElement representing a bubble
 */
export const createBubble = (): HTMLDivElement => {
  const bubble = document.createElement('div');
  
  // Random size between 5px and 30px (increased max size)
  const size = Math.floor(Math.random() * 26) + 5;
  
  // Random opacity between 0.1 and 0.6
  const opacity = (Math.random() * 0.5) + 0.1;
  
  // Random colors for bubbles (soft pastel colors)
  const colors = [
    'rgba(255, 255, 255, ' + opacity + ')',
    'rgba(173, 216, 230, ' + opacity + ')', // light blue
    'rgba(224, 255, 255, ' + opacity + ')', // light cyan
    'rgba(240, 248, 255, ' + opacity + ')', // alice blue
    'rgba(230, 230, 250, ' + opacity + ')', // lavender
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Set bubble styles
  bubble.style.position = 'absolute';
  bubble.style.top = '50%'; // Start from middle vertically
  bubble.style.left = `${Math.random() * 90}%`; // Random horizontal position
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.borderRadius = '50%';
  bubble.style.backgroundColor = randomColor;
  
  // Add sparkle effect to some bubbles
  if (Math.random() > 0.8) {
    bubble.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
  }
  
  // Make some bubbles more three-dimensional with gradients
  if (Math.random() > 0.6) {
    // Fix: Convert opacity + 0.2 to string before using replace
    const increasedOpacity = (opacity + 0.2).toString();
    bubble.style.background = `radial-gradient(circle at 30% 30%, ${randomColor.replace(opacity.toString(), increasedOpacity)}, ${randomColor})`;
  }
  
  // Add random path variation with randomized animation duration
  const duration = 4 + Math.random() * 6; // Between 4-10 seconds
  bubble.style.animation = `rise ${duration}s ease-in-out`;
  
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
          transform: translate(0, 0) scale(0.5);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        50% {
          transform: translate(${container.offsetWidth * 0.3}px, -${container.offsetHeight * 0.5}px) scale(1);
        }
        90% {
          opacity: 0.7;
        }
        100% {
          transform: translate(${container.offsetWidth * 0.8}px, -${container.offsetHeight}px) scale(1.2);
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
          transform: translate(0, 0) scale(0.5);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        40% {
          transform: translate(${container.offsetWidth * 0.2}px, -${container.offsetHeight * 0.4}px) scale(0.8);
        }
        90% {
          opacity: 0.7;
        }
        100% {
          transform: translate(${container.offsetWidth * 0.9}px, -${container.offsetHeight}px) scale(1.2);
          opacity: 0;
        }
      }
      @keyframes rise-path2 {
        0% {
          transform: translate(0, 0) scale(0.5);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        30% {
          transform: translate(${container.offsetWidth * 0.5}px, -${container.offsetHeight * 0.3}px) scale(0.9);
        }
        60% {
          transform: translate(${container.offsetWidth * 0.3}px, -${container.offsetHeight * 0.6}px) scale(1.1);
        }
        90% {
          opacity: 0.7;
        }
        100% {
          transform: translate(${container.offsetWidth * 0.7}px, -${container.offsetHeight}px) scale(1.2);
          opacity: 0;
        }
      }
      @keyframes rise-path3 {
        0% {
          transform: translate(0, 0) scale(0.5);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        50% {
          transform: translate(${container.offsetWidth * 0.1}px, -${container.offsetHeight * 0.5}px) scale(1);
        }
        75% {
          transform: translate(${container.offsetWidth * 0.6}px, -${container.offsetHeight * 0.75}px) scale(1.1);
        }
        90% {
          opacity: 0.7;
        }
        100% {
          transform: translate(${container.offsetWidth * 0.8}px, -${container.offsetHeight}px) scale(1.2);
          opacity: 0;
        }
      }
      
      /* New swirl and zigzag paths for more eye-catching motion */
      @keyframes rise-swirl {
        0% {
          transform: translate(0, 0) scale(0.5) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        30% {
          transform: translate(${container.offsetWidth * 0.3}px, -${container.offsetHeight * 0.2}px) scale(0.8) rotate(120deg);
        }
        60% {
          transform: translate(${container.offsetWidth * 0.5}px, -${container.offsetHeight * 0.5}px) scale(0.9) rotate(240deg);
        }
        90% {
          opacity: 0.7;
          transform: translate(${container.offsetWidth * 0.7}px, -${container.offsetHeight * 0.8}px) scale(1.1) rotate(320deg);
        }
        100% {
          transform: translate(${container.offsetWidth * 0.9}px, -${container.offsetHeight}px) scale(1.2) rotate(360deg);
          opacity: 0;
        }
      }
      
      @keyframes rise-zigzag {
        0% {
          transform: translate(0, 0) scale(0.5);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        25% {
          transform: translate(${container.offsetWidth * 0.2}px, -${container.offsetHeight * 0.2}px) scale(0.7);
        }
        50% {
          transform: translate(${container.offsetWidth * -0.1}px, -${container.offsetHeight * 0.5}px) scale(0.9);
        }
        75% {
          transform: translate(${container.offsetWidth * 0.3}px, -${container.offsetHeight * 0.7}px) scale(1.1);
        }
        90% {
          opacity: 0.7;
        }
        100% {
          transform: translate(${container.offsetWidth * 0.5}px, -${container.offsetHeight}px) scale(1.2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(randomPaths);
  }
  
  // Add floating sparkles style
  if (!document.querySelector('#floating-sparkles')) {
    const sparklesStyle = document.createElement('style');
    sparklesStyle.id = 'floating-sparkles';
    sparklesStyle.innerHTML = `
      @keyframes float-sparkle {
        0% {
          transform: translate(0, 0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 0.8;
        }
        50% {
          transform: translate(${container.offsetWidth * 0.1}px, -${container.offsetHeight * 0.2}px) rotate(180deg);
        }
        90% {
          opacity: 0.8;
        }
        100% {
          transform: translate(${container.offsetWidth * 0.2}px, -${container.offsetHeight * 0.4}px) rotate(360deg);
          opacity: 0;
        }
      }
      
      .floating-sparkle {
        position: absolute;
        width: 12px;
        height: 12px;
        pointer-events: none;
      }
    `;
    document.head.appendChild(sparklesStyle);
  }
  
  // Clear existing bubble interval if any
  const existingInterval = (window as any).__bubblesInterval;
  if (existingInterval) {
    clearInterval(existingInterval);
  }
  
  // Create sparkles at random intervals
  const createSparkles = () => {
    // Only add sparkles occasionally
    if (Math.random() > 0.7) {
      const sparkleContainer = document.createElement('div');
      sparkleContainer.className = 'floating-sparkle';
      sparkleContainer.style.top = '50%';
      sparkleContainer.style.left = `${Math.random() * 80 + 10}%`;
      sparkleContainer.style.color = Math.random() > 0.5 ? '#FFD700' : '#E5DEFF';
      sparkleContainer.style.animation = `float-sparkle ${4 + Math.random() * 3}s linear`;
      sparkleContainer.innerHTML = '✨';
      
      container.appendChild(sparkleContainer);
      
      // Remove sparkle after animation completes
      setTimeout(() => {
        if (sparkleContainer.parentNode === container) {
          container.removeChild(sparkleContainer);
        }
      }, 7000);
    }
  };
  
  // Create bubbles at random intervals (more frequently)
  const interval = setInterval(() => {
    const bubble = createBubble();
    
    // Randomly assign one of the different path animations
    const pathNumber = Math.floor(Math.random() * 6); // 0-5 for more variety
    if (pathNumber === 1) {
      bubble.style.animation = `rise-path1 ${4 + Math.random() * 6}s ease-out`;
    } else if (pathNumber === 2) {
      bubble.style.animation = `rise-path2 ${4 + Math.random() * 6}s ease-out`;
    } else if (pathNumber === 3) {
      bubble.style.animation = `rise-path3 ${4 + Math.random() * 6}s ease-out`;
    } else if (pathNumber === 4) {
      bubble.style.animation = `rise-swirl ${5 + Math.random() * 5}s ease-in-out`;
    } else if (pathNumber === 5) {
      bubble.style.animation = `rise-zigzag ${4 + Math.random() * 6}s ease-in-out`;
    }
    
    container.appendChild(bubble);
    
    // Create sparkles
    createSparkles();
    
    // Remove bubble after animation completes
    setTimeout(() => {
      if (bubble.parentNode === container) {
        container.removeChild(bubble);
      }
    }, 10000); // Increased to account for longer animations
  }, 400); // Reduced interval for more bubbles
  
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
