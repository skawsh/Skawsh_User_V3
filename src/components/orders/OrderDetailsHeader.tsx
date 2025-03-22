
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OrderDetailsHeaderProps {
  isHeaderSticky: boolean;
  onBackClick: () => void;
}

const OrderDetailsHeader: React.FC<OrderDetailsHeaderProps> = ({
  isHeaderSticky,
  onBackClick
}) => {
  const navigate = useNavigate();

  if (!isHeaderSticky) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-md mx-auto flex justify-between items-center p-4">
        <Button 
          variant="ghost" 
          className="p-0 h-8" 
          onClick={onBackClick}
        >
          <ArrowLeft className="h-5 w-5 mr-1" /> 
          <span>Order Details</span>
        </Button>
        <Button 
          variant="link" 
          className="text-red-500 p-0 h-8" 
          onClick={() => navigate('/support')}
        >
          Support
        </Button>
      </div>
    </div>
  );
};

export default OrderDetailsHeader;
