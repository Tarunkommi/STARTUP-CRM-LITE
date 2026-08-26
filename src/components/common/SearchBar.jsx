import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  // Sync with external value if it changes
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
    }
  }, [value]);

  return (
    <div className="relative w-full sm:max-w-xs md:max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-[#59635A] dark:text-[#B9C0B8]" aria-hidden="true" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-2 border border-[#D6D8D2] dark:border-[#343A35] rounded-lg leading-5 bg-white dark:bg-[#212520] text-[#1C201B] dark:text-[#F4F6F2] placeholder-[#59635A]/70 dark:placeholder-[#B9C0B8]/60 focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] focus:border-[#50614F] dark:focus:border-[#8BAE87] sm:text-sm transition-all duration-200"
        placeholder="Search by name, company, or email..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        aria-label="Search leads"
      />
      {localValue && (
        <button
          onClick={() => {
            setLocalValue('');
            onChange('');
          }}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#59635A] hover:text-[#1C201B] dark:text-[#B9C0B8] dark:hover:text-[#F4F6F2] focus:outline-none"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
