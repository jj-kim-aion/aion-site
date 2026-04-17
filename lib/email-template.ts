export function getDownloadEmailHTML(
  productName: string,
  downloadUrl: string,
  recipientEmail: string,
  orderId: string
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Aion Super Agents Playbook Download</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #e5e5e5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #111111; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
              <h1 style="margin: 0; font-size: 24px; font-weight: 300; color: #f5f5f5; letter-spacing: -0.02em;">
                Aion Research
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #737373; font-family: 'Courier New', monospace;">
                Building Super Agents
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 300; color: #f5f5f5;">
                Your Download is Ready
              </h2>
              
              <div style="margin-bottom: 24px; font-size: 14px; color: #737373;">
                Order ID: <strong style="color: #a3a3a3; font-family: 'Courier New', monospace;">${orderId}</strong>
              </div>

              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #a3a3a3;">
                Thanks for your interest in <strong style="color: #e5e5e5;">${productName}</strong>. 
                Click the button below to download your copy.
              </p>

              <!-- Download Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${downloadUrl}" 
                       style="display: inline-block; padding: 16px 32px; background-color: #18181b; color: #f5f5f5; text-decoration: none; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.12); font-size: 14px; font-weight: 500; letter-spacing: 0.02em; transition: all 0.2s;">
                      Download Playbook
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Security Notice -->
              <div style="margin: 24px 0; padding: 16px; background-color: rgba(147, 51, 234, 0.06); border: 1px solid rgba(147, 51, 234, 0.12); border-radius: 6px;">
                <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #c084fc;">
                  <strong style="display: block; margin-bottom: 4px; color: #e9d5ff;">⏱️ Link Expires in 6 Hours</strong>
                  This download link is unique to you and expires at <strong>${new Date(Date.now() + 6 * 60 * 60 * 1000).toLocaleString('en-US', { 
                    timeZone: 'UTC',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short'
                  })}</strong>. After download, the link becomes invalid.
                </p>
              </div>

              <!-- Alternative Link -->
              <p style="margin: 24px 0 0 0; font-size: 13px; line-height: 1.6; color: #737373;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin: 8px 0 0 0; padding: 12px; background-color: #0a0a0a; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 4px; font-size: 12px; color: #a3a3a3; word-break: break-all; font-family: 'Courier New', monospace;">
                ${downloadUrl}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #737373;">
                This email was sent to <strong style="color: #a3a3a3;">${recipientEmail}</strong>
              </p>
              <p style="margin: 0; font-size: 13px; color: #737373;">
                Questions? Reply to this email or reach us at 
                <a href="mailto:research@aionlabs.io" style="color: #a78bfa; text-decoration: none;">research@aionlabs.io</a>
              </p>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #525252;">
                © ${new Date().getFullYear()} Aion Research. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function getDownloadEmailText(
  productName: string,
  downloadUrl: string,
  recipientEmail: string,
  orderId: string
): string {
  const expiryTime = new Date(Date.now() + 6 * 60 * 60 * 1000).toLocaleString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return `
AION RESEARCH
Building Super Agents

────────────────────────────────

Your Download is Ready

Order ID: ${orderId}

Thanks for your interest in ${productName}. 
Your secure download link is below.

Download Link:
${downloadUrl}

⏱️ IMPORTANT: This link expires at ${expiryTime}
The link is unique to you and becomes invalid after download.

────────────────────────────────

This email was sent to ${recipientEmail}

Questions? Reply to this email or contact us at research@aionlabs.io

© ${new Date().getFullYear()} Aion Research. All rights reserved.
  `.trim();
}

export function getFollowupEmailHTML(
  productName: string,
  recipientEmail: string
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>How is your experience with ${productName}?</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #e5e5e5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #111111; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
              <h1 style="margin: 0; font-size: 24px; font-weight: 300; color: #f5f5f5; letter-spacing: -0.02em;">
                Aion Research
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #737373; font-family: 'Courier New', monospace;">
                Follow-up: ${productName}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 300; color: #f5f5f5;">
                Checking in on your progress
              </h2>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #a3a3a3;">
                Hi there, it's been a couple of days since you downloaded the <strong style="color: #e5e5e5;">${productName}</strong>. 
                I wanted to reach out and see how you're getting on with it.
              </p>

              <div style="margin: 24px 0; padding: 20px; background-color: rgba(255, 255, 255, 0.02); border-left: 3px solid #8b5cf6; border-radius: 4px;">
                <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 500; color: #f5f5f5;">A few things we're curious about:</p>
                <ul style="margin: 0; padding: 0 0 0 20px; font-size: 14px; color: #a3a3a3; line-height: 1.6;">
                  <li style="margin-bottom: 8px;">Did you have a chance to run the initial configuration?</li>
                  <li style="margin-bottom: 8px;">How is the performance of the agents in your environment?</li>
                  <li style="margin-bottom: 8px;">Was there any particular feature that stood out (or was confusing)?</li>
                </ul>
              </div>

              <p style="margin: 24px 0 0 0; font-size: 15px; line-height: 1.6; color: #a3a3a3;">
                We're constantly refining these systems based on real-world usage and hope this playbook helps you build more capable agentic systems.
              </p>

              <p style="margin: 24px 0 0 0; font-size: 15px; line-height: 1.6; color: #a3a3a3;">
                Happy building,<br>
                The Aion Research Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #737373;">
                Sent to <strong style="color: #a3a3a3;">${recipientEmail}</strong> regarding your recent download.
              </p>
              <p style="margin: 0; font-size: 13px; color: #737373;">
                Aion Research — Building Super Agents
              </p>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #525252;">
                © ${new Date().getFullYear()} Aion Research. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function getFollowupEmailText(
  productName: string,
  recipientEmail: string
): string {
  return `
AION RESEARCH
Checking in: ${productName}

────────────────────────────────

Hi there,

It's been a couple of days since you downloaded the ${productName}. 
I wanted to reach out and see how you're getting on with it.

A few things we're curious about:
1. Did you have a chance to run the initial configuration?
2. How is the performance of the agents in your environment?
3. Was there any particular feature that stood out (or was confusing)?

We're constantly refining these systems based on real-world usage and hope this playbook helps you build more capable agentic systems.

Happy building,
The Aion Research Team

────────────────────────────────

This email was sent to ${recipientEmail}
© ${new Date().getFullYear()} Aion Research. All rights reserved.
  `.trim();
}

