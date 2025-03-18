
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Layout from '../components/Layout';
import StudioHeader from '../components/studio/StudioHeader';
import ServiceList from '../components/studio/ServiceList';
import { ShoppingBag, ChevronLeft, MoreVertical, Share, Info, Flag } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Helper function to format currency in Indian Rupee format
export const formatIndianRupee = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(amount).replace('₹', '₹');
};

const StudioProfile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // Optimize initial scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);

  // Optimize scroll event handling
  useEffect(() => {
    const handleScroll = () => {
      if (backButtonRef.current) {
        const backButtonPosition = backButtonRef.current.getBoundingClientRect().top;
        if ((backButtonPosition < 0 && !isScrolled) || (backButtonPosition >= 0 && isScrolled)) {
          setIsScrolled(backButtonPosition < 0);
        }
      }
    };
    
    // Use requestAnimationFrame for smoother scroll handling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isScrolled]);

  // Optimized cart data loading
  useEffect(() => {
    const loadCartData = () => {
      try {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
          const parsedItems = JSON.parse(storedCartItems);
          const studioSpecificItems = parsedItems.filter((item: any) => !studio.id || item.studioId === studio.id);
          setCartCount(studioSpecificItems.length);
        }
      } catch (error) {
        console.error('Error parsing cart items:', error);
      }
    };
    
    loadCartData();
  }, []);

  // Memoized callbacks
  const handleBackClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleShareStudio = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: studio.name,
        text: `Check out ${studio.name}`,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }, []);

  const handleAboutStudio = useCallback(() => {
    alert(`About ${studio.name}: ${studio.description}`);
  }, []);

  const handleReportStudio = useCallback(() => {
    alert(`Thank you for your feedback. ${studio.name} has been reported.`);
  }, []);

  const handleCartUpdate = useCallback((count: number) => {
    setCartCount(count);
  }, []);

  const handlePopupVisibility = useCallback((isOpen: boolean) => {
    setIsPopupOpen(isOpen);
  }, []);

  const handleGoToCart = useCallback(() => {
    navigate('/cart', {
      state: {
        studioId: studio.id
      }
    });
  }, [navigate]);

  // Memoize studio data
  const studio = useMemo(() => ({
    id: '1',
    name: 'Pristine Laundry',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 126,
    deliveryTime: '1-2 days',
    description: 'Premium laundry services with eco-friendly cleaning options.'
  }), []);

  // Memoize services data
  const services = useMemo(() => [{
    id: '1',
    name: 'Dry Cleaning',
    description: 'Professional cleaning for delicate fabrics and special care items.',
    price: 8.99,
    unit: 'per piece'
  }, {
    id: '2',
    name: 'Wash & Fold',
    description: 'Complete laundry service charged by weight.',
    price: 2.49,
    unit: 'per kg'
  }, {
    id: '3',
    name: 'Ironing',
    description: 'Professional pressing and wrinkle removal.',
    price: 4.99,
    unit: 'per piece'
  }, {
    id: '4',
    name: 'Express Service',
    description: 'Same-day service when ordered before 10 AM.',
    price: 12.99,
    unit: 'per kg'
  }, {
    id: '5',
    name: 'Carpet Cleaning',
    description: 'Deep cleaning for carpets and rugs.',
    price: 3.49,
    unit: 'per sft'
  }], []);

  // Optimize cart button rendering with memoization
  const cartButton = useMemo(() => {
    if (cartCount > 0) {
      return (
        <div 
          onClick={handleGoToCart} 
          className={`fixed bottom-24 left-6 h-12 w-12 rounded-full shadow-lg text-white flex items-center justify-center cursor-pointer hover:bg-primary-600 transition-all duration-300 animate-bounce-once py-0 px-0 mx-0 my-[-65px] ${
            isPopupOpen ? 'z-30 bg-primary-400' : 'z-40 bg-primary-500'
          }`}
        >
          <div className="relative">
            <ShoppingBag size={20} />
            <Badge variant="default" className="absolute -top-2 -right-2 bg-red-500 text-white border-2 border-white">
              {cartCount}
            </Badge>
          </div>
        </div>
      );
    }
    return null;
  }, [cartCount, isPopupOpen, handleGoToCart]);

  // Pre-compute sticky header elements to avoid recalculation
  const stickyHeader = useMemo(() => {
    if (!isScrolled) return null;
    
    return (
      <div className="fixed top-0 left-0 right-0 bg-white z-40 shadow-md animate-fade-in">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button onClick={handleBackClick} className="mr-3 p-1 rounded-full text-gray-700 bg-gray-100/70">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-semibold truncate">{studio.name}</h2>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded-full hover:bg-gray-100 bg-gray-100/70">
                <MoreVertical size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleShareStudio} className="flex items-center gap-2">
                <Share size={16} />
                <span>Share Studio</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAboutStudio} className="flex items-center gap-2">
                <Info size={16} />
                <span>About Studio</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleReportStudio} className="flex items-center gap-2 text-red-500">
                <Flag size={16} />
                <span>Report this Studio</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }, [isScrolled, handleBackClick, studio.name, handleShareStudio, handleAboutStudio, handleReportStudio]);

  return (
    <Layout>
      <div className="no-scrollbar">
        {stickyHeader}
        
        <StudioHeader 
          name={studio.name} 
          image={studio.image} 
          rating={studio.rating} 
          reviewCount={studio.reviewCount} 
          deliveryTime={studio.deliveryTime} 
          backButtonRef={backButtonRef} 
          description={studio.description} 
          onBackClick={handleBackClick} 
        />
        
        <div className="section-container relative">
          <ServiceList 
            services={services} 
            isScrolled={isScrolled} 
            onCartUpdate={handleCartUpdate} 
            studioId={studio.id}
            onPopupVisibilityChange={handlePopupVisibility} 
          />
        </div>

        {cartButton}
      </div>
    </Layout>
  );
};

export default React.memo(StudioProfile);
