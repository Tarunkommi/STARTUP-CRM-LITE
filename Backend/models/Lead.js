import mongoose from 'mongoose';

/**
 * @typedef {Object} ILead
 * @property {string} name - The lead's full name.
 * @property {string} company - The lead's company name.
 * @property {string} email - The lead's email address.
 * @property {string} phone - The lead's phone number.
 * @property {string} status - The current status of the lead.
 * @property {string} source - The source from which the lead was acquired.
 * @property {string} notes - Additional notes regarding the lead.
 * @property {mongoose.Schema.Types.ObjectId} owner - The user who owns/created the lead.
 * @property {number} age - Virtual field: The number of days since the lead was created.
 * @property {Date} createdAt - The timestamp when the lead was created.
 * @property {Date} updatedAt - The timestamp when the lead was last updated.
 */

/**
 * Mongoose schema for the Lead model.
 * @type {mongoose.Schema}
 */
export const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minLength: [2, 'Name must be at least 2 characters long'],
      maxLength: [100, 'Name cannot exceed 100 characters'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Email must be a valid email address',
      },
    },
    phone: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'],
        message: '{VALUE} is not a valid status',
      },
      default: 'New',
    },
    source: {
      type: String,
      enum: {
        values: ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'],
        message: '{VALUE} is not a valid source',
      },
      default: 'Website',
    },
    notes: {
      type: String,
      maxLength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Lead owner is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Compound index on owner and status for fast filtered queries.
 */
leadSchema.index({ owner: 1, status: 1 });

/**
 * Compound index on owner and createdAt for timeline filtering and aggregations.
 */
leadSchema.index({ owner: 1, createdAt: -1 });

/**
 * Compound index on owner and source for source filtering.
 */
leadSchema.index({ owner: 1, source: 1 });

/**
 * Indexes for fast lookups and regex searches.
 */
leadSchema.index({ email: 1 });
leadSchema.index({ name: 1 });
leadSchema.index({ company: 1 });

/**
 * Virtual field 'age' calculating the number of days since the lead was created.
 * @returns {number} The age of the lead in days.
 */
leadSchema.virtual('age').get(function () {
  if (!this.createdAt) return 0;
  
  const now = new Date();
  const created = this.createdAt;
  const diffTime = Math.abs(now - created);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
});

/**
 * Mongoose model for Lead.
 * @type {mongoose.Model}
 */
const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
