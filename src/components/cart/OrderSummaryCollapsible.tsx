
import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getTaxBreakdown } from '@/utils/cartCalculationUtils';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  discountPercentage: number;
  total: number;
  discountApplied: boolean;
}

const OrderSummaryCollapsible: React.FC<OrderSummaryProps> = ({
  subtotal,
  deliveryFee,
  tax,
  discount,
  discountPercentage,
  total,
  discountApplied
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const formatIndianRupee = (amount: number): string => {
    return `₹${amount.toFixed(0)}`;
  };
  
  // Get tax breakdown
  const taxBreakdown = getTaxBreakdown(subtotal, deliveryFee);
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4 shadow-sm animate-fade-in" style={{animationDelay: "450ms"}}>
      <Collapsible open={showDetails} onOpenChange={setShowDetails}>
        <CollapsibleTrigger className="flex justify-between items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
          <div>
            <h3 className="font-semibold text-gray-800">Estimated Bill {formatIndianRupee(total)}</h3>
            <p className="text-xs text-gray-500">Incl. taxes and charges</p>
          </div>
          <ChevronDown 
            size={20} 
            className={`transition-transform duration-300 ${showDetails ? 'rotate-180' : ''} text-gray-500`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="animate-slide-in">
          <div className="px-4 pb-3 pt-1 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatIndianRupee(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span>{formatIndianRupee(deliveryFee)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Tax</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={14} className="text-gray-400 hover:text-gray-600 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white shadow-md border p-2 text-xs">
                      <div className="space-y-1">
                        <p>GST (18% of subtotal): {formatIndianRupee(taxBreakdown.gst)}</p>
                        <p>Delivery Tax (5% of delivery fee): {formatIndianRupee(taxBreakdown.deliveryTax)}</p>
                        <div className="pt-1 font-medium">
                          <p>Total Tax: {formatIndianRupee(taxBreakdown.total)}</p>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span>{formatIndianRupee(tax)}</span>
            </div>
            {discountApplied && (
              <div className="flex justify-between text-purple-600">
                <span>Discount ({discountPercentage}%)</span>
                <span>-{formatIndianRupee(discount)}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatIndianRupee(total)}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default OrderSummaryCollapsible;
