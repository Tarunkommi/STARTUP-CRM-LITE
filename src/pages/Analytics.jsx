import React, { useMemo } from 'react';
import { Users, TrendingUp, Clock } from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import PieChartCard from '../components/analytics/PieChartCard';
import BarChartCard from '../components/analytics/BarChartCard';
import LineChartCard from '../components/analytics/LineChartCard';
import { getStatusDistribution, getMonthlyLeads, getConversionByMonth } from '../utils/analyticsHelpers';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white dark:bg-[#212520] p-6 rounded-xl border border-[#D6D8D2] dark:border-[#343A35] shadow-sm flex items-center space-x-4 transition-colors duration-200">
    <div className={`p-3 rounded-lg ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-[#59635A] dark:text-[#B9C0B8] text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-[#1C201B] dark:text-[#F4F6F2]">{value}</p>
    </div>
  </div>
);

const Analytics = () => {
  const { leads } = useLeads();

  // Compute stats
  const totalLeads = leads.length;
  
  const wonLeads = leads.filter(l => l.status === 'Won').length;
  const wonRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;
  
  // Static mock for average time to close since we don't have closedAt data
  const avgTimeToClose = '14 Days';

  // Transform data for charts
  const statusData = useMemo(() => getStatusDistribution(leads), [leads]);
  const monthlyData = useMemo(() => getMonthlyLeads(leads), [leads]);
  const conversionData = useMemo(() => getConversionByMonth(leads), [leads]);

  return (
    <div className="p-6 bg-[#F7F8F5] dark:bg-[#171A17] min-h-screen transition-colors duration-200">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1C201B] dark:text-[#F4F6F2]">Analytics</h1>
        <p className="text-[#59635A] dark:text-[#B9C0B8] text-sm mt-1">Deep dive into your CRM performance and lead metrics.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Leads" 
          value={totalLeads} 
          icon={Users} 
          colorClass="bg-[#50614F]/10 dark:bg-[#8BAE87]/20 text-[#50614F] dark:text-[#8BAE87]" 
        />
        <StatCard 
          title="Won Rate" 
          value={`${wonRate}%`} 
          icon={TrendingUp} 
          colorClass="bg-[#4C8C5A]/10 dark:bg-[#4C8C5A]/20 text-[#4C8C5A] dark:text-[#5CA36C]" 
        />
        <StatCard 
          title="Avg Time to Close" 
          value={avgTimeToClose} 
          icon={Clock} 
          colorClass="bg-[#C8A97E]/10 dark:bg-[#D9BC8E]/20 text-[#8C6D44] dark:text-[#D9BC8E]" 
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="md:col-span-1">
          <PieChartCard data={statusData} />
        </div>
        <div className="md:col-span-1">
          <BarChartCard data={monthlyData} />
        </div>
        <div className="md:col-span-2">
          <LineChartCard data={conversionData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
