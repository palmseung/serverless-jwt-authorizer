'use strict';

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.secret_key;
const ACCESS_TOKEN_HEADER = "authorizationToken";

const getAccessToken = function(params){
  return jwt.sign(params, SECRET_KEY, {
    algorithm: 'HS512'
  });
}

const verifyToken = function(event){
  const headers = event.headers;
  const tokenInHeader = event.authorizationToken;
  console.log("token: ", tokenInHeader);

  return jwt.verify(tokenInHeader, SECRET_KEY, {
    algorithm: 'HS512'
  });
}

const getEffect = function(event){
  var effect = null;
  try{
    const decodedToken = verifyToken(event);
    effect = 'Allow';
  }catch(err){
    effect = 'Deny';
  }
  return effect;
}

module.exports.validateToken = (event, context, callback) => {
  var userInfo = {
    userId: "user1234",
    companyId: "company1234"
  }

  console.log("event: ", event);
  console.log("effect: ",getEffect(event));

  return callback(null, {
    "principalId": "user",
    "policyDocument": {
      "Version": "2012-10-17",
      "Statement": [
          {
            "Action": "execute-api:Invoke",
            "Effect": getEffect(event),
            "Resource": event.methodArn
          }
        ]   
    }
  });
};
