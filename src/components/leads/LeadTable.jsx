import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * A table view displaying all leads.
 * 
 * @param {Object} props
 * @param {Array<Object>} props.leads - Array of lead objects.
 * @param {Function} props.onEdit - Callback when the edit button is clicked.
 * @param {Function} props.onDelete - Callback when the delete button is clicked.
 * @returns {JSX.Element} The LeadTable component.
 */
const LeadTable = ({ leads, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-[#212520] rounded-xl border border-[#D6D8D2] dark:border-[#343A35] shadow-sm overflow-hidden transition-colors duration-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#ECEDE8] dark:bg-[#171A17]/70 text-[#59635A] dark:text-[#B9C0B8] text-xs uppercase tracking-wider border-b border-[#D6D8D2] dark:border-[#343A35]">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Company</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Source</th>
              <th className="p-4 font-medium">Date Added</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D6D8D2] dark:divide-[#343A35]">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#ECEDE8]/50 dark:hover:bg-[#282D27]/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-[#1C201B] dark:text-[#F4F6F2]">{lead.name}</div>
                  </td>
                  <td className="p-4 text-sm text-[#59635A] dark:text-[#B9C0B8]">{lead.company}</td>
                  <td className="p-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="p-4 text-sm text-[#59635A] dark:text-[#B9C0B8]">{lead.email}</td>
                  <td className="p-4 text-sm text-[#59635A] dark:text-[#B9C0B8]">{lead.source}</td>
                  <td className="p-4 text-sm text-[#59635A] dark:text-[#B9C0B8]">
                    {new Date(lead.dateAdded).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => onEdit(lead)}
                        className="p-1.5 text-[#59635A] hover:text-[#50614F] dark:text-[#B9C0B8] dark:hover:text-[#8BAE87] hover:bg-[#50614F]/10 dark:hover:bg-[#8BAE87]/20 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87]"
                        aria-label={`Edit ${lead.name}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(lead.id)}
                        className="p-1.5 text-[#59635A] hover:text-[#C95A5A] dark:text-[#B9C0B8] dark:hover:text-[#D96D6D] hover:bg-[#C95A5A]/10 dark:hover:bg-[#D96D6D]/20 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#C95A5A] dark:focus:ring-[#D96D6D]"
                        aria-label={`Delete ${lead.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-8 text-center text-[#59635A] dark:text-[#B9C0B8]">
                  No leads found. Create your first lead to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
