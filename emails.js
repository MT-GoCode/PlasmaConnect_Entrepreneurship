var nodemailer = require('nodemailer');

//  var transporter = nodemailer.createTransport({
//     name: 'www.plasmaconnect.com',
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "af63a472437541",
//       pass: "4b95941083a8d8"
//     },
//     debug: true, // show debug output 
//   logger: true // log information in console
//   });
 var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "tminh.us@gmail.com",
      pass: "Minhkien"
    },
    debug: true, // show debug output 
  logger: true // log information in console
  });

  transporter.verify(function(error, success) {
    if (error) {
         console.log(error);
    } else {
         console.log('Server is ready to take our messages');
    }
 });

const mailOptions = {
sender: 'plasmaconnect@app.com',
replyTo: 'plasmaconnect@app.com',
  from: 'plasmaconnect@app.com',
  to: 'tminh.us@gmail.com, tnlinh@gmail.com',
  subject: 'Invoices due',
  text: 'H E E L L O.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});