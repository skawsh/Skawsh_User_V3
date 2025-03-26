
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginFormSchema, LoginFormValues, useLoginForm } from '@/hooks/useLoginForm';

const LoginForm: React.FC = () => {
  const { isSubmitting, handleSubmit } = useLoginForm();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      mobile: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    handleSubmit(values);
  };

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your 10-digit mobile number" 
                    {...field}
                    type="tel"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    inputMode="numeric"
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
            {isSubmitting ? "Sending OTP..." : "Get OTP"}
          </Button>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-primary-500 hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary-500 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </form>
      </Form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary-500 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
