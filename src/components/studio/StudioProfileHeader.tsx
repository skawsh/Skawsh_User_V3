
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MoreVertical, Share, Info, Flag } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import ReportStudioDialog from './ReportStudioDialog';

interface StudioProfileHeaderProps {
  isScrolled: boolean;
  studioName: string;
  isEditingOrder: boolean;
  orderId: string | null;
  onBackClick: () => void;
  studioId: string;
}

const StudioProfileHeader: React.FC<StudioProfileHeaderProps> = ({
  isScrolled,
  studioName,
  isEditingOrder,
  orderId,
  onBackClick,
  studioId
}) => {
  const navigate = useNavigate();
  const [showReportDialog, setShowReportDialog] = useState(false);

  if (!isScrolled) {
    return null;
  }

  const handleShareStudio = () => {
    if (navigator.share) {
      navigator.share({
        title: studioName,
        text: `Check out ${studioName}`,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied! Studio link copied to clipboard");
    }
  };

  const handleAboutStudio = () => {
    navigate(`/studio/${studioId}/about`);
  };

  const handleReportStudio = () => {
    console.log("Opening report dialog"); // Debug log
    setShowReportDialog(true);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white z-40 shadow-md animate-fade-in backdrop-blur-sm bg-white/95">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button 
              onClick={onBackClick} 
              className="mr-3 p-2 rounded-full text-gray-700 bg-gray-100/70 hover:bg-gray-200/80 transition-all"
              aria-label="Go back"
            >
              <ChevronLeft size={22} />
            </button>
            <h2 className="text-lg font-semibold truncate">
              {isEditingOrder ? 'Edit Order' : studioName}
              {isEditingOrder && (
                <span className="ml-2 text-sm text-blue-600">
                  #{orderId?.substring(0, 8)}
                </span>
              )}
            </h2>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 bg-gray-100/70 transition-colors"
                aria-label="More options"
              >
                <MoreVertical size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white animate-scale-in z-50">
              <DropdownMenuItem onClick={handleShareStudio} className="flex items-center gap-2 py-2.5">
                <Share size={16} className="text-blue-500" />
                <span>Share Studio</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAboutStudio} className="flex items-center gap-2 py-2.5">
                <Info size={16} className="text-blue-500" />
                <span>About Studio</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleReportStudio} className="flex items-center gap-2 py-2.5 text-red-500">
                <Flag size={16} />
                <span>Report this Studio</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <ReportStudioDialog 
        open={showReportDialog} 
        onOpenChange={setShowReportDialog} 
        studioName={studioName} 
      />
    </>
  );
};

export default StudioProfileHeader;
