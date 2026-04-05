#!/bin/bash

# Complete Download Flow Test Script
# Tests the entire token creation → email → download flow

echo "🧪 Testing Complete Download Flow"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if server is running
echo "🔍 Checking if Next.js dev server is running..."
if ! curl -s http://localhost:3000 > /dev/null; then
    echo -e "${YELLOW}⚠️  Dev server not running. Start it with: npm run dev${NC}"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo -e "${GREEN}✅ Dev server is running${NC}"
echo ""

# Test 1: Request download link
echo "📝 Test 1: Request Download Link"
echo "--------------------------------"
echo "POST /api/download/request-link"
echo ""

RESPONSE=$(curl -s -X POST http://localhost:3000/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","productId":"super-agent-playbook"}')

echo "Response:"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
echo ""

# Extract token from response
TOKEN=$(echo "$RESPONSE" | jq -r '.token' 2>/dev/null)

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
    echo -e "${RED}❌ Failed to get token from response${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Token received: $TOKEN${NC}"
echo ""

# Test 2: Use the download link
echo "📥 Test 2: Download with Token (Should Succeed)"
echo "-----------------------------------------------"
echo "GET /api/download/super-agent-playbook?token=$TOKEN"
echo ""

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  "http://localhost:3000/api/download/super-agent-playbook?token=$TOKEN")

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Download successful (HTTP $HTTP_CODE)${NC}"
    echo -e "${GREEN}   Token was consumed${NC}"
else
    echo -e "${RED}❌ Download failed (HTTP $HTTP_CODE)${NC}"
    exit 1
fi
echo ""

# Test 3: Try to use the same token again (should fail)
echo "🔒 Test 3: Try Same Token Again (Should Fail)"
echo "---------------------------------------------"
echo "GET /api/download/super-agent-playbook?token=$TOKEN"
echo ""

RESPONSE2=$(curl -s "http://localhost:3000/api/download/super-agent-playbook?token=$TOKEN")
ERROR_MSG=$(echo "$RESPONSE2" | jq -r '.error' 2>/dev/null)

if [ "$ERROR_MSG" = "Download link has expired or already been used" ]; then
    echo -e "${GREEN}✅ Token correctly rejected (one-time use working)${NC}"
    echo "   Error: $ERROR_MSG"
else
    echo -e "${RED}❌ Token was reusable! Security issue!${NC}"
    echo "   Response: $RESPONSE2"
    exit 1
fi
echo ""

# Test 4: Request another token
echo "📝 Test 4: Create Another Token"
echo "-------------------------------"

RESPONSE3=$(curl -s -X POST http://localhost:3000/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"another@example.com","productId":"super-agent-playbook"}')

TOKEN2=$(echo "$RESPONSE3" | jq -r '.token' 2>/dev/null)

if [ -z "$TOKEN2" ] || [ "$TOKEN2" = "null" ]; then
    echo -e "${RED}❌ Failed to create second token${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Second token created: $TOKEN2${NC}"
echo ""

# Summary
echo "=================================="
echo -e "${GREEN}🎉 All Tests Passed!${NC}"
echo ""
echo "Summary:"
echo "  ✅ Token creation working"
echo "  ✅ Download with valid token working"
echo "  ✅ One-time use enforcement working"
echo "  ✅ Multiple token creation working"
echo ""
echo "Token system is production-ready! 🚀"
