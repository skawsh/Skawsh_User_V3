
import { useEffect } from 'react';
import { useIsMobile } from './use-mobile';

interface UseMobileKeyboardProps {
  isOpen: boolean;
  contentRef: React.RefObject<HTMLElement>;
}

export const useMobileKeyboard = ({ isOpen, contentRef }: UseMobileKeyboardProps) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile || !isOpen) return;
    
    // Function to handle visual viewport changes (keyboard appearance)
    const handleVisualViewportResize = () => {
      const viewport = window.visualViewport;
      if (!viewport) return;
      
      const drawerContent = document.querySelector('.service-order-popup-content') as HTMLElement;
      if (!drawerContent) return;
      
      // Get the current viewport height
      const viewportHeight = viewport.height;
      const windowHeight = window.innerHeight;
      
      // If the viewport is significantly smaller than the window height, 
      // the keyboard is likely open
      const isKeyboardOpen = viewportHeight < windowHeight * 0.8;
      
      if (isKeyboardOpen) {
        // Keyboard is open - adjust scrollable areas for keyboard visibility
        const scrollArea = drawerContent.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
        if (scrollArea) {
          scrollArea.style.maxHeight = `${viewportHeight - 120}px`; // Account for header and footer
        }
        
        // Make sure the active input is visible
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          // Scroll the active element into view with some spacing
          setTimeout(() => {
            activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      } else {
        // Keyboard is closed - restore original layout
        const scrollArea = drawerContent.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
        if (scrollArea) {
          scrollArea.style.maxHeight = '';
        }
      }
    };
    
    // Add event listeners for viewport changes
    window.visualViewport?.addEventListener('resize', handleVisualViewportResize);
    window.visualViewport?.addEventListener('scroll', handleVisualViewportResize);
    
    // Focus event listener to handle scrolling when an input gets focus
    const handleFocusInput = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        // Small delay to let the keyboard appear
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    };
    
    // Add focus event listener to document
    document.addEventListener('focus', handleFocusInput, true);
    
    // Initial adjustment
    handleVisualViewportResize();
    
    // Cleanup
    return () => {
      window.visualViewport?.removeEventListener('resize', handleVisualViewportResize);
      window.visualViewport?.removeEventListener('scroll', handleVisualViewportResize);
      document.removeEventListener('focus', handleFocusInput, true);
      
      const drawerContent = document.querySelector('.service-order-popup-content') as HTMLElement;
      if (drawerContent) {
        const scrollArea = drawerContent.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
        if (scrollArea) {
          scrollArea.style.maxHeight = '';
        }
      }
    };
  }, [isMobile, isOpen]);
};
