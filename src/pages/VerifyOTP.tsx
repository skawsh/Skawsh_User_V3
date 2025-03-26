
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import OTPInputForm, { OTPFormValues } from '@/components/otp/OTPInputForm';
import ResendOTPSection from '@/components/otp/ResendOTPSection';
import { useOTPVerification } from '@/hooks/useOTPVerification';

const VerifyOTP: React.FC = () => {
  const navigate = useNavigate();
  const {
    mobile,
    isNewUser,
    isSubmitting,
    countdown,
    canResend,
    handleResendOTP,
    verifyOTP
  } = useOTPVerification();

  const onSubmit = async (values: OTPFormValues) => {
    await verifyOTP(values.otp);
  };

  return (
    <Layout hideFooter={true}>
      <div className="flex min-h-screen flex-col bg-white">
        <div className="flex items-center p-4">
          <button
            onClick={() => navigate(isNewUser ? '/signup' : '/login')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="mb-10 text-center">
            <img 
              src="/lovable-uploads/f9c8201e-220e-43f1-b1c4-b0fbbdd0fc7a.png" 
              alt="Skawsh Logo" 
              className="w-44 h-auto mx-auto"
            />
            <h1 className="mt-6 text-2xl font-bold text-primary-500">Verify Your Number</h1>
            <p className="mt-3 text-gray-600 max-w-sm mx-auto">
              We've sent a 4-digit verification code to <span className="font-semibold text-black">{mobile}</span>
            </p>
          </div>
          
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <OTPInputForm 
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
            
            <ResendOTPSection
              canResend={canResend}
              countdown={countdown}
              onResend={handleResendOTP}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyOTP;
