/**
 * Database Test Script
 *
 * Tests database connection and basic CRUD operations.
 * Run with: node scripts/testDatabase.js
 */

import dotenv from 'dotenv';
import { sequelize, User, UserProfile, RefreshToken } from '../models/index.js';

dotenv.config();

const testDatabase = async () => {
  try {
    console.log('🧪 Testing database connection and operations...\n');

    // Test 1: Connection
    console.log('Test 1: Database Connection');
    await sequelize.authenticate();
    console.log('✅ Connected to database\n');

    // Test 2: Create User
    console.log('Test 2: Create User');
    const testEmail = `test-${Date.now()}@drawhub.com`;
    const user = await User.create({
      email: testEmail,
      password: 'testpassword123',
      isVerified: false
    });
    console.log(`✅ User created with ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Password hashed: ${user.password.substring(0, 20)}...\n`);

    // Test 3: Find User
    console.log('Test 3: Find User by Email');
    const foundUser = await User.findByEmail(testEmail);
    console.log(`✅ User found: ${foundUser.email}\n`);

    // Test 4: Password Comparison
    console.log('Test 4: Password Comparison');
    const isValidPassword = await foundUser.comparePassword('testpassword123');
    const isInvalidPassword = await foundUser.comparePassword('wrongpassword');
    console.log(`✅ Correct password: ${isValidPassword}`);
    console.log(`✅ Wrong password: ${isInvalidPassword}\n`);

    // Test 5: Create UserProfile
    console.log('Test 5: Create UserProfile');
    const profile = await UserProfile.create({
      userId: user.id,
      name: 'Test User',
      age: 25,
      gender: 'other',
      experienceLevel: 'beginner',
      drawingDuration: '1-6-months',
      learningGoals: ['portrait', 'anime'],
      preferredStyle: 'anime',
      learningReason: 'Hobby',
      learningMode: 'video'
    });
    console.log(`✅ Profile created with ID: ${profile.id}`);
    console.log(`   Name: ${profile.name}`);
    console.log(`   Experience: ${profile.experienceLevel}\n`);

    // Test 6: User with Profile (JOIN)
    console.log('Test 6: Load User with Profile (JOIN)');
    const userWithProfile = await User.findOne({
      where: { id: user.id },
      include: [{
        model: UserProfile,
        as: 'profile'
      }]
    });
    console.log(`✅ User loaded with profile:`);
    console.log(`   Email: ${userWithProfile.email}`);
    console.log(`   Name: ${userWithProfile.profile.name}`);
    console.log(`   Learning Goals: ${userWithProfile.profile.learningGoals.join(', ')}\n`);

    // Test 7: Create RefreshToken
    console.log('Test 7: Create RefreshToken');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    const refreshToken = await RefreshToken.create({
      userId: user.id,
      token: 'test-jwt-token-' + Date.now(),
      expiresAt: expiresAt
    });
    console.log(`✅ Refresh token created with ID: ${refreshToken.id}`);
    console.log(`   Token: ${refreshToken.token.substring(0, 30)}...`);
    console.log(`   Valid: ${refreshToken.isValid()}\n`);

    // Test 8: Clean up test data
    console.log('Test 8: Cleanup Test Data');
    await refreshToken.destroy();
    await profile.destroy();
    await user.destroy();
    console.log('✅ Test data cleaned up\n');

    console.log('🎉 All tests passed! Database is working correctly.\n');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Database test failed:', error.message);

    if (process.env.NODE_ENV === 'development') {
      console.error('\nFull error:', error);
    }

    process.exit(1);
  }
};

// Run tests
testDatabase();
