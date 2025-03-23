
import React, { useEffect } from 'react';
import ServiceTabs from './service/ServiceTabs';
import ServiceCategoryList from './service/ServiceCategoryList';
import CategoryList from './categories/CategoryList';
import ServiceOrderPopup from './ServiceOrderPopup';
import CategoryButton from './service/CategoryButton';
import ServiceAnimations from './service/ServiceAnimations';
import ServiceContainer from './service/ServiceContainer';
import { Service, ServiceCategory } from '@/types/serviceTypes';
import { useServiceData } from '@/hooks/useServiceData';
import { useServiceInteractions } from '@/hooks/useServiceInteractions';
import { useServiceListState } from '@/hooks/useServiceListState';

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
  // Get UI state from custom hook
  const {
    selectedTab,
    popoverOpen,
    isTabsSticky,
    selectedService,
    categoryRefs,
    tabsRef,
    tabsListRef,
    tabsWrapperRef,
    tabsContentHeight,
    setPopoverOpen,
    handleTabChange,
    setCategoryRef,
    scrollToCategory,
    handleOpenServicePopup,
    handleCloseServicePopup
  } = useServiceListState();
  
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

  // Update cart count when cart items change
  useEffect(() => {
    if (onCartUpdate) {
      onCartUpdate(cartItems.length);
    }
  }, [cartItems, onCartUpdate]);

  return (
    <ServiceContainer 
      backgroundColor={updatedBackgroundColors[selectedTab as keyof typeof updatedBackgroundColors]}
      tabsWrapperRef={tabsWrapperRef}
      tabsRef={tabsRef}
    >
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

      <CategoryButton 
        onClick={() => setPopoverOpen(true)}
        cartItemsCount={cartItems.length}
      />
      
      {popoverOpen && (
        <CategoryList
          categories={selectedTab === "standard" ? categories as any : expressCategories as any}
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
      
      <ServiceAnimations 
        mixedServicesDialogOpen={mixedServicesDialogOpen}
        setMixedServicesDialogOpen={setMixedServicesDialogOpen}
        showCelebration={showCelebration}
        setShowCelebration={setShowCelebration}
        existingWashType={getExistingWashType()}
        onSwitchToStandard={handleSwitchToStandard}
        onContinueMixedTypes={handleContinueMixedTypes}
      />
    </ServiceContainer>
  );
};

export default ServiceList;
