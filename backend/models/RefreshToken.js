import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RefreshToken = sequelize.define('RefreshToken', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    field: 'user_id'
  },
  token: {
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: true,
    comment: 'JWT refresh token'
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'expires_at',
    comment: 'Token expiration timestamp'
  },
  isRevoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_revoked',
    comment: 'Manually revoked tokens (for logout)'
  },
  // Device/browser information (optional, for security)
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'user_agent',
    comment: 'Browser/device that created this token'
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'ip_address',
    comment: 'IP address that created this token'
  }
}, {
  tableName: 'refresh_tokens',
  underscored: true,
  timestamps: true, // Adds createdAt and updatedAt
  indexes: [
    {
      fields: ['user_id']
    },
    {
      unique: true,
      fields: ['token']
    },
    {
      fields: ['expires_at']
    }
  ]
});

// Instance method to check if token is valid
RefreshToken.prototype.isValid = function() {
  if (this.isRevoked) {
    return false;
  }
  return new Date() < this.expiresAt;
};

// Class method to find valid token
RefreshToken.findValidToken = async function(token) {
  const refreshToken = await this.findOne({
    where: { token }
  });

  if (!refreshToken || !refreshToken.isValid()) {
    return null;
  }

  return refreshToken;
};

// Class method to revoke all user tokens (for logout all devices)
RefreshToken.revokeAllUserTokens = async function(userId) {
  return await this.update(
    { isRevoked: true },
    { where: { userId, isRevoked: false } }
  );
};

// Class method to clean up expired tokens (for scheduled cleanup)
RefreshToken.cleanupExpired = async function() {
  const deleted = await this.destroy({
    where: {
      expiresAt: {
        [sequelize.Sequelize.Op.lt]: new Date()
      }
    }
  });
  console.log(`🧹 Cleaned up ${deleted} expired refresh tokens`);
  return deleted;
};

export default RefreshToken;
