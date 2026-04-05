#!/bin/bash
echo "🔍 Email-Gated Download Implementation Verification"
echo "=================================================="
echo ""

# Check files exist
echo "📁 Checking files..."
files=(
  "app/components/EmailModal.tsx"
  "lib/tokens.ts"
  "lib/email-template.ts"
  "app/api/download/request-link/route.ts"
  "app/api/download/super-agent-playbook/route.ts"
  ".env.local"
  "IMPLEMENTATION_NOTES.md"
  "TESTING_GUIDE.md"
  "DELIVERABLES_SUMMARY.md"
)

all_exist=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (MISSING)"
    all_exist=false
  fi
done

echo ""

# Check Resend package
echo "📦 Checking dependencies..."
if grep -q '"resend"' package.json; then
  echo "  ✅ resend package in package.json"
else
  echo "  ❌ resend package NOT in package.json"
  all_exist=false
fi

echo ""

# Check env var
echo "🔑 Checking environment variables..."
if grep -q 'RESEND_API_KEY' .env.local; then
  echo "  ✅ RESEND_API_KEY in .env.local"
else
  echo "  ❌ RESEND_API_KEY NOT in .env.local"
  all_exist=false
fi

echo ""

# Summary
if $all_exist; then
  echo "✅ All implementation files verified!"
  echo ""
  echo "📋 Next Steps:"
  echo "  1. Run: npm run dev"
  echo "  2. Navigate to: http://localhost:3000/store"
  echo "  3. Click 'Download Now' button"
  echo "  4. Test email modal and download flow"
  echo "  5. Follow TESTING_GUIDE.md for complete checklist"
else
  echo "❌ Some files are missing. Check the output above."
  exit 1
fi
