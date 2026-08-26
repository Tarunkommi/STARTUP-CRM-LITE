import React from 'react';

/**
 * A component displaying the most recently added leads in a table format.
 * 
 * @param {Object} props
 * @param {Array<Object>} props.leads - Array of lead objects to display.
 * @returns {JSX.Element} The RecentLeads component.
 */
const RecentLeads = ({ leads }) => {
  // Show only the last 5 leads sorted by date
  const recentLeads = [...leads].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 5);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'bg-[#ECEDE8] dark:bg-[#282D27] text-[#1C201B] dark:text-[#F4F6F2] border border-[#D6D8D2] dark:border-[#343A35]';
      case 'Contacted': return 'bg-[#50614F]/15 dark:bg-[#8BAE87]/20 text-[#50614F] dark:text-[#8BAE87] border border-[#50614F]/30 dark:border-[#8BAE87]/30';
      case 'Qualified':
      case 'Won': return 'bg-[#4C8C5A]/15 dark:bg-[#4C8C5A]/20 text-[#386B43] dark:text-[#5CA36C] border border-[#4C8C5A]/30 dark:border-[#5CA36C]/30';
      case 'Lost': return 'bg-[#C95A5A]/15 dark:bg-[#C95A5A]/20 text-[#9C3E3E] dark:text-[#D96D6D] border border-[#C95A5A]/30 dark:border-[#D96D6D]/30';
      default: return 'bg-[#ECEDE8] dark:bg-[#282D27] text-[#59635A] dark:text-[#B9C0B8] border border-[#D6D8D2] dark:border-[#343A35]';
    }
  };

  return (
    <div className="bg-white dark:bg-[#212520] rounded-xl border border-[#D6D8D2] dark:border-[#343A35] shadow-sm overflow-hidden transition-colors duration-200">
      <div className="p-6 border-b border-[#D6D8D2] dark:border-[#343A35] flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#1C201B] dark:text-[#F4F6F2]">Recent Leads</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#ECEDE8] dark:bg-[#171A17]/70 text-[#59635A] dark:text-[#B9C0B8] text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Company</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D6D8D2] dark:divide-[#343A35]">
            {recentLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-[#ECEDE8]/50 dark:hover:bg-[#282D27]/50 transition-colors">
                <td className="p-4 text-sm text-[#1C201B] dark:text-[#F4F6F2] font-medium">{lead.name}</td>
                <td className="p-4 text-sm text-[#59635A] dark:text-[#B9C0B8]">{lead.company}</td>
                <td className="p-4 text-sm">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-[#59635A] dark:text-[#B9C0B8]">
                  {new Date(lead.dateAdded).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {recentLeads.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-[#59635A] dark:text-[#B9C0B8] text-sm">
                  No recent leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeads;
