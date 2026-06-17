import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';

/**
 * The main Dashboard page displaying an overview of the CRM metrics.
 * Assembles StatsCards, PipelineOverview, RecentLeads, and QuickActions components.
 * 
 * @returns {JSX.Element} The Dashboard page component.
 */
const Dashboard = () => {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('crm_leads');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'Alice Smith', company: 'TechCorp', email: 'alice@techcorp.com', phone: '555-0101', status: 'New', source: 'Website', dateAdded: '2023-10-25' },
      { id: 2, name: 'Bob Johnson', company: 'DesignIt', email: 'bob@designit.com', phone: '555-0102', status: 'Contacted', source: 'Referral', dateAdded: '2023-10-26' },
      { id: 3, name: 'Charlie Brown', company: 'Logistics LLC', email: 'charlie@logistics.com', phone: '555-0103', status: 'Proposal Sent', source: 'Cold Call', dateAdded: '2023-10-27' },
      { id: 4, name: 'Diana Prince', company: 'Wonder Media', email: 'diana@wondermedia.com', phone: '555-0104', status: 'Won', source: 'LinkedIn', dateAdded: '2023-10-28' },
      { id: 5, name: 'Evan Wright', company: 'Aero Dynamics', email: 'evan@aerodynamics.com', phone: '555-0105', status: 'New', source: 'Website', dateAdded: '2023-10-29' },
      { id: 6, name: 'Fiona Gallagher', company: 'Shamrock Inc', email: 'fiona@shamrock.com', phone: '555-0106', status: 'Qualified', source: 'Referral', dateAdded: '2023-10-30' },
    ];
  });

  const handleLeadAdded = (updatedLeads) => {
    setLeads(updatedLeads);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <Toaster position="top-right" />
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, here's what's happening with your leads today.</p>
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
        {/* Left Column (Takes 2/3 space on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <PipelineOverview leads={leads} />
          <RecentLeads leads={leads} />
        </div>

        {/* Right Column (Takes 1/3 space on large screens) */}
        <div className="space-y-6">
          <QuickActions onLeadAdded={handleLeadAdded} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
