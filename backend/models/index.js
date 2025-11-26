import sequelize from '../config/database.js';
import User from './User.js';
import UserProfile from './UserProfile.js';
import RefreshToken from './RefreshToken.js';

// Define relationships
User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onDelete: 'CASCADE'
});

UserProfile.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

User.hasMany(RefreshToken, {
  foreignKey: 'userId',
  as: 'refreshTokens',
  onDelete: 'CASCADE'
});

RefreshToken.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Test database connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Sync database (create tables if they don't exist)
export const syncDatabase = async (options = {}) => {
  try {
    console.log('🔄 Syncing database...');

    // Default options
    const syncOptions = {
      alter: process.env.NODE_ENV === 'development', // Auto-update schema in dev
      force: false, // NEVER use force in production (drops tables)
      ...options
    };

    await sequelize.sync(syncOptions);

    console.log('✅ Database synced successfully');
    console.log(`📊 Models: User, UserProfile, RefreshToken`);

    return true;
  } catch (error) {
    console.error('❌ Database sync failed:', error.message);
    throw error;
  }
};

// Export models and database
export {
  sequelize,
  User,
  UserProfile,
  RefreshToken
};

export default {
  sequelize,
  User,
  UserProfile,
  RefreshToken,
  testConnection,
  syncDatabase
};
