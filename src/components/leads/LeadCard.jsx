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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{lead.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Building2 className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span className="line-clamp-1">{lead.company}</span>
            </div>
          </div>
          <StatusBadge status={lead.status} />
        </div>
        
        <div className="space-y-2 mt-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
            <a href={`mailto:${lead.email}`} className="truncate hover:text-blue-600 transition-colors">
              {lead.email}
            </a>
          </div>
          {lead.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
              <a href={`tel:${lead.phone}`} className="hover:text-blue-600 transition-colors">
                {lead.phone}
              </a>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end space-x-2 border-t border-gray-100 pt-4">
          <button 
            onClick={() => onEdit(lead)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Edit ${lead.name}`}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(lead.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
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
