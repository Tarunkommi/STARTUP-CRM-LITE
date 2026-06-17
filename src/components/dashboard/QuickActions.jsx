import React, { useState, useEffect } from 'react';
import { UserPlus, List, Download, X } from 'lucide-react';
import toast from 'react-hot-toast';
import LeadForm from '../leads/LeadForm';

/**
 * A component providing quick action buttons for the user.
 * Stores action clicks in localStorage and allows adding a new lead.
 * 
 * @param {Object} props
 * @param {Function} props.onLeadAdded - Callback when a new lead is added.
 * @returns {JSX.Element} The QuickActions component.
 */
const QuickActions = ({ onLeadAdded }) => {
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
    const saved = localStorage.getItem('crm_leads');
    let leads = [];
    if (saved) {
      leads = JSON.parse(saved);
    } else {
      // Fallback if none exist yet
      leads = [
        { id: 1, name: 'Alice Smith', company: 'TechCorp', email: 'alice@techcorp.com', phone: '555-0101', status: 'New', source: 'Website', dateAdded: '2023-10-25' },
        { id: 2, name: 'Bob Johnson', company: 'DesignIt', email: 'bob@designit.com', phone: '555-0102', status: 'Contacted', source: 'Referral', dateAdded: '2023-10-26' },
        { id: 3, name: 'Charlie Brown', company: 'Logistics LLC', email: 'charlie@logistics.com', phone: '555-0103', status: 'Proposal Sent', source: 'Cold Call', dateAdded: '2023-10-27' },
        { id: 4, name: 'Diana Prince', company: 'Wonder Media', email: 'diana@wondermedia.com', phone: '555-0104', status: 'Won', source: 'LinkedIn', dateAdded: '2023-10-28' },
      ];
    }
    
    const newLead = {
      ...leadData,
      id: Math.max(0, ...leads.map(l => l.id)) + 1,
      dateAdded: new Date().toISOString(),
    };
    
    const updatedLeads = [newLead, ...leads];
    localStorage.setItem('crm_leads', JSON.stringify(updatedLeads));
    
    toast.success('Lead created successfully!', {
      style: { background: '#22c55e', color: '#fff' }
    });
    
    setIsModalOpen(false);
    if (onLeadAdded) {
      onLeadAdded(updatedLeads);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-col space-y-3">
          <button 
            onClick={() => handleAction('addLead')}
            className="flex items-center justify-center space-x-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors text-sm font-medium"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Lead</span>
          </button>
          <button 
            onClick={() => handleAction('viewLeads')}
            className="flex items-center justify-center space-x-2 w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg transition-colors text-sm font-medium"
          >
            <List className="w-4 h-4" />
            <span>View All Leads</span>
          </button>
          <button 
            onClick={() => handleAction('exportData')}
            className="flex items-center justify-center space-x-2 w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Add New Lead</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
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
