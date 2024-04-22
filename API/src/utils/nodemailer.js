const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html, attachments }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.EmailPassword,
    },
  });

  const emailInfo = await transporter.sendMail({
    from: `Nafsi mental health <${process.env.Email}>`,
    to,
    subject,
    html,
    attachments,
  });

  return emailInfo.accepted.length < 1 ? false : true;
};

module.exports = {sendEmail};