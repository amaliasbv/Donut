import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'users_email_unique',
      msg: 'This email is already registered'
    },
    validate: {
      isEmail: {
        msg: 'Please provide a valid email address'
      },
      notEmpty: {
        msg: 'Email is required'
      }
    },
    set(value) {
      // Normalize email to lowercase
      this.setDataValue('email', value.toLowerCase().trim());
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password is required'
      },
      len: {
        args: [8, 100],
        msg: 'Password must be at least 8 characters long'
      }
    }
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
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    field: 'last_login_at'
  }
}, {
  tableName: 'users',
  underscored: true,
  timestamps: true, // Adds createdAt and updatedAt
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      // Only hash if password was modified
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Instance method to compare passwords
User.prototype.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Instance method to check if verification token is valid
User.prototype.isVerificationTokenValid = function() {
  if (!this.verificationToken || !this.verificationTokenExpires) {
    return false;
  }
  return new Date() < this.verificationTokenExpires;
};

// Instance method to check if reset password token is valid
User.prototype.isResetPasswordTokenValid = function() {
  if (!this.resetPasswordToken || !this.resetPasswordExpires) {
    return false;
  }
  return new Date() < this.resetPasswordExpires;
};

// Class method to find by email
User.findByEmail = async function(email) {
  return await this.findOne({
    where: { email: email.toLowerCase().trim() }
  });
};

export default User;
