import React, { createContext, useContext, useState } from 'react';
import { leadService } from '../services/leadService';
import toast from 'react-hot-toast';

const LeadContext = createContext(undefined);

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 0
  });

  const fetchLeads = async (params = {}) => {
    setIsLoading(true);
    try {
      const res = await leadService.getLeads(params);
      if (res.success) {
        setLeads(res.data);
        setPagination(res.pagination);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  };

  const addLead = async (leadData) => {
    try {
      const res = await leadService.createLead(leadData);
      if (res.success) {
        setLeads(prev => [res.data, ...prev]);
        toast.success('Lead created successfully');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create lead');
      return false;
    }
  };

  const updateLead = async (id, leadData) => {
    try {
      const res = await leadService.updateLead(id, leadData);
      if (res.success) {
        setLeads(prev => prev.map(lead => (lead._id === id || lead.id === id) ? res.data : lead));
        toast.success('Lead updated successfully');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update lead');
      return false;
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      const res = await leadService.updateLeadStatus(id, status);
      if (res.success) {
        setLeads(prev => prev.map(lead => (lead._id === id || lead.id === id) ? res.data : lead));
        toast.success(`Lead status updated to ${status}`);
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
      return false;
    }
  };

  const deleteLead = async (id) => {
    try {
      await leadService.deleteLead(id);
      setLeads(prev => prev.filter(lead => lead._id !== id && lead.id !== id));
      toast.success('Lead deleted successfully');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete lead');
      return false;
    }
  };

  const getLeadById = (id) => {
    return leads.find(lead => lead._id === id || lead.id === id);
  };

  return (
    <LeadContext.Provider value={{ 
      leads, 
      isLoading, 
      pagination, 
      fetchLeads, 
      addLead, 
      updateLead, 
      updateLeadStatus,
      deleteLead, 
      getLeadById 
    }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};

export default LeadContext;
