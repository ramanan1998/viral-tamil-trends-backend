export const emailTemplate = ({ email, password, appName, username }: any) => `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8" />
    <title>${appName} - Login Credentials</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f4f6;font-family:Arial, sans-serif;">
    <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.08);">

        <!-- Header -->
        <div style="background:#0f62fe;color:#fff;padding:20px 24px;">
        <h2 style="margin:0;font-size:20px;font-weight:600;">Welcome to ${appName}</h2>
        </div>

        <!-- Body -->
        <div style="padding:24px;">
        <p style="font-size:15px;color:#333;margin-bottom:16px;">
            Hi <strong>${username}</strong>,
        </p>

        <p style="font-size:15px;color:#333;margin-bottom:20px;">
            Your account has been successfully created. Below are your login credentials:
        </p>

        <table style="width:100%;border:1px solid #e6e6ea;border-radius:6px;margin:14px 0;border-collapse:collapse;">
            <tr>
            <td style="padding:12px 16px;font-size:13px;color:#666;border-bottom:1px solid #f0f0f3;"><strong>Email</strong></td>
            <td style="padding:12px 16px;font-size:13px;color:#111;">${email}</td>
            </tr>
            <tr>
            <td style="padding:12px 16px;font-size:13px;color:#666;"><strong>Password</strong></td>
            <td style="padding:12px 16px;font-size:13px;color:#111;">${password}</td>
            </tr>
        </table>

        <p style="font-size:14px;color:#333;margin:20px 0;">
            ⚠️ For your safety, please change your password after logging in.
        </p>

        <a href="#" style="display:inline-block;background:#0f62fe;color:#fff;text-decoration:none;font-weight:600;padding:10px 16px;border-radius:6px;">
            Login Now
        </a>

        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />

        <p style="font-size:12px;color:#777;">
            If you did not create this account, ignore this email or contact support.
        </p>
        </div>

        <!-- Footer -->
        <div style="background:#fafafa;padding:16px 24px;text-align:center;color:#999;font-size:12px;">
        © ${new Date().getFullYear()} ${appName}. All rights reserved.
        </div>
    </div>
    </body>
    </html>
`;