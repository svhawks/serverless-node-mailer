'use strict';
const querystring = require('querystring')
module.exports.helloWorld = (event, context, callback) => {
  // send json as row content
  // const body = JSON.parse(event.body);
  // console.log(body);
  console.log("============================================================================================================>");
  let data = Object.assign({}, querystring.parse(event.body), event.pathParameters, event.queryStringParameters)
  console.log(data['from_email']);
  // console.log(event.body.from_email);


  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: event.body
    }),
  };

  callback(null, response);
};
