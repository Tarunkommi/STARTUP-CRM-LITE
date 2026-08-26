import React from 'react';

const FILTERS = [
  'All',
  'New',
  'Contacted',
  'Meeting Scheduled',
  'Proposal Sent',
  'Won',
  'Lost'
];

const FilterBar = ({ activeFilter, onFilterChange, leads }) => {
  const getCount = (filter) => {
    if (filter === 'All') return leads.length;
    return leads.filter(lead => lead.status === filter).length;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map(filter => {
        const count = getCount(filter);
        const isActive = activeFilter === filter;
        
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
              ${isActive 
                ? 'bg-[#50614F] text-white dark:bg-[#8BAE87] dark:text-[#171A17] shadow-sm' 
                : 'bg-white dark:bg-[#212520] text-[#59635A] dark:text-[#B9C0B8] border border-[#D6D8D2] dark:border-[#343A35] hover:bg-[#ECEDE8] dark:hover:bg-[#282D27] hover:text-[#1C201B] dark:hover:text-[#F4F6F2]'}
            `}
            aria-pressed={isActive}
          >
            {filter} <span className={`ml-1 ${isActive ? 'text-[#E2E8E1] dark:text-[#171A17]/80' : 'text-[#59635A]/70 dark:text-[#B9C0B8]/60'}`}>({count})</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
