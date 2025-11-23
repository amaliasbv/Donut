import { User, UserProfile, RefreshToken } from '../models/index.js';
import {
  generateAccessToken,
  generateRefreshToken,
  generateVerificationToken,
  generateResetToken,
  saveRefreshToken,
  revokeRefreshToken,
  getValidRefreshToken
} from '../utils/tokenUtils.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/emailService.js';

/**
 * @route   POST /api/auth/signup
 * @desc    Register new user
 * @access  Public
 */
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email and password are required'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Password must be at least 8 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'An account with this email already exists'
      });
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const verificationTokenExpires = new Date();
    verificationTokenExpires.setHours(verificationTokenExpires.getHours() + 24); // 24 hours

    // Create user
    const user = await User.create({
      email,
      password, // Will be hashed by model hook
      isVerified: false,
      verificationToken,
      verificationTokenExpires
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError.message);
      // Don't fail signup if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Please check your email to verify your account.',
      user: {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    console.error('Signup error:', error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.errors[0].message
      });
    }

    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to create account. Please try again later.'
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return tokens
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        error: 'Authentication Error',
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Authentication Error',
        message: 'Invalid email or password'
      });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).json({
        error: 'Email Not Verified',
        message: 'Please verify your email before logging in. Check your inbox for the verification link.',
        needsVerification: true
      });
    }

    // Check if user has completed onboarding
    const profile = await UserProfile.findByUserId(user.id);
    const needsOnboarding = !profile || !profile.onboardingCompleted;

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id, user.email);

    // Save refresh token to database
    const userAgent = req.headers['user-agent'] || null;
    const ipAddress = req.ip || req.connection.remoteAddress || null;
    await saveRefreshToken(user.id, refreshToken, userAgent, ipAddress);

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
      needsOnboarding,
      user: {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
        profile: profile ? {
          name: profile.name,
          profilePicture: profile.profilePicture
        } : null
      }
    });

  } catch (error) {
    console.error('Login error:', error);

    res.status(500).json({
      error: 'Server Error',
      message: 'Login failed. Please try again later.'
    });
  }
};

/**
 * @route   GET /api/auth/verify/:token
 * @desc    Verify email address
 * @access  Public
 */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Verification token is required'
      });
    }

    // Find user with this token
    const user = await User.findOne({
      where: { verificationToken: token }
    });

    if (!user) {
      return res.status(404).json({
        error: 'Invalid Token',
        message: 'Verification token is invalid or has already been used'
      });
    }

    // Check if token is still valid
    if (!user.isVerificationTokenValid()) {
      return res.status(410).json({
        error: 'Token Expired',
        message: 'Verification token has expired. Please request a new one.'
      });
    }

    // Verify user
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully! You can now log in.'
    });

  } catch (error) {
    console.error('Email verification error:', error);

    res.status(500).json({
      error: 'Server Error',
      message: 'Email verification failed. Please try again later.'
    });
  }
};

/**
 * @route   POST /api/auth/refresh
 * @desc    Get new access token using refresh token
 * @access  Public
 */
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Refresh token is required'
      });
    }

    // Validate refresh token
    const { token: validToken, decoded } = await getValidRefreshToken(refreshToken);

    // Generate new access token
    const newAccessToken = generateAccessToken(decoded.userId, decoded.email);

    res.json({
      success: true,
      accessToken: newAccessToken
    });

  } catch (error) {
    console.error('Refresh token error:', error);

    if (error.message.includes('expired') || error.message.includes('not found')) {
      return res.status(401).json({
        error: 'Invalid Token',
        message: 'Refresh token is invalid or expired. Please log in again.',
        needsLogin: true
      });
    }

    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to refresh token. Please try again later.'
    });
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (revoke refresh token)
 * @access  Private
 */
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Refresh token is required'
      });
    }

    // Revoke refresh token
    await revokeRefreshToken(refreshToken);

    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);

    // Even if revocation fails, return success (client will clear tokens)
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  }
};

/**
 * @route   POST /api/auth/resend-verification
 * @desc    Resend verification email
 * @access  Public
 */
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email is required'
      });
    }

    // Find user
    const user = await User.findByEmail(email);

    if (!user) {
      // Don't reveal if user exists or not (security)
      return res.json({
        success: true,
        message: 'If an account with this email exists, a verification email has been sent.'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        error: 'Already Verified',
        message: 'This email is already verified. You can log in.'
      });
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken();
    const verificationTokenExpires = new Date();
    verificationTokenExpires.setHours(verificationTokenExpires.getHours() + 24);

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save();

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    res.json({
      success: true,
      message: 'Verification email sent. Please check your inbox.'
    });

  } catch (error) {
    console.error('Resend verification error:', error);

    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to send verification email. Please try again later.'
    });
  }
};

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email is required'
      });
    }

    // Find user
    const user = await User.findByEmail(email);

    if (!user) {
      // Don't reveal if user exists or not (security)
      return res.json({
        success: true,
        message: 'If an account with this email exists, a password reset email has been sent.'
      });
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    // Send reset email
    await sendPasswordResetEmail(email, resetToken);

    res.json({
      success: true,
      message: 'Password reset email sent. Please check your inbox.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);

    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to send password reset email. Please try again later.'
    });
  }
};

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Token and new password are required'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Password must be at least 8 characters long'
      });
    }

    // Find user with this token
    const user = await User.findOne({
      where: { resetPasswordToken: token }
    });

    if (!user) {
      return res.status(404).json({
        error: 'Invalid Token',
        message: 'Password reset token is invalid or has already been used'
      });
    }

    // Check if token is still valid
    if (!user.isResetPasswordTokenValid()) {
      return res.status(410).json({
        error: 'Token Expired',
        message: 'Password reset token has expired. Please request a new one.'
      });
    }

    // Update password
    user.password = newPassword; // Will be hashed by model hook
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    // Revoke all refresh tokens (force re-login on all devices)
    await RefreshToken.revokeAllUserTokens(user.id);

    res.json({
      success: true,
      message: 'Password reset successfully! You can now log in with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);

    res.status(500).json({
      error: 'Server Error',
      message: 'Password reset failed. Please try again later.'
    });
  }
};

export default {
  signup,
  login,
  verifyEmail,
  refreshAccessToken,
  logout,
  resendVerification,
  forgotPassword,
  resetPassword
};
