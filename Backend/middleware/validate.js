import { validationResult } from 'express-validator';

/**
 * Middleware builder to run express-validator checks.
 * Collects errors and returns a 400 response if validation fails.
 * 
 * @param {Array} validations - Array of express-validator rules
 * @returns {Function} Express middleware function
 */
export const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations concurrently
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    
    // If there are validation errors, format and return them
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }));

      return res.status(400).json({
        success: false,
        errors: formattedErrors
      });
    }

    // If no errors, proceed to the next middleware
    next();
  };
};
