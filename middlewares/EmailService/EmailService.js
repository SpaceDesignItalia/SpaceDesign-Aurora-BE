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
    });
  }

  static sendCustomerWelcomeMail(email, name, surname, password) {
    const emailTemplatePath = path.join(
      __dirname,
      "EmailTemplate/WelcomeCustomerModel.html"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

    let htmlContent = emailTemplate
      .replace("${name}", name)
      .replace("${surname}", surname)
      .replace("${email}", email)
      .replace("${password}", password);

    const sendCustomerWelcomeMail = {
      from: `Space Design Italia <${mailData.mail}>`,
      to: email,
      subject: "Benvenuto nel mondo di Space Design Italia!",
      text:
        "Caro/a " +
        name +
        " " +
        surname +
        ",\n\nSiamo entusiasti di darti il benvenuto nel fantastico mondo di Space Design Italia! Non vediamo l'ora di iniziare questa avventura insieme e creare qualcosa di straordinario! 🚀✨",
      html: htmlContent,
    };

    transporter.sendMail(sendCustomerWelcomeMail, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  }

  static sendPasswordChangedMail(email, name, surname) {
    const emailTemplatePath = path.join(
      __dirname,
      "EmailTemplate/PasswordChanged.html"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

    let htmlContent = emailTemplate
      .replace("${name}", name)
      .replace("${surname}", surname);

    const sendPasswordChangedMail = {
      from: `Space Design Italia <${mailData.mail}>`,
      to: email,
      subject: "Password di accesso modificata!",
      text:
        "Caro/a " +
        name +
        " " +
        surname +
        ",\n\nLa tua password di accesso è stata modificata!",
      html: htmlContent,
    };

    transporter.sendMail(sendPasswordChangedMail, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  }

  static sendPasswordRecoveryMail(email, recoveryCode) {
    const emailTemplatePath = path.join(
      __dirname,
      "EmailTemplate/PasswordRecovery.html"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

    let htmlContent = emailTemplate.replace("${recoveryCode}", recoveryCode);

    const sendPasswordRecoveryMail = {
      from: `Space Design Italia <${mailData.mail}>`,
      to: email,
      subject: "Recupero password",
      text:
        "Ciao! Ecco il codice per recuperare la tua password: " + recoveryCode,
      html: htmlContent,
    };

    transporter.sendMail(sendPasswordRecoveryMail, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  }

  static sendTicketTaskStatusChangeMail(
    email,
    companyName,
    ticketName,
    taskStatus
  ) {
    const emailTemplatePath = path.join(
      __dirname,
      "EmailTemplate/TicketTaskStatusChange.html"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

    let htmlContent = emailTemplate
      .replace("${companyName}", companyName)
      .replace("${ticketName}", ticketName)
      .replace("${taskStatus}", taskStatus);

    const sendTicketTaskStatusChangeMail = {
      from: `Space Design Italia <${mailData.mail}>`,
      to: email,
      subject: "Stato del ticket modificato",
      text:
        "Ciao! Il ticket " + ticketName + " ha cambiato stato in " + taskStatus,
      html: htmlContent,
    };

    transporter.sendMail(sendTicketTaskStatusChangeMail, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  }

  static sendNewEventMail(
    email,
    eventName,
    eventStartDate,
    eventEndDate,
    eventStartTime,
    eventEndTime,
    eventDescription,
    eventLocation,
    partecipants,
    acceptUrl,
    rejectUrl
  ) {
    const emailTemplatePath = path.join(
      __dirname,
      "EmailTemplate/NewEventTemplate.html"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

    let partecipantsString = "";
    for (const partecipant of partecipants) {
      partecipantsString += partecipant.EventPartecipantEmail + "<br />";
    }

    let htmlContent = emailTemplate
      .replace("${eventName}", eventName)
      .replace(
        "${eventStartDate}",
        eventStartDate == eventEndDate
          ? eventStartDate.split("T")[0] + " " + eventStartTime
          : eventStartDate.split("T")[0] + " - " + eventEndDate.split("T")[0]
      )
      .replace("${eventDescription}", eventDescription)
      .replace("${acceptUrl}", acceptUrl)
      .replace("${rejectUrl}", rejectUrl)
      .replace("${partecipants}", partecipantsString)
      .replace("${eventLocation}", eventLocation);

    const sendNewEventMail = {
      from: `Space Design Italia <${mailData.mail}>`,
      to: email,
      subject: "Nuovo evento",
      text:
        "Ciao! L'evento " + eventName + " è stato aggiunto al tuo calendario.",
      html: htmlContent,
    };

    transporter.sendMail(sendNewEventMail, (error, info) => {
      if (error) {
        return console.log(error);
      } else {
        console.log("Email inviata con successo a " + email);
      }
    });
  }

  static sendCustomerEliminationMail(email, name, surname) {
    const emailTemplatePath = path.join(
      __dirname,
      "EmailTemplate/CustomerEliminationTemplate.html"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

    let htmlContent = emailTemplate
      .replace("${name}", name)
      .replace("${surname}", surname);

    const sendCustomerEliminationMail = {
      from: `Space Design Italia <${mailData.mail}>`,
      to: email,
      subject: "Notifica di Disattivazione Account",
      text: `Gentile ${name} ${surname}, Ti informiamo che il tuo account è stato disattivato. Per qualsiasi informazione, puoi contattare il nostro servizio clienti.`,
      html: htmlContent,
    };

    transporter.sendMail(sendCustomerEliminationMail, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  }
}
module.exports = EmailService;
