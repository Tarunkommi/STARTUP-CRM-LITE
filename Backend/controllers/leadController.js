import Lead from '../models/Lead.js';
import { paginatedResponse, errorResponse } from '../utils/apiResponse.js';

// Status enum list to help with calculating dashboard stats correctly
const VALID_STATUSES = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

/**
 * @desc    Get all leads with filtering, search, and pagination
 * @route   GET /api/leads
 * @access  Private (Owner isolated)
 * @param   {Object} req - Request containing query params
 * @param   {Object} res - Response object
 * @param   {Function} next - Error handler
 * @returns {Object} Paginated list of leads
 */
export const getLeads = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      sortBy = 'createdAt', 
      sortOrder = 'desc', 
      status, 
      search, 
      source, 
      dateFrom, 
      dateTo 
    } = req.query;

    const filter = { owner: req.user._id };

    if (status && status !== 'All') {
      filter.status = status;
    }
    
    if (source && source !== 'All') {
      filter.source = source;
    }

    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }

    if (search) {
      const regex = { $regex: search, $options: 'i' };
      filter.$or = [
        { name: regex },
        { company: regex },
        { email: regex }
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;
    
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const leads = await Lead.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Lead.countDocuments(filter);
    const pages = Math.ceil(total / limitNum);

    return res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages,
        hasNext: pageNum < pages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new lead
 * @route   POST /api/leads
 * @access  Private (Owner isolated)
 * @param   {Object} req - Request with lead data in body
 * @param   {Object} res - Response object
 * @param   {Function} next - Error handler
 * @returns {Object} Created lead document
 */
export const createLead = async (req, res, next) => {
  try {
    const { name, company, email, phone, status, source, notes } = req.body;

    const lead = await Lead.create({
      name,
      company,
      email,
      phone,
      status,
      source,
      notes,
      owner: req.user._id
    });

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single lead by its ID
 * @route   GET /api/leads/:id
 * @access  Private (Owner isolated)
 * @param   {Object} req - Request containing lead ID parameter
 * @param   {Object} res - Response object
 * @param   {Function} next - Error handler
 * @returns {Object} Target lead document
 */
export const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id });

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a lead completely (all fields except owner)
 * @route   PUT /api/leads/:id
 * @access  Private (Owner isolated)
 * @param   {Object} req - Request containing updated properties
 * @param   {Object} res - Response object
 * @param   {Function} next - Error handler
 * @returns {Object} Updated lead document
 */
export const updateLead = async (req, res, next) => {
  try {
    const { name, company, email, phone, status, source, notes } = req.body;

    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { name, company, email, phone, status, source, notes },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update only the status field of a lead
 * @route   PATCH /api/leads/:id/status
 * @access  Private (Owner isolated)
 * @param   {Object} req - Request containing new status
 * @param   {Object} res - Response object
 * @param   {Function} next - Error handler
 * @returns {Object} Updated lead document
 */
export const updateLeadStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a lead
 * @route   DELETE /api/leads/:id
 * @access  Private (Owner isolated)
 * @param   {Object} req - Request containing lead ID
 * @param   {Object} res - Response object
 * @param   {Function} next - Error handler
 * @returns {Object} Confirmation message
 */
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id });

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    await lead.deleteOne();

    res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get dashboard statistics for leads (Totals, Won, Lost, Conversion Rate)
 * @route   GET /api/leads/stats
 * @access  Private (Owner isolated)
 * @param   {Object} req - Request object
 * @param   {Object} res - Response object
 * @param   {Function} next - Error handler
 * @returns {Object} Statistics aggregations for the frontend Dashboard
 */
export const getLeadStats = async (req, res, next) => {
  try {
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    // Single aggregation query to fetch all required dashboard stats efficiently
    const stats = await Lead.aggregate([
      { $match: { owner: req.user._id } },
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          statusCounts: [
            { $group: { _id: "$status", count: { $sum: 1 } } }
          ],
          sourceCounts: [
            { $group: { _id: "$source", count: { $sum: 1 } } }
          ],
          thisMonthCount: [
            { $match: { createdAt: { $gte: firstDayThisMonth } } },
            { $count: "count" }
          ],
          lastMonthCount: [
            { $match: { createdAt: { $gte: firstDayLastMonth, $lt: firstDayThisMonth } } },
            { $count: "count" }
          ]
        }
      }
    ]);

    const result = stats[0];
    const totalLeads = result.totalCount[0] ? result.totalCount[0].count : 0;
    
    const statusBreakdown = {};
    let won = 0;
    result.statusCounts.forEach(s => {
      statusBreakdown[s._id] = s.count;
      if (s._id === 'Won') won = s.count;
    });

    const sourceBreakdown = {};
    result.sourceCounts.forEach(s => {
      sourceBreakdown[s._id] = s.count;
    });

    const thisMonthLeads = result.thisMonthCount[0] ? result.thisMonthCount[0].count : 0;
    const lastMonthLeads = result.lastMonthCount[0] ? result.lastMonthCount[0].count : 0;
    
    // Calculate derived metrics and handle division by zero
    const conversionRate = totalLeads === 0 ? 0 : Number(((won / totalLeads) * 100).toFixed(1));
    
    let growthRate = 0;
    if (lastMonthLeads > 0) {
      growthRate = Number((((thisMonthLeads - lastMonthLeads) / lastMonthLeads) * 100).toFixed(1));
    } else if (thisMonthLeads > 0) {
      growthRate = 100;
    }

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        statusBreakdown,
        conversionRate,
        sourceBreakdown,
        thisMonthLeads,
        lastMonthLeads,
        growthRate
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get monthly analytics aggregations across the last 6 months
 * @route   GET /api/leads/monthly-stats
 * @access  Private (Owner isolated)
 * @param   {Object} req - Request object
 * @param   {Object} res - Response object
 * @param   {Function} next - Error handler
 * @returns {Array} Array of statistics grouped by month
 */
export const getMonthlyStats = async (req, res, next) => {
  try {
    const today = new Date();
    // Start of the 6th month ago (inclusive)
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);
    
    const monthlyData = await Lead.aggregate([
      { 
        $match: { 
          owner: req.user._id,
          createdAt: { $gte: sixMonthsAgo } 
        } 
      },
      {
        $group: {
          _id: { 
            year: { $year: '$createdAt' }, 
            month: { $month: '$createdAt' } 
          },
          total: { $sum: 1 },
          won: { $sum: { $cond: [{ $eq: ['$status', 'Won'] }, 1, 0] } },
          lost: { $sum: { $cond: [{ $eq: ['$status', 'Lost'] }, 1, 0] } }
        }
      }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Pre-fill the last 6 months to ensure months with 0 leads are represented in the chart
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      last6Months.push({
        year: d.getFullYear(),
        month: d.getMonth() + 1, // MongoDB uses 1-12
        name: `${monthNames[d.getMonth()]} ${d.getFullYear()}`
      });
    }

    const formattedData = last6Months.map(m => {
      const dataForMonth = monthlyData.find(d => d._id.year === m.year && d._id.month === m.month);
      const total = dataForMonth ? dataForMonth.total : 0;
      const won = dataForMonth ? dataForMonth.won : 0;
      const lost = dataForMonth ? dataForMonth.lost : 0;
      const conversionRate = total === 0 ? 0 : Number(((won / total) * 100).toFixed(1));
      
      return {
        month: m.name,
        total,
        won,
        lost,
        conversionRate
      };
    });

    res.status(200).json({ success: true, data: formattedData });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Quick search for autocomplete
 * @route   GET /api/leads/search
 * @access  Private (Owner isolated)
 * @param   {Object} req - Request object
 * @param   {Object} res - Response object
 * @param   {Function} next - Error handler
 * @returns {Array} Search results
 */
export const searchLeads = async (req, res, next) => {
  try {
    const { q, limit = 5 } = req.query;
    
    if (!q) {
      return res.status(200).json({ success: true, data: [] });
    }

    const regex = { $regex: q, $options: 'i' };
    const leads = await Lead.find({
      owner: req.user._id,
      $or: [
        { name: regex },
        { company: regex },
        { email: regex }
      ]
    })
    .select('_id name company email status')
    .limit(parseInt(limit, 10));

    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    next(error);
  }
};
