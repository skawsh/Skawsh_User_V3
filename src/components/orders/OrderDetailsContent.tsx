
import React from 'react';
import { Order } from '@/types/order';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '@/components/orders/OrderSummary';
import OrderMetaData from '@/components/orders/OrderMetaData';
import RatingStars from '@/components/orders/RatingStars';

interface OrderDetailsContentProps {
  order: Order;
  isRatingSubmitted: boolean;
  selectedRating: number;
  onRatingClick: (rating: number) => void;
}

const OrderDetailsContent: React.FC<OrderDetailsContentProps> = ({ 
  order, 
  isRatingSubmitted, 
  selectedRating, 
  onRatingClick 
}) => {
  const navigate = useNavigate();
  const orderServices = Array.isArray(order.services) ? order.services : [];
  const orderTotal = order?.totalAmount || 0;
  
  // Dummy phone number and address for demo purposes
  const phoneNumber = "8197733xxxx";
  const deliveryAddress = "Home(306, Prashant Hills, Hyd)";
  
  const handleBackClick = () => {
    navigate('/orders');
  };
  
  const isOrderCompleted = order.status === 'completed';

  return (
    <div className="max-w-md mx-auto bg-white p-4">
      {/* Header with back button and support link */}
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="ghost" 
          className="p-0 h-8" 
          onClick={handleBackClick}
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

      {/* Order details card */}
      <div className="border border-gray-200 rounded-md p-4 mb-4">
        {/* Studio name and location */}
        <h2 className="text-lg font-bold">{order.studioName}</h2>
        <p className="text-sm text-gray-600 mb-3">Khajaguda, Rai Durgam, HYD</p>
        
        {/* Download invoice button - disabled */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mb-4 bg-gray-100 text-gray-500 flex items-center justify-center gap-1 border-gray-300 cursor-not-allowed opacity-75"
          disabled={true}
        >
          <FileText className="h-4 w-4" />
          <span>Download Invoice</span>
        </Button>
        
        {/* Order items section */}
        <h3 className="font-bold mb-2">Your Order</h3>
        
        <OrderSummary services={orderServices} totalAmount={orderTotal} />
        
        {/* Order meta details */}
        <OrderMetaData 
          order={order}
          phoneNumber={phoneNumber}
          deliveryAddress={deliveryAddress}
        />

        {/* Rating section for completed orders */}
        {isOrderCompleted && !isRatingSubmitted && (
          <RatingStars selectedRating={selectedRating} onRatingClick={onRatingClick} />
        )}
        
        {/* Display after rating is submitted */}
        {isOrderCompleted && isRatingSubmitted && (
          <div className="mt-4 border-t pt-4">
            <div className="text-center text-green-600 font-medium">
              Thank you for your feedback!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsContent;
