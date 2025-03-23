
import React from 'react';
import { PlusCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui-elements/Button';

interface AddMoreServicesProps {
  studioId: string | null;
  defaultStudioId?: string;
}

const AddMoreServices: React.FC<AddMoreServicesProps> = ({ studioId, defaultStudioId }) => {
  const navigate = useNavigate();
  
  const handleAddMoreServices = () => {
    if (studioId) {
      navigate(`/studio/${studioId}`);
    } else if (defaultStudioId) {
      navigate(`/studio/${defaultStudioId}`);
    } else {
      navigate('/services');
    }
  };
  
  return (
    <div className="bg-green-50 p-4 rounded-xl mb-4 shadow-sm border border-green-100 animate-fade-in" style={{animationDelay: "300ms"}}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <PlusCircle size={18} className="text-green-600 mr-2" />
          <span className="font-medium text-gray-700">Add More Services</span>
        </div>
        <Button 
          onClick={handleAddMoreServices}
          className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1 h-auto"
          size="sm"
        >
          <span>Browse Services</span>
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default AddMoreServices;
