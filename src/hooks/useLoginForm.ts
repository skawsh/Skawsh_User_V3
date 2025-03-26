
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

// Form validation schema
export const loginFormSchema = z.object({
  mobile: z.string().length(10, { message: "Mobile number must be exactly 10 digits" }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call to request an OTP
      console.log("Requesting OTP for:", values.mobile);
      
      // Simulate server delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store mobile number in sessionStorage for the verification page
      sessionStorage.setItem('otpVerificationMobile', values.mobile);
      sessionStorage.setItem('isNewUser', 'false');
      
      // Navigate to OTP verification page
      navigate('/verify-otp');
      toast.success("OTP sent to your mobile number");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit
  };
};
