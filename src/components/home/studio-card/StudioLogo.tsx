
import React from 'react';

interface StudioLogoProps {
  name: string;
}

const StudioLogo: React.FC<StudioLogoProps> = ({ name }) => {
  if (name === 'Busy Bee') {
    return (
      <div className="w-full h-full flex justify-center items-center bg-white py-3">
        <div className="text-center">
          <div className="text-[#004165] font-bold text-2xl flex items-center justify-center">
            BUSY<span className="text-[#87CEEB] mx-1">B</span>EES
          </div>
          <div className="text-[#004165] text-xs mt-1">≡ Fresh Clothes Fresh Life ≡</div>
        </div>
      </div>
    );
  } else if (name === 'U clean') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex items-center">
          <div className="bg-[#50C878] text-white h-10 w-8 flex items-center justify-center rounded-sm text-xl font-bold mr-2">U</div>
          <div className="flex flex-col">
            <span className="text-[#50C878] font-bold text-xl leading-tight">Clean</span>
            <span className="text-gray-600 text-xs">We Love Laundry</span>
          </div>
        </div>
      </div>
    );
  } else if (name === 'Tumble Dry') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-purple-700 font-bold text-2xl">Tumble Dry</span>
          <span className="text-gray-600 text-xs">Perfectly Cleaned, Every Time</span>
        </div>
      </div>
    );
  } else if (name === 'Fabrico') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-blue-600 font-bold text-2xl">Fabrico</span>
          <span className="text-gray-600 text-xs">Fabric Care Specialists</span>
        </div>
      </div>
    );
  } else if (name === 'Eco Clean') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-green-600 font-bold text-2xl">Eco Clean</span>
          <span className="text-gray-600 text-xs">Environmentally Friendly Cleaning</span>
        </div>
      </div>
    );
  } else if (name === 'Mycloth') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-orange-500 font-bold text-2xl">Mycloth</span>
          <span className="text-gray-600 text-xs">Your Garments, Our Passion</span>
        </div>
      </div>
    );
  } else {
    // Default logo for any other studio
    return (
      <div className="w-full h-full flex items-center justify-center bg-white py-3">
        <div className="flex flex-col items-center">
          <span className="text-gray-800 font-bold text-2xl">{name}</span>
          <span className="text-gray-600 text-xs">Professional Laundry Services</span>
        </div>
      </div>
    );
  }
};

export default StudioLogo;
