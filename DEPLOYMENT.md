# Deployment Guide

## Prerequisites
- Node.js installed
- A Vercel or Netlify account (recommended for frontend)
- A cloud provider (Render, Railway, Heroku) for the backend (FastAPI)

## Frontend Deployment (Vercel)

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install Vercel CLI (optional, or use the web UI):**
    ```bash
    npm i -g vercel
    ```

3.  **Deploy:**
    ```bash
    vercel
    ```
    - Follow the prompts.
    - Set the build command to `npm run build`.
    - Set the output directory to `dist`.

## Backend Deployment (Render/Railway)

1.  **Ensure you have a `requirements.txt`:**
    The project already has one in the root.

2.  **Create a `start.sh` or use the build command:**
    - Build Command: `pip install -r requirements.txt`
    - Start Command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`

## Connecting Frontend to Backend

1.  **Update Frontend API URL:**
    - In your Vercel dashboard, add an environment variable `VITE_API_URL` pointing to your deployed backend URL.
    - Update the frontend code to use this variable instead of hardcoded `localhost`.

2.  **CORS Configuration:**
    - Update `backend/main.py` to allow requests from your deployed frontend domain.

## Local Production Build

To test the production build locally:

1.  **Build the frontend:**
    ```bash
    cd frontend
    npm run build
    ```

2.  **Preview the build:**
    ```bash
    npm run preview
    ```
