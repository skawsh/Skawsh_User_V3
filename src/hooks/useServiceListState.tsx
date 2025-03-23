
import { useState, useRef, useEffect } from 'react';
import { Service } from '@/types/serviceTypes';

export const useServiceListState = () => {
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

  // Open service popup handler
  const handleOpenServicePopup = (service: Service) => {
    setSelectedService(service);
  };

  // Close service popup handler
  const handleCloseServicePopup = () => {
    setSelectedService(null);
  };

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

  return {
    // State
    selectedTab,
    popoverOpen,
    isTabsSticky,
    selectedService,
    categoryRefs,
    tabsRef,
    tabsListRef,
    tabsWrapperRef,
    tabsContentHeight,
    
    // Actions
    setSelectedTab,
    setPopoverOpen,
    handleTabChange,
    setCategoryRef,
    scrollToCategory,
    handleOpenServicePopup,
    handleCloseServicePopup
  };
};
