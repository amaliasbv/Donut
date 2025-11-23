# Backend Setup Instructions

## Prerequisites

You need to have Node.js installed on your system.

### Check if Node.js is installed:
```bash
node --version
npm --version
```

### If Node.js is NOT installed:

**Windows:**
1. Download Node.js LTS from: https://nodejs.org/
2. Run the installer (.msi file)
3. Restart your terminal/VSCode
4. Verify installation: `node --version`

**Alternative - Using winget (Windows 11/10):**
```bash
winget install OpenJS.NodeJS.LTS
```

## Installation Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

This will install all required packages:
- express (web server)
- cors (cross-origin resource sharing)
- helmet (security headers)
- bcrypt (password hashing)
- jsonwebtoken (JWT tokens)
- passport (authentication)
- sequelize (database ORM)
- nodemailer (email service)
- And more...

### 2. Configure Environment

Copy the example environment file:
```bash
copy .env.example .env
```

Edit `.env` file with your settings:

**Required changes:**
```env
# Generate random secrets (use Node.js crypto or online generator)
JWT_ACCESS_SECRET=your_random_32_char_string_here
JWT_REFRESH_SECRET=another_random_32_char_string_here

# Your PostgreSQL database URL (from Render or local)
DATABASE_URL=postgresql://user:password@host:5432/database

# Your email credentials (Gmail app password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**To generate JWT secrets in Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Test Server

Start the development server:
```bash
npm run dev
```

Or for production:
```bash
npm start
```

Expected output:
```
🎨 DrawHub Backend Server Started
================================
📡 Port: 3000
🌍 Environment: development
🔗 Health Check: http://localhost:3000/api/health
📚 API Info: http://localhost:3000/api
================================
```

### 4. Test API

Open your browser or use curl:
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "DrawHub API Server is running",
  "timestamp": "2025-11-23T...",
  "environment": "development"
}
```

## Database Setup (PostgreSQL)

You'll need a PostgreSQL database. Options:

### Option 1: Render (Free Tier) - RECOMMENDED
1. Go to https://render.com
2. Create account (free)
3. Create new PostgreSQL database
4. Copy the "External Database URL"
5. Paste into `.env` as `DATABASE_URL`

### Option 2: Local PostgreSQL
1. Install PostgreSQL: https://www.postgresql.org/download/
2. Create database:
```sql
CREATE DATABASE drawhub;
```
3. Update `.env`:
```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/drawhub
```

## Email Setup (Gmail)

To send verification emails:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Create App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
3. **Update .env:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop  # 16-char app password
```

## Troubleshooting

### "npm: command not found"
- Node.js is not installed or not in PATH
- Install Node.js from https://nodejs.org/
- Restart terminal after installation

### "Error: connect ECONNREFUSED"
- Database is not running or URL is wrong
- Check DATABASE_URL in .env
- Verify database is accessible

### "Error: Invalid login credentials" (email)
- Using regular Gmail password instead of App Password
- 2FA not enabled on Gmail account
- Wrong email/password in .env

### Port 3000 already in use
- Another application is using port 3000
- Change PORT in .env to 3001 or other available port
- Or stop the other application

## Next Steps

After successful server setup:
1. ✅ Server runs and responds to /api/health
2. ⏳ Create database models (Module 1.2)
3. ⏳ Implement authentication controller (Module 1.3)
4. ⏳ Setup email service (Module 1.4)

## Testing Checklist

- [ ] Node.js installed and working
- [ ] Dependencies installed (npm install)
- [ ] .env file created and configured
- [ ] Server starts without errors
- [ ] /api/health returns 200 OK
- [ ] Database connection works (will test in Module 1.2)
- [ ] Email credentials configured (will test in Module 1.4)
