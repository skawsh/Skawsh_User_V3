
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Drawer, DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const PAYMENT_OPTIONS = [
  { id: 'whatsapp', name: 'WhatsApp', icon: '/lovable-uploads/8c13375e-8b10-468c-b918-79764d1d18dd.png', iconPosition: { top: '65px', left: '113px', width: '60px' } },
  { id: 'gpay', name: 'GPay', icon: '/lovable-uploads/8c13375e-8b10-468c-b918-79764d1d18dd.png', iconPosition: { top: '65px', left: '290px', width: '60px' } },
  { id: 'phonepe', name: 'PhonePe', icon: '/lovable-uploads/8c13375e-8b10-468c-b918-79764d1d18dd.png', iconPosition: { top: '65px', left: '468px', width: '60px' } },
  { id: 'cred', name: 'CRED', icon: '/lovable-uploads/8c13375e-8b10-468c-b918-79764d1d18dd.png', iconPosition: { top: '65px', left: '645px', width: '60px' } },
  { id: 'airtel', name: 'Airtel', icon: '/lovable-uploads/8c13375e-8b10-468c-b918-79764d1d18dd.png', iconPosition: { top: '295px', left: '113px', width: '60px' } },
  { id: 'amazon', name: 'Amazon Pay UPI', icon: '/lovable-uploads/8c13375e-8b10-468c-b918-79764d1d18dd.png', iconPosition: { top: '295px', left: '290px', width: '60px' } },
  { id: 'groww', name: 'Groww', icon: '/lovable-uploads/8c13375e-8b10-468c-b918-79764d1d18dd.png', iconPosition: { top: '295px', left: '468px', width: '60px' } },
  { id: 'paytm', name: 'Paytm', icon: '/lovable-uploads/8c13375e-8b10-468c-b918-79764d1d18dd.png', iconPosition: { top: '295px', left: '645px', width: '60px' } },
];

type PaymentMethodDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  amount: number;
};

const PaymentMethodDrawer: React.FC<PaymentMethodDrawerProps> = ({
  open,
  onOpenChange,
  orderId,
  amount
}) => {
  const [dontAskAgain, setDontAskAgain] = useState(false);

  const handlePaymentMethodSelect = (method: string) => {
    // Close the drawer
    onOpenChange(false);
    
    // Process payment (simulate)
    setTimeout(() => {
      // Update order status in the session storage
      const orders = JSON.parse(sessionStorage.getItem('orders') || '[]');
      const updatedOrders = orders.map((order: any) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: 'processing',
            paymentMethod: method,
            paymentStatus: 'paid'
          };
        }
        return order;
      });
      sessionStorage.setItem('orders', JSON.stringify(updatedOrders));
      
      // Show success toast
      toast.success('Payment Successful', {
        description: `₹${amount} paid successfully using ${method}`,
        duration: 3000,
      });
      
      // Save preference if don't ask again is checked
      if (dontAskAgain) {
        localStorage.setItem('preferredPaymentMethod', method);
      }
    }, 500);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-[#222222] text-white rounded-t-xl max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center px-6 pt-5 pb-3">
          <span className="text-[#0FA0CE] text-xl font-semibold">Cancel</span>
          <span className="text-white text-xl font-semibold">Open with</span>
          <div className="w-[84px]"></div> {/* Empty div for alignment */}
        </div>

        <div className="px-4 pt-2 pb-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {PAYMENT_OPTIONS.slice(0, 4).map((option) => (
              <div 
                key={option.id}
                className="flex flex-col items-center gap-2"
                onClick={() => handlePaymentMethodSelect(option.name)}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center bg-white/10 cursor-pointer",
                  option.id === 'whatsapp' && "bg-[#25D366]/90",
                  option.id === 'gpay' && "bg-white/90",
                  option.id === 'phonepe' && "bg-[#5f259f]/90",
                  option.id === 'cred' && "bg-[#0f0f0f]/90",
                )}>
                  <div className="relative w-12 h-12 overflow-hidden">
                    {option.id === 'whatsapp' && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-12 h-12">
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" clipRule="evenodd" />
                      </svg>
                    )}
                    {option.id === 'gpay' && (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.0005 7.99951L31.2005 12.3995V21.1995L24.0005 16.7995L16.8005 21.1995V12.3995L24.0005 7.99951Z" fill="#EA4335"/>
                        <path d="M16.8 12.3995V21.1995L9.6 16.7995V7.99951L16.8 12.3995Z" fill="#FBBC04"/>
                        <path d="M38.4 7.99951L31.2 12.3995L24 7.99951L31.2 3.59951L38.4 7.99951Z" fill="#4285F4"/>
                        <path d="M38.4 7.99951V16.7995L31.2 21.1995V12.3995L38.4 7.99951Z" fill="#34A853"/>
                      </svg>
                    )}
                    {option.id === 'phonepe' && (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 6L10 12V24C10 30.6 16 36.8 24 38C32 36.8 38 30.6 38 24V12L24 6ZM28 30H24V34H20V30H16V26H20V22H24V26H28V30Z" fill="white"/>
                      </svg>
                    )}
                    {option.id === 'cred' && (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="12" y="12" width="24" height="24" rx="3" stroke="white" strokeWidth="2"/>
                        <path d="M17 20H31M17 24H27M17 28H23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-300">{option.name}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {PAYMENT_OPTIONS.slice(4, 8).map((option) => (
              <div 
                key={option.id}
                className="flex flex-col items-center gap-2"
                onClick={() => handlePaymentMethodSelect(option.name)}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center bg-white/10 cursor-pointer",
                  option.id === 'airtel' && "bg-[#ff0000]/90",
                  option.id === 'amazon' && "bg-[#FF9900]/90",
                  option.id === 'groww' && "bg-white/90",
                  option.id === 'paytm' && "bg-white/90",
                )}>
                  <div className="relative w-12 h-12 overflow-hidden">
                    {option.id === 'airtel' && (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31 17C31 13.13 27.87 10 24 10C20.13 10 17 13.13 17 17C17 20.5 19.56 23.39 23 23.9V38H25V23.9C28.44 23.39 31 20.5 31 17ZM24 22C21.24 22 19 19.76 19 17C19 14.24 21.24 12 24 12C26.76 12 29 14.24 29 17C29 19.76 26.76 22 24 22Z" fill="white"/>
                      </svg>
                    )}
                    {option.id === 'amazon' && (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35.42 31.7C35.12 31.78 34.82 31.86 34.52 31.94C32.28 32.66 29.68 33.02 27.08 33.02C23.36 33.02 19.64 32.3 16.64 30.14C16.16 29.78 15.62 30.38 16.04 30.8C19.28 34.04 23.84 35.84 28.4 35.84C31.76 35.84 35.48 34.88 38.48 32.72C39.08 32.3 38.6 31.22 37.88 31.46M40 28.22C39.58 27.68 36.82 28.04 35.74 28.16C35.32 28.2 35.26 27.84 35.64 27.58C37.64 26.14 40.88 26.62 41.24 27.08C41.6 27.54 41.12 30.62 39.28 32.24C38.92 32.54 38.6 32.36 38.72 31.94C39.04 30.92 40.42 28.76 40 28.22" fill="white"/>
                        <path d="M25.6 18C25.6 18.96 25.6 19.86 25.6 20.82C25.6 20.94 25.72 21.06 25.84 21.06C27.02 21.06 28.7 21.12 29.88 21.66C30.06 21.72 30.18 21.6 30.18 21.42C30.18 20.52 30.18 19.62 30.18 18.72C30.18 18.6 30.12 18.48 29.94 18.42C28.7 17.88 27.08 17.82 25.9 17.88C25.72 17.88 25.6 17.94 25.6 18Z" fill="white"/>
                        <path d="M25.6 14.1C25.6 15.06 25.6 15.96 25.6 16.92C25.6 17.04 25.72 17.16 25.84 17.16C27.02 17.1 28.7 17.1 29.94 17.7C30.12 17.76 30.18 17.7 30.18 17.52C30.18 16.62 30.18 15.72 30.18 14.82C30.18 14.7 30.12 14.58 29.94 14.52C28.7 13.92 27.02 13.92 25.84 14.04C25.72 14.04 25.6 14.04 25.6 14.1Z" fill="white"/>
                        <path d="M25.6 22.38C25.6 22.98 25.6 23.58 25.6 24.18C25.6 24.3 25.72 24.36 25.84 24.36C27.08 24.42 28.76 24.66 29.94 25.32C30.06 25.38 30.18 25.32 30.18 25.2C30.18 24.6 30.18 24 30.18 23.34C30.18 23.22 30.12 23.16 30 23.1C28.7 22.44 27.02 22.32 25.84 22.32C25.72 22.32 25.6 22.32 25.6 22.38Z" fill="white"/>
                        <path d="M17.9 22.38C17.9 22.98 17.9 23.58 17.9 24.18C17.9 24.3 18.02 24.36 18.14 24.36C19.38 24.36 21.06 24.54 22.24 25.26C22.36 25.32 22.48 25.26 22.48 25.14C22.48 24.54 22.48 23.94 22.48 23.28C22.48 23.16 22.42 23.1 22.3 23.04C21 22.38 19.32 22.26 18.14 22.32C18.02 22.32 17.9 22.32 17.9 22.38Z" fill="white"/>
                        <path d="M17.9 18.06C17.9 19.02 17.9 19.92 17.9 20.88C17.9 21 18.02 21.12 18.14 21.12C19.32 21.06 21 21.12 22.18 21.72C22.36 21.78 22.48 21.66 22.48 21.48C22.48 20.58 22.48 19.68 22.48 18.78C22.48 18.66 22.42 18.54 22.24 18.48C21 17.94 19.38 17.88 18.2 17.94C18.08 17.94 17.96 18 17.9 18.06Z" fill="white"/>
                        <path d="M17.9 26.1C17.9 27 17.9 27.84 17.9 28.74C17.9 28.86 18.02 28.98 18.14 28.98C19.32 28.92 21 28.92 22.24 29.52C22.42 29.58 22.48 29.52 22.48 29.34C22.48 28.44 22.48 27.6 22.48 26.7C22.48 26.58 22.42 26.46 22.24 26.4C21 25.8 19.32 25.8 18.14 25.92C18.02 25.98 17.9 25.98 17.9 26.1Z" fill="white"/>
                      </svg>
                    )}
                    {option.id === 'groww' && (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12C17.373 12 12 17.373 12 24C12 30.627 17.373 36 24 36C30.627 36 36 30.627 36 24C36 17.373 30.627 12 24 12ZM24 32C19.582 32 16 28.418 16 24C16 19.582 19.582 16 24 16C28.418 16 32 19.582 32 24C32 28.418 28.418 32 24 32Z" fill="#1E88E5"/>
                        <path d="M24 20C22.343 20 21 21.343 21 23V31C21 31.552 21.448 32 22 32H26C26.552 32 27 31.552 27 31V23C27 21.343 25.657 20 24 20Z" fill="#1E88E5"/>
                      </svg>
                    )}
                    {option.id === 'paytm' && (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12C17.373 12 12 17.373 12 24C12 30.627 17.373 36 24 36C30.627 36 36 30.627 36 24C36 17.373 30.627 12 24 12ZM24 32C19.582 32 16 28.418 16 24C16 19.582 19.582 16 24 16C28.418 16 32 19.582 32 24C32 28.418 28.418 32 24 32Z" fill="#002970"/>
                        <path d="M21.5 20V28H24.5V24H28.5V20H21.5Z" fill="#002970"/>
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-300">{option.name}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4 mb-5 px-2">
            <Checkbox 
              id="dontAskAgain" 
              checked={dontAskAgain}
              onCheckedChange={(checked) => setDontAskAgain(checked as boolean)} 
              className="bg-[#333333] border-[#555555] rounded-sm"
            />
            <label htmlFor="dontAskAgain" className="text-sm text-[#888888] cursor-pointer">
              Don't Ask Again
            </label>
          </div>

          <div className="w-full flex justify-center mt-3 mb-3">
            <div className="w-[120px] h-[5px] bg-white/20 rounded-full"></div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PaymentMethodDrawer;
