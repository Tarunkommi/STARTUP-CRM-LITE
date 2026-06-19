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
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}
            `}
            aria-pressed={isActive}
          >
            {filter} <span className={`ml-1 ${isActive ? 'text-blue-200' : 'text-gray-400 dark:text-gray-500'}`}>({count})</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
