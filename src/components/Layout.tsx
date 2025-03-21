
import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User, Package } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  const navigateTo = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
      
      {/* Footer Navigation */}
      {!hideFooter && (
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-5 py-2">
              <button
                onClick={() => navigateTo('/')}
                className={`flex flex-col items-center justify-center py-2 ${
                  isActive('/') ? 'text-primary-500' : 'text-gray-500'
                }`}
              >
                <Home size={24} />
                <span className="text-xs mt-1">Home</span>
              </button>
              
              <button
                onClick={() => navigateTo('/services')}
                className={`flex flex-col items-center justify-center py-2 ${
                  isActive('/services') ? 'text-primary-500' : 'text-gray-500'
                }`}
              >
                <Search size={24} />
                <span className="text-xs mt-1">Explore</span>
              </button>
              
              <button
                onClick={() => navigateTo('/orders')}
                className={`flex flex-col items-center justify-center py-2 ${
                  isActive('/orders') ? 'text-primary-500' : 'text-gray-500'
                }`}
              >
                <Package size={24} />
                <span className="text-xs mt-1">Orders</span>
              </button>
              
              <button
                onClick={() => navigateTo('/favorites')}
                className={`flex flex-col items-center justify-center py-2 ${
                  isActive('/favorites') ? 'text-primary-500' : 'text-gray-500'
                }`}
              >
                <Heart size={24} />
                <span className="text-xs mt-1">Favorites</span>
              </button>
              
              <button
                onClick={() => navigateTo('/profile')}
                className={`flex flex-col items-center justify-center py-2 ${
                  isActive('/profile') ? 'text-primary-500' : 'text-gray-500'
                }`}
              >
                <User size={24} />
                <span className="text-xs mt-1">Profile</span>
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
