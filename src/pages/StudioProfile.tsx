
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import StudioHeader from '../components/studio/StudioHeader';
import ServiceList from '../components/studio/ServiceList';
import SackFooter from '../components/studio/SackFooter';
import { toast } from "@/components/ui/use-toast";
import StudioProfileHeader from '../components/studio/StudioProfileHeader';
import { useStudioData } from '@/hooks/useStudioData';

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
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [isScrolled, setIsScrolled] = useState(false);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isEditingOrder, setIsEditingOrder] = useState(false);

  // Get studio data from custom hook
  const { studio, services } = useStudioData(id);

  // Console logs for debugging
  console.log("Studio ID from URL:", id);
  console.log("Order ID from URL params:", orderId);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if we're editing an order
    if (orderId) {
      setIsEditingOrder(true);
      
      // Clear existing cart items before loading the order
      localStorage.removeItem('cartItems');
      document.dispatchEvent(new Event('cartUpdated'));
      
      // Load the order details and set them in the cart
      // This is a mock implementation - in a real app, you'd fetch from API
      const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
      const orderToEdit = orders.find((order: any) => order.id === orderId);
      
      if (orderToEdit && orderToEdit.items) {
        // Convert order items to cart items format
        const cartItems = orderToEdit.items.map((item: any) => ({
          serviceId: item.serviceId || Math.random().toString(36).substring(7),
          serviceName: item.serviceName || 'Service',
          studioId: id,
          price: item.price || 0,
          quantity: item.quantity || 1
        }));
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        document.dispatchEvent(new Event('cartUpdated'));
        
        // Show toast to inform user they're editing an order
        toast({
          title: "Editing Order",
          description: `You're now editing order #${orderId.substring(0, 8)}`,
          duration: 3000,
        });
      }
    }
  }, [orderId, id]);

  useEffect(() => {
    const handleScroll = () => {
      if (backButtonRef.current) {
        const backButtonPosition = backButtonRef.current.getBoundingClientRect().top;
        setIsScrolled(backButtonPosition < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load initial cart count on mount and count unique services
  useEffect(() => {
    const countUniqueServices = () => {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        try {
          const parsedItems = JSON.parse(storedCartItems);
          const studioSpecificItems = parsedItems.filter((item: any) => !studio.id || item.studioId === studio.id);
          
          // Count unique services by serviceId
          const uniqueServices = new Set();
          studioSpecificItems.forEach((item: any) => {
            if (item.serviceId) {
              uniqueServices.add(item.serviceId);
            }
          });
          
          setCartCount(uniqueServices.size);
        } catch (error) {
          console.error('Error parsing cart items:', error);
        }
      }
    };
    
    countUniqueServices();
    
    // Listen for cart updates
    document.addEventListener('cartUpdated', countUniqueServices);
    
    return () => {
      document.removeEventListener('cartUpdated', countUniqueServices);
    };
  }, [studio.id]);

  const handleBackClick = () => {
    // If editing an order, go back to orders page
    if (isEditingOrder) {
      navigate('/orders');
      return;
    }
    
    navigate('/');
  };
  
  const handleCartUpdate = (count: number) => {
    setCartCount(count);
  };

  return (
    <Layout hideFooter={cartCount > 0}>
      <div className="no-scrollbar bg-gray-50/50">
        <StudioProfileHeader 
          isScrolled={isScrolled}
          studioName={studio.name}
          isEditingOrder={isEditingOrder}
          orderId={orderId}
          onBackClick={handleBackClick}
          studioId={studio.id}
        />
        
        <StudioHeader 
          name={isEditingOrder ? `Edit Order #${orderId?.substring(0, 8)}` : studio.name} 
          image={studio.image} 
          rating={studio.rating} 
          reviewCount={studio.reviewCount} 
          deliveryTime={studio.deliveryTime} 
          backButtonRef={backButtonRef} 
          description={isEditingOrder ? 'Edit your order details below' : studio.description} 
          onBackClick={handleBackClick} 
        />
        
        <div className="section-container relative pb-20">
          <ServiceList 
            services={services} 
            isScrolled={isScrolled} 
            onCartUpdate={handleCartUpdate} 
            studioId={studio.id}
          />
        </div>

        {/* Sack Footer */}
        <SackFooter 
          itemCount={cartCount} 
          studioId={studio.id} 
        />
      </div>
    </Layout>
  );
};

export default StudioProfile;
