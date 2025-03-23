
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface OrderViewDetailsButtonProps {
  orderId: string;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const OrderViewDetailsButton: React.FC<OrderViewDetailsButtonProps> = ({
  orderId,
  className = '',
  variant = 'outline',
  size = 'sm'
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <Button 
      onClick={handleViewDetails}
      variant={variant}
      size={size}
      className={`rounded-full shadow-sm hover:shadow ${className}`}
    >
      View Details
    </Button>
  );
};

export default OrderViewDetailsButton;
