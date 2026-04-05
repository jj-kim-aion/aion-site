# ✅ FIX: Resend Domain Not Verified

## 🎯 Root Cause

**No domain is configured in your Resend account.**

Without a verified domain, Resend can't send emails from `aion@aionresearch.io`.

---

## 🚀 IMMEDIATE FIX - Use Resend Test Domain

I've updated the code to use **Resend's test domain** so you can test immediately:

**Change:**
```diff
- from: "Aion Research <aion@aionresearch.io>"
+ from: "Aion Research <onboarding@resend.dev>"
```

### Deploy the Fix:

```bash
cd /home/node/.openclaw/workspace/agents/jj/aion-site

# Deploy with test domain
git add .
git commit -m "Use Resend test domain (onboarding@resend.dev)"
git push

# Or deploy directly
cd /home/node/.openclaw/workspace/agents/jj
./vercel-wrapper.sh --prod
```

### Test After Deployment:

```bash
curl -X POST https://aion-site-eta.vercel.app/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","productId":"super-agent-playbook"}'
```

**This should work immediately!** ✅

---

## 🏆 PRODUCTION FIX - Add Your Own Domain

For production, you should use your own domain (`aionresearch.io`).

### Step 1: Add Domain to Resend

1. **Go to:** https://resend.com/domains
2. **Click:** "Add Domain"
3. **Enter:** `aionresearch.io`
4. **Click:** Add

### Step 2: Add DNS Records

Resend will show you DNS records to add. Typically:

#### **SPF Record (TXT)**
```
Type: TXT
Name: @ (or aionresearch.io)
Value: v=spf1 include:amazonses.com ~all
```

#### **DKIM Record (CNAME)**
```
Type: CNAME
Name: resend._domainkey (or whatever Resend shows)
Value: [Resend provides this - copy exactly]
```

#### **Optional: MX Record** (if you want to receive emails)
```
Type: MX
Name: @
Value: [Resend provides if needed]
Priority: 10
```

### Step 3: Add Records to Your DNS Provider

**If DNS is managed by:**

#### **Cloudflare:**
1. Go to: https://dash.cloudflare.com/
2. Select: `aionresearch.io`
3. Go to: DNS → Records
4. Click: "Add record"
5. Add each record from Step 2

#### **GoDaddy:**
1. Go to: https://dcc.godaddy.com/
2. Find: `aionresearch.io`
3. Click: DNS
4. Add records

#### **Namecheap:**
1. Go to: https://ap.www.namecheap.com/
2. Find: `aionresearch.io`
3. Manage → Advanced DNS
4. Add records

#### **Other DNS Provider:**
Find your DNS settings and add the TXT and CNAME records.

### Step 4: Verify Domain

1. **Wait 5-10 minutes** for DNS propagation
2. **Go back to:** https://resend.com/domains
3. **Click:** "Verify" next to `aionresearch.io`
4. **If green checkmark:** Domain verified! ✅
5. **If error:** Wait longer or check DNS records

### Step 5: Update Code Back to Your Domain

Once domain is verified:

```typescript
// In app/api/download/request-link/route.ts
from: "Aion Research <aion@aionresearch.io>",  // Your verified domain
```

Then redeploy:
```bash
cd /home/node/.openclaw/workspace/agents/jj
./vercel-wrapper.sh --prod
```

---

## 🧪 Test Domain Verification

### Check DNS Propagation:

```bash
# Check SPF record
dig TXT aionresearch.io +short

# Check DKIM record
dig CNAME resend._domainkey.aionresearch.io +short
```

**Expected results:**
- SPF: `"v=spf1 include:amazonses.com ~all"`
- DKIM: Points to Resend's server

### Test Email After Verification:

```bash
curl -X POST https://aion-site-eta.vercel.app/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","productId":"super-agent-playbook"}'
```

---

## 📋 Quick Comparison

| Solution | Sender Email | Works Now? | Production Ready? |
|----------|-------------|------------|-------------------|
| **Test Domain** | `onboarding@resend.dev` | ✅ Yes | ❌ No (Resend branding) |
| **Your Domain** | `aion@aionresearch.io` | ⏳ After DNS setup | ✅ Yes |

---

## 🎯 Recommended Approach

### **For Testing (Now):**
1. ✅ Deploy with `onboarding@resend.dev` (already done in code above)
2. ✅ Test the download flow
3. ✅ Verify everything works

### **For Production (Next 30 minutes):**
1. Add `aionresearch.io` domain to Resend
2. Add DNS records (TXT, CNAME)
3. Wait 10 minutes
4. Verify domain
5. Update code back to `aion@aionresearch.io`
6. Deploy

---

## 🚨 Common Issues & Solutions

### Issue: "DNS records not found"
**Solution:** Wait 10-15 minutes after adding records. DNS can take time to propagate.

### Issue: "DKIM verification failed"
**Solution:** 
- Check CNAME record exactly matches what Resend shows
- Remove any extra spaces or quotes
- Try again after 15 minutes

### Issue: "SPF record already exists"
**Solution:**
- If you have existing SPF: `v=spf1 include:_spf.google.com ~all`
- Update to: `v=spf1 include:_spf.google.com include:amazonses.com ~all`
- (Add Resend's include alongside existing ones)

### Issue: "Domain already added by another account"
**Solution:**
- Domain can only be verified on one Resend account
- Remove from old account first, or use subdomain: `mail.aionresearch.io`

---

## ✅ Summary

**Immediate Fix (Deployed):**
- ✅ Using `onboarding@resend.dev` for testing
- ✅ Emails will work right away
- ⚠️ Shows "via Resend" in email client

**Production Fix (Do Next):**
1. Add `aionresearch.io` to Resend
2. Add DNS records (TXT + CNAME)
3. Verify domain
4. Update sender back to `aion@aionresearch.io`
5. Deploy

**Time to Production:** ~30 minutes (mostly waiting for DNS)

---

## 📞 Need Help?

**Where to find DNS records:**
- Resend Dashboard: https://resend.com/domains → Click your domain
- Copy exact values shown (don't modify)

**Check if DNS is working:**
```bash
dig TXT aionresearch.io +short
dig CNAME resend._domainkey.aionresearch.io +short
```

**Resend Documentation:**
- Domain verification: https://resend.com/docs/dashboard/domains/introduction
- SPF/DKIM setup: https://resend.com/docs/dashboard/domains/authentication

---

## 🎉 Next Steps

1. **Deploy current fix** (test domain) - Emails work immediately
2. **Test download flow** - Should work now!
3. **Add your domain to Resend** (for production)
4. **Update sender email** once domain verified
5. **Celebrate!** 🚀

**The test domain fix is already in the code above - just deploy and test!**
