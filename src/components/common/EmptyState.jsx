import React from 'react';
import { SearchX, Inbox } from 'lucide-react';

const EmptyState = ({ isFiltered, onClearFilters }) => {
  if (isFiltered) {
    return (
      <div className="bg-white dark:bg-gray-800 p-12 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center col-span-full transition-colors duration-200">
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-full mb-4">
          <SearchX className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No leads found</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
          We couldn't find any leads matching your current search and filter criteria.
        </p>
        <button
          onClick={onClearFilters}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-12 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center col-span-full transition-colors duration-200">
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-full mb-4">
        <Inbox className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No leads yet</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        Get started by adding your first lead using the "Add Lead" button above.
      </p>
    </div>
  );
};

export default EmptyState;
