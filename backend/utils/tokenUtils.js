import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { RefreshToken } from '../models/index.js';

/**
 * Generate JWT Access Token
 * Short-lived (15 minutes) for API access
 */
export const generateAccessToken = (userId, email) => {
  const payload = {
    userId,
    email,
    type: 'access'
  };

  const options = {
    expiresIn: process.env.JWT_ACCESS_EXPIRY || process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    issuer: 'drawhub-api',
    audience: 'drawhub-client'
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, options);
};

/**
 * Generate JWT Refresh Token
 * Long-lived (7 days) for getting new access tokens
 */
export const generateRefreshToken = (userId, email) => {
  const payload = {
    userId,
    email,
    type: 'refresh',
    tokenId: crypto.randomBytes(16).toString('hex') // Unique ID for revocation
  };

  const options = {
    expiresIn: process.env.JWT_REFRESH_EXPIRY || process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    issuer: 'drawhub-api',
    audience: 'drawhub-client'
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, options);
};

/**
 * Verify JWT Access Token
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
      issuer: 'drawhub-api',
      audience: 'drawhub-client'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Access token expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid access token');
    } else {
      throw error;
    }
  }
};

/**
 * Verify JWT Refresh Token
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
      issuer: 'drawhub-api',
      audience: 'drawhub-client'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Refresh token expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid refresh token');
    } else {
      throw error;
    }
  }
};

/**
 * Generate Email Verification Token
 * Random 32-byte hex string
 */
export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Generate Password Reset Token
 * Random 32-byte hex string
 */
export const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Save Refresh Token to Database
 */
export const saveRefreshToken = async (userId, token, userAgent = null, ipAddress = null) => {
  try {
    // Decode token to get expiration
    const decoded = verifyRefreshToken(token);
    const expiresAt = new Date(decoded.exp * 1000); // Convert to milliseconds

    // Save to database
    const refreshToken = await RefreshToken.create({
      userId,
      token,
      expiresAt,
      userAgent,
      ipAddress
    });

    return refreshToken;
  } catch (error) {
    throw new Error('Failed to save refresh token: ' + error.message);
  }
};

/**
 * Revoke Refresh Token (for logout)
 */
export const revokeRefreshToken = async (token) => {
  try {
    const refreshToken = await RefreshToken.findOne({ where: { token } });

    if (!refreshToken) {
      return false;
    }

    refreshToken.isRevoked = true;
    await refreshToken.save();

    return true;
  } catch (error) {
    throw new Error('Failed to revoke refresh token: ' + error.message);
  }
};

/**
 * Get Valid Refresh Token from Database
 */
export const getValidRefreshToken = async (token) => {
  try {
    // Verify JWT signature first
    const decoded = verifyRefreshToken(token);

    // Find in database
    const refreshToken = await RefreshToken.findValidToken(token);

    if (!refreshToken) {
      throw new Error('Refresh token not found or expired');
    }

    return { token: refreshToken, decoded };
  } catch (error) {
    throw error;
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateVerificationToken,
  generateResetToken,
  saveRefreshToken,
  revokeRefreshToken,
  getValidRefreshToken
};
