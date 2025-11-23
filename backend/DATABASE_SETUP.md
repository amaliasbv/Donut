# Database Setup Guide

## Module 1.2: Database Models - COMPLETED ✅

All database models have been created successfully!

## Files Created:

### 1. Database Configuration
- **[config/database.js](config/database.js)** - Sequelize connection with PostgreSQL

### 2. Models (3 tables)
- **[models/User.js](models/User.js)** - Authentication table
- **[models/UserProfile.js](models/UserProfile.js)** - Onboarding data table
- **[models/RefreshToken.js](models/RefreshToken.js)** - JWT refresh tokens table
- **[models/index.js](models/index.js)** - Model relationships and sync

### 3. Migration Scripts
- **[scripts/createDatabase.js](scripts/createDatabase.js)** - Create all tables
- **[scripts/testDatabase.js](scripts/testDatabase.js)** - Test database operations

## Database Schema:

### Table: `users` (Authentication)
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
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Table: `user_profiles` (Onboarding Data)
```sql
CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 5 AND age <= 120),
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  experience_level VARCHAR(20) NOT NULL CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  drawing_duration VARCHAR(255) NOT NULL,
  learning_goals TEXT[],
  profile_picture TEXT,
  preferred_style VARCHAR(20) NOT NULL CHECK (preferred_style IN ('realistic', 'anime', 'cartoon', 'semi-realistic')),
  learning_reason VARCHAR(255) NOT NULL,
  learning_mode VARCHAR(20) NOT NULL CHECK (learning_mode IN ('video', 'text', 'practice')),
  onboarding_completed BOOLEAN DEFAULT true,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  assignments_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Table: `refresh_tokens` (JWT Tokens)
```sql
CREATE TABLE refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  is_revoked BOOLEAN DEFAULT false,
  user_agent VARCHAR(255),
  ip_address VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Model Relationships:

```
User (1) ----< (1) UserProfile
  |
  |
  +----< (*) RefreshToken
```

- **User → UserProfile**: One-to-One (CASCADE delete)
- **User → RefreshToken**: One-to-Many (CASCADE delete)

## Model Methods:

### User Model:
```javascript
// Instance methods
user.comparePassword(password)           // Compare hashed password
user.isVerificationTokenValid()          // Check if email token valid
user.isResetPasswordTokenValid()         // Check if reset token valid

// Class methods
User.findByEmail(email)                  // Find user by email
```

### UserProfile Model:
```javascript
// Instance methods
profile.getRecommendationPreferences()   // Get user preferences for lesson recommendations

// Class methods
UserProfile.findByUserId(userId)         // Find profile by user ID
```

### RefreshToken Model:
```javascript
// Instance methods
token.isValid()                          // Check if token is valid (not expired/revoked)

// Class methods
RefreshToken.findValidToken(token)       // Find and validate token
RefreshToken.revokeAllUserTokens(userId) // Revoke all user tokens (logout all devices)
RefreshToken.cleanupExpired()            // Delete expired tokens (scheduled cleanup)
```

## Setup Instructions:

### 1. Install Node.js dependencies:
```bash
cd backend
npm install
```

### 2. Setup PostgreSQL Database:

**Option A: Render (Free, Recommended)**
1. Go to https://render.com
2. Sign up (free)
3. Create new PostgreSQL database
4. Copy "External Database URL"
5. Paste in `.env` file

**Option B: Local PostgreSQL**
```bash
# Install PostgreSQL, then:
psql -U postgres
CREATE DATABASE drawhub;
\q
```

### 3. Configure Environment:
```bash
# Copy example
cp .env.example .env

# Edit .env and set:
DATABASE_URL=postgresql://user:password@host:5432/drawhub
```

### 4. Create Database Tables:
```bash
npm run db:create
```

Expected output:
```
🔄 Starting database migration...
✅ Database connection established
📋 Creating tables...
✅ Database migration completed successfully!
📊 Tables created:
  - users (authentication)
  - user_profiles (onboarding data)
  - refresh_tokens (JWT refresh tokens)
```

### 5. (Optional) Create Test User:
```bash
npm run db:seed
```

This creates a test account:
- Email: test@drawhub.com
- Password: testpassword123

### 6. Test Database:
```bash
npm run db:test
```

This runs 8 tests:
1. ✅ Database Connection
2. ✅ Create User
3. ✅ Find User by Email
4. ✅ Password Comparison
5. ✅ Create UserProfile
6. ✅ User with Profile (JOIN)
7. ✅ Create RefreshToken
8. ✅ Cleanup Test Data

## Validation Rules:

### User (Authentication):
- **email**: Valid email format, unique, required
- **password**: Min 8 characters, max 100, required
- **isVerified**: Boolean, defaults to false

### UserProfile (Onboarding):
- **name**: 2-100 characters, required
- **age**: 5-120, required
- **gender**: 'male' | 'female' | 'other', required
- **experienceLevel**: 'beginner' | 'intermediate' | 'advanced', required
- **drawingDuration**: Free text, required
- **learningGoals**: Array of strings (optional)
- **profilePicture**: Base64 text (optional)
- **preferredStyle**: 'realistic' | 'anime' | 'cartoon' | 'semi-realistic', required
- **learningReason**: Free text, required
- **learningMode**: 'video' | 'text' | 'practice', required

### RefreshToken:
- **token**: String (JWT), unique, required
- **expiresAt**: Date, required
- **isRevoked**: Boolean, defaults to false

## Security Features:

### Password Security:
- ✅ Bcrypt hashing with salt rounds 10
- ✅ Automatic hashing on user creation
- ✅ Automatic rehashing on password update
- ✅ Secure password comparison method

### Token Security:
- ✅ Verification tokens expire after 24 hours
- ✅ Reset password tokens expire after 1 hour
- ✅ Refresh tokens can be revoked
- ✅ Expired tokens automatically marked as invalid
- ✅ Device tracking (user agent, IP address)

### Database Security:
- ✅ CASCADE delete (user deletion removes profile and tokens)
- ✅ Unique constraints (email, user_id in profile)
- ✅ Validation at model level
- ✅ SSL connection in production

## Next Steps:

✅ **Module 1.1**: Express server setup - COMPLETE
✅ **Module 1.2**: Database models - COMPLETE
⏳ **Module 1.3**: Authentication controller (signup, login, verify, refresh, logout)
⏳ **Module 1.4**: Email service (Nodemailer)
⏳ **Module 2.1**: Profile endpoints (save, get, update)

## Troubleshooting:

### Error: "Unable to connect to database"
- Check DATABASE_URL is correct in .env
- Verify database exists
- Test connection manually: `psql <DATABASE_URL>`

### Error: "relation does not exist"
- Tables not created yet
- Run: `npm run db:create`

### Error: "duplicate key value violates unique constraint"
- Email already exists in database
- Use different email or delete existing user

### Error: "password too short"
- Password must be at least 8 characters
- Update validation in User model if needed

## Testing Checklist:

- [x] Database models created
- [x] Relationships defined
- [x] Validation rules added
- [x] Instance methods implemented
- [x] Class methods implemented
- [x] Password hashing works
- [x] Token validation works
- [x] CASCADE delete works
- [x] Migration script works
- [x] Test script works
- [x] Server integrates with database

**Status: Module 1.2 COMPLETE ✅**
