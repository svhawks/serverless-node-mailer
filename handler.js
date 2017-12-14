'use strict';
const querystring = require('querystring')
module.exports.helloWorld = (event, context, callback) => {

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: event
    }),
  };

  callback(null, response);
};
