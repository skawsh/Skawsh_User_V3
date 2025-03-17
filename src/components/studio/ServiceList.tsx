
import React, { useState } from 'react';
import { ShoppingBag, ChevronRight, Plus, Minus } from 'lucide-react';
import ServiceOrderPopup from './ServiceOrderPopup';
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
}

interface CartItem {
  serviceId: string;
  weight: number;
  items?: { name: string; quantity: number }[];
}

interface ServiceListProps {
  services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedService(null);
  };

  const handleAddToCart = (orderDetails: any) => {
    setCartItems((prevItems) => {
      // Check if service is already in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.serviceId === orderDetails.serviceId
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = orderDetails;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, orderDetails];
      }
    });
  };

  const handleIncrement = (serviceId: string) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.serviceId === serviceId
      );
      
      if (existingItemIndex >= 0) {
        // Increase weight by 0.5 kg
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          weight: updatedItems[existingItemIndex].weight + 0.5
        };
        return updatedItems;
      } else {
        // Add new item with default 0.5 kg
        const service = services.find(s => s.id === serviceId);
        if (service) {
          return [
            ...prevItems,
            {
              serviceId,
              serviceName: service.name,
              weight: 0.5,
              price: service.price * 0.5,
              items: []
            }
          ];
        }
        return prevItems;
      }
    });
  };

  const handleDecrement = (serviceId: string) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.serviceId === serviceId
      );
      
      if (existingItemIndex >= 0) {
        const currentWeight = prevItems[existingItemIndex].weight;
        
        if (currentWeight <= 0.5) {
          // Remove item if weight would be 0 or less
          return prevItems.filter(item => item.serviceId !== serviceId);
        } else {
          // Decrease weight by 0.5 kg
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            weight: currentWeight - 0.5,
            price: prevItems[existingItemIndex].price - (services.find(s => s.id === serviceId)?.price || 0) * 0.5
          };
          return updatedItems;
        }
      }
      return prevItems;
    });
  };

  const getItemInCart = (serviceId: string) => {
    return cartItems.find(item => item.serviceId === serviceId);
  };

  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold mb-4">Services</h2>
      
      <div className="space-y-4">
        {services.map((service) => {
          const cartItem = getItemInCart(service.id);
          const isInCart = !!cartItem;
          
          return (
            <div key={service.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                  </div>
                  
                  {/* Price and Add Button */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="font-semibold">
                      ₹{service.price}{service.unit ? `/${service.unit}` : ''}
                    </div>
                    
                    {isInCart ? (
                      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecrement(service.id);
                          }}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-700"
                        >
                          <Minus size={16} />
                        </button>
                        
                        <div className="px-2 text-center min-w-[40px]">
                          {cartItem.weight.toFixed(1)} kg
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleIncrement(service.id);
                          }}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-700"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(service);
                        }}
                        className={cn(
                          "flex items-center gap-1 py-1.5 px-3 rounded-full text-sm font-medium",
                          "bg-blue-500 text-white hover:bg-blue-600"
                        )}
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    )}
                  </div>
                </div>
                
                {/* View Details link */}
                <div 
                  className="mt-3 flex items-center text-blue-500 text-sm cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                >
                  View Details
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedService && (
        <ServiceOrderPopup
          service={selectedService}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ServiceList;
