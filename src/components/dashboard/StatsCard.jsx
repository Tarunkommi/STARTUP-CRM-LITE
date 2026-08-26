import React from 'react';

/**
 * A card component displaying a key metric with an icon, value, and change indicator.
 * 
 * @param {Object} props
 * @param {string} props.title - The title of the metric.
 * @param {string|number} props.value - The main value to display.
 * @param {React.ElementType} props.icon - The Lucide React icon component.
 * @param {number} props.change - The percentage change compared to the previous period.
 * @param {'primary' | 'success' | 'warning' | 'danger'} props.color - The semantic color for the icon.
 * @returns {JSX.Element} The StatsCard component.
 */
const StatsCard = ({ title, value, icon: Icon, change, color }) => {
  const isPositive = change >= 0;
  
  const colorStyles = {
    primary: 'bg-[#50614F]/10 dark:bg-[#8BAE87]/20 text-[#50614F] dark:text-[#8BAE87]',
    success: 'bg-[#4C8C5A]/10 dark:bg-[#4C8C5A]/20 text-[#4C8C5A] dark:text-[#5CA36C]',
    warning: 'bg-[#C78A2C]/10 dark:bg-[#C78A2C]/20 text-[#C78A2C] dark:text-[#D99B3B]',
    danger: 'bg-[#C95A5A]/10 dark:bg-[#C95A5A]/20 text-[#C95A5A] dark:text-[#D96D6D]',
  };

  const iconStyle = colorStyles[color] || colorStyles.primary;

  return (
    <div className="bg-white dark:bg-[#212520] rounded-xl border border-[#D6D8D2] dark:border-[#343A35] p-6 shadow-sm flex flex-col transition-all hover:shadow-md duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#59635A] dark:text-[#B9C0B8]">{title}</h3>
        <div className={`p-2 rounded-lg ${iconStyle}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <h2 className="text-3xl font-bold text-[#1C201B] dark:text-[#F4F6F2]">{value}</h2>
        <span className={`text-sm font-medium flex items-center ${isPositive ? 'text-[#4C8C5A] dark:text-[#5CA36C]' : 'text-[#C95A5A] dark:text-[#D96D6D]'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
