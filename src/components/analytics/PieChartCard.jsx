import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
  'New': '#94A3B8',
  'Contacted': '#2563EB',
  'Meeting Scheduled': '#F59E0B',
  'Proposal Sent': '#7C3AED',
  'Won': '#22C55E',
  'Lost': '#EF4444'
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 shadow-lg rounded-lg transition-colors duration-200">
        <p className="font-semibold text-gray-800 dark:text-gray-100">{data.name}</p>
        <p className="text-gray-600 dark:text-gray-300">Count: <span className="font-medium text-gray-900 dark:text-white">{data.value}</span></p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props) => {
  const { payload } = props;
  const total = payload.reduce((sum, entry) => sum + entry.payload.value, 0);

  return (
    <ul className="flex flex-col space-y-2 mt-4 ml-4">
      {payload.map((entry, index) => {
        const percentage = total > 0 ? Math.round((entry.payload.value / total) * 100) : 0;
        return (
          <li key={`item-${index}`} className="flex items-center justify-between text-sm min-w-[150px]">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-700 dark:text-gray-300">{entry.value}</span>
            </div>
            <div className="text-gray-500 dark:text-gray-400 font-medium">
              {entry.payload.value} <span className="text-xs text-gray-400 dark:text-gray-500">({percentage}%)</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const PieChartCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col h-96 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lead Status Distribution</h3>
      <div className="flex-1 w-full min-h-0 flex items-center justify-center">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                isAnimationActive={true}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#CBD5E1'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} verticalAlign="middle" align="right" layout="vertical" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-gray-100 flex items-center justify-center mb-3">
              <span className="text-gray-300 text-xs">No Data</span>
            </div>
            <p className="text-sm">Not enough data for pie chart.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChartCard;
