
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getWashTypeTextColor } from '@/utils/sackBarUtils';

interface SackFooterContentProps {
  uniqueServiceCount: number;
  washType: string | null;
  isFirstItemAdded: boolean;
}

const SackFooterContent: React.FC<SackFooterContentProps> = ({
  uniqueServiceCount,
  washType,
  isFirstItemAdded
}) => {
  return (
    <>
      <div className="flex flex-col items-start relative z-10">
        <span className="text-[#403E43] font-semibold">
          <span className={cn(
            "mr-1 font-medium",
            getWashTypeTextColor(washType)
          )}>
            {washType && `${washType} •`}
          </span>
          {uniqueServiceCount} {uniqueServiceCount === 1 ? 'Service' : 'Services'} added
        </span>
      </div>
      <div className="flex items-center gap-2 relative z-10">
        <ShoppingBag size={20} className={cn("text-white", isFirstItemAdded && "animate-pulse")} />
        <span className="text-white font-semibold">View Sack</span>
      </div>
    </>
  );
};

export default SackFooterContent;
