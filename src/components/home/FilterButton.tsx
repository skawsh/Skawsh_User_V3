
import React from 'react';

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  icon,
  label,
  active = false,
  onClick
}) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs whitespace-nowrap transition-colors duration-200 ${
        active ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 shadow-sm border border-gray-100 hover:bg-gray-50'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default FilterButton;
