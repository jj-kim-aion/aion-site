# Testing Guide - Email-Gated Download

## Quick Start Test

### 1. Start Development Server
```bash
cd /home/node/.openclaw/workspace/agents/jj/aion-site
npm run dev
```

### 2. Test Email Request Flow

**Frontend Test:**
1. Navigate to `http://localhost:3000/store`
2. Find "Building Super Agents Playbook" product card
3. Click **"Download Now"** button
4. Verify modal opens with email input
5. Enter your email address
6. Click **"Send Download Link"**
7. Wait for success message
8. Verify modal shows "Check Your Email" confirmation

**Backend Test:**
```bash
# Test API directly with curl
curl -X POST http://localhost:3000/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","productId":"super-agent-playbook"}'

# Expected response:
# {"success":true,"message":"Download link sent to your email"}
```

### 3. Test Email Delivery

**Check your inbox** for email from:
- **From:** Aion Research <aion@aionresearch.io>
- **Subject:** "Your Aion Super Agents Playbook Download"
- **Content:** Should have:
  - Download button
  - Expiry time (6 hours from now)
  - Alternative link with token

### 4. Test Download Link

**Click the download button** in the email, which should:
1. Open URL: `http://localhost:3000/api/download/super-agent-playbook?token=<uuid>`
2. Start downloading `Building-Super-Agents-Playbook.pdf`
3. Browser should prompt for file save

**Verify one-time use:**
- Click the link again
- Should return 401 error:
  ```json
  {
    "error": "Download link has expired or already been used",
    "message": "Download links expire after 6 hours or after one use..."
  }
  ```

### 5. Test Token Expiry

**Wait 6+ hours** (or modify `TOKEN_EXPIRY_MS` in `lib/tokens.ts` to 60000 for 1-minute testing):

```typescript
// In lib/tokens.ts, temporarily change:
const TOKEN_EXPIRY_MS = 60 * 1000; // 1 minute for testing
```

1. Request new download link
2. Wait 1 minute
3. Click link
4. Should return 401 expired error

## Error Case Testing

### Invalid Email Format
```bash
curl -X POST http://localhost:3000/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"not-an-email","productId":"super-agent-playbook"}'

# Expected: 400 Bad Request
# {"error":"Invalid email format"}
```

### Invalid Product ID
```bash
curl -X POST http://localhost:3000/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","productId":"nonexistent-product"}'

# Expected: 400 Bad Request
# {"error":"Invalid product ID"}
```

### Missing Token
```bash
curl http://localhost:3000/api/download/super-agent-playbook

# Expected: 401 Unauthorized
# {"error":"Download link is invalid or missing",...}
```

### Invalid Token
```bash
curl http://localhost:3000/api/download/super-agent-playbook?token=fake-token-123

# Expected: 401 Unauthorized
# {"error":"Download link has expired or already been used",...}
```

## Frontend Testing Checklist

### Email Modal
- [ ] Modal opens when clicking "Download Now"
- [ ] Modal closes when clicking X button
- [ ] Modal closes when clicking backdrop
- [ ] Modal closes on Escape key
- [ ] Email input accepts valid email
- [ ] Email input shows validation error for invalid format
- [ ] Submit button disabled when email empty
- [ ] Submit button shows "Sending..." during API call
- [ ] Success message appears after email sent
- [ ] Modal auto-closes 3 seconds after success
- [ ] Error message displays on API failure
- [ ] Modal is mobile-responsive (test on phone)

### Store Page
- [ ] Button text shows product CTA ("Download Now")
- [ ] Button triggers modal (not direct download)
- [ ] Multiple products can have different download routes
- [ ] Modal state isolated per product card

## Production Testing

### Environment Variables
```bash
# Verify in production:
echo $RESEND_API_KEY
# Should output: re_LRJ7jKGy_BtG4nTycb313DokQNxMcebKy

echo $NEXT_PUBLIC_BASE_URL
# Should output: https://yourdomain.com (or empty if using Vercel auto-detection)
```

### Email Deliverability
1. Send test email to Gmail, Outlook, Yahoo
2. Check spam folders
3. Verify sender reputation (should show "Aion Research")
4. Verify reply-to works (tech@aionresearch.io)

### Download Link Format
Production links should use HTTPS:
```
https://yourdomain.com/api/download/super-agent-playbook?token=<uuid>
```

NOT:
```
http://localhost:3000/... (development only)
```

## Monitoring Commands

### Check Token Store Stats
Add this temporary route for debugging:

```typescript
// app/api/debug/token-stats/route.ts (development only)
import { NextResponse } from "next/server";
import { getTokenStats } from "@/lib/tokens";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }
  return NextResponse.json(getTokenStats());
}
```

Then:
```bash
curl http://localhost:3000/api/debug/token-stats
# Returns: {"active":2,"expired":1,"total":3}
```

### Check Server Logs
```bash
# Watch for email sends
tail -f .next/server.log | grep "Download link sent"

# Watch for downloads
tail -f .next/server.log | grep "Download authorized"
```

## Performance Testing

### Load Test (100 concurrent requests)
```bash
# Install Apache Bench
sudo apt-get install apache2-utils

# Test email request endpoint
ab -n 100 -c 10 -p request.json -T application/json \
  http://localhost:3000/api/download/request-link

# request.json:
# {"email":"test@example.com","productId":"super-agent-playbook"}
```

**Expected:**
- Response time: <500ms per request
- Success rate: 100%
- No memory leaks

### Memory Usage
```bash
# Monitor Node.js process
node --expose-gc your-app.js
# Watch heap usage in Chrome DevTools or:
ps aux | grep node
```

## Resend Dashboard

### Check Delivery Status
1. Log in to [resend.com/dashboard](https://resend.com)
2. Navigate to "Emails" tab
3. Verify:
   - ✅ Delivered (email reached inbox)
   - ⏳ Sent (email accepted by server)
   - ❌ Bounced (email rejected)
   - ❌ Complained (marked as spam)

### View Email Preview
1. Click on any sent email in dashboard
2. Review HTML rendering
3. Test all links work
4. Verify expiry time displays correctly

## Troubleshooting

### Email Not Received
1. Check spam folder
2. Verify Resend API key is correct
3. Check Resend dashboard for delivery status
4. Try different email provider (Gmail, Outlook, etc.)
5. Verify sender domain is configured in Resend

### Download Not Starting
1. Check browser console for errors
2. Verify token in URL is present
3. Check API route logs for validation errors
4. Verify blob storage URL is accessible
5. Test with `curl` to isolate frontend issues

### Token Validation Fails
1. Check server time is correct (`date`)
2. Verify token wasn't already used
3. Check token hasn't expired (6 hours)
4. Verify `TOKEN_EXPIRY_MS` is set correctly

### Modal Not Opening
1. Check browser console for React errors
2. Verify `EmailModal` component imported correctly
3. Check `showEmailModal` state is working
4. Verify product has `downloadRoute` defined

## Security Testing

### CSRF Protection
Next.js API routes have built-in CSRF protection. Test:
```bash
# Should work (same-origin)
curl -X POST http://localhost:3000/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","productId":"super-agent-playbook"}'

# May be blocked (cross-origin without proper headers)
curl -X POST http://localhost:3000/api/download/request-link \
  -H "Origin: https://evil.com" \
  -d '{"email":"test@example.com","productId":"super-agent-playbook"}'
```

### SQL Injection (N/A - No Database)
Since we're using in-memory storage, SQL injection isn't a concern. But verify:
- Email input is sanitized (Resend SDK handles this)
- Token generation uses crypto-secure UUIDs

### XSS Testing
Test email template with malicious input:
```bash
curl -X POST http://localhost:3000/api/download/request-link \
  -H "Content-Type: application/json" \
  -d '{"email":"<script>alert(1)</script>@test.com","productId":"super-agent-playbook"}'

# Should be rejected by email validation regex
```

## Final Checklist

- [ ] All TypeScript files compile without errors
- [ ] Email modal opens and closes smoothly
- [ ] Email sends successfully via Resend
- [ ] Email template renders correctly (HTML + text)
- [ ] Download link works on first click
- [ ] Download link fails on second click (one-time use)
- [ ] Expired links return proper error message
- [ ] Mobile responsive on iOS and Android
- [ ] No console errors in browser
- [ ] API routes return proper status codes
- [ ] Environment variables configured correctly
- [ ] `.env.local` not committed to Git (in `.gitignore`)
- [ ] Production URLs use HTTPS
- [ ] Resend dashboard shows successful deliveries

---

**Ready for deployment when all checkboxes are ✅**
