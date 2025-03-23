
import React from 'react';

interface OrderSummaryProps {
  services: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    description?: string;
    washType?: string;
    details?: string;
  }[];
  totalAmount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ services, totalAmount }) => {
  // Calculate subtotal from services, with proper null checks
  const subtotal = Array.isArray(services) 
    ? services.reduce((acc, service) => 
        acc + ((service?.price || 0) * (service?.quantity || 1)), 0) 
    : 0;
  
  // Dummy values for demonstration
  const deliveryCharge = 50;
  const gst = Math.round(subtotal * 0.18); // 18% GST
  
  return (
    <>
      {/* Display services */}
      <div className="mb-4">
        <div className="mb-3">
          <h4 className="font-semibold">Services</h4>
          <div className="ml-2">
            {Array.isArray(services) && services.length > 0 ? (
              services.map((service, index) => (
                <div key={service?.id || index} className="flex justify-between text-sm mb-2">
                  <div className="flex-1">
                    <span>{index + 1}) {service?.name || 'Unknown Service'}</span>
                    
                    {/* Show service description if available */}
                    {service?.description && (
                      <div className="text-gray-600 text-xs ml-4">
                        {service.description}
                      </div>
                    )}
                    
                    {/* Show wash type if available */}
                    {service?.washType && service.washType !== 'Regular' && (
                      <div className="text-gray-600 text-xs ml-4">
                        Wash Type: {service.washType}
                      </div>
                    )}
                    
                    {/* Show service details if available */}
                    {service?.details && (
                      <div className="text-gray-600 text-xs ml-4">
                        Items: {service.details}
                      </div>
                    )}
                    
                    <div className="text-gray-600 text-xs ml-4">
                      {service?.quantity || 1} {(service?.quantity || 1) > 1 ? 'items' : 'item'} X ₹{service?.price || 0}
                    </div>
                  </div>
                  <div className="ml-2 whitespace-nowrap">₹{(service?.price || 0) * (service?.quantity || 1)}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No services in this order</div>
            )}
          </div>
        </div>
      </div>
      
      {/* Price summary */}
      <div className="border-t border-gray-200 pt-2 mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span>Service Total</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Delivery Charges</span>
          <span>₹{deliveryCharge}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>GST</span>
          <span>₹{gst}</span>
        </div>
      </div>
      
      {/* Grand total */}
      <div className="bg-green-50 -mx-4 px-4 py-2 font-bold flex justify-between">
        <span>Grand Total</span>
        <span>₹{totalAmount}</span>
      </div>
    </>
  );
};

export default OrderSummary;
