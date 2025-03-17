
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/ui-elements/GlassCard';
import Button from '../components/ui-elements/Button';
import { Trash2, ShoppingBag, ChevronRight, AlertCircle, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const cartItems = [
    {
      id: '1',
      studioId: '1',
      studioName: 'Pristine Laundry',
      serviceName: 'Dry Cleaning',
      quantity: 2,
      price: 8.99
    },
    {
      id: '2',
      studioId: '1',
      studioName: 'Pristine Laundry',
      serviceName: 'Wash & Fold',
      quantity: 1,
      price: 2.49
    },
    {
      id: '3',
      studioId: '2',
      studioName: 'Fresh & Clean Co.',
      serviceName: 'Express Service',
      quantity: 1,
      price: 12.99
    }
  ];
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;
  
  return (
    <Layout>
      <div className="section-container pb-24">
        <div className="flex items-center gap-2 mb-4 pt-2 animate-fade-in">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-semibold">Your Sack</h1>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center animate-fade-in">
            <ShoppingBag size={48} className="text-gray-300 mb-4" />
            <h2 className="text-lg font-medium text-gray-700 mb-2">Your Sack is Empty</h2>
            <p className="text-gray-500 mb-4">Add laundry services to your sack to get started.</p>
            <Link 
              to="/" 
              className="text-primary-500 font-medium hover:text-primary-600 transition-colors"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6 animate-fade-in animate-stagger-1">
              {cartItems.map((item, index) => (
                <GlassCard 
                  key={item.id} 
                  className="p-4"
                  interactive={false}
                  style={{ animationDelay: `${150 + index * 75}ms` }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">{item.serviceName}</h3>
                      <p className="text-sm text-gray-500 mb-2">From: {item.studioName}</p>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                            +
                          </button>
                        </div>
                        <div className="text-primary-500 font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            <GlassCard className="p-4 mb-6 animate-fade-in animate-stagger-2" interactive={false}>
              <div className="flex items-center gap-2 text-amber-500 mb-3">
                <AlertCircle size={18} />
                <p className="text-sm">Add $10 more to qualify for free delivery!</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-800 font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span className="text-primary-500">${total.toFixed(2)}</span>
                </div>
              </div>
            </GlassCard>
            
            <div className="fixed bottom-20 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 animate-slide-in">
              <Button 
                fullWidth 
                className="shadow-lg"
                icon={<ChevronRight size={18} />}
                iconPosition="right"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
