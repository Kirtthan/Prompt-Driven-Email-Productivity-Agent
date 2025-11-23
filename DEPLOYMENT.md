# Deployment Guide

This guide will help you deploy Nexus to the cloud.

## Option 1: Frontend-Only Deployment (Easiest)

Since the frontend can work standalone with the Gemini API, you can deploy just the frontend for a quick demo.

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub** (already done ✓)

2. **Sign up for Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

3. **Import your project**:
   - Click "Add New Project"
   - Select your `Prompt-Driven-Email-Productivity-Agent` repository
   - Configure the project:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Deploy to Netlify (Alternative)

1. **Sign up for Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

2. **Import your project**:
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Configure:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `frontend/dist`

3. **Deploy**:
   - Click "Deploy site"
   - Your app will be live at `https://your-site.netlify.app`

## Option 2: Full Stack Deployment

If you want to use the backend as well:

### Backend Deployment (Render)

1. **Sign up for Render**:
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `nexus-backend`
     - **Environment**: Python 3
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`

3. **Add Environment Variables**:
   - `API_KEY`: Your Gemini API key

4. **Deploy**:
   - Click "Create Web Service"
   - Note your backend URL (e.g., `https://nexus-backend.onrender.com`)

### Frontend Deployment (Connect to Backend)

1. **Update Frontend API URL**:
   - In your frontend code, replace `http://localhost:8000` with your Render backend URL
   - Or use environment variables (recommended)

2. **Deploy Frontend** (follow Option 1 steps above)

## Environment Variables

### For Frontend (Vercel/Netlify)

If you want to use environment variables for the API key:

1. In Vercel/Netlify dashboard, go to "Environment Variables"
2. Add:
   - `VITE_GEMINI_API_KEY`: Your Gemini API key
   - `VITE_BACKEND_URL`: Your backend URL (if using backend)

3. Update your code to use:
   ```javascript
   const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
   ```

## Security Note

⚠️ **Important**: Your Gemini API key is currently hardcoded in the frontend. For production:

1. Move the API key to environment variables
2. Or proxy API calls through your backend to keep the key secure

## Custom Domain (Optional)

Both Vercel and Netlify allow you to add custom domains for free:

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Troubleshooting

### Build Fails
- Check that `package.json` has all dependencies
- Verify Node.js version compatibility

### API Errors
- Ensure your Gemini API key is valid
- Check CORS settings if using backend

### 404 on Refresh
- For Vercel: Add a `vercel.json` with rewrites
- For Netlify: Add a `_redirects` file in `public/`

## Need Help?

If you run into any issues, let me know and I'll help you troubleshoot!
