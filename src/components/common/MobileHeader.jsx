import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="md:hidden fixed top-0 w-full h-16 bg-[#171A17] text-[#F4F6F2] z-50 flex items-center justify-between px-4 border-b border-[#343A35] transition-colors duration-200">
        <h2 className="text-xl font-bold tracking-wider text-[#F4F6F2]">CRM Lite</h2>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 -mr-2 text-[#B9C0B8] hover:text-[#F4F6F2] min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Slide-out Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end bg-[#171A17]/60 backdrop-blur-sm">
          <div className="bg-[#FFFFFF] dark:bg-[#212520] w-64 h-full shadow-2xl flex flex-col border-l border-[#D6D8D2] dark:border-[#343A35] transition-colors duration-200">
            <div className="p-4 border-b border-[#D6D8D2] dark:border-[#343A35] flex justify-between items-center min-h-[64px]">
              <h3 className="text-lg font-semibold text-[#1C201B] dark:text-[#F4F6F2]">Settings</h3>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 -mr-2 text-[#59635A] hover:text-[#1C201B] dark:text-[#B9C0B8] dark:hover:text-[#F4F6F2] min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-[#ECEDE8] dark:hover:bg-[#282D27] transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4 flex-1">
              <DarkModeToggle />
              {/* Add more settings or profile info here in the future */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
