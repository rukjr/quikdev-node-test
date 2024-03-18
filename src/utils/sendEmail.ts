import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, text: string) {
  let transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  let info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: to,
    subject: subject,
    text: text,
    html: text,
  });

  console.log("Message sent: %s", info.messageId);
}
