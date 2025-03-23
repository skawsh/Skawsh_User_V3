
import React from 'react';

interface OrderSummaryProps {
  services: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ services, totalAmount }) => {
  // Calculate subtotal from services, with error checking
  const subtotal = services?.reduce((acc, service) => 
    acc + ((service?.price || 0) * (service?.quantity || 1)), 0) || 0;
  
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
            {services && services.length > 0 ? (
              services.map((service, index) => (
                <div key={service.id || index} className="flex justify-between text-sm mb-1">
                  <div>
                    <span>{index + 1}) {service.name}</span>
                    <div className="text-gray-600 text-xs ml-4">
                      {service.quantity} {service.quantity > 1 ? 'items' : 'item'} X ₹{service.price}
                    </div>
                  </div>
                  <div>₹{service.price * service.quantity}</div>
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
