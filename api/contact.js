import nodemailer from "nodemailer";

export default async function handler(req, res) {
   if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
   }

   try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
         return res.status(400).json({
            message: "Name, email, and message are required.",
         });
      }

      const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
         },
      });

      await transporter.sendMail({
         from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
         to: process.env.EMAIL_TO,
         replyTo: email,
         subject: `New portfolio message from ${name}`,
         text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });

      return res.status(200).json({
         success: true,
         message: "Message sent successfully.",
      });
   } catch (error) {
      console.error("Contact form error:", error);

      return res.status(500).json({
         success: false,
         message: "Unable to send message. Please try again later.",
      });
   }
}