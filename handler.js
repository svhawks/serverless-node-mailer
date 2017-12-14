'use strict';
var EmailService = require('./EmailService')
var Handlebars = require('handlebars');

function createEmailService(smtp) {
    const emailService = new EmailService(
        smtp.address,
        smtp.username,
        smtp.password,
        smtp.port
    )
    return emailService
}

module.exports.helloWorld = (event, context, callback) => {
  const opt = JSON.parse(event.options)
  // console.log(event.options);
  // console.log(event.content);
  // console.log(opt.email_from);

  var smtp = JSON.parse(event.smtp);

  var template = Handlebars.compile(event.content);
  var templateResult = template(opt);

  // Send Email
  const emailService = createEmailService(smtp)
  console.log(smtp);
  var service = emailService.sendEmail(
    opt.email_from,
    opt.email_to,
    opt.subject,
    templateResult
  ).then((info) => {
      callback(null, info)
  })
  .catch(error => {
      callback(null, error)
  })

  const response = {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({
      message: service
    }),
  };

  callback(null, response);
};
