
import { useState, useEffect, useCallback } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Memoize the check function to avoid recreating it on each render
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);
  
  useEffect(() => {
    setIsClient(true);
    
    // Set initial value
    checkMobile();
    
    // Create media query list - more efficient than resize event
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Use the more modern event listener approach
    const handleChange = () => checkMobile();
    
    // Add event listeners
    mql.addEventListener("change", handleChange, { passive: true });
    
    // Fallback to resize for older browsers
    window.addEventListener("resize", handleChange, { passive: true });
    
    return () => {
      mql.removeEventListener("change", handleChange);
      window.removeEventListener("resize", handleChange);
    };
  }, [checkMobile]);

  // Return actual value only on client-side
  return isClient ? isMobile : false;
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= MOBILE_BREAKPOINT && width < 1024);
    };
    
    // Set initial value
    checkTablet();
    
    // Create media query list
    const mql = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    
    const handleChange = () => checkTablet();
    
    // Add event listeners
    mql.addEventListener("change", handleChange, { passive: true });
    
    return () => {
      mql.removeEventListener("change", handleChange);
    };
  }, []);

  return isClient ? isTablet : false;
}
