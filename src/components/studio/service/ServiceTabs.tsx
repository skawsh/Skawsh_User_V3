
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Clock } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ServiceTabsProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
  isTabsSticky: boolean;
  tabsContentHeight: number;
  tabsListRef: React.RefObject<HTMLDivElement>;
  deliveryMessage: string;
  backgroundColors: Record<string, string>;
  children: React.ReactNode;
}

const ServiceTabs: React.FC<ServiceTabsProps> = ({
  selectedTab,
  onTabChange,
  isTabsSticky,
  tabsContentHeight,
  tabsListRef,
  deliveryMessage,
  backgroundColors,
  children
}) => {
  // Get the display wash type name based on the tab
  const getWashTypeName = (tab: string) => {
    return tab === "standard" ? "Standard Wash" : "Express Wash";
  };

  // When a tab is changed, update any existing cart items with the new wash type
  const handleTabChange = (value: string) => {
    try {
      const storedItems = localStorage.getItem('cartItems');
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        const updatedItems = parsedItems.map((item: any) => ({
          ...item,
          washType: getWashTypeName(value)
        }));
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        document.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Error updating wash type in cart items:', error);
    }
    
    // Call the original onTabChange handler
    onTabChange(value);
  };

  return (
    <Tabs defaultValue="standard" value={selectedTab} onValueChange={handleTabChange}>
      {isTabsSticky && (
        <div 
          className="h-0 overflow-hidden" 
          style={{ 
            height: tabsContentHeight ? `${tabsContentHeight}px` : '72px'
          }}
        />
      )}
      
      {isTabsSticky && (
        <div className="fixed top-[56px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm animate-fade-in transition-opacity duration-300">
          <div className={cn("transition-colors duration-300 py-2 px-4", backgroundColors[selectedTab as keyof typeof backgroundColors])}>
            <TabsList className="w-full grid grid-cols-2 gap-2 bg-transparent my-0 py-1 mx-0">
              <TabsTrigger 
                value="standard" 
                className={cn(
                  "rounded-full border shadow-sm transition-colors duration-300 flex items-center justify-center h-10", 
                  selectedTab === "standard" 
                    ? "text-white bg-blue-600 border-blue-600 font-medium" 
                    : "text-gray-500 bg-white border-gray-200 hover:bg-blue-50"
                )}
              >
                <Clock size={16} className="mr-2" />
                Standard Wash
              </TabsTrigger>
              <TabsTrigger 
                value="express" 
                className={cn(
                  "rounded-full border shadow-sm transition-colors duration-300 flex items-center justify-center h-10", 
                  selectedTab === "express" 
                    ? "text-white bg-orange-500 border-orange-500 font-medium" 
                    : "text-gray-500 bg-white border-gray-200 hover:bg-orange-50"
                )}
              >
                <Clock size={16} className="mr-2" />
                Express Wash
              </TabsTrigger>
            </TabsList>
            
            <div className={cn("flex items-center gap-2 mt-2 text-sm transition-colors duration-300", 
              selectedTab === "standard" ? "text-blue-600" : "text-orange-500"
            )}>
              <Clock size={16} />
              <span>{deliveryMessage}</span>
            </div>
          </div>
        </div>
      )}

      <div 
        className={cn(
          isTabsSticky ? "opacity-0 invisible h-0 overflow-hidden" : "opacity-100 visible h-auto", 
          "transition-all duration-500"
        )}
      >
        <TabsList 
          ref={tabsListRef} 
          className="grid w-full grid-cols-2 gap-2 mb-6 bg-transparent my-[3px] py-0"
        >
          <TabsTrigger 
            value="standard" 
            className={cn(
              "rounded-full border shadow-sm transition-colors duration-300 flex items-center justify-center h-10", 
              selectedTab === "standard" 
                ? "text-white bg-blue-600 border-blue-600 font-medium" 
                : "text-gray-500 bg-white border-gray-200 hover:bg-blue-50"
            )}
          >
            <Clock size={16} className="mr-2" />
            Standard Wash
          </TabsTrigger>
          <TabsTrigger 
            value="express" 
            className={cn(
              "rounded-full border shadow-sm transition-colors duration-300 flex items-center justify-center h-10", 
              selectedTab === "express" 
                ? "text-white bg-orange-500 border-orange-500 font-medium" 
                : "text-gray-500 bg-white border-gray-200 hover:bg-orange-50"
            )}
          >
            <Clock size={16} className="mr-2" />
            Express Wash
          </TabsTrigger>
        </TabsList>
      </div>

      <div className={cn("flex items-center gap-2 mb-4 text-sm transition-colors duration-300", 
        selectedTab === "standard" ? "text-blue-600" : "text-orange-500"
      )}>
        <Clock size={16} />
        <span>{deliveryMessage}</span>
      </div>
      
      <TabsContent value="standard">
        {children}
      </TabsContent>

      <TabsContent value="express">
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default ServiceTabs;
