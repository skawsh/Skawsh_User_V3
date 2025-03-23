
import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui-elements/Button';
import { useToast } from '@/hooks/use-toast';

interface CouponSectionProps {
  onCouponApplied: (percentage: number) => void;
  discountApplied: boolean;
  discountPercentage: number;
  discountAmount: number;
}

const CouponSection: React.FC<CouponSectionProps> = ({
  onCouponApplied,
  discountApplied,
  discountPercentage,
  discountAmount
}) => {
  const [couponCode, setCouponCode] = useState('');
  const { toast } = useToast();
  
  const formatIndianRupee = (amount: number): string => {
    return `₹${amount.toFixed(0)}`;
  };
  
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Empty coupon",
        description: "Please enter a coupon code.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    
    if (couponCode.trim().toLowerCase() === "skawsh") {
      onCouponApplied(15);
      
      toast({
        title: "Coupon applied",
        description: "You got 15% off on your total order value!",
        duration: 3000,
      });
    } else {
      toast({
        title: "Coupon applied",
        description: "Your coupon has been applied successfully.",
        duration: 2000,
      });
    }
  };
  
  return (
    <div className="bg-purple-50 p-4 rounded-xl mb-4 shadow-sm border border-purple-100 animate-fade-in" style={{animationDelay: "400ms"}}>
      <div className="flex items-center mb-2">
        <Tag size={18} className="text-purple-600 mr-2" />
        <span className="font-medium text-gray-700">Apply Coupon</span>
      </div>
      <div className="flex gap-2">
        <Input 
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 border-purple-200 focus:border-purple-300 rounded-lg"
        />
        <Button 
          onClick={handleApplyCoupon}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Apply
        </Button>
      </div>
      {discountApplied && (
        <div className="mt-2 text-sm text-purple-600 font-medium">
          {discountPercentage}% discount applied! You saved {formatIndianRupee(discountAmount)}
        </div>
      )}
    </div>
  );
};

export default CouponSection;
