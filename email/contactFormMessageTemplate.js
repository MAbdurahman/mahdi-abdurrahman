
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

   return `<!DOCTYPE html>
<html lang='en-US'>

<head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>
    <meta content='width=device-width, initial-scale=1.0' name='viewport'>
    <meta name='x-apple-disable-message-reformatting'/>
    <title>Contact Form Message</title>
    <link href='https://fonts.googleapis.com' rel='preconnect'>
    <link crossorigin href='https://fonts.gstatic.com' rel='preconnect'>
    <link
            href='https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans+Mono:wght@100..900&display=swap'
            rel='stylesheet'>
    <link href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
          rel='stylesheet'>
</head>
<style media='all' rel='stylesheet'>
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
    }
    
    *::-moz-focus-inner {
        border: 0;
    }
    
    *:focus {
        outline: none;
    }
    
    body {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        line-height: 1.6;
        color: #222;
    }
    
    section.container {
        max-width: 640px;
        min-width: 310px;
        margin: 0 auto;
        padding: 16px;
    }
    
    .header {
        padding: 16px;
        text-align: center;
        background: linear-gradient(to right, #1f628e, #1a5175);
    }
    
    .main_content {
        padding: 16px;
        background-color: #f9f9f9;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .header h1 {
        margin: 0;
        font-family: 'Lora', serif;
        color: white;
    }
    
    .paragraph_one {
        margin-bottom: 12px;
    }
    
    .paragraph_two {
        margin-bottom: 8px;
    }
    
    .message_container {
        margin: 16px auto;
        text-align: center;
    }
    
    .footer {
        margin-top: 2px;
        margin-bottom: 2px;
        padding: 16px;
        font-size: 0.8em;
        text-align: center;
        color: #888;
    }

</style>

<body>
<section class='container'>
    <div class='header'>
        <h1>Contact Form Message</h1>
    </div>
    <div class='main_content'>
        <p class='paragraph_one'>Hello&nbsp;Mahdi,</p>
        <p class='paragraph_two'>You have a message from your portfolio contact form.</p>
        <div class='message_container'>
            <p class='paragraph_two'><strong>Name:</strong>${safeName}</p>
            <p class='paragraph_two'><strong>Email:</strong>${safeEmail}</p>
            <p class='paragraph_two'><strong>Message:</strong></p>
            <p class='paragraph_two'>${safeMessage}</p>
        </div>
        <p class='paragraph_two'>Best regards,<br>Your Contact Form</p>
    </div>
    <div class='footer'>
        <p>This is an automated email.</p>
        <p>Reply directly to ${safeEmail} to contact the sender.</p>
    </div>
</section>
</body>

</html>`;



}

export default contactFormMessageTemplate;