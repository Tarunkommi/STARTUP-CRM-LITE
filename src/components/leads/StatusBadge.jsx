import React from 'react';

/**
 * A pill-shaped badge displaying the lead's status with corresponding colors.
 * 
 * @param {Object} props
 * @param {string} props.status - The current status of the lead.
 * @returns {JSX.Element} The StatusBadge component.
 */
const StatusBadge = ({ status }) => {
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'New':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Contacted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Meeting Scheduled':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Proposal Sent':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Won':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Lost':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getBadgeStyle(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
