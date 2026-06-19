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
      style: { background: '#22c55e', color: '#fff' }
    });
    
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="flex flex-col space-y-3">
          <button 
            onClick={() => handleAction('addLead')}
            className="flex items-center justify-center space-x-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 min-h-[44px] px-4 rounded-lg transition-colors text-sm font-medium"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Lead</span>
          </button>
          <button 
            onClick={() => handleAction('viewLeads')}
            className="flex items-center justify-center space-x-2 w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-3 min-h-[44px] px-4 rounded-lg transition-colors text-sm font-medium"
          >
            <List className="w-4 h-4" />
            <span>View All Leads</span>
          </button>
          <button 
            onClick={() => handleAction('exportData')}
            className="flex items-center justify-center space-x-2 w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-3 min-h-[44px] px-4 rounded-lg transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 w-full h-full max-w-none rounded-none md:max-w-lg md:rounded-xl md:h-auto overflow-y-auto overflow-x-hidden shadow-xl transition-colors duration-200" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add New Lead</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none"
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
