import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const ADDENDUM = `\t\t...press Ctrl+C to terminate.\n`;
const SERVER_URL = process.env.SERVER_URL || 'http://localhost';

// Re-create __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
   },
});

app.post("/api/contact", async (req, res) => {
   const { name, email, message } = req.body;

   if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
   }

   try {
      await transporter.sendMail({
         from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
         to: process.env.EMAIL_TO,
         replyTo: email,
         subject: `New message from ${name}`,
         text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
         html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      });

      res.status(200).json({ message: "Message sent successfully." });
   } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ message: "Could not send message." });
   }
});

transporter.verify((error, success) => {
   if (error) {
      console.error("SMTP configuration error:", error);
   } else {
      console.log("Email server is ready to send messages.");
   }
});



/********************************** app listening *********************************/
app.listen(PORT, () => {
   console.log(`  ➔  Server:  Listening at ${SERVER_URL}:${PORT} in ${NODE_ENV} mode!`);
   console.log(ADDENDUM);
});