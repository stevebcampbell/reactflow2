# Deployment Guide

## Deploy to Vercel (Recommended)

1. **Connect to Vercel:**

   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account
   - Click "New Project"
   - Import your repository

2. **Configure Project:**

   - Framework: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

3. **Environment Variables:**

   - No environment variables needed for this starter

4. **Deploy:**
   - Click "Deploy"
   - Your app will be live in ~30 seconds

## Deploy to Netlify

1. **Connect Repository:**

   - Log in to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository

2. **Build Settings:**

   - Build command: `npm run build`
   - Publish directory: `.next`
   - Framework: Next.js

3. **Deploy:**
   - Click "Deploy site"

## Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

The built application will be in the `.next` folder.

## Vercel CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from terminal
vercel

# Production deployment
vercel --prod
```

## Custom Domain

After deployment, you can add a custom domain in your Vercel dashboard:

1. Go to Project Settings
2. Click "Domains"
3. Add your custom domain
4. Configure DNS as instructed
