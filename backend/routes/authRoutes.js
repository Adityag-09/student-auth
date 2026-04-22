const express = require('express');
const {
  register,
  login,
  getCurrentStudent,
  updatePassword,
  updateCourse
} = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authMiddleware, getCurrentStudent);
router.put('/update-password', authMiddleware, updatePassword);
router.put('/update-course', authMiddleware, updateCourse);

module.exports = router;
