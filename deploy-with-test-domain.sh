#!/bin/bash

echo "🚀 Deploying Aion Site with Resend Test Domain Fix"
echo "=================================================="
echo ""

cd "$(dirname "$0")"

echo "📝 Changes deployed:"
echo "  ✅ Using onboarding@resend.dev (Resend's verified test domain)"
echo "  ✅ Enhanced error logging for debugging"
echo "  ✅ Test endpoint: /api/test-resend"
echo ""

echo "🔧 Committing changes..."
git add .
git commit -m "Fix: Use Resend test domain (onboarding@resend.dev) until aionresearch.io is verified"

echo ""
echo "🚀 Deploying to Vercel production..."

# Try vercel command from parent directory wrapper
if [ -f "../vercel-wrapper.sh" ]; then
    cd .. && ./vercel-wrapper.sh --prod
elif command -v vercel &> /dev/null; then
    vercel --prod
else
    echo "❌ Vercel CLI not found"
    echo ""
    echo "Manual deployment:"
    echo "1. Push to GitHub: git push"
    echo "2. Vercel will auto-deploy, or"
    echo "3. Go to: https://vercel.com/dashboard"
    exit 1
fi

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "📧 Test after deployment completes (~2 minutes):"
echo ""
echo "curl -X POST https://aion-site-eta.vercel.app/api/download/request-link \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"email\":\"your-email@example.com\",\"productId\":\"super-agent-playbook\"}'"
echo ""
echo "✅ Emails will now work with onboarding@resend.dev sender!"
echo ""
echo "📋 Next steps for production:"
echo "  1. Add aionresearch.io domain to Resend"
echo "  2. Add DNS records (TXT, CNAME)"
echo "  3. Verify domain in Resend dashboard"
echo "  4. Update sender back to aion@aionresearch.io"
echo ""
echo "See RESEND_DOMAIN_FIX.md for complete guide!"
