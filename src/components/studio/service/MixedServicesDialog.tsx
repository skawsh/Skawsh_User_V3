
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface MixedServicesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingWashType: string | null;
  onSwitchToStandard: () => void;
  onContinueMixedTypes: () => void;
}

const MixedServicesDialog: React.FC<MixedServicesDialogProps> = ({
  open, 
  onOpenChange, 
  existingWashType, 
  onSwitchToStandard, 
  onContinueMixedTypes
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogTitle className="text-center text-lg font-semibold pt-2">
          {existingWashType === "express" ? "Standard & Express Wash" : "Express & Standard Wash"}
        </DialogTitle>
        <DialogDescription className="text-center py-4">
          You selected different wash types that require separate deliveries. Please continue or Switch to Standard wash for Single delivery
        </DialogDescription>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center mt-2">
          <Button 
            variant="outline" 
            onClick={onSwitchToStandard}
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Switch to Standard
          </Button>
          <Button 
            onClick={onContinueMixedTypes}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MixedServicesDialog;
