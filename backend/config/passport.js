import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models/index.js';

// JWT Strategy for protected routes
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET
};

passport.use('jwt', new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // Validate payload structure
    if (!payload || !payload.userId) {
      return done(null, false, { message: 'Invalid token payload' });
    }

    // Check token type (should be access token)
    if (payload.type && payload.type !== 'access') {
      return done(null, false, { message: 'Invalid token type' });
    }

    // Find user by ID from JWT payload
    const user = await User.findByPk(payload.userId);

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return done(null, false, { message: 'Email not verified' });
    }

    // Attach user to request
    return done(null, user);
  } catch (error) {
    console.error('JWT Strategy error:', error.message);
    return done(null, false, { message: 'Token verification failed' });
  }
}));

// Local Strategy for login (email/password)
const localOptions = {
  usernameField: 'email',
  passwordField: 'password'
};

passport.use('local', new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    // Find user by email
    const user = await User.findByEmail(email);

    if (!user) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    // Return user
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;
