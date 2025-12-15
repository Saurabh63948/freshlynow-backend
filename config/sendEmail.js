// config/sendEmail.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendEmail = async ({ sendTo, subject, html }) => {
  await transporter.sendMail({
    from: `"Binkeyit" <${process.env.GMAIL_USER}>`,
    to: sendTo,
    subject,
    html,
  });
};

export default sendEmail;
