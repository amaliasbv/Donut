# DrawHub Backend API

Authentication and profile management backend for DrawHub platform.

## Setup

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start server:**
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## Environment Variables

See `.env.example` for all required variables.

**Critical variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_ACCESS_SECRET` - Secret for access tokens (min 32 chars)
- `JWT_REFRESH_SECRET` - Secret for refresh tokens (min 32 chars)
- `EMAIL_USER` - Email account for sending verification emails
- `EMAIL_PASSWORD` - App password for email account

## API Endpoints

### Health Check
```
GET /api/health
```

### Authentication
```
POST /api/auth/signup       - Create new account
POST /api/auth/login        - Login with email/password
GET  /api/auth/verify/:token - Verify email address
POST /api/auth/refresh      - Refresh access token
POST /api/auth/logout       - Logout (invalidate refresh token)
```

### Profile
```
GET  /api/profile          - Get user profile
POST /api/profile          - Save user profile (after onboarding)
PUT  /api/profile          - Update user profile
```

## Security Features

- ✅ Helmet.js security headers
- ✅ CORS protection
- ✅ Rate limiting (100 req/15min general, 5 req/15min auth)
- ✅ bcrypt password hashing (salt rounds: 10)
- ✅ JWT access tokens (15 min expiry)
- ✅ JWT refresh tokens (7 day expiry, revocable)
- ✅ Email verification required
- ✅ Input validation

## Testing

```bash
# Test server is running
curl http://localhost:3000/api/health

# Expected response
{
  "status": "ok",
  "message": "DrawHub API Server is running",
  "timestamp": "2025-11-23T...",
  "environment": "development"
}
```

## Project Structure

```
backend/
├── server.js           # Express server entry point
├── config/            # Database and passport configuration
├── controllers/       # Request handlers
├── models/           # Sequelize models
├── routes/           # Route definitions
├── middleware/       # Custom middleware
├── utils/            # Helper functions (email, etc)
├── .env.example      # Environment template
└── package.json      # Dependencies
```

## Development Progress

- [x] Module 1.1: Express server setup
- [ ] Module 1.2: Database models
- [ ] Module 1.3: Authentication controller
- [ ] Module 1.4: Email service
- [ ] Module 2.1: Profile endpoints
- [ ] Module 2.2: Frontend AuthService
- [ ] Module 3.1: Login page
- [ ] Module 3.2: Signup page
- [ ] Module 4: Integration & Testing
- [ ] Module 5: Deployment

## Next Steps

1. Create database models (User, UserProfile, RefreshToken)
2. Setup Sequelize connection
3. Implement authentication controller
4. Add email verification service
