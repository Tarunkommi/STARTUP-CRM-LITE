/**
 * Global Express Error Handler Middleware.
 * Catches all errors passed to next() and formats them consistently.
 * 
 * @param {Error} err - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const errorHandler = (err, req, res, next) => {
  // Default to 500 Server Error if status code is not already set by a controller
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Server Error';
  let errors = null;

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = {};
    // Extract field-by-field error messages
    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }
  }

  // Handle Mongoose CastError (e.g., invalid ObjectId format)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Handle MongoDB Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    // Provide specific message for duplicate emails
    if (err.keyPattern && err.keyPattern.email) {
      message = 'Email already exists';
    } else {
      message = 'Duplicate field value entered';
    }
  }

  // Handle JSON Web Token Errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Not authorized, invalid or expired token';
  }

  // Construct the final response payload
  const responsePayload = {
    success: false,
    message,
    ...(errors && { errors }),
    // Include stack trace only in non-production environments
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  };

  // Send the formatted error response
  res.status(statusCode).json(responsePayload);
};
