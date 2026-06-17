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
    primary: 'bg-blue-100 text-blue-600',
    success: 'bg-green-100 text-green-500',
    warning: 'bg-amber-100 text-amber-500',
    danger: 'bg-red-100 text-red-500',
  };

  const iconStyle = colorStyles[color] || colorStyles.primary;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 rounded-lg ${iconStyle}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
        <span className={`text-sm font-medium flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
