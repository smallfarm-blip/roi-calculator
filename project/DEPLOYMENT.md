# Deployment Guide: GitHub + Netlify

This guide will help you deploy the E-commerce ROI Calculator to Netlify via GitHub.

## Prerequisites

- GitHub account
- Netlify account (free)
- Git installed on your computer

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., "ecommerce-roi-calculator")
5. Make it public or private (your choice)
6. **Don't** initialize with README, .gitignore, or license (we already have these files)
7. Click "Create repository"

## Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these in your terminal:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: E-commerce ROI Calculator"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name.

## Step 3: Connect to Netlify

1. Go to [Netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your GitHub account
5. Select your repository from the list
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (set in Environment variables if needed)
7. Click "Deploy site"

## Step 4: Configure Environment (if needed)

If you need to set environment variables:
1. In your Netlify dashboard, go to Site settings
2. Click "Environment variables"
3. Add any required variables

## Step 5: Custom Domain (Optional)

To use a custom domain:
1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

## Automatic Deployments

Once connected, Netlify will automatically deploy your site whenever you push changes to the main branch of your GitHub repository.

## Local Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### Build Fails
- Check that all dependencies are listed in `package.json`
- Ensure Node version compatibility
- Check build logs in Netlify dashboard

### Site Not Loading
- Verify the publish directory is set to `dist`
- Check that `netlify.toml` is in the root directory
- Ensure redirects are configured for SPA routing

### Updates Not Deploying
- Check that changes are pushed to the correct branch (usually `main`)
- Verify webhook is working in Netlify settings
- Check deploy logs for errors

## Support

If you encounter issues:
1. Check Netlify's deploy logs
2. Verify GitHub repository has the latest code
3. Ensure all files are committed and pushed
4. Check Netlify community forums for similar issues

## Files Added for Deployment

- `.gitignore` - Specifies which files Git should ignore
- `netlify.toml` - Netlify configuration file
- `DEPLOYMENT.md` - This deployment guide

The project is already configured with the necessary build scripts in `package.json`.