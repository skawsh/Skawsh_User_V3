
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface ServiceContainerProps {
  children: ReactNode;
  backgroundColor: string;
  tabsWrapperRef: React.RefObject<HTMLDivElement>;
  tabsRef: React.RefObject<HTMLDivElement>;
}

const ServiceContainer: React.FC<ServiceContainerProps> = ({
  children,
  backgroundColor,
  tabsWrapperRef,
  tabsRef
}) => {
  return (
    <div 
      className={cn("mt-[-2px] animate-fade-in p-4 rounded-lg transition-colors duration-300 -mx-2 relative", 
        backgroundColor
      )} 
      ref={tabsWrapperRef}
    >
      <div ref={tabsRef} className="transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default ServiceContainer;
