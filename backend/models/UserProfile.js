import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserProfile = sequelize.define('UserProfile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    field: 'user_id'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required'
      },
      len: {
        args: [2, 100],
        msg: 'Name must be between 2 and 100 characters'
      }
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [5],
        msg: 'Age must be at least 5'
      },
      max: {
        args: [120],
        msg: 'Age must be less than 120'
      }
    }
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false,
    validate: {
      isIn: {
        args: [['male', 'female', 'other']],
        msg: 'Gender must be male, female, or other'
      }
    }
  },
  experienceLevel: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    allowNull: false,
    field: 'experience_level',
    validate: {
      isIn: {
        args: [['beginner', 'intermediate', 'advanced']],
        msg: 'Experience level must be beginner, intermediate, or advanced'
      }
    }
  },
  drawingDuration: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'drawing_duration',
    comment: 'How long user has been drawing (e.g., "less-than-1-month", "1-6-months", etc.)'
  },
  learningGoals: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
    field: 'learning_goals',
    comment: 'Array of learning goals: portrait, anime, digital-art, perspective, coloring, anatomy, animals, character-design'
  },
  profilePicture: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'profile_picture',
    comment: 'Base64 encoded profile picture'
  },
  preferredStyle: {
    type: DataTypes.ENUM('realistic', 'anime', 'cartoon', 'semi-realistic'),
    allowNull: false,
    field: 'preferred_style',
    validate: {
      isIn: {
        args: [['realistic', 'anime', 'cartoon', 'semi-realistic']],
        msg: 'Preferred style must be realistic, anime, cartoon, or semi-realistic'
      }
    }
  },
  learningReason: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'learning_reason',
    comment: 'Why user wants to learn drawing'
  },
  learningMode: {
    type: DataTypes.ENUM('video', 'text', 'practice'),
    allowNull: false,
    field: 'learning_mode',
    validate: {
      isIn: {
        args: [['video', 'text', 'practice']],
        msg: 'Learning mode must be video, text, or practice'
      }
    }
  },
  onboardingCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'onboarding_completed',
    comment: 'Profile is created during onboarding, so this is true by default'
  },
  // User progress fields (for future use)
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  xp: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lessonsCompleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'lessons_completed'
  },
  assignmentsCompleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'assignments_completed'
  }
}, {
  tableName: 'user_profiles',
  underscored: true,
  timestamps: true, // Adds createdAt and updatedAt
  indexes: [
    {
      unique: true,
      fields: ['user_id']
    }
  ]
});

// Instance method to get recommendation preferences
UserProfile.prototype.getRecommendationPreferences = function() {
  return {
    experienceLevel: this.experienceLevel,
    learningGoals: this.learningGoals || [],
    preferredStyle: this.preferredStyle,
    learningMode: this.learningMode
  };
};

// Class method to find by user ID
UserProfile.findByUserId = async function(userId) {
  return await this.findOne({
    where: { userId }
  });
};

export default UserProfile;
