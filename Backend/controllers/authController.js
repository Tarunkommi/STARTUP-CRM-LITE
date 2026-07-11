import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * Helper function to generate a JWT token.
 * 
 * @param {string} userId - The ID of the user
 * @returns {string} Signed JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

/**
 * Register a new user
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, 'Email already exists', 400);
    }

    // Create new User document
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate JWT
    const token = generateToken(user._id);

    // Return 201 with token and user (password is stripped automatically via toJSON override)
    res.status(201).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login a user
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email and explicitly include password for verification
    const user = await User.findOne({ email }).select('+password');

    // If not found or password wrong
    if (!user || !(await user.comparePassword(password))) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // If user account is deactivated
    if (!user.isActive) {
      return errorResponse(res, 'Account is deactivated', 403);
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Return 200 with token and user (password is stripped automatically via toJSON override)
    res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 */
export const getProfile = async (req, res, next) => {
  try {
    // Return req.user (already fetched and attached by protect middleware)
    successResponse(res, req.user, 'Profile retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update current user profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, oldPassword, newPassword } = req.body;

    // Must fetch user with password field explicitly to validate old password if changing
    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    // Update name if provided (email changes omitted as per rules)
    if (name) {
      user.name = name;
    }

    // Handle password update
    if (newPassword) {
      if (!oldPassword) {
        return errorResponse(res, 'Current password is required to set a new password', 400);
      }
      
      // Validate old password first
      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) {
        return errorResponse(res, 'Incorrect current password', 401);
      }
      
      // Update with new password (pre-save middleware will hash it automatically)
      user.password = newPassword;
    }

    // Save updated user document
    await user.save();

    // Return updated user
    successResponse(res, user, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};
