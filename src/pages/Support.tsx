import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Support: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBack = () => {
    navigate('/profile');
  };

  const handleContactMethod = (method: string) => {
    switch (method) {
      case 'email':
        window.location.href = 'mailto:support@skawsh.com';
        break;
      case 'chat':
        alert('Chat support would open here');
        break;
      default:
        break;
    }
  };

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by going to the Orders section in your profile. There you'll find all your ongoing and past orders with their current status."
    },
    {
      question: "How can I cancel my order?",
      answer: "To cancel an order, go to the Orders section, select the order you wish to cancel, and tap on the 'Cancel Order' button. Note that cancellation may not be possible if the service has already begun."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit and debit cards, UPI, net banking, and wallets like Paytm, PhonePe, and Google Pay."
    },
    {
      question: "How do I get a refund?",
      answer: "If you cancel an order or if there's an issue with your service, refunds will be processed automatically. The refund will be credited back to your original payment method within 5-7 business days."
    },
    {
      question: "Can I reschedule my appointment?",
      answer: "Yes, you can reschedule your appointment through the Orders section. Select the order and tap on the 'Reschedule' option. Rescheduling is subject to availability."
    }
  ];

  return (
    <Layout hideFooter={true}>
      <div className="section-container bg-white min-h-screen">
        {/* Sticky header that appears when scrolled */}
        {isScrolled && (
          <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm py-2 px-4 flex items-center">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-3"
              aria-label="Go back to profile"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <span className="font-medium text-gray-800">Support</span>
          </div>
        )}

        <div className={`sticky top-0 z-10 bg-white ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-200`}>
          <div className="flex items-center mb-6 px-4 py-3">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-2"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold">Support</h1>
          </div>
        </div>

        <div className="space-y-6 px-4">
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3">Contact Us</h2>
            <div className="grid grid-cols-1 gap-3">
              <Card 
                className="border-none shadow-sm hover:shadow-md cursor-pointer transition-all"
                onClick={() => handleContactMethod('email')}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary-50">
                    <Mail size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-xs text-gray-500">support@skawsh.com</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className="border-none shadow-sm hover:shadow-md cursor-pointer transition-all"
                onClick={() => handleContactMethod('chat')}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary-50">
                    <MessageCircle size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-xs text-gray-500">Chat with our support team</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-gray-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
