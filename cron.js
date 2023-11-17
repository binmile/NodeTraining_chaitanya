const cron = require("node-cron");
const nodemailer = require("nodemailer");

async function mailer(req, res) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "chaitanyamailer@gmail.com",
      pass: "lvwi mjcl jauy oyek",
    },
  });
  try {
    const info = await transporter.sendMail({
      from: '"chaitanya 👻" <chaitanmailer@gmail.com>',
      to: "chaitanmailer@gmail.com",
      subject: "Hello ✔",
      text: "first mail",
      html: "<b>Male1</b>",
    });
    res.send(`Message sent: %s, ${info.messageId}`);
  } catch (error) {
    res.status(500).send("Error sending the email: " + error.message);
  }
}

cron.schedule("* * * * *", () => {
  
});
