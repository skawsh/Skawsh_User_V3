
import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WashTypeHeaderProps {
  washType: string | null;
}

const WashTypeHeader: React.FC<WashTypeHeaderProps> = ({ washType }) => {
  if (!washType) return null;
  
  // Convert internal washType (e.g., "standard", "express") to display names
  const displayWashType = washType === "standard" ? "Standard Wash" : "Express Wash";
  
  const getWashTypeBackground = () => {
    if (washType === "standard") {
      return "bg-[#D5E7FF]";
    } else if (washType === "express") {
      return "bg-orange-50";
    }
    return "";
  };

  const getWashTypeTextColor = () => {
    if (washType === "standard") {
      return "text-blue-600";
    } else if (washType === "express") {
      return "text-orange-500";
    }
    return "";
  };

  const getWashTypeMessageBackground = () => {
    if (washType === "standard") {
      return "bg-blue-100";
    } else if (washType === "express") {
      return "bg-orange-100";
    }
    return "";
  };

  const getDeliveryMessage = () => {
    if (washType === "standard") {
      return "Delivery in just 36 sunlight hours after pickup";
    } else if (washType === "express") {
      return "Express delivery in just 12 hours after pickup";
    }
    return "";
  };
  
  return (
    <div className={cn(
      "rounded-xl overflow-hidden mb-4 animate-fade-in",
      getWashTypeBackground()
    )}>
      <div className="p-4 text-center">
        <h3 className={cn(
          "font-semibold text-xl",
          getWashTypeTextColor()
        )}>
          {displayWashType}
        </h3>
      </div>
      <div className={cn(
        "px-4 py-3 flex justify-center items-center gap-3",
        getWashTypeMessageBackground(),
        getWashTypeTextColor()
      )}>
        <Clock size={20} />
        <span className="font-medium">
          {getDeliveryMessage()}
        </span>
      </div>
    </div>
  );
};

export default WashTypeHeader;
