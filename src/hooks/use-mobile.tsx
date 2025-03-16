
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Use throttled resize handler to prevent excessive updates
    let resizeTimeout: number | null = null
    
    const onChange = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout)
      }
      
      resizeTimeout = window.setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        resizeTimeout = null
      }, 50) // Small throttle delay for smoother transitions
    }
    
    // Set initial value immediately without delay
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Add event listeners with passive flag for better performance
    mql.addEventListener("change", onChange, { passive: true })
    window.addEventListener("resize", onChange, { passive: true })
    
    return () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout)
      }
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", onChange)
    }
  }, [])

  // Return a boolean instead of possibly undefined
  return isMobile === undefined ? false : isMobile
}
