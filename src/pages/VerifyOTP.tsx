
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from '@/components/ui/input-otp';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

// OTP validation schema
const otpSchema = z.object({
  otp: z.string().length(4, { message: "OTP must be 4 digits" }),
});

type OTPFormValues = z.infer<typeof otpSchema>;

const VerifyOTP: React.FC = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState<string>('');
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  // Initialize form
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    // Get the mobile number from sessionStorage
    const storedMobile = sessionStorage.getItem('otpVerificationMobile');
    const userType = sessionStorage.getItem('isNewUser') === 'true';
    
    if (!storedMobile) {
      // If mobile number is not found, redirect to login page
      navigate('/login');
      return;
    }
    
    setMobile(storedMobile);
    setIsNewUser(userType);
    
    // Start the countdown for OTP resend
    startCountdown();
  }, [navigate]);
  
  const startCountdown = () => {
    setCanResend(false);
    setCountdown(30);
    
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    // Clean up the timer on unmount
    return () => clearInterval(timer);
  };
  
  const handleResendOTP = async () => {
    if (!canResend) return;
    
    try {
      // In a real app, this would be an API call to resend the OTP
      console.log("Resending OTP to:", mobile);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("OTP resent successfully");
      startCountdown();
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
      console.error(error);
    }
  };
  
  const onSubmit = async (values: OTPFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Verifying OTP:", values.otp, "for mobile:", mobile);
      
      // Simulate server verification delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll consider "1234" as the valid OTP
      const isValid = values.otp === "1234";
      
      if (!isValid) {
        toast.error("Invalid OTP. Please try again.");
        return;
      }
      
      if (isNewUser) {
        // If it's a new user, redirect to complete profile page
        navigate('/complete-profile');
        toast.success("OTP verified. Please complete your profile.");
      } else {
        // If existing user, consider them logged in
        // In a real app, we'd set authentication state/token here
        navigate('/');
        toast.success("Login successful! Welcome back.");
      }
      
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout hideFooter={true}>
      <div className="flex min-h-screen flex-col">
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
              src="/public/lovable-uploads/f9c8201e-220e-43f1-b1c4-b0fbbdd0fc7a.png" 
              alt="Skawsh Logo" 
              className="w-44 h-auto mx-auto"
            />
            <h1 className="mt-6 text-2xl font-bold text-primary-500">Verify OTP</h1>
            <p className="mt-2 text-gray-500">
              We've sent a 4-digit code to <span className="font-medium">{mobile}</span>
            </p>
          </div>
          
          <div className="w-full max-w-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="text-center">
                      <FormControl>
                        <InputOTP 
                          maxLength={4} 
                          {...field}
                          render={({ slots }) => (
                            <InputOTPGroup>
                              {slots.map((slot, i) => (
                                <InputOTPSlot key={i} {...slot} index={i} />
                              ))}
                            </InputOTPGroup>
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary-500 hover:bg-primary-600" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify OTP"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm mb-2">Didn't receive the code?</p>
              <button
                onClick={handleResendOTP}
                disabled={!canResend}
                className={`text-sm font-medium ${
                  canResend 
                    ? "text-primary-500 hover:underline" 
                    : "text-gray-400"
                }`}
              >
                {canResend ? "Resend OTP" : `Resend OTP in ${countdown}s`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyOTP;
