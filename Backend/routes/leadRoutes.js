import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  getLeads,
  createLead,
  getLeadById,
  updateLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
  getMonthlyStats,
  searchLeads
} from '../controllers/leadController.js';

const router = express.Router();

// Apply protect middleware to ALL routes in this file (owner isolation)
router.use(protect);

const validStatuses = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
const validSources = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

/**
 * Validation rules for creating and updating a lead completely
 */
const leadValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('company')
    .trim()
    .notEmpty().withMessage('Company is required'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email format is required'),
  body('status')
    .optional()
    .isIn(validStatuses).withMessage(`Status must be one of: ${validStatuses.join(', ')}`),
  body('source')
    .optional()
    .isIn(validSources).withMessage(`Source must be one of: ${validSources.join(', ')}`),
];

/**
 * Validation rules for updating lead status specifically
 */
const statusValidation = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(validStatuses).withMessage(`Status must be one of: ${validStatuses.join(', ')}`),
];

// Lead Analytics Routes
// NOTE: These must be defined before '/:id' routes so 'stats' isn't parsed as an ID
router.get('/stats', getLeadStats);
router.get('/monthly-stats', getMonthlyStats);
router.get('/search', searchLeads);

// Lead CRUD Routes
router.route('/')
  .get(getLeads)
  .post(validate(leadValidation), createLead);

router.route('/:id')
  .get(getLeadById)
  .put(validate(leadValidation), updateLead)
  .delete(deleteLead);

// Lead Status Update Route
router.patch('/:id/status', validate(statusValidation), updateLeadStatus);

export default router;
