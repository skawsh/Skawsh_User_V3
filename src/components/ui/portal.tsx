
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted 
    ? createPortal(
        <div className="portal-wrapper" style={{ position: 'relative', zIndex: 9999 }}>
          {children}
        </div>,
        document.body
      ) 
    : null;
};

export default Portal;
