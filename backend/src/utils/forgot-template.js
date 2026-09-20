import env from "dotenv";
env.config();

export const forgotPasswordTemplate = (fullname,link) => {
    return `
    
    <!-- Paste this as the HTML body of your email -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Reset your password</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Helvetica,Arial,sans-serif;">
    <!-- Preheader (hidden) -->
    <div style="display:none;max-height:0px;overflow:hidden;mso-hide:all;">
      Reset your password — this link expires in 1 hour.
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <!-- Container -->
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.08);">
            <!-- Header / Logo -->
            <tr>
              <td style="padding:20px 24px;text-align:center;background:#ffffff;">
                <!-- If you have a logo -->
                <img src="https://raw.githubusercontent.com/kartikrajjjj/expense-tracker-app/main/frontend/public/app-logo.png" alt="Expense Tracker" width="120" style="max-width:120px;height:auto;border:0;display:block;margin:0 auto 8px;" />
                <h1 style="margin:0;font-size:20px;font-weight:600;color:#111827;">Expense Tracker App</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 24px 20px;color:#374151;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.5;">
                  Hi <strong>${fullname}</strong>,
                </p>

                <p style="margin:0 0 20px;font-size:16px;line-height:1.5;">
                  We received a request to reset your password. Click the button below to choose a new password. This link will expire in <strong>15 minutes</strong>.
                </p>

                <!-- Button -->
                <table cellpadding="0" cellspacing="0" role="presentation" style="margin:20px 0;">
                  <tr>
                    <td align="center">
                      <a href="${link}"
                         style="
                           display:inline-block;
                           padding:12px 22px;
                           font-size:16px;
                           font-weight:600;
                           color:#ffffff;
                           text-decoration:none;
                           border-radius:6px;
                           background:#1f6feb;
                           border:1px solid #1f6feb;
                         "
                         target="_blank"
                         rel="noopener">
                        Reset my password
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 16px;font-size:14px;line-height:1.5;color:#6b7280;">
                  If that button doesn't work, copy and paste the following link into your browser:
                </p>

                <p style="word-break:break-all;margin:0 0 20px;font-size:13px;color:#0366d6;">
                  <a href="${link}" style="color:#0366d6;text-decoration:underline;" target="_blank" rel="noopener">
                  ${link}
                  </a>
                </p>

                <p style="margin:0;font-size:14px;line-height:1.5;color:#6b7280;">
                  If you didn't request a password reset, you can safely ignore this email or <a href="mailto:{{}}" style="color:#0366d6;text-decoration:underline;">contact support</a>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 24px;background:#f8fafc;color:#9ca3af;font-size:13px;text-align:center;">
                <div style="margin-bottom:8px;">Thanks, <strong>Expense</strong></div>
                <div style="color:#9ca3af">If you need help, email <a href="mailto:${process.env.SENDER_EMAIL}" style="color:#9ca3af;text-decoration:underline;">
                ${process.env.SENDER_EMAIL}</a>
                </div>
                <div style="margin-top:12px;font-size:12px;color:#cbd5e1;">
                  This link expires in 1 hour. For security, do not share this email.
                </div>
              </td>
            </tr>
          </table>

          <!-- Small legal / unsubscribe area -->
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;margin-top:12px;">
            <tr>
              <td style="text-align:center;font-size:12px;color:#9aa0a6;padding:6px 12px;">
                © <span id="year"></span> Expense. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <script>
      // Optional: sets current year for inboxes that render script (many won't)
      try { document.getElementById('year').innerText = new Date().getFullYear(); } catch(e) {}
    </script>
  </body>
</html>

    
    `;
}