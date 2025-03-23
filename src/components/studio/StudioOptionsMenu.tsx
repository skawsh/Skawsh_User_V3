
import React from 'react';
import { Share, Info, Flag, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface StudioOptionsMenuProps {
  onShare: () => void;
  onAbout: () => void;
  onReport: () => void;
}

const StudioOptionsMenu: React.FC<StudioOptionsMenuProps> = ({
  onShare,
  onAbout,
  onReport
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="text-gray-700 bg-white/80 p-2 rounded-full hover:bg-white/90 transition-all shadow-sm"
          aria-label="More options"
        >
          <MoreVertical size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white z-50 animate-scale-in">
        <DropdownMenuItem onClick={onShare} className="flex items-center gap-2 py-2.5">
          <Share size={16} className="text-blue-500" />
          <span>Share Studio</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onAbout} className="flex items-center gap-2 py-2.5 cursor-pointer">
          <Info size={16} className="text-blue-500" />
          <span>About Studio</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onReport} className="flex items-center gap-2 py-2.5 text-red-500">
          <Flag size={16} />
          <span>Report this Studio</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StudioOptionsMenu;
