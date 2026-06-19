import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 focus:outline-none w-full ${
        isDarkMode 
          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? (
        <>
          <Moon className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium">Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-medium">Light Mode</span>
        </>
      )}
    </button>
  );
};

export default DarkModeToggle;
