
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
    return () => window.removeEventListener('scroll', saveScrollPosition);
  }, [pathname]);
  
  // Handle scroll behavior when pathname changes
  useEffect(() => {
    if (navigationType === 'POP') {
      // User is navigating back - restore previous scroll position
      const savedPosition = scrollPositions.current[pathname];
      if (savedPosition !== undefined) {
        setTimeout(() => {
          window.scrollTo(0, savedPosition);
        }, 0);
      }
    } else {
      // User is navigating to a new page - scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
