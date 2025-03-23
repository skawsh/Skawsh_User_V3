
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

const DeleteOrderDialog: React.FC<DeleteOrderDialogProps> = ({
  open,
  onOpenChange,
  onDelete
}) => {
  return (
    <Dialog open={open} onOpenChange={open => {
      if (!open) {
        onOpenChange(false);
      }
    }}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={e => {
        e.preventDefault();
      }}>
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
          <DialogDescription>
            Do you want to delete this order from your history?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            No
          </Button>
          <Button variant="destructive" onClick={onDelete} className="bg-red-500 hover:bg-red-600">
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOrderDialog;
