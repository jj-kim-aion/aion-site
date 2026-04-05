# Vercel KV Quick Start - 5 Minutes

**Problem:** Tokens don't persist in serverless  
**Solution:** Vercel KV (Redis)  
**Status:** ✅ Code ready, ⏳ awaiting KV setup

---

## 🚀 Deploy in 5 Steps

### 1. Create KV Store (2 min)
```
https://vercel.com/dashboard/stores
→ Create Database → KV
→ Name: aion-downloads
→ Region: us-east-1
→ Create
```

### 2. Copy Credentials (30 sec)
```
→ Click on KV store
→ .env.local tab
→ Copy KV_REST_API_URL
→ Copy KV_REST_API_TOKEN
```

### 3. Add to Vercel Project (1 min)
```
Vercel Dashboard → Project → Settings → Environment Variables
→ Add KV_REST_API_URL (check all envs)
→ Add KV_REST_API_TOKEN (check all envs)
→ Save
```

### 4. Sync Local (30 sec)
```bash
cd aion-site
vercel env pull .env.local
```

### 5. Deploy (1 min)
```bash
vercel --prod
```

---

## ✅ Verify

```bash
# Test production endpoint
curl -X POST https://yourdomain.com/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","productId":"super-agent-playbook"}'

# Should return token and downloadUrl
# Check KV dashboard: https://vercel.com/dashboard/stores
# Key should appear: download-token:{uuid}
```

---

## 🔍 Troubleshooting

**Error: "Token storage failed"**
→ Check KV env vars in Vercel project settings

**Error: "Cannot connect to KV"**
→ Run: `vercel env pull .env.local`

**Token doesn't persist**
→ Verify KV_REST_API_URL and KV_REST_API_TOKEN are set

**Local dev not working**
→ Make sure .env.local has KV vars (vercel env pull)

---

## 📚 Full Docs

- `KV_MIGRATION_SUMMARY.md` - Executive summary
- `VERCEL_KV_TOKEN_MIGRATION.md` - Complete guide
- `setup-vercel-kv.sh` - Automated setup

---

**Time to deploy:** ~5 minutes  
**Code changes:** Already done ✅  
**What you need:** Vercel KV credentials
