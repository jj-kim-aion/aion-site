# ⚡ Quick Reference - Redis Token Storage

## 🚀 Deploy to Production

```bash
cd /home/node/.openclaw/workspace/agents/jj/aion-site
vercel --prod
```

**That's it!** Environment variables already configured.

---

## 🧪 Test Locally

```bash
# Test Redis connection
node test-redis-connection.js

# Test token functions
node test-token-functions.js

# Test complete flow (requires dev server)
npm run dev  # In one terminal
./test-complete-flow.sh  # In another terminal
```

---

## 📊 Monitor Production

```bash
# View real-time logs
vercel logs --prod --follow

# View recent logs
vercel logs --prod
```

**Look for:**
- `✅` = Success
- `❌` = Error
- `⚠️` = Warning

---

## 🔧 Environment Variables

**Already configured in `.env.local`:**
```bash
REDIS_URL=redis://default:****@redis-12082.c90.us-east-1-3.ec2.cloud.redislabs.com:12082
RESEND_API_KEY=re_LRJ7jKGy_BtG4nTycb313DokQNxMcebKy
```

**Ensure these are also in Vercel:**
```bash
vercel env ls  # Check what's set
```

---

## 🧪 Test Endpoints

### Request Download Link
```bash
curl -X POST http://localhost:3000/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","productId":"super-agent-playbook"}'
```

### Use Download Token
```bash
curl "http://localhost:3000/api/download/super-agent-playbook?token=YOUR_TOKEN" \
  --output test.pdf
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `lib/tokens.ts` | Redis token storage logic |
| `app/api/download/request-link/route.ts` | Create token & send email |
| `app/api/download/super-agent-playbook/route.ts` | Validate token & download |
| `.env.local` | Environment configuration |

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Redis connection failed | Check REDIS_URL in Vercel env |
| Token creation failed | Check Vercel logs for Redis errors |
| Email not sending | Check RESEND_API_KEY and Resend dashboard |
| Download fails | Verify blob storage URL is accessible |

---

## 📈 Monitoring Dashboards

- **Vercel Logs:** `vercel logs --prod`
- **Upstash Redis:** https://console.upstash.com/
- **Resend Emails:** https://resend.com/emails

---

## ✅ What Changed

**Before:** `@vercel/kv` (Vercel-specific)  
**After:** `redis` (works with any Redis provider)

**Breaking Changes:** None - same API, better implementation!

---

## 🎯 Status

✅ **PRODUCTION READY**

All tests passing. Deploy anytime!

---

## 📖 Full Documentation

- `REDIS_INTEGRATION_SUMMARY.md` - Executive summary
- `REDIS_MIGRATION_COMPLETE.md` - Complete technical details
- `DEPLOYMENT_READY.md` - Deployment guide

---

*Ready to ship! 🚀*
