
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useOTPVerification = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState<string>('');
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
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
  
  const verifyOTP = async (otp: string) => {
    setIsSubmitting(true);
    
    try {
      console.log("Verifying OTP:", otp, "for mobile:", mobile);
      
      // Simulate server verification delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll consider "1234" as the valid OTP
      const isValid = otp === "1234";
      
      if (!isValid) {
        toast.error("Invalid OTP. Please try again.");
        setIsSubmitting(false);
        return false;
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
      
      return true;
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      console.error(error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    mobile,
    isNewUser,
    isSubmitting,
    countdown,
    canResend,
    handleResendOTP,
    verifyOTP
  };
};

