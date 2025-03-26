
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from '@/components/ui/input-otp';

// OTP validation schema
const otpSchema = z.object({
  otp: z.string().length(4, { message: "OTP must be 4 digits" }),
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
  // Initialize form
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  return (
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
  );
};

export default OTPInputForm;

