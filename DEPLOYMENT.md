# Deployment Guide

## Backend Deployment Options

### Option 1: Render.com (Recommended - Free Tier Available)

1. **Prepare your code**
   - Push to GitHub
   - Ensure `backend` directory contains all files

2. **Create account on render.com**
   - Sign up at https://render.com
   - Connect GitHub account

3. **Deploy Backend**
   - Click "New+" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: student-auth-backend
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
     - **Region**: Choose closest to you

4. **Add Environment Variables**
   - In Render dashboard, go to Environment
   - Add:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_auth
     JWT_SECRET=your_production_secret_key_here
     ```

5. **Deploy**
   - Choose "Deploy Web Service"
   - Wait for deployment to complete
   - Your backend URL will be: `https://your-app-name.onrender.com`

### Option 2: Railway.app
1. Sign up at railway.app
2. Create new project from GitHub
3. Add MongoDB plugin
4. Set environment variables
5. Deploy

### Option 3: Heroku (Requires Credit Card)
1. Create account on heroku.com
2. Install Heroku CLI
3. Run: `heroku create`
4. Push to Heroku: `git push heroku main`

---

## Frontend Deployment Options

### Option 1: Vercel (Recommended - Best for React)

1. **Prepare your code**
   - Ensure frontend is in `frontend` directory
   - Update API URL in `src/api/authApi.js`

2. **Create account on vercel.com**
   - Sign up with GitHub

3. **Deploy Frontend**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Set root directory: `frontend/`
   - Configure:
     - **Framework**: React
     - **Build**: `npm run build`
     - **Output**: `build`

4. **Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com
     ```

5. **Deploy**
   - Click "Deploy"
   - Your frontend URL will be displayed

### Option 2: Netlify

1. Sign up at netlify.com
2. Connect GitHub
3. Configure:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `build`
4. Set environment variables
5. Deploy

### Option 3: GitHub Pages
1. Add to `frontend/package.json`:
   ```json
   "homepage": "https://yourusername.github.io/repo-name"
   ```
2. Install: `npm install gh-pages --save-dev`
3. Add scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. Run: `npm run deploy`

---

## Post-Deployment Setup

### Update Frontend API URL
Edit `frontend/src/api/authApi.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL 
  || 'https://your-backend-url.onrender.com/api/auth';
```

### Enable CORS in Backend
Already configured in `backend/server.js`, but ensure it includes your frontend domain:

```javascript
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

### MongoDB Whitelist IPs
If using MongoDB Atlas:
1. Go to Security → Network Access
2. Click "Add IP Address"
3. For production: Add Render/Railway IP
4. Or select "Allow Access from Anywhere" (0.0.0.0/0)

---

## Full Stack Deployment Example

### Backend on Render
- URL: `https://student-auth-backend.onrender.com`
- API Base: `https://student-auth-backend.onrender.com/api/auth`

### Frontend on Vercel
- URL: `https://student-auth-frontend.vercel.app`
- Environment: `REACT_APP_API_URL=https://student-auth-backend.onrender.com`

### MongoDB Atlas
- Cluster: student-auth
- Database: student_auth
- Connection: `mongodb+srv://user:pass@cluster.mongodb.net/student_auth`

---

## Testing Deployment

1. **Test Backend**
   ```
   https://your-backend-url/
   ```
   Should return API info

2. **Test API Endpoints**
   ```bash
   curl -X POST https://your-backend-url/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","password":"123456","course":"Computer Science"}'
   ```

3. **Test Frontend**
   - Visit your Vercel URL
   - Try registration and login
   - Check dashboard functionality

---

## Monitoring & Logs

### Render Logs
- Dashboard → Select service → Logs tab
- View real-time logs

### Vercel Logs
- Dashboard → Deployments → Logs tab
- Check build and runtime logs

### Troubleshooting

**CORS Errors**
- Update `cors()` in backend to include frontend domain
- Set `credentials: true` in Axios requests

**JWT Errors**
- Ensure same `JWT_SECRET` in .env
- Check token format: `Bearer <token>`

**MongoDB Connection Errors**
- Verify connection string
- Check IP whitelist
- Test locally first

**Blank Dashboard After Login**
- Check browser console (F12)
- Verify API_URL environment variable
- Check backend logs for 404/500 errors

---

## Production Checklist

- [ ] MongoDB on both backend and production
- [ ] JWT_SECRET changed to strong value
- [ ] NODE_ENV=production in backend
- [ ] CORS configured for production domains
- [ ] Environment variables set on hosting
- [ ] Tested registration flow
- [ ] Tested login flow
- [ ] Tested protected routes
- [ ] Tested password update
- [ ] Tested logout
- [ ] API URLs updated in frontend
- [ ] SSL certificate enabled (usually automatic)
- [ ] Rate limiting configured (optional)
- [ ] Error handling verified

---

## Cost Estimates (Free Tier)

- **Render**: Free tier includes basic web service
- **Vercel**: Unlimited free deployments for frontend
- **MongoDB Atlas**: 512MB free database
- **Total Cost**: $0/month with free tiers

For production use, consider upgrading:
- Render: ~$7-12/month
- MongoDB: ~$0.90/100M reads or upgrade plan
- Vercel Pro: $20/month (optional)
