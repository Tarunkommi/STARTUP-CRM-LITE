import React, { useState } from 'react';
import { Plus, LayoutGrid, List as ListIcon, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { useLeads } from '../context/LeadContext';

/**
 * Main Leads page component managing the CRUD operations and views.
 * 
 * @returns {JSX.Element} The Leads page.
 */
const Leads = () => {
  const { leads, addLead, updateLead, deleteLead } = useLeads();
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
      updateLead(selectedLead.id, leadData);
      toast.success('Lead updated successfully!', {
        style: { background: '#4C8C5A', color: '#fff' }
      });
    } else {
      // Create new lead
      addLead(leadData);
      toast.success('Lead created successfully!', {
        style: { background: '#4C8C5A', color: '#fff' }
      });
    }
    handleCloseModal();
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(id);
      toast.success('Lead deleted successfully.', {
        style: { background: '#C95A5A', color: '#fff' },
        icon: '🗑️',
      });
    }
  };

  return (
    <div className="p-6 bg-[#F7F8F5] dark:bg-[#171A17] min-h-screen transition-colors duration-200">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1C201B] dark:text-[#F4F6F2]">Leads</h1>
          <p className="text-[#59635A] dark:text-[#B9C0B8] text-sm mt-1">Manage your prospects and contacts.</p>
        </div>
        
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* View Toggle - Hidden on mobile, visible on md and up */}
          <div className="hidden md:flex bg-white dark:bg-[#212520] rounded-lg border border-[#D6D8D2] dark:border-[#343A35] p-1 transition-colors duration-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-[#ECEDE8] dark:bg-[#282D27] text-[#1C201B] dark:text-[#F4F6F2]' : 'text-[#59635A] dark:text-[#B9C0B8] hover:text-[#1C201B] dark:hover:text-[#F4F6F2]'}`}
              aria-label="Table View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#ECEDE8] dark:bg-[#282D27] text-[#1C201B] dark:text-[#F4F6F2]' : 'text-[#59635A] dark:text-[#B9C0B8] hover:text-[#1C201B] dark:hover:text-[#F4F6F2]'}`}
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => handleOpenModal()}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-[#50614F] hover:bg-[#3E4C3D] text-white dark:bg-[#8BAE87] dark:text-[#171A17] dark:hover:bg-[#9FBF9B] px-4 py-2 rounded-lg transition-colors font-medium text-sm shadow-sm"
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

        {/* On mobile, always show cards. On tablet/desktop, respect viewMode */}
        <div className={`md:hidden space-y-4`}>
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

        <div className="hidden md:block">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-[#171A17]/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#212520] w-full h-full max-w-none rounded-none md:max-w-lg md:rounded-xl md:h-auto overflow-y-auto overflow-x-hidden shadow-xl border border-[#D6D8D2] dark:border-[#343A35] transition-colors duration-200" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between p-5 border-b border-[#D6D8D2] dark:border-[#343A35]">
              <h2 className="text-lg font-bold text-[#1C201B] dark:text-[#F4F6F2]">
                {selectedLead ? 'Edit Lead' : 'Add New Lead'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="p-1.5 text-[#59635A] hover:text-[#1C201B] dark:text-[#B9C0B8] dark:hover:text-[#F4F6F2] hover:bg-[#ECEDE8] dark:hover:bg-[#282D27] rounded-full transition-colors focus:outline-none"
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
