import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#212520] p-3 border border-[#D6D8D2] dark:border-[#343A35] shadow-lg rounded-lg transition-colors duration-200">
        <p className="font-semibold text-[#1C201B] dark:text-[#F4F6F2]">{label}</p>
        <p className="text-[#50614F] dark:text-[#8BAE87] font-medium">Leads Created: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const BarChartCard = ({ data }) => {
  const hasData = data.some(item => item.count > 0);

  return (
    <div className="bg-white dark:bg-[#212520] p-6 rounded-xl border border-[#D6D8D2] dark:border-[#343A35] shadow-sm flex flex-col h-96 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-[#1C201B] dark:text-[#F4F6F2] mb-4">Monthly Lead Volume (6mo)</h3>
      <div className="flex-1 w-full min-h-0">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D6D8D2" opacity={0.5} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#59635A', fontSize: 12 }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#59635A', fontSize: 12 }} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(80, 97, 79, 0.08)' }} />
              <Bar 
                dataKey="count" 
                fill="#50614F" 
                radius={[4, 4, 0, 0]} 
                isAnimationActive={true} 
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-[#59635A] dark:text-[#B9C0B8] text-sm">
            No lead volume history available
          </div>
        )}
      </div>
    </div>
  );
};

export default BarChartCard;
