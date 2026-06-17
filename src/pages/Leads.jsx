import React, { useState, useEffect } from 'react';
import { Plus, LayoutGrid, List as ListIcon, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';

// Initial dummy data
const INITIAL_LEADS = [
  { id: 1, name: 'Alice Smith', company: 'TechCorp', email: 'alice@techcorp.com', phone: '555-0101', status: 'New', source: 'Website', dateAdded: '2023-10-25' },
  { id: 2, name: 'Bob Johnson', company: 'DesignIt', email: 'bob@designit.com', phone: '555-0102', status: 'Contacted', source: 'Referral', dateAdded: '2023-10-26' },
  { id: 3, name: 'Charlie Brown', company: 'Logistics LLC', email: 'charlie@logistics.com', phone: '555-0103', status: 'Proposal Sent', source: 'Cold Call', dateAdded: '2023-10-27' },
  { id: 4, name: 'Diana Prince', company: 'Wonder Media', email: 'diana@wondermedia.com', phone: '555-0104', status: 'Won', source: 'LinkedIn', dateAdded: '2023-10-28' },
];

/**
 * Main Leads page component managing the CRUD operations and views.
 * 
 * @returns {JSX.Element} The Leads page.
 */
const Leads = () => {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('crm_leads');
    if (saved) return JSON.parse(saved);
    return INITIAL_LEADS;
  });

  useEffect(() => {
    localStorage.setItem('crm_leads', JSON.stringify(leads));
  }, [leads]);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredLeads = leads
    .filter(lead => activeFilter === 'All' || lead.status === activeFilter)
    .filter(lead =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleOpenModal = (lead = null) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleSubmitLead = (leadData) => {
    if (selectedLead) {
      // Update existing lead
      setLeads(prevLeads => 
        prevLeads.map(lead => lead.id === selectedLead.id ? { ...lead, ...leadData } : lead)
      );
      toast.success('Lead updated successfully!', {
        style: { background: '#22c55e', color: '#fff' }
      });
    } else {
      // Create new lead
      const newLead = {
        ...leadData,
        id: Math.max(0, ...leads.map(l => l.id)) + 1,
        dateAdded: new Date().toISOString(),
      };
      setLeads(prevLeads => [newLead, ...prevLeads]);
      toast.success('Lead created successfully!', {
        style: { background: '#22c55e', color: '#fff' }
      });
    }
    handleCloseModal();
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(prevLeads => prevLeads.filter(lead => lead.id !== id));
      toast.success('Lead deleted successfully.', {
        style: { background: '#ef4444', color: '#fff' },
        icon: '🗑️',
      });
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your prospects and contacts.</p>
        </div>
        
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* View Toggle - Hidden on mobile, visible on sm and up */}
          <div className="hidden sm:flex bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              aria-label="Table View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => handleOpenModal()}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mb-6">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4">
          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} leads={leads} />
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* On mobile, always show cards. On desktop, respect viewMode */}
        <div className={`sm:hidden space-y-4`}>
          {filteredLeads.map(lead => (
            <LeadCard key={lead.id} lead={lead} onEdit={handleOpenModal} onDelete={handleDeleteLead} />
          ))}
          {filteredLeads.length === 0 && (
            <EmptyState 
              isFiltered={searchQuery !== '' || activeFilter !== 'All'} 
              onClearFilters={() => { setSearchQuery(''); setActiveFilter('All'); }} 
            />
          )}
        </div>

        <div className="hidden sm:block">
          {viewMode === 'table' ? (
            filteredLeads.length > 0 ? (
              <LeadTable leads={filteredLeads} onEdit={handleOpenModal} onDelete={handleDeleteLead} />
            ) : (
              <EmptyState 
                isFiltered={searchQuery !== '' || activeFilter !== 'All'} 
                onClearFilters={() => { setSearchQuery(''); setActiveFilter('All'); }} 
              />
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredLeads.map(lead => (
                <LeadCard key={lead.id} lead={lead} onEdit={handleOpenModal} onDelete={handleDeleteLead} />
              ))}
              {filteredLeads.length === 0 && (
                <div className="col-span-full">
                  <EmptyState 
                    isFiltered={searchQuery !== '' || activeFilter !== 'All'} 
                    onClearFilters={() => { setSearchQuery(''); setActiveFilter('All'); }} 
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {selectedLead ? 'Edit Lead' : 'Add New Lead'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <LeadForm 
                initialData={selectedLead} 
                onSubmit={handleSubmitLead} 
                onCancel={handleCloseModal} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
