
function escapeHtml(value = "") {
   return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

export function contactFormMessageTemplate({name, email, message}) {

   const safeName = escapeHtml(name);
   const safeEmail = escapeHtml(email);
   const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

   return `
    <!DOCTYPE html>
    <html lang="en-US">
      <body style="margin:0; padding:0; font-family:Arial, sans-serif; color:#222;">
        <section style="max-width:640px; margin:0 auto; padding:16px;">
          <div style="padding:16px; text-align:center; background:#1f628e;">
            <h1 style="margin:0; color:#fff;">Contact Form Message</h1>
          </div>

          <div style="padding:16px; background:#f9f9f9;">
            <p>Hello Mahdi,</p>
            <p>You have a message from your portfolio contact form.</p>

            <div style="margin:16px auto;">
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Message:</strong></p>
              <p>${safeMessage}</p>
            </div>

            <p>Best regards,<br>Your Contact Form</p>
          </div>

          <div style="padding:16px; font-size:12px; text-align:center; color:#888;">
          <p>This is an automated email.</p>
          <p>Reply to this ${email} to contact the sender.</p>
          </div>
        </section>
      </body>
    </html>
  `;



}

export default contactFormMessageTemplate;