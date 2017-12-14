'use strict';
require('handlebars');

module.exports.helloWorld = (event, context, callback) => {
  const opt = JSON.parse(event.options)
  console.log(event.options);
  console.log(event.content);
  console.log(opt.email_from);

  var template = Handlebars.compile(event.content);
  var data = JSON.parse(event.options);
  var result = template(data);
  console.log(result);
  
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      message: event
    }),
  };

  callback(null, response);
};
