
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ReportStudioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studioName: string;
}

const reportReasons = [
  { id: 'unhygienic', label: 'Unhygienic washing process' },
  { id: 'damaged', label: 'Damaged/lost clothes' },
  { id: 'wrong', label: 'Wrong service provided' },
  { id: 'other', label: 'Other' }
];

const ReportStudioDialog: React.FC<ReportStudioDialogProps> = ({
  open,
  onOpenChange,
  studioName
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [otherReason, setOtherReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  console.log("Dialog open state:", open); // Debug log
  
  const handleReasonChange = (value: string) => {
    setSelectedReason(value);
    if (value !== 'other') {
      setOtherReason('');
    }
  };
  
  const handleSubmit = () => {
    if (!selectedReason) {
      toast.error('Please select a reason for reporting');
      return;
    }
    
    if (selectedReason === 'other' && !otherReason.trim()) {
      toast.error('Please provide details for your report');
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, you would send this data to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      
      // Reset form
      setSelectedReason('');
      setOtherReason('');
      
      // Show success message
      toast.success(
        'Your report has been received. We will investigate and update you within 24 hours.',
        { duration: 5000 }
      );
    }, 1000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] z-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Report {studioName}
          </DialogTitle>
          <DialogDescription>
            Please provide details about your issue with this studio.
            Your report will be reviewed by our team.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">
              Reason for reporting
            </label>
            <Select value={selectedReason} onValueChange={handleReasonChange}>
              <SelectTrigger id="reason" className="w-full">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent position="popper" className="z-[60]">
                {reportReasons.map((reason) => (
                  <SelectItem key={reason.id} value={reason.id}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedReason === 'other' && (
            <div className="space-y-2">
              <label htmlFor="otherReason" className="text-sm font-medium">
                Please describe your issue
              </label>
              <Textarea
                id="otherReason"
                placeholder="Provide details about the issue you experienced"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportStudioDialog;
