
import React, { useState } from 'react';
import StudioHeader from '../StudioHeader';
import ReportStudioDialog from '../ReportStudioDialog';

interface StudioHeaderContainerProps {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  studioId: string;
  backButtonRef?: React.RefObject<HTMLButtonElement>;
  description?: string;
  onBackClick?: () => void;
  onReportClick?: () => void; // Added this prop
}

const StudioHeaderContainer: React.FC<StudioHeaderContainerProps> = (props) => {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  
  const handleReportStudio = () => {
    if (props.onReportClick) {
      props.onReportClick();
    }
    setReportDialogOpen(true);
  };
  
  return (
    <>
      <StudioHeader 
        {...props}
        onReportClick={handleReportStudio}
      />
      
      <ReportStudioDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        studioName={props.name}
        studioId={props.studioId}
      />
    </>
  );
};

export default StudioHeaderContainer;
