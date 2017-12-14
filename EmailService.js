const NodeMailer = require('nodemailer')

class EmailService {

    constructor(smtpHost, smtpUsername, smtpPassword, smtpPort) {
        this.smtpHost = smtpHost;
        this.smtpUsername = smtpUsername;
        this.smtpPassword = smtpPassword;
        this.smtpPort = smtpPort;
    }


    _smtpConnect() {
        return new Promise((resolve) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = NodeMailer.createTransport({
                host: this.smtpHost,
                port: this.smtpPort,
                secure: false,
                tls: { ciphers: 'SSLv3' },
                auth: {
                    user: this.smtpUsername,
                    pass: this.smtpPassword
                }
            })
            resolve(transporter)
        })
    }


    sendEmail(from, to, subject, body) {
        return this._smtpConnect()
        .then((transporter) => {
            return new Promise((resolve, reject) => {
                // setup email data with unicode symbols
                let mailOptions = {
                    from: from, // sender address
                    to: to, // list of receivers
                    subject: subject, // Subject line
                    text: body, // plain text body
                    html: body // html body
                }

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.log("ERRORRRR")
                      console.log(error)
                      reject(error)
                    }
                    else {
                        console.log('Message sent: %s', info.messageId);
                        resolve(info)
                    }
                })
            })
        })
    }
}

module.exports = EmailService
