import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="md:hidden fixed top-0 w-full h-16 bg-gray-900 text-white z-50 flex items-center justify-between px-4 transition-colors duration-200">
        <h2 className="text-xl font-bold tracking-wider">CRM Lite</h2>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 -mr-2 text-gray-300 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Slide-out Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-64 h-full shadow-2xl flex flex-col transition-colors duration-200">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center min-h-[64px]">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h3>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
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
