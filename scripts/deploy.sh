#!/bin/bash

# F1 Companion Deployment Script
# This script handles deployment to Vercel with proper environment setup

set -e

echo "🏎️  F1 Companion Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the project locally first to catch any build errors
echo "🔨 Building project locally..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Local build successful!"
else
    echo "❌ Local build failed. Please fix build errors before deploying."
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo "📱 Your F1 Companion app should now be live on Vercel!"
echo ""
echo "Next steps:"
echo "1. Check the deployment URL provided by Vercel"
echo "2. Test the live application"
echo "3. Update any environment variables if needed"
echo "4. Share your awesome F1 app with the world! 🏁"
