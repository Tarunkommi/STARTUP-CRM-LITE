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
        return 'bg-[#ECEDE8] dark:bg-[#282D27] text-[#1C201B] dark:text-[#F4F6F2] border-[#D6D8D2] dark:border-[#343A35]';
      case 'Contacted':
        return 'bg-[#50614F]/15 dark:bg-[#8BAE87]/20 text-[#50614F] dark:text-[#8BAE87] border-[#50614F]/30 dark:border-[#8BAE87]/30';
      case 'Meeting Scheduled':
        return 'bg-[#C8A97E]/15 dark:bg-[#D9BC8E]/20 text-[#8C6D44] dark:text-[#D9BC8E] border-[#C8A97E]/30 dark:border-[#D9BC8E]/30';
      case 'Proposal Sent':
        return 'bg-[#8D9B87]/20 dark:bg-[#A7B5A3]/25 text-[#4E5C4B] dark:text-[#A7B5A3] border-[#8D9B87]/40 dark:border-[#A7B5A3]/40';
      case 'Won':
        return 'bg-[#4C8C5A]/15 dark:bg-[#4C8C5A]/25 text-[#386B43] dark:text-[#5CA36C] border-[#4C8C5A]/30 dark:border-[#5CA36C]/30';
      case 'Lost':
        return 'bg-[#C95A5A]/15 dark:bg-[#C95A5A]/25 text-[#9C3E3E] dark:text-[#D96D6D] border-[#C95A5A]/30 dark:border-[#D96D6D]/30';
      default:
        return 'bg-[#ECEDE8] dark:bg-[#282D27] text-[#59635A] dark:text-[#B9C0B8] border-[#D6D8D2] dark:border-[#343A35]';
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getBadgeStyle(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
