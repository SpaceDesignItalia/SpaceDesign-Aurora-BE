var nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const mailData = {
  mail: "noreply@spacedesign-italia.it",
  pass: "@Gemellini04",
};

const transporter = nodemailer.createTransport({
  host: "smtp.ionos.it",
  port: 587,
  secure: false,
  auth: {
    user: mailData.mail,
    pass: mailData.pass,
  },
});

class EmailService {
  static sendStafferWelcomeMail(email, name, surname, password) {
    const emailTemplatePath = path.join(
      __dirname,
      "EmailTemplate/WelcomeStafferModel.html"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

    let htmlContent = emailTemplate
      .replace("${name}", name)
      .replace("${surname}", surname)
      .replace("${email}", email)
      .replace("${password}", password);

    const sendStafferWelcomeMail = {
      from: `Space Design Italia <${mailData.mail}>`,
      to: email,
      subject: "Benvenuto a bordo del team di Space Design Italia",
      text: "Benvenuto nel team di Space Design Italia! Siamo entusiasti di averti con noi.",
      html: htmlContent,
    };

    transporter.sendMail(sendStafferWelcomeMail, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  }

  static sendStafferRemoval(email, fullname) {
    const emailTemplatePath = path.join(
      __dirname,
      "EmailTemplate/RemovalSafferModel.html"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

    let htmlContent = emailTemplate.replace("${fullname}", fullname);

    const sendStafferRemovalMail = {
      from: `Space Design Italia <${mailData.mail}>`,
      to: email,
      subject: "Collaborazione con Space Design Italia terminata",
      text:
        "Caro/a " +
        fullname +
        ",\n\nVogliamo informarti che la tua collaborazione con Space Design Italia è terminata. Ti ringraziamo sinceramente per il tuo contributo e ti auguriamo il meglio per il futuro.",
      html: htmlContent,
    };

    transporter.sendMail(sendStafferRemovalMail, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  }
}
module.exports = EmailService;
