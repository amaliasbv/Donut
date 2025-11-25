import { UserProfile } from '../models/index.js';

/**
 * @route   GET /api/profile
 * @desc    Get user profile
 * @access  Private (requires authentication)
 */
export const getProfile = async (req, res) => {
  try {
    // User is attached by authenticate middleware
    const userId = req.user.id;

    // Find profile
    const profile = await UserProfile.findByUserId(userId);

    if (!profile) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Profile not found. Please complete onboarding.',
        needsOnboarding: true
      });
    }

    res.json({
      success: true,
      profile: {
        id: profile.id,
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        experienceLevel: profile.experienceLevel,
        drawingDuration: profile.drawingDuration,
        learningGoals: profile.learningGoals,
        profilePicture: profile.profilePicture,
        preferredStyle: profile.preferredStyle,
        learningReason: profile.learningReason,
        learningMode: profile.learningMode,
        onboardingCompleted: profile.onboardingCompleted,
        level: profile.level,
        xp: profile.xp,
        lessonsCompleted: profile.lessonsCompleted,
        assignmentsCompleted: profile.assignmentsCompleted,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);

    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to load profile. Please try again later.'
    });
  }
};

/**
 * @route   POST /api/profile
 * @desc    Create user profile (after onboarding)
 * @access  Private (requires authentication)
 */
export const createProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if profile already exists
    const existingProfile = await UserProfile.findByUserId(userId);

    if (existingProfile) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Profile already exists. Use PUT to update.'
      });
    }

    // Validate required fields
    const {
      name,
      age,
      gender,
      experienceLevel,
      drawingDuration,
      learningGoals,
      profilePicture,
      preferredStyle,
      learningReason,
      learningMode
    } = req.body;

    if (!name || !age || !gender || !experienceLevel || !drawingDuration ||
        !preferredStyle || !learningReason || !learningMode) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'All required fields must be provided',
        required: [
          'name', 'age', 'gender', 'experienceLevel', 'drawingDuration',
          'preferredStyle', 'learningReason', 'learningMode'
        ]
      });
    }

    // Sanitize profilePicture - must be string or null (not object/array)
    // Also validate size (max ~750KB base64 = ~1MB limit)
    const MAX_PROFILE_PICTURE_SIZE = 1000000; // 1MB in characters
    let sanitizedProfilePicture = null;
    if (profilePicture && typeof profilePicture === 'string' && profilePicture.trim().length > 0) {
      if (profilePicture.length > MAX_PROFILE_PICTURE_SIZE) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'Profile picture is too large. Maximum size is 750KB.'
        });
      }
      sanitizedProfilePicture = profilePicture;
    }

    // Create profile
    const profile = await UserProfile.create({
      userId,
      name,
      age: parseInt(age),
      gender,
      experienceLevel,
      drawingDuration,
      learningGoals: learningGoals || [],
      profilePicture: sanitizedProfilePicture,
      preferredStyle,
      learningReason,
      learningMode,
      onboardingCompleted: true
    });

    res.status(201).json({
      success: true,
      message: 'Profile created successfully!',
      profile: {
        id: profile.id,
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        experienceLevel: profile.experienceLevel,
        drawingDuration: profile.drawingDuration,
        learningGoals: profile.learningGoals,
        profilePicture: profile.profilePicture,
        preferredStyle: profile.preferredStyle,
        learningReason: profile.learningReason,
        learningMode: profile.learningMode,
        onboardingCompleted: profile.onboardingCompleted,
        level: profile.level,
        xp: profile.xp,
        createdAt: profile.createdAt
      }
    });

  } catch (error) {
    console.error('Create profile error:', error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.errors[0].message
      });
    }

    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to create profile. Please try again later.'
    });
  }
};

/**
 * @route   PUT /api/profile
 * @desc    Update user profile
 * @access  Private (requires authentication)
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find profile
    const profile = await UserProfile.findByUserId(userId);

    if (!profile) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Profile not found. Please create profile first.'
      });
    }

    // Updatable fields
    const {
      name,
      age,
      gender,
      experienceLevel,
      drawingDuration,
      learningGoals,
      profilePicture,
      preferredStyle,
      learningReason,
      learningMode
    } = req.body;

    // Update only provided fields
    if (name !== undefined) profile.name = name;
    if (age !== undefined) profile.age = parseInt(age);
    if (gender !== undefined) profile.gender = gender;
    if (experienceLevel !== undefined) profile.experienceLevel = experienceLevel;
    if (drawingDuration !== undefined) profile.drawingDuration = drawingDuration;
    if (learningGoals !== undefined) profile.learningGoals = learningGoals;
    if (profilePicture !== undefined) {
      // Sanitize profilePicture - must be string or null
      // Also validate size (max ~750KB base64 = ~1MB limit)
      const MAX_PROFILE_PICTURE_SIZE = 1000000;
      if (profilePicture && typeof profilePicture === 'string' && profilePicture.trim().length > 0) {
        if (profilePicture.length > MAX_PROFILE_PICTURE_SIZE) {
          return res.status(400).json({
            error: 'Validation Error',
            message: 'Profile picture is too large. Maximum size is 750KB.'
          });
        }
        profile.profilePicture = profilePicture;
      } else {
        profile.profilePicture = null;
      }
    }
    if (preferredStyle !== undefined) profile.preferredStyle = preferredStyle;
    if (learningReason !== undefined) profile.learningReason = learningReason;
    if (learningMode !== undefined) profile.learningMode = learningMode;

    await profile.save();

    res.json({
      success: true,
      message: 'Profile updated successfully!',
      profile: {
        id: profile.id,
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        experienceLevel: profile.experienceLevel,
        drawingDuration: profile.drawingDuration,
        learningGoals: profile.learningGoals,
        profilePicture: profile.profilePicture,
        preferredStyle: profile.preferredStyle,
        learningReason: profile.learningReason,
        learningMode: profile.learningMode,
        onboardingCompleted: profile.onboardingCompleted,
        level: profile.level,
        xp: profile.xp,
        updatedAt: profile.updatedAt
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.errors[0].message
      });
    }

    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to update profile. Please try again later.'
    });
  }
};

/**
 * @route   PATCH /api/profile/progress
 * @desc    Update user progress (XP, level, lessons, assignments)
 * @access  Private (requires authentication)
 */
export const updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find profile
    const profile = await UserProfile.findByUserId(userId);

    if (!profile) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Profile not found'
      });
    }

    const {
      xpToAdd,
      lessonsCompleted,
      assignmentsCompleted
    } = req.body;

    // Update XP and calculate level
    if (xpToAdd !== undefined && xpToAdd > 0) {
      profile.xp += xpToAdd;

      // Simple level calculation: 500 XP per level
      const newLevel = Math.floor(profile.xp / 500) + 1;
      if (newLevel > profile.level) {
        profile.level = newLevel;
      }
    }

    // Update completed counts
    if (lessonsCompleted !== undefined) {
      profile.lessonsCompleted = lessonsCompleted;
    }

    if (assignmentsCompleted !== undefined) {
      profile.assignmentsCompleted = assignmentsCompleted;
    }

    await profile.save();

    res.json({
      success: true,
      message: 'Progress updated successfully!',
      progress: {
        level: profile.level,
        xp: profile.xp,
        lessonsCompleted: profile.lessonsCompleted,
        assignmentsCompleted: profile.assignmentsCompleted
      }
    });

  } catch (error) {
    console.error('Update progress error:', error);

    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to update progress. Please try again later.'
    });
  }
};

export default {
  getProfile,
  createProfile,
  updateProfile,
  updateProgress
};
