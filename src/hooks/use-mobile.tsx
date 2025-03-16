
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Create a throttled resize handler for better performance
    let timeoutId: NodeJS.Timeout | null = null;
    
    const handleResize = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        timeoutId = null;
      }, 50); // Small delay for better performance
    };
    
    // Set initial value immediately
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Use a media query for efficient checks
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }
    
    // Add event listeners with passive flag for better performance
    mql.addEventListener("change", onChange, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", handleResize)
      if (timeoutId) clearTimeout(timeoutId);
    }
  }, [])

  // Return a boolean instead of possibly undefined
  return isMobile === undefined ? false : isMobile
}
