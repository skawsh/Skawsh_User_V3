
/**
 * Utility functions for creating and managing bubble animations
 */

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
    // Converting opacity + 0.2 to string before using replace
    const increasedOpacity = (opacity + 0.2).toString();
    bubble.style.background = `radial-gradient(circle at 30% 30%, ${randomColor.replace(opacity.toString(), increasedOpacity)}, ${randomColor})`;
  }
  
  // The animation will be set later in the animation controller
  
  // Add random z-index for layering effect
  bubble.style.zIndex = `${Math.floor(Math.random() * 5) + 1}`;
  
  return bubble;
}
