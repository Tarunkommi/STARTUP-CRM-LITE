/**
 * Groups leads by status to format data for the Pie Chart.
 * 
 * @param {Array} leads - The array of lead objects
 * @returns {Array} Array of objects formatted as { name: string, value: number }
 */
export const getStatusDistribution = (leads) => {
  const counts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).map(status => ({
    name: status,
    value: counts[status]
  })).sort((a, b) => b.value - a.value);
};

/**
 * Gets monthly lead counts for the past 6 months.
 * 
 * @param {Array} leads - The array of lead objects
 * @returns {Array} Array of objects formatted as { month: string, count: number }
 */
export const getMonthlyLeads = (leads) => {
  const months = [];
  const now = new Date();
  
  // Generate the last 6 months buckets
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = d.toLocaleString('default', { month: 'short' });
    months.push({ 
      monthName,
      year: d.getFullYear(),
      month: d.getMonth(),
      leads: 0 
    });
  }

  // Count leads into the buckets based on createdAt
  leads.forEach(lead => {
    if (!lead.createdAt) return;
    const leadDate = new Date(lead.createdAt);
    
    const bin = months.find(m => m.year === leadDate.getFullYear() && m.month === leadDate.getMonth());
    if (bin) {
      bin.leads += 1;
    }
  });

  return months.map(m => ({ month: m.monthName, count: m.leads }));
};

/**
 * Gets conversion rate (won/total) for the past 6 months.
 * 
 * @param {Array} leads - The array of lead objects
 * @returns {Array} Array of objects formatted as { month: string, rate: number }
 */
export const getConversionByMonth = (leads) => {
  const months = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = d.toLocaleString('default', { month: 'short' });
    months.push({ 
      monthName,
      year: d.getFullYear(),
      month: d.getMonth(),
      total: 0,
      won: 0
    });
  }

  leads.forEach(lead => {
    if (!lead.createdAt) return;
    const leadDate = new Date(lead.createdAt);
    
    const bin = months.find(m => m.year === leadDate.getFullYear() && m.month === leadDate.getMonth());
    if (bin) {
      bin.total += 1;
      if (lead.status === 'Won') {
        bin.won += 1;
      }
    }
  });

  return months.map(m => ({
    month: m.monthName,
    rate: m.total === 0 ? 0 : Math.round((m.won / m.total) * 100)
  }));
};
