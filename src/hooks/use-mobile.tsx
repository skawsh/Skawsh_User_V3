
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Use a media query for efficient checks - this is the most performant way
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Set initial value based on media query
    setIsMobile(mql.matches)
    
    // Using a proper throttle mechanism with requestAnimationFrame
    let rafId: number | null = null
    
    const handleResize = () => {
      // Cancel any pending animation frame to avoid excessive updates
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      
      // Use requestAnimationFrame for smoother updates aligned with browser paint cycle
      rafId = requestAnimationFrame(() => {
        setIsMobile(mql.matches)
        rafId = null
      })
    }
    
    // Subscribe to media query change event
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }
    
    // Add event listeners with passive flag for better performance
    mql.addEventListener("change", onChange, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })
    
    // Initial call to ensure the value is set immediately
    handleResize()
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", handleResize)
      
      // Clean up any pending animation frame on unmount
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  // Return a boolean instead of possibly undefined
  return isMobile === undefined ? false : isMobile
}
