import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 shadow-lg rounded-lg transition-colors duration-200">
        <p className="font-semibold text-gray-800 dark:text-gray-100">{label}</p>
        <p className="text-green-600 dark:text-green-400 font-medium">Conversion Rate: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const LineChartCard = ({ data }) => {
  // If the total leads sum to 0 across the entire timeline, maybe it's completely empty.
  // Although technically, you could have lines at 0%. We'll just show the chart if there's any data, or if rate > 0.
  // Actually, plotting a flat 0% line is visually acceptable for a trend.
  const hasHistory = data.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col h-96 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversion Rate Trend (6mo)</h3>
      <div className="flex-1 w-full min-h-0">
        {hasHistory ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                domain={[0, 100]}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#22C55E" 
                strokeWidth={3}
                dot={{ r: 5, fill: '#22C55E', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, fill: '#16a34a', strokeWidth: 0 }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No conversion history available
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChartCard;
