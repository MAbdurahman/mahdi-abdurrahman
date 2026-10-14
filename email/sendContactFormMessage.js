import contactFormMessageTemplate from'./contactFormMessageTemplate.js';

 function sendContactFormMessage(name, email, message) {
    return contactFormMessageTemplate({ name, email, message });

 }

 export default sendContactFormMessage;