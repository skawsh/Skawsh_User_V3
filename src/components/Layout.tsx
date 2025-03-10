
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Heart, ShoppingBag, User } from 'lucide-react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-16">
      <main className="flex-1 page-transition-enter">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-100 shadow-lg glass z-50">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
          <NavItem 
            to="/" 
            icon={<Home size={20} />} 
            label="Home" 
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
          <NavItem 
            to="/profile" 
            icon={<User size={20} />} 
            label="Profile" 
            isActive={isActive("/profile")}
          />
        </div>
      </nav>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 ${
        isActive 
          ? 'text-primary-500' 
          : 'text-gray-500 hover:text-primary-400'
      }`}
    >
      <div className={`${isActive ? 'scale-110 mb-1' : 'mb-1'} transition-transform duration-200`}>
        {icon}
      </div>
      <span className={`text-xs font-medium transition-all ${isActive ? 'opacity-100' : 'opacity-80'}`}>
        {label}
      </span>
    </Link>
  );
};

export default Layout;
