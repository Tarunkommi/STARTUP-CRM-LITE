import React, { useState, useEffect } from 'react';
import { UserPlus, List, Download, X } from 'lucide-react';
import toast from 'react-hot-toast';
import LeadForm from '../leads/LeadForm';
import { useLeads } from '../../context/LeadContext';

/**
 * A component providing quick action buttons for the user.
 * Stores action clicks in localStorage and allows adding a new lead.
 * 
 * @returns {JSX.Element} The QuickActions component.
 */
const QuickActions = () => {
  const { addLead } = useLeads();
  const [clickStats, setClickStats] = useState({
    addLead: 0,
    viewLeads: 0,
    exportData: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load initial stats from local storage
  useEffect(() => {
    const savedStats = localStorage.getItem('quickActionsStats');
    if (savedStats) {
      try {
        setClickStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Failed to parse stats from localStorage', e);
      }
    }
  }, []);

  const handleAction = (actionKey) => {
    setClickStats(prev => {
      const newStats = { ...prev, [actionKey]: prev[actionKey] + 1 };
      localStorage.setItem('quickActionsStats', JSON.stringify(newStats));
      localStorage.setItem('lastQuickAction', JSON.stringify({
        action: actionKey,
        timestamp: new Date().toISOString()
      }));
      return newStats;
    });
    
    // Perform specific action logic
    if (actionKey === 'addLead') {
      setIsModalOpen(true);
    } else {
      console.log(`Action ${actionKey} stored to localStorage`);
    }
  };

  const handleAddLead = (leadData) => {
    addLead(leadData);
    
    toast.success('Lead created successfully!', {
      style: { background: '#4C8C5A', color: '#fff' }
    });
    
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-[#212520] rounded-xl border border-[#D6D8D2] dark:border-[#343A35] p-6 shadow-sm transition-colors duration-200">
        <h3 className="text-lg font-semibold text-[#1C201B] dark:text-[#F4F6F2] mb-4">Quick Actions</h3>
        <div className="flex flex-col space-y-3">
          <button 
            onClick={() => handleAction('addLead')}
            className="flex items-center justify-center space-x-2 w-full bg-[#50614F] hover:bg-[#3E4C3D] text-white dark:bg-[#8BAE87] dark:text-[#171A17] dark:hover:bg-[#9FBF9B] py-3 min-h-[44px] px-4 rounded-lg transition-colors text-sm font-medium"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Lead</span>
          </button>
          <button 
            onClick={() => handleAction('viewLeads')}
            className="flex items-center justify-center space-x-2 w-full bg-white dark:bg-[#212520] hover:bg-[#ECEDE8] dark:hover:bg-[#282D27] border border-[#D6D8D2] dark:border-[#343A35] text-[#1C201B] dark:text-[#F4F6F2] py-3 min-h-[44px] px-4 rounded-lg transition-colors text-sm font-medium"
          >
            <List className="w-4 h-4" />
            <span>View All Leads</span>
          </button>
          <button 
            onClick={() => handleAction('exportData')}
            className="flex items-center justify-center space-x-2 w-full bg-white dark:bg-[#212520] hover:bg-[#ECEDE8] dark:hover:bg-[#282D27] border border-[#D6D8D2] dark:border-[#343A35] text-[#1C201B] dark:text-[#F4F6F2] py-3 min-h-[44px] px-4 rounded-lg transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-[#171A17]/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#212520] w-full h-full max-w-none rounded-none md:max-w-lg md:rounded-xl md:h-auto overflow-y-auto overflow-x-hidden shadow-xl border border-[#D6D8D2] dark:border-[#343A35] transition-colors duration-200" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between p-5 border-b border-[#D6D8D2] dark:border-[#343A35]">
              <h2 className="text-lg font-bold text-[#1C201B] dark:text-[#F4F6F2]">Add New Lead</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#59635A] hover:text-[#1C201B] dark:text-[#B9C0B8] dark:hover:text-[#F4F6F2] hover:bg-[#ECEDE8] dark:hover:bg-[#282D27] rounded-full transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <LeadForm 
                onSubmit={handleAddLead} 
                onCancel={() => setIsModalOpen(false)} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;
