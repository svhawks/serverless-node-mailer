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

module.exports.notifier = (event, context, callback) => {
  // Parse email content variables
  const variables = JSON.parse(event.variables)

  // Fill template with variables
  var template = Handlebars.compile(event.content);
  var templateContent = template(variables);
  // Fill subject with variables
  var subject = Handlebars.compile(event.subject);
  var templateSubject = subject(variables);

  // Parse email deliver options
  const opt = JSON.parse(event.options)

  // Parse smtp settings
  var smtp = JSON.parse(event.smtp);


  // Send Email
  const emailService = createEmailService(smtp)

  var service = emailService.sendEmail(
    opt.email_from,
    opt.email_to,
    templateSubject,
    templateContent,
    opt.cc,
    opt.bcc
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
      message: 'Success!'
    }),
  };

  callback(null, response);
};
