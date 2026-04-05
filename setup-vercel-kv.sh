#!/bin/bash
# Vercel KV Setup Helper Script
# Automates environment variable configuration for Vercel KV token storage

set -e  # Exit on error

echo "🔧 Vercel KV Setup for Aion Downloads"
echo "======================================"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Install it first:"
    echo "   npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI found"
echo ""

# Check if already authenticated
if ! vercel whoami &> /dev/null; then
    echo "🔐 Authenticating with Vercel..."
    vercel login
fi

echo "✅ Authenticated with Vercel"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found in current directory"
    echo "   Make sure you're in the aion-site directory"
    exit 1
fi

echo "📋 Current setup instructions:"
echo ""
echo "1. Create Vercel KV store:"
echo "   → Go to: https://vercel.com/dashboard/stores"
echo "   → Click 'Create Database' → 'KV'"
echo "   → Name: 'aion-downloads'"
echo "   → Region: Choose closest to your users"
echo "   → Click 'Create'"
echo ""
echo "2. Get credentials:"
echo "   → Click on your new KV store"
echo "   → Go to '.env.local' tab"
echo "   → Copy KV_REST_API_URL and KV_REST_API_TOKEN"
echo ""
echo "3. Add to Vercel project:"
echo "   → Vercel Dashboard → Your Project → Settings → Environment Variables"
echo "   → Add KV_REST_API_URL (Production, Preview, Development)"
echo "   → Add KV_REST_API_TOKEN (Production, Preview, Development)"
echo ""
echo "4. Sync to local .env.local:"
read -p "   → Press Enter when you've added the env vars to Vercel..."

echo ""
echo "🔄 Pulling environment variables from Vercel..."
vercel env pull .env.local

echo ""
echo "✅ Environment variables synced!"
echo ""

# Verify KV vars exist
if ! grep -q "KV_REST_API_URL" .env.local || ! grep -q "KV_REST_API_TOKEN" .env.local; then
    echo "⚠️  Warning: KV environment variables not found in .env.local"
    echo "   Make sure you added them to Vercel project settings"
    echo ""
    echo "   Required variables:"
    echo "   - KV_REST_API_URL"
    echo "   - KV_REST_API_TOKEN"
    exit 1
fi

echo "✅ KV environment variables detected in .env.local"
echo ""

# Test local dev server
echo "🧪 Testing local development server..."
echo "   Run: npm run dev"
echo "   Test endpoint: POST http://localhost:3000/api/download/request-link"
echo ""

# Deploy to production
read -p "Deploy to production now? (y/N): " deploy_choice
if [[ "$deploy_choice" =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Deploying to production..."
    vercel --prod
    echo ""
    echo "✅ Deployment complete!"
else
    echo ""
    echo "⏭️  Skipping deployment. Deploy manually with:"
    echo "   vercel --prod"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Test locally: npm run dev"
echo "   2. Submit test email at: http://localhost:3000/store"
echo "   3. Check Vercel logs: vercel logs --follow"
echo "   4. Verify KV data: https://vercel.com/dashboard/stores"
echo ""
