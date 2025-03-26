
import React from 'react';

interface ResendOTPSectionProps {
  canResend: boolean;
  countdown: number;
  onResend: () => void;
}

const ResendOTPSection: React.FC<ResendOTPSectionProps> = ({
  canResend,
  countdown,
  onResend
}) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
      <button
        onClick={onResend}
        disabled={!canResend}
        className={`text-sm font-medium transition-colors ${
          canResend 
            ? "text-primary-500 hover:text-primary-600 hover:underline" 
            : "text-gray-400"
        }`}
        type="button"
      >
        {canResend ? "Resend OTP" : `Resend OTP in ${countdown}s`}
      </button>
    </div>
  );
};

export default ResendOTPSection;
