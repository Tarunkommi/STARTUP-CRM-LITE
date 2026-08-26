import React from 'react';
import { SearchX, Inbox } from 'lucide-react';

const EmptyState = ({ isFiltered, onClearFilters }) => {
  if (isFiltered) {
    return (
      <div className="bg-white dark:bg-[#212520] p-12 rounded-xl border border-[#D6D8D2] dark:border-[#343A35] flex flex-col items-center justify-center text-center col-span-full transition-colors duration-200">
        <div className="bg-[#ECEDE8] dark:bg-[#171A17] p-4 rounded-full mb-4">
          <SearchX className="w-8 h-8 text-[#59635A] dark:text-[#B9C0B8]" />
        </div>
        <h3 className="text-lg font-medium text-[#1C201B] dark:text-[#F4F6F2] mb-1">No leads found</h3>
        <p className="text-[#59635A] dark:text-[#B9C0B8] mb-6 max-w-sm">
          We couldn't find any leads matching your current search and filter criteria.
        </p>
        <button
          onClick={onClearFilters}
          className="text-[#50614F] dark:text-[#8BAE87] hover:text-[#3E4C3D] dark:hover:text-[#A7B5A3] font-medium text-sm transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#212520] p-12 rounded-xl border border-[#D6D8D2] dark:border-[#343A35] flex flex-col items-center justify-center text-center col-span-full transition-colors duration-200">
      <div className="bg-[#ECEDE8] dark:bg-[#171A17] p-4 rounded-full mb-4">
        <Inbox className="w-8 h-8 text-[#59635A] dark:text-[#B9C0B8]" />
      </div>
      <h3 className="text-lg font-medium text-[#1C201B] dark:text-[#F4F6F2] mb-1">No leads yet</h3>
      <p className="text-[#59635A] dark:text-[#B9C0B8] max-w-sm">
        Get started by adding your first lead using the "Add Lead" button above.
      </p>
    </div>
  );
};

export default EmptyState;
