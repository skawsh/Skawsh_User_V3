
import React from 'react';

const OrderSummary: React.FC = () => {
  return (
    <>
      {/* Group services by category */}
      <div className="mb-4">
        <div className="mb-3">
          <h4 className="font-semibold">Core Laundry Service</h4>
          <div className="ml-2">
            <div className="flex justify-between text-sm mb-1">
              <div>
                <span>1) Wash & Fold</span>
                <div className="text-gray-600 text-xs ml-4">4.3 Kg X ₹49</div>
              </div>
              <div>₹210.7</div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <span>2) Wash & Iron</span>
                <div className="text-gray-600 text-xs ml-4">2 Kg X ₹79</div>
              </div>
              <div>₹158</div>
            </div>
          </div>
        </div>
        
        <div className="mb-3">
          <h4 className="font-semibold">Dry Cleaning</h4>
          <div className="ml-2">
            <div className="flex justify-between text-sm mb-1">
              <div>
                <span>Upper Wear</span>
                <div className="text-gray-600 text-xs ml-4">1 Leather jacket X ₹199</div>
              </div>
              <div>₹199</div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <span>&nbsp;</span>
                <div className="text-gray-600 text-xs ml-4">2 Designer Saree X ₹499</div>
              </div>
              <div>₹499</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Price summary */}
      <div className="border-t border-gray-200 pt-2 mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span>Service Total</span>
          <span>₹1066</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Delivery Charges</span>
          <span>₹50</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>GST</span>
          <span>₹194.38</span>
        </div>
      </div>
      
      {/* Grand total */}
      <div className="bg-green-50 -mx-4 px-4 py-2 font-bold flex justify-between">
        <span>Grand Total</span>
        <span>₹1310.38</span>
      </div>
    </>
  );
};

export default OrderSummary;
