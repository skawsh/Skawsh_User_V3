
import React from 'react';
import MixedServicesDialog from './MixedServicesDialog';
import WashingMachineCelebration from '@/components/animations/WashingMachineCelebration';

interface ServiceAnimationsProps {
  mixedServicesDialogOpen: boolean;
  setMixedServicesDialogOpen: (open: boolean) => void;
  showCelebration: boolean;
  setShowCelebration: (show: boolean) => void;
  existingWashType: string | null;
  onSwitchToStandard: () => void;
  onContinueMixedTypes: () => void;
}

const ServiceAnimations: React.FC<ServiceAnimationsProps> = ({
  mixedServicesDialogOpen,
  setMixedServicesDialogOpen,
  showCelebration,
  setShowCelebration,
  existingWashType,
  onSwitchToStandard,
  onContinueMixedTypes
}) => {
  return (
    <>
      <MixedServicesDialog
        open={mixedServicesDialogOpen}
        onOpenChange={setMixedServicesDialogOpen}
        existingWashType={existingWashType}
        onSwitchToStandard={onSwitchToStandard}
        onContinueMixedTypes={onContinueMixedTypes}
      />

      <WashingMachineCelebration 
        isVisible={showCelebration} 
        onAnimationComplete={() => setShowCelebration(false)} 
      />
    </>
  );
};

export default ServiceAnimations;
