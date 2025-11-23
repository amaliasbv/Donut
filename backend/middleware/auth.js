import passport from '../config/passport.js';

/**
 * Middleware to authenticate requests using JWT
 * Requires valid access token in Authorization header: "Bearer <token>"
 */
export const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        error: 'Authentication Error',
        message: 'Failed to authenticate request'
      });
    }

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: info?.message || 'Authentication required',
        needsLogin: true
      });
    }

    // Attach user to request
    req.user = user;
    next();
  })(req, res, next);
};

/**
 * Optional authentication middleware
 * Attaches user if token is valid, but doesn't require authentication
 */
export const optionalAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};

/**
 * Check if user has completed onboarding
 * Should be used after authenticate() middleware
 */
export const requireOnboarding = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
    }

    // Import UserProfile here to avoid circular dependency
    const { UserProfile } = await import('../models/index.js');

    const profile = await UserProfile.findByUserId(req.user.id);

    if (!profile || !profile.onboardingCompleted) {
      return res.status(403).json({
        error: 'Onboarding Required',
        message: 'Please complete onboarding first',
        needsOnboarding: true
      });
    }

    // Attach profile to request
    req.userProfile = profile;
    next();
  } catch (error) {
    console.error('Onboarding check error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to check onboarding status'
    });
  }
};

export default {
  authenticate,
  optionalAuth,
  requireOnboarding
};
