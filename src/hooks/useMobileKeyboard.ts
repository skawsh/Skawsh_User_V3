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
        // Keyboard is open - adjust content to be visible above keyboard
        drawerContent.style.height = `${viewportHeight}px`;
        drawerContent.style.maxHeight = `${viewportHeight}px`;
        
        // Make the content scrollable
        drawerContent.style.overflow = 'auto';
        
        // Keep the input in view when keyboard appears
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          // Scroll the active element into view with some spacing
          setTimeout(() => {
            activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      } else {
        // Keyboard is closed - restore original layout
        drawerContent.style.height = '';
        drawerContent.style.maxHeight = '';
        drawerContent.style.overflow = '';
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
        drawerContent.style.height = '';
        drawerContent.style.maxHeight = '';
        drawerContent.style.overflow = '';
      }
    };
  }, [isMobile, isOpen]);
};
