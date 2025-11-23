# 🔐 Plan Complet: Sistem Autentificare + Onboarding - DrawHub

**Data:** 23 Noiembrie 2025
**Versiune:** v3.0 - Full Authentication System
**Status:** 📋 PLAN DE IMPLEMENTARE

---

## 📊 ANALIZĂ APROFUNDATĂ

### 1. Situația Actuală (v2.1)

**Ce avem acum:**
- ✅ Onboarding funcțional (3 pași)
- ✅ Salvare profil în localStorage
- ✅ Sistem de recomandări personalizate
- ❌ **LIPSĂ**: Autentificare (Sign Up / Login)
- ❌ **LIPSĂ**: Backend pentru stocare persistentă
- ❌ **LIPSĂ**: Sincronizare cross-device

**Probleme actuale:**
1. **Nicio protecție a datelor** - localStorage poate fi șters
2. **Nicio sincronizare** - Profil diferit pe fiecare device/browser
3. **Nicio autentificare** - Oricine poate accesa aplicația
4. **Nicio persistență** - Clearing browser data = pierdere profil

---

### 2. Best Practices - Platforme Educaționale 2025

**Cercetare efectuată:**
- [Authgear - Login & Signup UX Guide 2025](https://www.authgear.com/post/login-signup-ux-guide)
- [Security Boulevard - Tutoring Platform Authentication](https://securityboulevard.com/2025/08/how-can-tutoring-platforms-protect-student-and-parent-logins-with-secure-authentication/)
- [EdTech Onboarding Examples](https://www.appcues.com/blog/edtech-onboarding-examples)

**Key Findings:**

#### Statistici Importante:
- **88% dintre utilizatori nu revin** după o experiență UX proastă la signup/login
- **Passkeys sunt acum mature** - suportate pe iOS, Android, Windows, macOS
- **Adaptive authentication** devine standard în 2025
- **SSO și MFA** sunt esențiale pentru platforme educaționale

#### Flow-ul Recomandat:
```
Homepage (Public)
  ↓
Sign Up / Login Buttons
  ↓
Sign Up Flow:
  1. Email + Password (cu validare strength)
  2. Email verification (verificare link)
  3. First login → ONBOARDING (3 steps)
  4. Salvare profil în database
  ↓
Login Flow (returning users):
  1. Email + Password
  2. Optional: 2FA/MFA pentru securitate
  3. Direct la Homepage (personalizat)
  4. Skip onboarding (deja completat)
```

---

### 3. Arhitectura Tehnică Recomandată

#### Stack Complet:

**Frontend (existent - vanilla JS):**
- ✅ Pages: home, lessons, profile, onboarding
- 🆕 Pages: **login, signup, email-verification, forgot-password**
- 🆕 Auth Service: Gestionare token JWT, refresh tokens

**Backend (NOU - Node.js + Express):**
- **Framework:** Express.js
- **Database:** PostgreSQL (Render oferă gratuit până la 256MB) sau MongoDB Atlas
- **ORM:** Sequelize (PostgreSQL) sau Mongoose (MongoDB)
- **Autentificare:** Passport.js + JWT
- **Password Hashing:** bcrypt
- **Email Service:** Nodemailer + Gmail SMTP (gratuit) sau SendGrid

**Security Features:**
- JWT tokens (access token + refresh token)
- Password hashing cu bcrypt (salt rounds: 10-12)
- Email verification obligatorie
- Rate limiting pentru login attempts
- CORS configuration
- Environment variables (.env)
- HTTPS only (Render oferă SSL gratuit)

---

## 🎯 PLAN DE IMPLEMENTARE - MODULAR

### Faza 1: Backend Setup (Ziua 1-2)

#### Modul 1.1: Setup Inițial Backend
**Timp estimat:** 2 ore

**Fișiere de creat:**
```
backend/
├── server.js              # Express server setup
├── .env                   # Environment variables
├── .gitignore            # Ignore node_modules, .env
├── package.json          # Dependencies
└── config/
    ├── db.js             # Database connection
    └── passport.js       # Passport JWT strategy
```

**Dependencies:**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "pg": "^8.11.3",
    "sequelize": "^6.35.0",
    "nodemailer": "^6.9.7",
    "express-rate-limit": "^7.1.5",
    "helmet": "^7.1.0"
  }
}
```

**Environment Variables (.env):**
```env
PORT=3000
NODE_ENV=production

# Database (Render PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# JWT Secrets (generate with: require('crypto').randomBytes(64).toString('hex'))
JWT_ACCESS_SECRET=your_access_token_secret_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Email (Gmail SMTP or SendGrid)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=DrawHub <noreply@drawhub.com>

# Frontend URL (for CORS)
FRONTEND_URL=https://drawhub.onrender.com

# Email Verification
EMAIL_VERIFICATION_TOKEN_EXPIRY=24h
```

**server.js básico:**
```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

#### Modul 1.2: Database Schema & Models
**Timp estimat:** 2 ore

**Database Schema (PostgreSQL/Sequelize):**

**Tabel: users**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  verification_token_expires TIMESTAMP,
  reset_password_token VARCHAR(255),
  reset_password_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Tabel: user_profiles**
```sql
CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  gender VARCHAR(20),
  experience_level VARCHAR(50),
  drawing_duration VARCHAR(50),
  learning_goals TEXT[], -- PostgreSQL array
  profile_picture TEXT, -- Base64 or URL
  preferred_style VARCHAR(50),
  learning_reason VARCHAR(100),
  learning_mode VARCHAR(50),
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Tabel: refresh_tokens**
```sql
CREATE TABLE refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Model User (Sequelize):**
```javascript
// backend/models/User.js
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_verified'
    },
    verificationToken: {
      type: DataTypes.STRING,
      field: 'verification_token'
    },
    verificationTokenExpires: {
      type: DataTypes.DATE,
      field: 'verification_token_expires'
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      field: 'reset_password_token'
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      field: 'reset_password_expires'
    }
  }, {
    tableName: 'users',
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  User.prototype.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  return User;
};
```

**Model UserProfile (Sequelize):**
```javascript
// backend/models/UserProfile.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const UserProfile = sequelize.define('UserProfile', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    experienceLevel: {
      type: DataTypes.STRING,
      field: 'experience_level'
    },
    drawingDuration: {
      type: DataTypes.STRING,
      field: 'drawing_duration'
    },
    learningGoals: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      field: 'learning_goals'
    },
    profilePicture: {
      type: DataTypes.TEXT,
      field: 'profile_picture'
    },
    preferredStyle: {
      type: DataTypes.STRING,
      field: 'preferred_style'
    },
    learningReason: {
      type: DataTypes.STRING,
      field: 'learning_reason'
    },
    learningMode: {
      type: DataTypes.STRING,
      field: 'learning_mode'
    },
    onboardingCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'onboarding_completed'
    }
  }, {
    tableName: 'user_profiles',
    underscored: true
  });

  return UserProfile;
};
```

---

#### Modul 1.3: Authentication Logic
**Timp estimat:** 3 ore

**Passport JWT Strategy:**
```javascript
// backend/config/passport.js
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/index.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET
};

export default (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findByPk(payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
```

**Auth Controller:**
```javascript
// backend/controllers/authController.js
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User, UserProfile, RefreshToken } from '../models/index.js';
import { sendVerificationEmail } from '../utils/emailService.js';

// Generate tokens
const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRY }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRY }
  );
};

// SIGN UP
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error: 'Email already registered'
      });
    }

    // Password strength validation
    if (password.length < 8) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters'
      });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await User.create({
      email,
      password, // Will be hashed by beforeCreate hook
      verificationToken,
      verificationTokenExpires: verificationExpires
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: 'Account created! Please check your email to verify.',
      userId: user.id
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
};

// EMAIL VERIFICATION
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      where: {
        verificationToken: token,
        verificationTokenExpires: { [Op.gt]: new Date() }
      }
    });

    if (!user) {
      return res.status(400).json({
        error: 'Invalid or expired verification token'
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    res.json({
      message: 'Email verified successfully! You can now log in.'
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Server error during verification' });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if verified
    if (!user.isVerified) {
      return res.status(401).json({
        error: 'Please verify your email before logging in'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Save refresh token
    await RefreshToken.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    // Check if onboarding completed
    const profile = await UserProfile.findOne({ where: { userId: user.id } });
    const needsOnboarding = !profile || !profile.onboardingCompleted;

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email
      },
      needsOnboarding
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token required' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Check if token exists in database
    const storedToken = await RefreshToken.findOne({
      where: {
        userId: decoded.id,
        token: refreshToken,
        expiresAt: { [Op.gt]: new Date() }
      }
    });

    if (!storedToken) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(decoded.id);

    res.json({ accessToken: newAccessToken });

  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Delete refresh token from database
    await RefreshToken.destroy({
      where: { token: refreshToken }
    });

    res.json({ message: 'Logged out successfully' });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Server error during logout' });
  }
};
```

**Email Service:**
```javascript
// backend/utils/emailService.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify your DrawHub account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #667eea;">Welcome to DrawHub! 🎨</h1>
        <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
        <a href="${verificationUrl}"
           style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">
          Verify Email
        </a>
        <p>Or copy this link: <a href="${verificationUrl}">${verificationUrl}</a></p>
        <p style="color: #666; font-size: 14px;">This link expires in 24 hours.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
```

---

### Faza 2: Frontend - Auth Pages (Ziua 2-3)

#### Modul 2.1: AuthService (API Client)
**Timp estimat:** 1 oră

```javascript
// src/js/services/authService.js
class AuthService {
  constructor() {
    this.apiUrl = 'https://drawhub-api.onrender.com/api'; // Backend URL
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  // SIGN UP
  async signup(email, password) {
    try {
      const response = await fetch(`${this.apiUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  // LOGIN
  async login(email, password) {
    try {
      const response = await fetch(`${this.apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store tokens
      this.setTokens(data.accessToken, data.refreshToken);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // VERIFY EMAIL
  async verifyEmail(token) {
    try {
      const response = await fetch(`${this.apiUrl}/auth/verify/${token}`, {
        method: 'GET'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      return data;
    } catch (error) {
      console.error('Verification error:', error);
      throw error;
    }
  }

  // LOGOUT
  async logout() {
    try {
      await fetch(`${this.apiUrl}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken })
      });

      this.clearTokens();
    } catch (error) {
      console.error('Logout error:', error);
      this.clearTokens(); // Clear tokens anyway
    }
  }

  // REFRESH ACCESS TOKEN
  async refreshAccessToken() {
    try {
      const response = await fetch(`${this.apiUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      this.setTokens(data.accessToken, this.refreshToken);
      return data.accessToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearTokens();
      window.location.href = '/login';
      throw error;
    }
  }

  // AUTHENTICATED API CALL
  async authenticatedFetch(url, options = {}) {
    try {
      const headers = {
        ...options.headers,
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      };

      let response = await fetch(url, { ...options, headers });

      // If 401, try to refresh token
      if (response.status === 401) {
        await this.refreshAccessToken();

        // Retry request with new token
        headers.Authorization = `Bearer ${this.accessToken}`;
        response = await fetch(url, { ...options, headers });
      }

      return response;
    } catch (error) {
      console.error('Authenticated fetch error:', error);
      throw error;
    }
  }

  // TOKEN MANAGEMENT
  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated() {
    return !!this.accessToken;
  }
}

export default new AuthService();
```

#### Modul 2.2: Login Page
**Timp estimat:** 2 ore

```javascript
// src/js/pages/login.js
import authService from '../services/authService.js';

export default class LoginPage {
  constructor() {
    this.isLoading = false;
  }

  async render() {
    return `
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>🎨 Welcome Back to DrawHub!</h1>
            <p>Log in to continue your drawing journey</p>
          </div>

          <form id="login-form" class="auth-form">
            <div class="form-group">
              <label for="email">Email <span class="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required
                autocomplete="email"
              >
            </div>

            <div class="form-group">
              <label for="password">Password <span class="required">*</span></label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                autocomplete="current-password"
              >
            </div>

            <div class="form-actions">
              <a href="#forgot-password" class="link-secondary">Forgot password?</a>
            </div>

            <button type="submit" class="btn btn-primary" id="login-btn">
              Log In
            </button>

            <div id="error-message" class="error-message" style="display: none;"></div>
          </form>

          <div class="auth-footer">
            <p>Don't have an account? <a href="#signup">Sign up</a></p>
          </div>
        </div>
      </div>
    `;
  }

  mount() {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const loginBtn = document.getElementById('login-btn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (this.isLoading) return;

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      this.isLoading = true;
      loginBtn.disabled = true;
      loginBtn.textContent = 'Logging in...';
      errorMessage.style.display = 'none';

      try {
        const response = await authService.login(email, password);

        // Check if needs onboarding
        if (response.needsOnboarding) {
          window.location.hash = 'onboarding';
          window.appRouter.navigate('onboarding');
        } else {
          window.location.hash = 'home';
          window.appRouter.navigate('home');
        }

      } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
        this.isLoading = false;
        loginBtn.disabled = false;
        loginBtn.textContent = 'Log In';
      }
    });
  }

  cleanup() {}
}
```

#### Modul 2.3: Signup Page
**Timp estimat:** 2 ore

```javascript
// src/js/pages/signup.js
import authService from '../services/authService.js';

export default class SignupPage {
  constructor() {
    this.isLoading = false;
  }

  async render() {
    return `
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>🎨 Join DrawHub!</h1>
            <p>Start your drawing journey today</p>
          </div>

          <form id="signup-form" class="auth-form">
            <div class="form-group">
              <label for="email">Email <span class="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required
                autocomplete="email"
              >
            </div>

            <div class="form-group">
              <label for="password">Password <span class="required">*</span></label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="At least 8 characters"
                required
                autocomplete="new-password"
                minlength="8"
              >
              <small class="form-hint">Must be at least 8 characters</small>
            </div>

            <div class="form-group">
              <label for="confirm-password">Confirm Password <span class="required">*</span></label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                required
                autocomplete="new-password"
              >
            </div>

            <div class="form-group checkbox-group">
              <label>
                <input type="checkbox" id="terms" required>
                <span>I agree to the <a href="#terms" target="_blank">Terms of Service</a> and <a href="#privacy" target="_blank">Privacy Policy</a></span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary" id="signup-btn">
              Create Account
            </button>

            <div id="error-message" class="error-message" style="display: none;"></div>
            <div id="success-message" class="success-message" style="display: none;"></div>
          </form>

          <div class="auth-footer">
            <p>Already have an account? <a href="#login">Log in</a></p>
          </div>
        </div>
      </div>
    `;
  }

  mount() {
    const form = document.getElementById('signup-form');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const signupBtn = document.getElementById('signup-btn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (this.isLoading) return;

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      // Validate passwords match
      if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match';
        errorMessage.style.display = 'block';
        return;
      }

      this.isLoading = true;
      signupBtn.disabled = true;
      signupBtn.textContent = 'Creating account...';
      errorMessage.style.display = 'none';
      successMessage.style.display = 'none';

      try {
        const response = await authService.signup(email, password);

        successMessage.innerHTML = `
          <strong>Success!</strong> ${response.message}<br>
          <small>Please check your email inbox and spam folder.</small>
        `;
        successMessage.style.display = 'block';

        // Clear form
        form.reset();

        // Redirect to login after 5 seconds
        setTimeout(() => {
          window.location.hash = 'login';
          window.appRouter.navigate('login');
        }, 5000);

      } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
      } finally {
        this.isLoading = false;
        signupBtn.disabled = false;
        signupBtn.textContent = 'Create Account';
      }
    });

    // Real-time password match validation
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    confirmPassword.addEventListener('input', () => {
      if (confirmPassword.value && password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity('Passwords do not match');
      } else {
        confirmPassword.setCustomValidity('');
      }
    });
  }

  cleanup() {}
}
```

---

### Faza 3: Integrare & Testing (Ziua 3-4)

#### Modul 3.1: Update App.js cu Auth Guard
```javascript
// src/js/app.js - modificări
import authService from './services/authService.js';

class App {
  init() {
    this.initializeState();
    this.registerRoutes();
    this.setupNavigation();

    // AUTH GUARD
    const isAuthenticated = authService.isAuthenticated();
    const currentHash = window.location.hash.slice(1);

    // Public routes
    const publicRoutes = ['login', 'signup', 'verify-email'];

    if (!isAuthenticated && !publicRoutes.includes(currentHash)) {
      // Not logged in and trying to access protected route
      this.router.navigate('login');
    } else if (isAuthenticated && publicRoutes.includes(currentHash)) {
      // Logged in but on auth page
      this.router.navigate('home');
    } else {
      // Normal navigation
      this.router.navigate(currentHash || 'home');
    }
  }
}
```

---

## 📊 TIMELINE & ESTIMĂRI

### Week 1: Backend (5-6 zile)
- **Ziua 1:** Setup backend + database (4 ore)
- **Ziua 2:** Models + migrations (3 ore)
- **Ziua 3:** Authentication logic + JWT (4 ore)
- **Ziua 4:** Email service + verification (3 ore)
- **Ziua 5:** Testing backend APIs (2 ore)
- **Ziua 6:** Deploy backend pe Render (1 oră)

### Week 2: Frontend Auth (3-4 zile)
- **Ziua 7:** AuthService + API client (2 ore)
- **Ziua 8:** Login page + styling (3 ore)
- **Ziua 9:** Signup page + validation (3 ore)
- **Ziua 10:** Email verification page (2 ore)

### Week 3: Integration & Polish (2-3 zile)
- **Ziua 11:** Auth guards + routing (2 ore)
- **Ziua 12:** Update onboarding integration (2 ore)
- **Ziua 13:** Testing end-to-end (3 ore)

**TOTAL ESTIMATED TIME: ~32 ore (2-3 săptămâni part-time)**

---

## 🎯 NEXT STEPS IMEDIATE

### Pasul 1: Decizie Tehnologică
**Alege:**
- Database: PostgreSQL (Render gratuit) sau MongoDB (Atlas gratuit)
- Email: Gmail SMTP (simplu) sau SendGrid (profesional)

### Pasul 2: Setup Render Backend
1. Creează nou web service pe Render
2. Alege "Node.js" runtime
3. Conectează repository GitHub
4. Adaugă PostgreSQL database (gratuit)

### Pasul 3: Începe Implementarea
Sugestie: **Modular, pas cu pas**
1. Backend setup (Modul 1.1)
2. Database & models (Modul 1.2)
3. Auth endpoints (Modul 1.3)
4. Frontend pages (Modul 2.x)

---

## 📚 RESURSE

**Tutorials Recomandate:**
- [Node.js Authentication with JWT and Passport](https://jonathas.com/token-based-authentication-in-nodejs-with-passport-jwt-and-bcrypt/)
- [Securing Node.js with JWT and Passport.js](https://soshace.com/securing-node-js-applications-with-jwt-and-passport-js/)
- [DigitalOcean - API Authentication with JWT](https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport)
- [Login & Signup UX Best Practices 2025](https://www.authgear.com/post/login-signup-ux-guide)

---

## ✅ CONCLUZIE

Acest plan oferă o **arhitectură completă și modulară** pentru sistemul de autentificare DrawHub, urmând best practices din 2025 pentru platforme educaționale.

**Key Benefits:**
- ✅ Securitate robustă (JWT + bcrypt + email verification)
- ✅ UX modern (flows testate și validate)
- ✅ Scalabil (backend separat, database relațională)
- ✅ Gratuit pentru început (Render + PostgreSQL free tier)
- ✅ Modular (poate fi implementat step-by-step)

**Întrebare pentru tine:** Vrei să încep cu implementarea? Cu ce modul să încep?

---

**Sources:**
- [Login & Signup UX Guide 2025 - Authgear](https://www.authgear.com/post/login-signup-ux-guide)
- [Tutoring Platform Authentication - Security Boulevard](https://securityboulevard.com/2025/08/how-can-tutoring-platforms-protect-student-and-parent-logins-with-secure-authentication/)
- [EdTech Onboarding Examples - Appcues](https://www.appcues.com/blog/edtech-onboarding-examples)
- [Token-Based Authentication in Node.js - Jonathas Ribeiro](https://jonathas.com/token-based-authentication-in-nodejs-with-passport-jwt-and-bcrypt/)
- [Securing Node.js with JWT - Soshace](https://soshace.com/securing-node-js-applications-with-jwt-and-passport-js/)
- [DigitalOcean JWT Tutorial](https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport)
