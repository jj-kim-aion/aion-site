export function getDownloadEmailHTML(
  productName: string,
  downloadUrl: string,
  recipientEmail: string
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
                <a href="mailto:tech@aionresearch.io" style="color: #a78bfa; text-decoration: none;">tech@aionresearch.io</a>
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
  recipientEmail: string
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

Thanks for your interest in ${productName}. 
Your secure download link is below.

Download Link:
${downloadUrl}

⏱️ IMPORTANT: This link expires at ${expiryTime}
The link is unique to you and becomes invalid after download.

────────────────────────────────

This email was sent to ${recipientEmail}

Questions? Reply to this email or contact us at tech@aionresearch.io

© ${new Date().getFullYear()} Aion Research. All rights reserved.
  `.trim();
}
