
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderDetailsError: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 max-w-md mx-auto mt-8">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/orders')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card className="p-6 text-center">
        <h1 className="text-xl font-bold mb-2">Order not found</h1>
        <p className="text-gray-500">
          The order you're looking for doesn't exist or has been removed.
        </p>
        <Button 
          className="mt-4" 
          onClick={() => navigate('/orders')}
        >
          Go to Orders
        </Button>
      </Card>
    </div>
  );
};

export default OrderDetailsError;
