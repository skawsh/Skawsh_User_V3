
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value immediately
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Add event listener with passive: true for better performance
    mql.addEventListener("change", onChange, { passive: true })
    
    // Also listen for resize events for more responsive updates
    window.addEventListener("resize", onChange, { passive: true })
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", onChange)
    }
  }, [])

  // Return a boolean instead of possibly undefined
  return isMobile === undefined ? false : isMobile
}
