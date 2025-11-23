import express from 'express';
import { body } from 'express-validator';
import {
  getProfile,
  createProfile,
  updateProfile,
  updateProgress
} from '../controllers/profileController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All profile routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/', getProfile);

/**
 * @route   POST /api/profile
 * @desc    Create user profile (after onboarding)
 * @access  Private
 */
router.post('/',
  [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('age').isInt({ min: 5, max: 120 }).withMessage('Age must be between 5 and 120'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
    body('experienceLevel').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid experience level'),
    body('drawingDuration').notEmpty().withMessage('Drawing duration is required'),
    body('preferredStyle').isIn(['realistic', 'anime', 'cartoon', 'semi-realistic']).withMessage('Invalid preferred style'),
    body('learningReason').notEmpty().withMessage('Learning reason is required'),
    body('learningMode').isIn(['video', 'text', 'practice']).withMessage('Invalid learning mode'),
    body('learningGoals').optional().isArray().withMessage('Learning goals must be an array'),
    body('profilePicture').optional().isString().withMessage('Profile picture must be a string')
  ],
  createProfile
);

/**
 * @route   PUT /api/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/',
  [
    body('name').optional().notEmpty().trim().withMessage('Name cannot be empty'),
    body('age').optional().isInt({ min: 5, max: 120 }).withMessage('Age must be between 5 and 120'),
    body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
    body('experienceLevel').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid experience level'),
    body('preferredStyle').optional().isIn(['realistic', 'anime', 'cartoon', 'semi-realistic']).withMessage('Invalid preferred style'),
    body('learningMode').optional().isIn(['video', 'text', 'practice']).withMessage('Invalid learning mode'),
    body('learningGoals').optional().isArray().withMessage('Learning goals must be an array')
  ],
  updateProfile
);

/**
 * @route   PATCH /api/profile/progress
 * @desc    Update user progress (XP, level, lessons, assignments)
 * @access  Private
 */
router.patch('/progress',
  [
    body('xpToAdd').optional().isInt({ min: 0 }).withMessage('XP must be a positive integer'),
    body('lessonsCompleted').optional().isInt({ min: 0 }).withMessage('Lessons completed must be a positive integer'),
    body('assignmentsCompleted').optional().isInt({ min: 0 }).withMessage('Assignments completed must be a positive integer')
  ],
  updateProgress
);

export default router;
