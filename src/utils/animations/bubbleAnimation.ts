
import { createBubble } from './bubbleUtils';
import { 
  createBubbleKeyframes, 
  createSinkKeyframes, 
  createRandomPathKeyframes 
} from './keyframeUtils';

/**
 * Creates and adds bubbles to the container element
 * @param container - The element to add bubbles to
 * @param options - Optional configuration options
 */
export const startBubblesAnimation = (
  container: HTMLDivElement, 
  options?: { 
    interval?: number; 
    smallerBubbles?: boolean;
  }
) => {
  if (!container) return;
  
  // Create all necessary keyframes
  createBubbleKeyframes(container);
  createSinkKeyframes(container);
  createRandomPathKeyframes(container);
  
  // Clear existing bubble interval if any
  const existingInterval = (window as any).__bubblesInterval;
  if (existingInterval) {
    clearInterval(existingInterval);
  }
  
  // Use provided interval or default to 400ms
  const animationInterval = options?.interval || 400;
  
  // Create bubbles at specified intervals
  const interval = setInterval(() => {
    const bubble = createBubble(options?.smallerBubbles);
    
    // Determine if this bubble should go up or down (80% up, 20% down)
    const goingUp = Math.random() > 0.2;
    
    if (goingUp) {
      // Upward bubbles
      const pathNumber = Math.floor(Math.random() * 5); // 0-4 for variety
      if (pathNumber === 0) {
        bubble.style.animation = `rise-path1 ${4 + Math.random() * 6}s ease-out`;
      } else if (pathNumber === 1) {
        bubble.style.animation = `rise-path2 ${4 + Math.random() * 6}s ease-out`;
      } else if (pathNumber === 2) {
        bubble.style.animation = `rise-path3 ${4 + Math.random() * 6}s ease-out`;
      } else if (pathNumber === 3) {
        bubble.style.animation = `rise-swirl ${5 + Math.random() * 5}s ease-in-out`;
      } else {
        bubble.style.animation = `rise-zigzag ${4 + Math.random() * 6}s ease-in-out`;
      }
    } else {
      // Downward bubbles
      const pathNumber = Math.floor(Math.random() * 2); // 0-1 for less variety in downward paths
      if (pathNumber === 0) {
        bubble.style.animation = `sink ${5 + Math.random() * 5}s ease-in-out`;
      } else {
        bubble.style.animation = `sink-zigzag ${5 + Math.random() * 5}s ease-in-out`;
      }
      // Make sinking bubbles a bit smaller for visual variety
      const currentSize = parseInt(bubble.style.width);
      bubble.style.width = `${currentSize * 0.8}px`;
      bubble.style.height = `${currentSize * 0.8}px`;
    }
    
    container.appendChild(bubble);
    
    // Remove bubble after animation completes
    setTimeout(() => {
      if (bubble.parentNode === container) {
        container.removeChild(bubble);
      }
    }, 10000); // Increased to account for longer animations
  }, animationInterval);
  
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
