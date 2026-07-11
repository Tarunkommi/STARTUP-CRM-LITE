import api from './api';

export const leadService = {
  /**
   * Gets a paginated and filtered list of leads
   */
  getLeads: async (params) => {
    const response = await api.get('/api/leads', { params });
    return response.data;
  },
  
  /**
   * Creates a new lead
   */
  createLead: async (leadData) => {
    const response = await api.post('/api/leads', leadData);
    return response.data;
  },
  
  /**
   * Completely updates an existing lead
   */
  updateLead: async (id, leadData) => {
    const response = await api.put(`/api/leads/${id}`, leadData);
    return response.data;
  },
  
  /**
   * Updates only the status of an existing lead
   */
  updateLeadStatus: async (id, status) => {
    const response = await api.patch(`/api/leads/${id}/status`, { status });
    return response.data;
  },
  
  /**
   * Deletes a lead
   */
  deleteLead: async (id) => {
    const response = await api.delete(`/api/leads/${id}`);
    return response.data;
  },
  
  /**
   * Gets dashboard statistics for all leads
   */
  getLeadStats: async () => {
    const response = await api.get('/api/leads/stats');
    return response.data;
  },
  
  /**
   * Gets monthly aggregated statistics for the bar chart
   */
  getMonthlyStats: async () => {
    const response = await api.get('/api/leads/monthly-stats');
    return response.data;
  }
};
