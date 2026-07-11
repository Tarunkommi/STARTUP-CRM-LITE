/**
 * Helper functions for consistent API responses across the application.
 */

/**
 * Sends a successful JSON response.
 * 
 * @param {Object} res - Express response object.
 * @param {any} data - The data payload to return.
 * @param {string} message - A success message.
 * @param {number} [statusCode=200] - HTTP status code (defaults to 200).
 * @returns {Object} Express JSON response.
 */
export const successResponse = (res, data, message, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Sends an error JSON response.
 * 
 * @param {Object} res - Express response object.
 * @param {string} message - The error message.
 * @param {number} [statusCode=500] - HTTP status code (defaults to 500).
 * @param {any} [errors=null] - Additional validation or detailed errors.
 * @returns {Object} Express JSON response.
 */
export const errorResponse = (res, message, statusCode = 500, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

/**
 * Sends a successful JSON response containing paginated data.
 * 
 * @param {Object} res - Express response object.
 * @param {Array} data - The array of data items for the current page.
 * @param {number} total - Total number of items available.
 * @param {number} page - The current page number.
 * @param {number} limit - The number of items per page.
 * @returns {Object} Express JSON response with pagination metadata.
 */
export const paginatedResponse = (res, data, total, page, limit) => {
  const pages = Math.ceil(total / limit);
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      pages,
    },
  });
};
