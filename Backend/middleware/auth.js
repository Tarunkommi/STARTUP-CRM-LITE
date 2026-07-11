import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { errorResponse } from '../utils/apiResponse.js';

/**
 * Protect middleware to secure routes.
 * Extracts the JWT token, verifies it, and attaches the user to the request.
 */
export const protect = async (req, res, next) => {
  let token;

  // Extract JWT from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If token is missing
  if (!token) {
    return errorResponse(res, 'No token provided, access denied', 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in database (exclude password field)
    const currentUser = await User.findById(decoded.id).select('-password');

    // If user no longer exists
    if (!currentUser) {
      return errorResponse(res, 'User belonging to this token no longer exists', 401);
    }

    // Attach user to the request object
    req.user = currentUser;
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token has expired, please login again', 401);
    }
    return errorResponse(res, 'Token is invalid', 401);
  }
};
