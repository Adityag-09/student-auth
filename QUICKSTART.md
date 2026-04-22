# Quick Start Guide

## Running the Application

### Terminal 1 - Start Backend
```bash
cd backend
npm install
npm run dev
```

Expected output:
```
MongoDB connected
Server running on port 5000
```

### Terminal 2 - Start Frontend
```bash
cd frontend
npm install
npm start
```

This will automatically open `http://localhost:3000` in your browser.

## Testing the System

### 1. Register a New Student
- Go to http://localhost:3000
- Click "Register"
- Fill in:
  - Name: John Doe
  - Email: john@example.com
  - Password: password123
  - Course: Computer Science
- Click "Register"

### 2. Login
- Go to Login page or click "Login" on home page
- Enter email and password
- You should be redirected to Dashboard

### 3. Dashboard Features
- **Profile Tab**: View your details
- **Change Password Tab**: Update your password
  - Enter current password
  - Enter new password
  - Confirm new password
- **Change Course Tab**: Select a different course

### 4. Logout
- Click "Logout" button
- You'll be redirected to login page
- Token is cleared from localStorage

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Add to `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_auth
```

### Option 2: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Update `.env`:
```
MONGODB_URI=mongodb://localhost:27017/student_auth
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend
- Proxy is set in `package.json` to `http://localhost:5000`
- For production, update API URLs in `src/api/authApi.js`

## API Response Examples

### Register Success
```json
{
  "success": true,
  "message": "Student registered successfully",
  "token": "eyJhbGci...",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science"
  }
}
```

### Login Success
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGci...",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science"
  }
}
```

### Update Password Success
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

## Troubleshooting

### Port 5000 already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB connection error
- Check connection string in `.env`
- Ensure MongoDB service is running
- Check network access in MongoDB Atlas (whitelist your IP)

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check proxy setting in frontend `package.json`
- Clear browser cache and localStorage

### Blank dashboard
- Check browser console for errors
- Verify JWT token is in localStorage
- Check backend logs for API errors

## Next Steps: Deployment

### Deploy Backend on Render.com
1. Push to GitHub
2. Create account on render.com
3. New → Web Service
4. Connect GitHub repo
5. Settings:
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. Add Environment Variables:
   - MONGODB_URI
   - JWT_SECRET
7. Deploy

### Deploy Frontend on Vercel
1. Push to GitHub
2. Import project at vercel.com
3. Build settings:
   - Framework: React
   - Build Command: `npm run build`
4. Environment Variables:
   - REACT_APP_API_URL=your_render_backend_url
5. Deploy

Update `src/api/authApi.js` for production:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';
```

## File Structure Overview

```
student-auth/
├── backend/                    # Node.js + Express API
│   ├── models/Student.js       # MongoDB schema
│   ├── controllers/            # Business logic
│   ├── routes/                 # API endpoints
│   ├── middleware/auth.js      # JWT validation
│   ├── server.js               # Entry point
│   └── package.json
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── api/                # API calls
│   │   ├── styles/             # CSS files
│   │   └── App.js              # Main component
│   └── package.json
│
└── README.md                   # Documentation
```
