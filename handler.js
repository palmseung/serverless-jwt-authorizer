'use strict';

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.secret_key;
const ACCESS_TOKEN_HEADER = process.env.access_token_header;

const getAccessToken = function(params){
  return jwt.sign(params, SECRET_KEY, {
    algorithm: 'HS512'
  });
}

const verifyToken = function(event){
  const headers = event.headers;
  const tokenInHeader = headers[ACCESS_TOKEN_HEADER];
  console.log("SSIDA: ", tokenInHeader);

  return jwt.verify(tokenInHeader, SECRET_KEY, {
    algorithm: 'HS512'
  });
}

module.exports.validateToken = async event => {
  var userInfo = {
    userId: "user1234",
    companyId: "company1234"
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        input: event,
        token: getAccessToken(userInfo),
        returenedUserInfo: verifyToken(event),
        param: event.headers.Accept
      },
      null,
      2
    ),
  };
};
