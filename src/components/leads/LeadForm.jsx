import React, { useState, useEffect } from 'react';

const STATUS_OPTIONS = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
const SOURCE_OPTIONS = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

/**
 * Form component to create or edit a lead.
 * 
 * @param {Object} props
 * @param {Object} [props.initialData] - Data to pre-fill the form in edit mode.
 * @param {Function} props.onSubmit - Callback when the form is submitted successfully.
 * @param {Function} props.onCancel - Callback when the form is cancelled.
 * @returns {JSX.Element} The LeadForm component.
 */
const LeadForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'New',
    source: 'Website',
  });

  const [errors, setErrors] = useState({});

  // Populate form if in edit mode
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#1C201B] dark:text-[#F4F6F2] mb-1">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-3 md:py-2 min-h-[44px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] bg-white dark:bg-[#171A17] text-[#1C201B] dark:text-[#F4F6F2] transition-colors duration-200 ${errors.name ? 'border-[#C95A5A]' : 'border-[#D6D8D2] dark:border-[#343A35]'}`}
          placeholder="Jane Doe"
        />
        {errors.name && <p className="mt-1 text-xs text-[#C95A5A] dark:text-[#D96D6D]">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-[#1C201B] dark:text-[#F4F6F2] mb-1">Company *</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`w-full px-3 py-3 md:py-2 min-h-[44px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] bg-white dark:bg-[#171A17] text-[#1C201B] dark:text-[#F4F6F2] transition-colors duration-200 ${errors.company ? 'border-[#C95A5A]' : 'border-[#D6D8D2] dark:border-[#343A35]'}`}
          placeholder="Acme Corp"
        />
        {errors.company && <p className="mt-1 text-xs text-[#C95A5A] dark:text-[#D96D6D]">{errors.company}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#1C201B] dark:text-[#F4F6F2] mb-1">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-3 md:py-2 min-h-[44px] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] bg-white dark:bg-[#171A17] text-[#1C201B] dark:text-[#F4F6F2] transition-colors duration-200 ${errors.email ? 'border-[#C95A5A]' : 'border-[#D6D8D2] dark:border-[#343A35]'}`}
          placeholder="jane@acme.com"
        />
        {errors.email && <p className="mt-1 text-xs text-[#C95A5A] dark:text-[#D96D6D]">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#1C201B] dark:text-[#F4F6F2] mb-1">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-3 md:py-2 min-h-[44px] border border-[#D6D8D2] dark:border-[#343A35] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] bg-white dark:bg-[#171A17] text-[#1C201B] dark:text-[#F4F6F2] transition-colors duration-200"
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-[#1C201B] dark:text-[#F4F6F2] mb-1">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-3 md:py-2 min-h-[44px] border border-[#D6D8D2] dark:border-[#343A35] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] bg-white dark:bg-[#171A17] text-[#1C201B] dark:text-[#F4F6F2] transition-colors duration-200"
          >
            {STATUS_OPTIONS.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="source" className="block text-sm font-medium text-[#1C201B] dark:text-[#F4F6F2] mb-1">Source</label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full px-3 py-3 md:py-2 min-h-[44px] border border-[#D6D8D2] dark:border-[#343A35] rounded-md focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] bg-white dark:bg-[#171A17] text-[#1C201B] dark:text-[#F4F6F2] transition-colors duration-200"
          >
            {SOURCE_OPTIONS.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-[#D6D8D2] dark:border-[#343A35] mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-3 md:py-2 min-h-[44px] text-sm font-medium text-[#59635A] dark:text-[#B9C0B8] bg-white dark:bg-[#212520] border border-[#D6D8D2] dark:border-[#343A35] rounded-md hover:bg-[#ECEDE8] dark:hover:bg-[#282D27] hover:text-[#1C201B] dark:hover:text-[#F4F6F2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-3 md:py-2 min-h-[44px] text-sm font-medium text-white bg-[#50614F] border border-transparent rounded-md hover:bg-[#3E4C3D] dark:bg-[#8BAE87] dark:text-[#171A17] dark:hover:bg-[#9FBF9B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87]"
        >
          {initialData ? 'Update Lead' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
