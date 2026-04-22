# Student Authentication System - MERN Stack

## Project Overview
A complete student authentication system built with the MERN stack (MongoDB, Express, React, Node.js) featuring secure login, registration, and profile management.

## Features

### Backend
- ✅ User registration with email validation
- ✅ Secure password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Protected routes with middleware
- ✅ Update password with old password verification
- ✅ Update course selection
- ✅ MongoDB schema with validation

### Frontend
- ✅ Responsive registration form
- ✅ Login form with error handling
- ✅ Protected dashboard page
- ✅ Update password functionality
- ✅ Change course option
- ✅ Secure logout
- ✅ Token storage in localStorage
- ✅ Modern UI with CSS styling

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account or local MongoDB
- Git

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

Frontend runs on `http://localhost:3000`

## API Endpoints

### Public Routes
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Login student

### Protected Routes (Requires JWT Token)
- `GET /api/auth/me` - Get current student
- `PUT /api/auth/update-password` - Update password
- `PUT /api/auth/update-course` - Update course

## Project Structure

```
student-auth/
├── backend/
│   ├── models/
│   │   └── Student.js
│   ├── controllers/
│   │   └── authController.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   └── PrivateRoute.js
    │   ├── pages/
    │   │   └── Home.js
    │   ├── api/
    │   │   └── authApi.js
    │   ├── styles/
    │   │   ├── index.css
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   └── Home.css
    │   ├── App.js
    │   └── index.js
    ├── public/
    │   └── index.html
    └── package.json
```

## Available Courses
- Computer Science
- Information Technology
- Electronics
- Mechanical
- Civil

## Security Features
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 7-day expiration
- Protected routes using authentication middleware
- Old password verification before update
- Secure logout (token removed from localStorage)

## Error Handling
- Invalid login credentials
- Duplicate email registration
- Unauthorized access attempts
- Token expiration
- Validation errors for all forms

## Deployment

### Deploy Backend on Render
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repo
4. Set environment variables
5. Deploy

### Deploy Frontend on Vercel
1. Push code to GitHub
2. Import project to Vercel
3. Set build command: `npm run build`
4. Deploy

Or use:
- Netlify for frontend
- Heroku, Railway, or DigitalOcean for backend

## Technologies Used
- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT, bcryptjs
- **Styling**: CSS3

## License
MIT

## Author
Student Authentication System - MERN
