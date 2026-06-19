import React from 'react';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';

/**
 * The main Dashboard page displaying an overview of the CRM metrics.
 * Assembles StatsCards, PipelineOverview, RecentLeads, and QuickActions components.
 * 
 * @returns {JSX.Element} The Dashboard page component.
 */
const Dashboard = () => {
  const { leads } = useLeads();

  return (
    <div className="p-6 bg-slate-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <Toaster position="top-right" />
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back, here's what's happening with your leads today.</p>
      </div>

      {/* Stats Cards - Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          title="Total Leads" 
          value={leads.length} 
          icon={Users} 
          change={12.5} 
          color="primary" 
        />
        <StatsCard 
          title="Conversion Rate" 
          value="14.2%" 
          icon={TrendingUp} 
          change={2.1} 
          color="success" 
        />
        <StatsCard 
          title="Pipeline Value" 
          value="$45k" 
          icon={DollarSign} 
          change={-5.4} 
          color="warning" 
        />
        <StatsCard 
          title="Active Opportunities" 
          value={leads.filter(l => l.status !== 'Lost' && l.status !== 'Won').length} 
          icon={Activity} 
          change={8.2} 
          color="danger" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <PipelineOverview leads={leads} />
          <RecentLeads leads={leads} />
        </div>

        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
