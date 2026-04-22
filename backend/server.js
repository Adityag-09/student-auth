const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://student-auth-frontend.vercel.app', // Update with your Vercel URL
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Student Authentication API',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      getCurrentStudent: 'GET /api/auth/me',
      updatePassword: 'PUT /api/auth/update-password',
      updateCourse: 'PUT /api/auth/update-course'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message || 'Server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
