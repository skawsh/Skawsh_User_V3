
import React from 'react';
import { cn } from '@/lib/utils';
import { getWashTypeTextColor } from '@/utils/sackBarUtils';

interface SackContentProps {
  studioInfo: { id: string; name: string } | null;
  washType: string | null;
  uniqueServiceCount: number;
}

const SackContent: React.FC<SackContentProps> = ({
  studioInfo,
  washType,
  uniqueServiceCount
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden bg-white">
        <img 
          src="/lovable-uploads/fda4730e-82ff-4406-877e-1f45d0ca2ebd.png" 
          alt="Studio logo"
          className="w-6 h-6 object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-gray-900">{studioInfo?.name || 'Studio'}</span>
        <span className={cn(
          "text-xs font-medium",
          getWashTypeTextColor(washType)
        )}>
          {washType || 'Laundry Service'} • {uniqueServiceCount} {uniqueServiceCount === 1 ? 'Service' : 'Services'}
        </span>
      </div>
    </div>
  );
};

export default SackContent;
