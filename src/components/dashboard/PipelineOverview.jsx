import React from 'react';

/**
 * Visual horizontal bar showing the distribution of leads across different statuses.
 * 
 * @param {Object} props
 * @param {Array<Object>} props.leads - Array of lead objects.
 * @returns {JSX.Element} The PipelineOverview component.
 */
const PipelineOverview = ({ leads }) => {
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const total = leads.length || 1; // Prevent division by zero

  const statusColors = {
    'New': 'bg-[#8D9B87]',
    'Contacted': 'bg-[#50614F]',
    'Meeting Scheduled': 'bg-[#C8A97E]',
    'Proposal Sent': 'bg-[#A7B5A3]',
    'Won': 'bg-[#4C8C5A]',
    'Lost': 'bg-[#C95A5A]',
  };

  const statuses = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

  return (
    <div className="bg-white dark:bg-[#212520] rounded-xl border border-[#D6D8D2] dark:border-[#343A35] p-6 shadow-sm transition-colors duration-200">
      <h3 className="text-lg font-semibold text-[#1C201B] dark:text-[#F4F6F2] mb-4">Pipeline Overview</h3>
      
      {/* Visual Bar */}
      <div className="h-4 w-full flex rounded-full overflow-hidden mb-4 bg-[#ECEDE8] dark:bg-[#171A17]">
        {statuses.map(status => {
          const count = statusCounts[status] || 0;
          const percentage = (count / total) * 100;
          if (percentage === 0) return null;
          
          return (
            <div 
              key={status}
              className={`h-full ${statusColors[status]}`}
              style={{ width: `${percentage}%` }}
              title={`${status}: ${count} (${percentage.toFixed(1)}%)`}
            />
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {statuses.map(status => (
          <div key={status} className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
            <div className="flex flex-col">
              <span className="text-xs text-[#59635A] dark:text-[#B9C0B8] uppercase tracking-wider">{status}</span>
              <span className="font-semibold text-[#1C201B] dark:text-[#F4F6F2]">{statusCounts[status] || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineOverview;
