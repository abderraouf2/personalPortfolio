import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fullName, email, message } = req.body;

    // Create a transporter using your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.COMPANY,
        pass: process.env.PASS,
      },
    });

    try {
      // Send the email
      await transporter.sendMail({
        from: "mimoune.abderraouf@gmail.com",
        to: "abderraouf.mimoune@inttic.dz",
        subject: "Contact from MR Stodio",
        text: `Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
      });

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to send email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
