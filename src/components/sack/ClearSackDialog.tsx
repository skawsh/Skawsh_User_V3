
import React from 'react';
import { Check, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from 'lucide-react';

interface ClearSackDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClearSack: () => void;
}

const ClearSackDialog: React.FC<ClearSackDialogProps> = ({
  isOpen,
  onOpenChange,
  onClearSack
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <button className="p-2 hover:bg-red-50 rounded-full transition-colors">
          <Trash2 size={24} className="text-red-500" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-xl animate-scale-in">
        <div className="flex justify-end">
          <AlertDialogCancel className="p-2 m-0 h-auto absolute top-2 right-2 rounded-full">
            <X size={18} />
          </AlertDialogCancel>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear Sack</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to clear your sack? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 flex gap-2 justify-end">
          <AlertDialogCancel className="rounded-full border-gray-300 text-gray-700 font-medium">
            <X className="mr-1 h-4 w-4" /> No
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onClearSack}
            className="rounded-full bg-red-500 hover:bg-red-600 text-white font-medium"
          >
            <Check className="mr-1 h-4 w-4" /> Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClearSackDialog;
