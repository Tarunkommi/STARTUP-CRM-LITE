import React from 'react';
import { Pencil, Trash2, Mail, Phone, Building2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * A card view displaying information for a single lead.
 * 
 * @param {Object} props
 * @param {Object} props.lead - The lead data object.
 * @param {Function} props.onEdit - Callback when the edit button is clicked.
 * @param {Function} props.onDelete - Callback when the delete button is clicked.
 * @returns {JSX.Element} The LeadCard component.
 */
const LeadCard = ({ lead, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-[#212520] rounded-xl border border-[#D6D8D2] dark:border-[#343A35] shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#1C201B] dark:text-[#F4F6F2] line-clamp-1">{lead.name}</h3>
            <div className="flex items-center text-sm text-[#59635A] dark:text-[#B9C0B8] mt-1">
              <Building2 className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span className="line-clamp-1">{lead.company}</span>
            </div>
          </div>
          <StatusBadge status={lead.status} />
        </div>
        
        <div className="space-y-2 mt-4 text-sm text-[#59635A] dark:text-[#B9C0B8]">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2 text-[#59635A] dark:text-[#B9C0B8] flex-shrink-0" />
            <a href={`mailto:${lead.email}`} className="truncate hover:text-[#50614F] dark:hover:text-[#8BAE87] transition-colors">
              {lead.email}
            </a>
          </div>
          {lead.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-[#59635A] dark:text-[#B9C0B8] flex-shrink-0" />
              <a href={`tel:${lead.phone}`} className="hover:text-[#50614F] dark:hover:text-[#8BAE87] transition-colors">
                {lead.phone}
              </a>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end space-x-2 border-t border-[#D6D8D2] dark:border-[#343A35] pt-4">
          <button 
            onClick={() => onEdit(lead)}
            className="p-2 text-[#59635A] dark:text-[#B9C0B8] hover:text-[#50614F] dark:hover:text-[#8BAE87] hover:bg-[#50614F]/10 dark:hover:bg-[#8BAE87]/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87]"
            aria-label={`Edit ${lead.name}`}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(lead.id)}
            className="p-2 text-[#59635A] dark:text-[#B9C0B8] hover:text-[#C95A5A] dark:hover:text-[#D96D6D] hover:bg-[#C95A5A]/10 dark:hover:bg-[#D96D6D]/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#C95A5A] dark:focus:ring-[#D96D6D]"
            aria-label={`Delete ${lead.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
