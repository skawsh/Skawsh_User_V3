
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

// OTP validation schema
const otpSchema = z.object({
  otp: z.string().min(4, { message: "Please enter a valid 4-digit OTP" }),
});

export type OTPFormValues = z.infer<typeof otpSchema>;

interface OTPInputFormProps {
  onSubmit: (values: OTPFormValues) => void;
  isSubmitting: boolean;
}

const OTPInputForm: React.FC<OTPInputFormProps> = ({ 
  onSubmit, 
  isSubmitting 
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  
  // Initialize form
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  // Focus the first input field when component mounts
  useEffect(() => {
    const firstInput = document.getElementById('otp-input-0');
    if (firstInput) {
      setTimeout(() => {
        firstInput.focus();
      }, 100);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    
    // Only allow a single character
    if (value.length <= 1) {
      const newOtp = [...otp];
      // Optional: restrict to digits only
      newOtp[index] = value.replace(/\D/, '');
      setOtp(newOtp);
      
      // Update the form value
      const otpString = newOtp.join('');
      form.setValue('otp', otpString);
      
      // Move focus to next input if current input is filled
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
      
      // Auto-submit when all fields are filled
      if (index === 3 && value && newOtp.every(digit => digit)) {
        form.handleSubmit((values) => onSubmit(values))();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace to clear current and move to previous input
    if (e.key === 'Backspace') {
      if (otp[index]) {
        // If current field has a value, just clear it
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        form.setValue('otp', newOtp.join(''));
      } else if (index > 0) {
        // If current field is empty, move to previous field
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
          const newOtp = [...otp];
          newOtp[index - 1] = '';
          setOtp(newOtp);
          form.setValue('otp', newOtp.join(''));
        }
      }
    }
    
    // Handle arrow keys for navigation
    if (e.key === 'ArrowRight' && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    
    if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="text-center">
              <FormControl>
                <div className="flex justify-center gap-3 my-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="tel"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-14 h-14 text-lg font-semibold text-center border-2 rounded-lg 
                                border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-400 
                                focus:outline-none"
                      autoFocus={index === 0}
                      autoComplete="off"
                      inputMode="numeric"
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-primary-500 hover:bg-primary-600 py-5 rounded-xl font-medium text-lg" 
          disabled={isSubmitting || otp.join('').length !== 4}
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>
    </Form>
  );
};

export default OTPInputForm;
