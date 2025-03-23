
import React, { useState, useRef, useEffect } from 'react';
import ServiceTabs from './service/ServiceTabs';
import ServiceCategoryList from './service/ServiceCategoryList';
import CategoryList from './categories/CategoryList';
import ServiceOrderPopup from './ServiceOrderPopup';
import MixedServicesDialog from './service/MixedServicesDialog';
import CategoryButton from './service/CategoryButton';
import WashingMachineCelebration from '../animations/WashingMachineCelebration';
import { Service } from '@/types/serviceTypes';
import { useServiceData } from '@/hooks/useServiceData';
import { useServiceInteractions } from '@/hooks/useServiceInteractions';

interface ServiceListProps {
  services: Service[];
  isScrolled?: boolean;
  onCartUpdate?: (count: number) => void;
  studioId?: string;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  isScrolled = false,
  onCartUpdate,
  studioId = '1'
}) => {
  // Tabs and scroll state
  const [selectedTab, setSelectedTab] = useState<string>("standard");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Refs for scroll behavior
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const tabsContentHeight = useRef<number>(0);
  
  // Get service data from hook
  const { 
    categories, 
    expressCategories, 
    backgroundColors,
    deliveryMessages
  } = useServiceData(services);

  // Custom delivery message and background colors
  const updatedDeliveryMessages = {
    ...deliveryMessages,
    standard: "Delivery in just 36 sunlight hours after pickup"
  };

  const updatedBackgroundColors = {
    ...backgroundColors,
    standard: "bg-[#D5E7FF]"
  };

  // Open service popup handler
  const handleOpenServicePopup = (service: Service) => {
    setSelectedService(service);
  };

  // Close service popup handler
  const handleCloseServicePopup = () => {
    setSelectedService(null);
  };

  // Service interactions hook
  const {
    cartItems,
    pendingService,
    mixedServicesDialogOpen,
    showCelebration,
    getServiceWeight,
    getServiceQuantity,
    handleServiceInteractions,
    getExistingWashType,
    setMixedServicesDialogOpen,
    handleSwitchToStandard,
    handleContinueMixedTypes,
    handleAddToCart,
    setShowCelebration
  } = useServiceInteractions({
    studioId,
    selectedTab,
    onOpenServicePopup: handleOpenServicePopup
  });

  // Tab change handler
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  // Set up refs for category navigation
  const setCategoryRef = (categoryTitle: string, element: HTMLDivElement | null) => {
    categoryRefs.current[categoryTitle] = element;
  };

  // Scroll to category when selected from menu
  const scrollToCategory = (categoryTitle: string) => {
    const element = categoryRefs.current[categoryTitle];
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setPopoverOpen(false);
  };

  // Update cart count when cart items change
  useEffect(() => {
    if (onCartUpdate) {
      onCartUpdate(cartItems.length);
    }
  }, [cartItems, onCartUpdate]);

  // Measure tabs height for sticky behavior
  useEffect(() => {
    if (tabsListRef.current) {
      tabsContentHeight.current = tabsListRef.current.offsetHeight + 12;
    }
  }, []);

  // Handle scroll events for sticky tabs
  useEffect(() => {
    const handleScroll = () => {
      if (tabsWrapperRef.current) {
        const headerHeight = 56;
        const tabsPosition = tabsWrapperRef.current.getBoundingClientRect().top;
        const shouldBeSticky = tabsPosition <= headerHeight;
        
        if (shouldBeSticky !== isTabsSticky) {
          setIsTabsSticky(shouldBeSticky);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTabsSticky]);

  return (
    <div 
      className={`mt-[-2px] animate-fade-in p-4 rounded-lg transition-colors duration-300 -mx-2 relative ${
        updatedBackgroundColors[selectedTab as keyof typeof updatedBackgroundColors]
      }`} 
      ref={tabsWrapperRef}
    >
      <div ref={tabsRef} className="transition-all duration-300">
        <ServiceTabs 
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
          isTabsSticky={isTabsSticky}
          tabsContentHeight={tabsContentHeight.current}
          tabsListRef={tabsListRef}
          deliveryMessage={updatedDeliveryMessages[selectedTab as keyof typeof updatedDeliveryMessages]}
          backgroundColors={updatedBackgroundColors}
        >
          <ServiceCategoryList 
            categories={selectedTab === "standard" ? categories : expressCategories}
            tabType={selectedTab}
            getServiceWeight={getServiceWeight}
            getServiceQuantity={getServiceQuantity}
            onServiceInteractions={handleServiceInteractions}
            setCategoryRef={setCategoryRef}
          />
        </ServiceTabs>
      </div>

      <CategoryButton 
        onClick={() => setPopoverOpen(true)}
        cartItemsCount={cartItems.length}
      />
      
      {popoverOpen && (
        <CategoryList
          categories={selectedTab === "standard" ? categories : expressCategories}
          onCategorySelect={scrollToCategory}
          onClose={() => setPopoverOpen(false)}
        />
      )}

      {selectedService && (
        <ServiceOrderPopup
          service={selectedService}
          isOpen={selectedService !== null}
          onClose={handleCloseServicePopup}
          onAddToCart={handleAddToCart}
          isExpress={selectedTab === "express"}
          studioId={studioId}
        />
      )}
      
      <MixedServicesDialog
        open={mixedServicesDialogOpen}
        onOpenChange={setMixedServicesDialogOpen}
        existingWashType={getExistingWashType()}
        onSwitchToStandard={handleSwitchToStandard}
        onContinueMixedTypes={handleContinueMixedTypes}
      />

      <WashingMachineCelebration 
        isVisible={showCelebration} 
        onAnimationComplete={() => setShowCelebration(false)} 
      />
    </div>
  );
};

export default ServiceList;
