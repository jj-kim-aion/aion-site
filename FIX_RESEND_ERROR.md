# 🔧 Fix: "Failed to send email" Error

## 🎯 Root Cause

The error **"Failed to send email. Please verify your email address and try again."** is caused by:

**RESEND_API_KEY is missing in Vercel production environment variables**

---

## ✅ Solution: Add RESEND_API_KEY to Vercel

### Option 1: Via Vercel CLI (Quick)

```bash
cd /home/node/.openclaw/workspace/agents/jj/aion-site

# Add RESEND_API_KEY to production environment
vercel env add RESEND_API_KEY production

# When prompted, paste:
# re_LRJ7jKGy_BtG4nTycb313DokQNxMcebKy

# Also add to preview/development if needed:
vercel env add RESEND_API_KEY preview
vercel env add RESEND_API_KEY development

# Redeploy to apply changes
vercel --prod
```

### Option 2: Via Vercel Dashboard (Recommended)

1. **Go to:** https://vercel.com/dashboard
2. **Select Project:** `aion-site-eta`
3. **Go to Settings** → **Environment Variables**
4. **Add New Variable:**
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_LRJ7jKGy_BtG4nTycb313DokQNxMcebKy`
   - **Environments:** Select all (Production, Preview, Development)
5. **Click Save**
6. **Redeploy** the project (Vercel will prompt you)

---

## 🧪 Verify the Fix

### Step 1: Check Environment Variables

```bash
# From project directory
cd /home/node/.openclaw/workspace/agents/jj

# Check what env vars are set in Vercel
./vercel-wrapper.sh env ls aion-site-eta
```

**Expected output should include:**
```
RESEND_API_KEY   (Production, Preview, Development)
REDIS_URL        (Production, Preview, Development)
```

### Step 2: Test After Redeployment

**Test Endpoint:**
```bash
curl -X POST https://aion-site-eta.vercel.app/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","productId":"super-agent-playbook"}'
```

**Expected Response (Success):**
```json
{
  "success": true,
  "message": "Download link sent to your email",
  "token": "uuid-here",
  "downloadUrl": "https://aion-site-eta.vercel.app/api/download/super-agent-playbook?token=uuid-here"
}
```

**Check your email** - You should receive the download link within 1-2 minutes.

---

## 🔍 Additional Checks

### 1. Verify Resend Domain

Go to: https://resend.com/domains

**Check:**
- Domain: `aionresearch.io` should be verified ✅
- DNS records should be configured correctly
- Status should be "Active"

If domain is **not verified:**
1. Add DNS records as shown in Resend dashboard
2. Wait 5-10 minutes for DNS propagation
3. Click "Verify" in Resend dashboard

### 2. Check Resend API Key Status

Go to: https://resend.com/api-keys

**Verify:**
- API key `re_LRJ7jKGy...` exists
- Status is "Active" (not revoked)
- Has correct permissions (Send emails)

If key is **invalid or revoked:**
1. Generate new API key in Resend dashboard
2. Update `.env.local` file
3. Update Vercel environment variable
4. Redeploy

### 3. Check Sender Email Domain

In the code (`app/api/download/request-link/route.ts`), the sender is:
```typescript
from: "Aion Research <aion@aionresearch.io>"
```

**Verify:**
- Domain `aionresearch.io` is verified in Resend
- Sender email uses verified domain
- Not using `@gmail.com`, `@outlook.com`, etc. (won't work with Resend)

---

## 🚨 Common Issues & Fixes

### Issue 1: "Failed to send email"
**Cause:** Missing or invalid RESEND_API_KEY  
**Fix:** Add correct API key to Vercel environment variables

### Issue 2: "Domain not verified"
**Cause:** Sender domain not verified in Resend  
**Fix:** Verify domain in Resend dashboard with DNS records

### Issue 3: "Invalid API key"
**Cause:** API key revoked or incorrect  
**Fix:** Generate new key in Resend, update everywhere

### Issue 4: "Rate limit exceeded"
**Cause:** Too many emails sent (Resend free tier: 100/day)  
**Fix:** Upgrade Resend plan or wait 24 hours

---

## 📋 Environment Variables Checklist

Ensure these are set in Vercel (Project Settings → Environment Variables):

- [ ] `RESEND_API_KEY` → `re_LRJ7jKGy_BtG4nTycb313DokQNxMcebKy`
- [ ] `REDIS_URL` → `redis://default:****@redis-12082.c90.us-east-1-3.ec2.cloud.redislabs.com:12082`
- [ ] `NEXT_PUBLIC_BASE_URL` → `https://aion-site-eta.vercel.app` (optional, auto-detected)

All should be set for: **Production**, **Preview**, and **Development**

---

## 🎯 Quick Fix Commands

```bash
# Navigate to project
cd /home/node/.openclaw/workspace/agents/jj

# Add RESEND_API_KEY to all environments
./vercel-wrapper.sh env add RESEND_API_KEY production
./vercel-wrapper.sh env add RESEND_API_KEY preview  
./vercel-wrapper.sh env add RESEND_API_KEY development

# Value to paste when prompted:
# re_LRJ7jKGy_BtG4nTycb313DokQNxMcebKy

# Verify it's added
./vercel-wrapper.sh env ls

# Redeploy
cd aion-site
./vercel-wrapper.sh --prod
```

---

## ✅ Success Indicators

After fixing:

1. **API Response:**
   ```json
   { "success": true, "message": "Download link sent to your email" }
   ```

2. **Vercel Logs** should show:
   ```
   ✅ Token created: xxx...
   📧 Sending download email to test@example.com...
   ✅ Email sent successfully | Recipient: test@example.com | Resend ID: xxx
   ```

3. **Email Received** in inbox within 1-2 minutes

4. **Download Link Works** when clicked

---

## 📞 Still Not Working?

### Check Vercel Function Logs

```bash
cd /home/node/.openclaw/workspace/agents/jj
./vercel-wrapper.sh logs --tail
```

**Look for:**
- `❌ Resend error:` - Shows exact Resend error
- `❌ Email sending error:` - Shows exception details
- Missing env var warnings

### Check Resend Logs

Go to: https://resend.com/emails

**Check:**
- Recent email attempts
- Delivery status
- Error messages (if any)

### Test Resend Directly

```bash
curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer re_LRJ7jKGy_BtG4nTycb313DokQNxMcebKy' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "Aion Research <aion@aionresearch.io>",
    "to": ["your-email@example.com"],
    "subject": "Test Email",
    "html": "<p>Test</p>"
  }'
```

**Expected response:**
```json
{ "id": "xxx" }
```

If this fails, the issue is with Resend configuration, not your code.

---

## 🎉 Expected Outcome

After adding `RESEND_API_KEY` to Vercel and redeploying:

✅ Email sends successfully  
✅ User receives download link  
✅ Token works for download  
✅ One-time use enforced  
✅ 6-hour expiration working  

**Your download system will be fully operational! 🚀**
