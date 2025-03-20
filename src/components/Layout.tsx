
import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Heart, ShoppingBag } from 'lucide-react';
import SackBar from './SackBar';

type LayoutProps = {
  children: React.ReactNode;
  hideFooter?: boolean;
};

// Memoized NavItem component to prevent unnecessary re-renders
const NavItem = memo(({ to, icon, label, isActive }: {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 ${
        isActive 
          ? 'text-primary-500' 
          : 'text-gray-500 hover:text-primary-400'
      }`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      <div 
        className={`${isActive ? 'scale-110 mb-1' : 'mb-1'} transition-transform duration-200 ${
          isPressed ? 'scale-75' : ''
        }`}
      >
        {icon}
      </div>
      <span className={`text-xs font-bold transition-all ${
        isActive ? 'opacity-100' : 'opacity-80'
      } ${isPressed ? 'scale-95' : ''}`}>
        {label}
      </span>
    </Link>
  );
});

NavItem.displayName = 'NavItem';

const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Check if current path is a studio profile page
  const isStudioProfilePage = location.pathname.includes('/studio/');
  // Check if current path is the cart page
  const isCartPage = location.pathname === '/cart';
  // Check if current path is the profile page
  const isProfilePage = location.pathname === '/profile';
  
  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY < lastScrollY) {
      // Scrolling up
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scrolling down and not at the top
      setIsVisible(false);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const isActive = useCallback((path: string) => {
    return location.pathname === path;
  }, [location.pathname]);
  
  const shouldShowBottomNav = !isStudioProfilePage && !isCartPage && !hideFooter;
  
  // Only show SackBar on pages other than studio profile, profile, and cart
  const shouldShowSackBar = !isStudioProfilePage && !isProfilePage && !isCartPage && !hideFooter;

  return (
    <div className="min-h-screen flex flex-col pb-16 overflow-hidden bg-primary-50">
      <main className="flex-1 page-transition-enter bg-white will-change-transform">
        {children}
      </main>
      
      {shouldShowSackBar && <SackBar isVisible={isVisible} />}
      
      {shouldShowBottomNav && (
        <nav 
          className={`fixed bottom-0 w-full bg-white border-t border-gray-100 shadow-lg glass z-40 transition-all duration-500 ease-in-out transform ${
            isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{
            // Add safe area inset for iOS devices
            paddingBottom: 'env(safe-area-inset-bottom, 0px)'
          }}
        >
          <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
            <NavItem 
              to="/" 
              icon={<Home size={20} />} 
              label="Skawsh" 
              isActive={isActive("/")}
            />
            <NavItem 
              to="/services" 
              icon={<Layers size={20} />} 
              label="Services" 
              isActive={isActive("/services")}
            />
            <NavItem 
              to="/favorites" 
              icon={<Heart size={20} />} 
              label="Washlist" 
              isActive={isActive("/favorites")}
            />
            <NavItem 
              to="/cart" 
              icon={<ShoppingBag size={20} />} 
              label="Sack" 
              isActive={isActive("/cart")}
            />
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
