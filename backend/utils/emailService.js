import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter with explicit Gmail settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates on some cloud platforms
  }
});

// Verify transporter configuration
export const verifyEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email service configured correctly');
    return true;
  } catch (error) {
    console.error('❌ Email service configuration error:', error.message);
    console.error('⚠️  Emails will not be sent. Check EMAIL_USER and EMAIL_PASSWORD in .env');
    return false;
  }
};

/**
 * Send Email Verification Email
 */
export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM || `"DrawHub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your DrawHub account 🎨',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px;
            border-radius: 12px;
            text-align: center;
          }
          .content {
            background: white;
            padding: 30px;
            border-radius: 8px;
            margin-top: 20px;
          }
          h1 {
            color: white;
            font-size: 32px;
            margin: 0 0 20px 0;
          }
          .button {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
          }
          .button:hover {
            opacity: 0.9;
          }
          .footer {
            color: #666;
            font-size: 14px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 12px;
            margin: 20px 0;
            font-size: 14px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎨 Welcome to DrawHub!</h1>
        </div>

        <div class="content">
          <h2>Verify Your Email Address</h2>

          <p>Thank you for signing up! To complete your registration and start your art learning journey, please verify your email address by clicking the button below:</p>

          <a href="${verificationUrl}" class="button">Verify Email Address</a>

          <div class="warning">
            <strong>⏰ This link expires in 24 hours.</strong><br>
            If you didn't create an account with DrawHub, you can safely ignore this email.
          </div>

          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #667eea; word-break: break-all;">${verificationUrl}</a>
          </p>

          <div class="footer">
            <p>
              <strong>What's next?</strong><br>
              After verification, you'll complete a quick onboarding to personalize your learning experience.
            </p>
            <p style="margin-top: 20px;">
              Happy drawing!<br>
              The DrawHub Team
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Welcome to DrawHub! 🎨

Please verify your email address by visiting this link:
${verificationUrl}

This link expires in 24 hours.

If you didn't create an account with DrawHub, you can safely ignore this email.

Happy drawing!
The DrawHub Team
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Verification email sent to: ${email}`);
    return true;
  } catch (error) {
    console.error('Failed to send verification email:', error.message);
    throw new Error('Failed to send verification email');
  }
};

/**
 * Send Password Reset Email
 */
export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM || `"DrawHub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset your DrawHub password 🔒',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px;
            border-radius: 12px;
            text-align: center;
          }
          .content {
            background: white;
            padding: 30px;
            border-radius: 8px;
            margin-top: 20px;
          }
          h1 {
            color: white;
            font-size: 32px;
            margin: 0 0 20px 0;
          }
          .button {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
          }
          .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 12px;
            margin: 20px 0;
            font-size: 14px;
            text-align: left;
          }
          .security-notice {
            background: #f8d7da;
            border-left: 4px solid #dc3545;
            padding: 12px;
            margin: 20px 0;
            font-size: 14px;
            text-align: left;
          }
          .footer {
            color: #666;
            font-size: 14px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🔒 Password Reset Request</h1>
        </div>

        <div class="content">
          <h2>Reset Your Password</h2>

          <p>We received a request to reset the password for your DrawHub account. Click the button below to create a new password:</p>

          <a href="${resetUrl}" class="button">Reset Password</a>

          <div class="warning">
            <strong>⏰ This link expires in 1 hour.</strong><br>
            For security reasons, you'll need to request a new reset link if you don't use this one within the hour.
          </div>

          <div class="security-notice">
            <strong>⚠️ Security Notice</strong><br>
            If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
          </div>

          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #667eea; word-break: break-all;">${resetUrl}</a>
          </p>

          <div class="footer">
            <p>
              The DrawHub Team
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Password Reset Request 🔒

We received a request to reset the password for your DrawHub account. Visit this link to create a new password:
${resetUrl}

This link expires in 1 hour.

If you didn't request a password reset, please ignore this email.

The DrawHub Team
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Password reset email sent to: ${email}`);
    return true;
  } catch (error) {
    console.error('Failed to send password reset email:', error.message);
    throw new Error('Failed to send password reset email');
  }
};

/**
 * Send Welcome Email (after email verification)
 */
export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || `"DrawHub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to DrawHub! 🎨',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px;
            border-radius: 12px;
            text-align: center;
          }
          .content {
            background: white;
            padding: 30px;
            border-radius: 8px;
            margin-top: 20px;
          }
          h1 {
            color: white;
            font-size: 32px;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎨 Welcome to DrawHub, ${name}!</h1>
        </div>

        <div class="content">
          <h2>Your Art Learning Journey Starts Now</h2>

          <p>We're excited to have you in our community! Here's what you can do:</p>

          <ul style="text-align: left; line-height: 2;">
            <li>📚 Take personalized lessons based on your skill level</li>
            <li>✏️ Get AI-generated assignments</li>
            <li>📸 Upload your drawings for instant feedback</li>
            <li>🏆 Earn badges and track your progress</li>
          </ul>

          <p style="margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL}" style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Start Learning
            </a>
          </p>

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Happy drawing!<br>
            The DrawHub Team
          </p>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Welcome email sent to: ${email}`);
    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error.message);
    // Don't throw error - welcome email is optional
    return false;
  }
};

export default {
  verifyEmailConfig,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail
};
