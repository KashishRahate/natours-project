const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter (service that send email)
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail "less secure app" option
  });
  // 2) Define the email options
  const mailOptions = {
    from: 'Kashish Rahate <hello@kashish.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // 3)  Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
