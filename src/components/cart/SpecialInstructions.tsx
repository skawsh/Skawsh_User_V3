
import React, { useState } from 'react';
import { File } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/ui-elements/Button';
import { useToast } from '@/hooks/use-toast';

interface SpecialInstructionsProps {
  instructions: string;
  onInstructionsChange: (instructions: string) => void;
}

const SpecialInstructions: React.FC<SpecialInstructionsProps> = ({
  instructions,
  onInstructionsChange
}) => {
  const [showInstructionsInput, setShowInstructionsInput] = useState(false);
  const [currentInstructions, setCurrentInstructions] = useState(instructions);
  const { toast } = useToast();
  
  const handleAddSpecialInstructions = () => {
    setShowInstructionsInput(true);
  };

  const handleSaveInstructions = () => {
    setShowInstructionsInput(false);
    onInstructionsChange(currentInstructions);
    
    if (currentInstructions.trim()) {
      toast({
        title: "Instructions saved",
        description: "Your special instructions have been saved.",
        duration: 2000,
      });
    }
  };
  
  return (
    <div className="bg-blue-50 p-4 rounded-xl mb-4 shadow-sm border border-blue-100 animate-fade-in" style={{animationDelay: "350ms"}}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <File size={18} className="text-blue-600 mr-2" />
          <span className="font-medium text-gray-700">Special Instructions</span>
        </div>
        {!showInstructionsInput && (
          <button 
            onClick={handleAddSpecialInstructions}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Add
          </button>
        )}
      </div>
      
      {showInstructionsInput && (
        <div className="mt-3">
          <Textarea 
            placeholder="Add any special instructions for your order..."
            value={currentInstructions}
            onChange={(e) => setCurrentInstructions(e.target.value)}
            className="w-full mb-2 border-blue-200 focus:border-blue-300 rounded-lg"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveInstructions}
              className="bg-blue-600 text-sm"
              size="sm"
            >
              Save
            </Button>
          </div>
        </div>
      )}
      
      {!showInstructionsInput && instructions && (
        <div className="mt-2 text-sm text-gray-600 bg-white p-3 rounded-lg border border-blue-100">
          {instructions}
        </div>
      )}
    </div>
  );
};

export default SpecialInstructions;
