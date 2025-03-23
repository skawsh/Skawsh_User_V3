
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, buttonRef }) => {
  return (
    <button 
      ref={buttonRef} 
      onClick={onClick} 
      className="text-gray-700 bg-white/80 p-2 rounded-full hover:bg-white/90 transition-all shadow-sm"
      aria-label="Go back"
    >
      <ChevronLeft size={24} />
    </button>
  );
};

export default BackButton;
