/**
 * Database Migration Script
 *
 * This script creates all database tables and runs initial setup.
 * Run with: node scripts/createDatabase.js
 */

import dotenv from 'dotenv';
import { sequelize, syncDatabase, User, UserProfile, RefreshToken } from '../models/index.js';

dotenv.config();

const createDatabase = async () => {
  try {
    console.log('🔄 Starting database migration...\n');

    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established\n');

    // Show current database
    const dbName = sequelize.config.database || 'Unknown';
    console.log(`📊 Database: ${dbName}`);
    console.log(`🔗 Host: ${sequelize.config.host || 'Render PostgreSQL'}\n`);

    // Sync database (create tables)
    console.log('📋 Creating tables...');
    await syncDatabase({ alter: true }); // alter: true will update existing tables

    console.log('\n✅ Database migration completed successfully!\n');

    // Show created tables
    console.log('📊 Tables created:');
    console.log('  - users (authentication)');
    console.log('  - user_profiles (onboarding data)');
    console.log('  - refresh_tokens (JWT refresh tokens)\n');

    // Show table details
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('📋 All tables in database:', tables);

    // Optional: Create a test user (only in development)
    if (process.env.NODE_ENV === 'development' && process.argv.includes('--seed')) {
      console.log('\n🌱 Seeding test data...');

      // Check if test user already exists
      const existingUser = await User.findByEmail('test@drawhub.com');

      if (!existingUser) {
        const testUser = await User.create({
          email: 'test@drawhub.com',
          password: 'testpassword123',
          isVerified: true
        });

        await UserProfile.create({
          userId: testUser.id,
          name: 'Test User',
          age: 25,
          gender: 'other',
          experienceLevel: 'beginner',
          drawingDuration: '1-6-months',
          learningGoals: ['portrait', 'coloring'],
          preferredStyle: 'anime',
          learningReason: 'Hobby',
          learningMode: 'video',
          onboardingCompleted: true
        });

        console.log('✅ Test user created:');
        console.log('   Email: test@drawhub.com');
        console.log('   Password: testpassword123\n');
      } else {
        console.log('ℹ️  Test user already exists\n');
      }
    }

    console.log('🎉 All done! You can now start the server.\n');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Database migration failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('  1. Check DATABASE_URL in .env is correct');
    console.error('  2. Verify PostgreSQL database exists');
    console.error('  3. Check database credentials are valid');
    console.error('  4. Ensure firewall allows connection\n');

    if (process.env.NODE_ENV === 'development') {
      console.error('Full error:', error);
    }

    process.exit(1);
  }
};

// Run migration
createDatabase();
