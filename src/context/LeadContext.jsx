import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sampleLeads } from '../data/sampleLeads';

/**
 * @typedef {Object} Lead
 * @property {string|number} id
 * @property {string} name
 * @property {string} company
 * @property {string} email
 * @property {string} phone
 * @property {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} status
 * @property {'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other'} source
 * @property {string} createdAt - ISO date string
 */

const LeadContext = createContext(undefined);

/**
 * LeadProvider component that wraps the app
 */
export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useLocalStorage('startup-crm-leads', sampleLeads);

  /**
   * Adds a new lead
   * @param {Omit<Lead, 'id' | 'createdAt'>} leadData
   */
  const addLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setLeads(prev => [newLead, ...prev]);
  };

  /**
   * Updates an existing lead
   * @param {string|number} id
   * @param {Partial<Lead>} leadData
   */
  const updateLead = (id, leadData) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, ...leadData } : lead));
  };

  /**
   * Deletes a lead by id
   * @param {string|number} id
   */
  const deleteLead = (id) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  /**
   * Gets a lead by id
   * @param {string|number} id
   * @returns {Lead | undefined}
   */
  const getLeadById = (id) => {
    return leads.find(lead => lead.id === id);
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLead, deleteLead, getLeadById }}>
      {children}
    </LeadContext.Provider>
  );
};

/**
 * Custom hook to use the LeadContext
 * @returns {{ leads: Lead[], addLead: Function, updateLead: Function, deleteLead: Function, getLeadById: Function }}
 */
export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};

export default LeadContext;
