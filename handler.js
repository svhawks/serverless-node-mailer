'use strict';

module.exports.helloWorld = (event, context, callback) => {
  const body = JSON.parse(event.body);

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: body
    }),
  };

  callback(null, response);
};
