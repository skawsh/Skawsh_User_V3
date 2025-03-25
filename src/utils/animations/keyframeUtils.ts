
/**
 * Utility functions for creating animation keyframes
 */

/**
 * Creates keyframes for bubble animations
 * @param container - The container element for the bubbles
 */
export const createBubbleKeyframes = (container: HTMLDivElement) => {
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
}

/**
 * Creates keyframes for sinking bubble animations
 * @param container - The container element for the bubbles
 */
export const createSinkKeyframes = (container: HTMLDivElement) => {
  // Create sink animation (bubbles going down)
  if (!document.querySelector('#bubble-sink-keyframes')) {
    const sinkKeyframes = document.createElement('style');
    sinkKeyframes.id = 'bubble-sink-keyframes';
    sinkKeyframes.innerHTML = `
      @keyframes sink {
        0% {
          transform: translate(0, 0) scale(0.5);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        50% {
          transform: translate(${container.offsetWidth * 0.2}px, ${container.offsetHeight * 0.4}px) scale(1);
        }
        90% {
          opacity: 0.7;
        }
        100% {
          transform: translate(${container.offsetWidth * 0.5}px, ${container.offsetHeight}px) scale(1.2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(sinkKeyframes);
  }
}

/**
 * Creates keyframes for random bubble paths
 * @param container - The container element for the bubbles
 */
export const createRandomPathKeyframes = (container: HTMLDivElement) => {
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
      
      /* Swirl and zigzag paths for more eye-catching motion */
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
      
      /* Sinking animations (bubbles going down) */
      @keyframes sink-path1 {
        0% {
          transform: translate(0, 0) scale(0.5);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        40% {
          transform: translate(${container.offsetWidth * 0.3}px, ${container.offsetHeight * 0.4}px) scale(0.8);
        }
        90% {
          opacity: 0.7;
        }
        100% {
          transform: translate(${container.offsetWidth * 0.7}px, ${container.offsetHeight}px) scale(1.2);
          opacity: 0;
        }
      }
      
      @keyframes sink-zigzag {
        0% {
          transform: translate(0, 0) scale(0.5);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        25% {
          transform: translate(${container.offsetWidth * 0.2}px, ${container.offsetHeight * 0.2}px) scale(0.7);
        }
        50% {
          transform: translate(${container.offsetWidth * -0.1}px, ${container.offsetHeight * 0.5}px) scale(0.9);
        }
        75% {
          transform: translate(${container.offsetWidth * 0.2}px, ${container.offsetHeight * 0.7}px) scale(1.1);
        }
        90% {
          opacity: 0.7;
        }
        100% {
          transform: translate(${container.offsetWidth * 0.3}px, ${container.offsetHeight}px) scale(1.2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(randomPaths);
  }
}
