
import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * ScrollToTop component that automatically scrolls to the top of the page
 * whenever the route changes, but preserves scroll position when navigating back.
 * This component should be placed inside the Router but outside of Routes in the component hierarchy.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  
  // Store scroll positions for each path
  const scrollPositions = useRef<Record<string, number>>({});
  
  // Save scroll position before location changes
  useEffect(() => {
    const saveScrollPosition = () => {
      scrollPositions.current[pathname] = window.scrollY;
    };
    
    window.addEventListener('scroll', saveScrollPosition);
    
    // Also save position right before unmounting this route
    return () => {
      scrollPositions.current[pathname] = window.scrollY;
      window.removeEventListener('scroll', saveScrollPosition);
    };
  }, [pathname]);
  
  // Handle scroll behavior when pathname changes
  useEffect(() => {
    // Wait for any DOM updates to complete
    const timeoutId = setTimeout(() => {
      if (navigationType === 'POP') {
        // User is navigating back - restore previous scroll position
        const savedPosition = scrollPositions.current[pathname];
        if (savedPosition !== undefined) {
          window.scrollTo({
            top: savedPosition,
            behavior: 'auto' // Use 'auto' instead of 'smooth' for immediate positioning
          });
        }
      } else {
        // User is navigating to a new page - scroll to top
        window.scrollTo(0, 0);
      }
    }, 100); // Increased timeout to ensure DOM is fully rendered
    
    return () => clearTimeout(timeoutId);
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
