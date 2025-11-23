import express from 'express';
import { body } from 'express-validator';
import {
  signup,
  login,
  verifyEmail,
  refreshAccessToken,
  logout,
  resendVerification,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register new user
 * @access  Public
 */
router.post('/signup',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  ],
  signup
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return tokens
 * @access  Public
 */
router.post('/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  login
);

/**
 * @route   GET /api/auth/verify/:token
 * @desc    Verify email address
 * @access  Public
 */
router.get('/verify/:token', verifyEmail);

/**
 * @route   POST /api/auth/refresh
 * @desc    Get new access token using refresh token
 * @access  Public
 */
router.post('/refresh',
  [
    body('refreshToken').notEmpty().withMessage('Refresh token is required')
  ],
  refreshAccessToken
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (revoke refresh token)
 * @access  Private (but we don't enforce auth here)
 */
router.post('/logout',
  [
    body('refreshToken').notEmpty().withMessage('Refresh token is required')
  ],
  logout
);

/**
 * @route   POST /api/auth/resend-verification
 * @desc    Resend verification email
 * @access  Public
 */
router.post('/resend-verification',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
  ],
  resendVerification
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post('/forgot-password',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
  ],
  forgotPassword
);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password',
  [
    body('token').notEmpty().withMessage('Reset token is required'),
    body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  ],
  resetPassword
);

export default router;
