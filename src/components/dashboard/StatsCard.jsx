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
    primary: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400',
    danger: 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400',
  };

  const iconStyle = colorStyles[color] || colorStyles.primary;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm flex flex-col transition-all hover:shadow-md duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className={`p-2 rounded-lg ${iconStyle}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h2>
        <span className={`text-sm font-medium flex items-center ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
