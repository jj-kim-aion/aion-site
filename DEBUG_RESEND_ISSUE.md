# 🔍 Debug: Resend Email Failure

## Current Status

✅ `RESEND_API_KEY` is set in Vercel  
❌ Email sending fails with generic error  
🎯 **Need to see the actual Resend error details**

---

## 🚀 Deploy Updated Code with Better Error Logging

### Step 1: Deploy Changes

```bash
cd /home/node/.openclaw/workspace/agents/jj/aion-site

# Commit changes
git add .
git commit -m "Add detailed Resend error logging"

# Deploy to production
vercel --prod
```

Or use your wrapper:
```bash
cd /home/node/.openclaw/workspace/agents/jj
./vercel-wrapper.sh --prod
```

---

## 🧪 Step 2: Test Resend Configuration

After deploying, test the diagnostic endpoint:

```bash
curl https://aion-site-eta.vercel.app/api/test-resend
```

### Expected Responses:

#### ✅ **Success (Resend Working):**
```json
{
  "success": true,
  "message": "Resend is configured correctly",
  "emailId": "xxx",
  "details": {
    "apiKey": "re_LRJ7jKG...",
    "from": "Aion Research <aion@aionresearch.io>",
    "to": "delivered@resend.dev"
  }
}
```

#### ❌ **Error (Shows Real Issue):**
```json
{
  "error": "Resend API error",
  "details": {
    "name": "validation_error",
    "message": "Domain 'aionresearch.io' is not verified"
  }
}
```

This will tell us the **exact problem**!

---

## 🧪 Step 3: Test Download Request (Get Detailed Error)

```bash
curl -X POST https://aion-site-eta.vercel.app/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","productId":"super-agent-playbook"}'
```

Now you'll get detailed error info instead of generic message:
```json
{
  "error": "Failed to send email",
  "message": "Domain 'aionresearch.io' is not verified",
  "details": { ... },
  "hint": "Check Resend dashboard for domain verification..."
}
```

---

## 🔍 Common Resend Errors & Fixes

### Error 1: "Domain not verified"

**Full Error:**
```json
{
  "name": "validation_error",
  "message": "Domain 'aionresearch.io' is not verified"
}
```

**Fix:**
1. Go to: https://resend.com/domains
2. Select `aionresearch.io`
3. Add the required DNS records (TXT, MX, CNAME)
4. Click "Verify"
5. Wait 5-10 minutes for DNS propagation

**DNS Records Needed:**
- SPF record (TXT): `v=spf1 include:amazonses.com ~all`
- DKIM record (CNAME): Resend provides this
- MX record (optional, for receiving)

---

### Error 2: "Invalid API key"

**Full Error:**
```json
{
  "name": "invalid_api_key",
  "message": "The API key is invalid"
}
```

**Fix:**
1. Go to: https://resend.com/api-keys
2. Check if key `re_LRJ7jKGy...` is active
3. If revoked, generate new key
4. Update Vercel environment variable
5. Redeploy

---

### Error 3: "Sender not allowed"

**Full Error:**
```json
{
  "name": "validation_error",
  "message": "Sender email must be from a verified domain"
}
```

**Fix:**
- Current sender: `aion@aionresearch.io`
- Ensure domain `aionresearch.io` is verified in Resend
- Don't use personal domains (@gmail.com, @outlook.com)

---

### Error 4: "Rate limit exceeded"

**Full Error:**
```json
{
  "name": "rate_limit",
  "message": "You have exceeded the rate limit"
}
```

**Fix:**
- **Free tier:** 100 emails/day, 3,000/month
- **Solution:** Upgrade Resend plan or wait 24 hours

---

## 🔧 Quick Fixes Based on Error

Once you run the test endpoint, you'll see the actual error. Here's what to do:

### If Domain Verification Issue:

```bash
# Check Resend domain status
# Go to: https://resend.com/domains/aionresearch.io
# Add DNS records as shown
# Wait 10 minutes, then verify
```

### If API Key Issue:

```bash
# Generate new API key
# Go to: https://resend.com/api-keys
# Create new key with "Send emails" permission
# Update in Vercel:

cd /home/node/.openclaw/workspace/agents/jj
./vercel-wrapper.sh env rm RESEND_API_KEY production
./vercel-wrapper.sh env add RESEND_API_KEY production
# Paste new key when prompted
./vercel-wrapper.sh --prod  # Redeploy
```

### If Sender Email Issue:

Update sender in code if needed:
```typescript
// In app/api/download/request-link/route.ts
from: "Aion <no-reply@aionresearch.io>",  // Try different sender
```

---

## 📊 What Changes Were Made

### 1. Added Test Endpoint
**File:** `app/api/test-resend/route.ts`  
**Purpose:** Diagnose Resend configuration in isolation  
**URL:** `https://aion-site-eta.vercel.app/api/test-resend`

### 2. Enhanced Error Logging
**File:** `app/api/download/request-link/route.ts`  
**Change:** Show actual Resend error details instead of generic message  
**Benefit:** See exact error (domain not verified, invalid key, etc.)

---

## ✅ Action Plan

1. **Deploy updated code** (with better error logging)
2. **Test diagnostic endpoint** → `/api/test-resend`
3. **See actual error** → Know exact problem
4. **Fix based on error** → Domain verification, API key, etc.
5. **Test again** → Should work!

---

## 🎯 Most Likely Issue

Based on typical Resend setup problems:

**95% chance:** Domain `aionresearch.io` is **not verified** in Resend

**Fix:**
1. Go to: https://resend.com/domains
2. Select domain: `aionresearch.io`
3. Add DNS records (TXT for SPF, CNAME for DKIM)
4. Wait 5-10 minutes
5. Click "Verify"
6. Test again

---

## 📞 Next Steps

1. **Deploy the updated code** (run commands above)
2. **Test `/api/test-resend`** to see real error
3. **Share the error output** so we can fix the exact issue
4. Once we see the error, fix will take < 5 minutes

---

**The new error logging will tell us exactly what's wrong! 🎯**
