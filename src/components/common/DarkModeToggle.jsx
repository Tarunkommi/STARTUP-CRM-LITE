import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 focus:outline-none w-full bg-[#212520] hover:bg-[#282D27] text-[#B9C0B8] hover:text-[#F4F6F2] border border-[#343A35]"
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? (
        <>
          <Moon className="w-5 h-5 text-[#8BAE87]" />
          <span className="text-sm font-medium">Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="w-5 h-5 text-[#C8A97E]" />
          <span className="text-sm font-medium">Light Mode</span>
        </>
      )}
    </button>
  );
};

export default DarkModeToggle;
