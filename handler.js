'use strict';

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.secret_key;

const getAccessToken = function(params){
  return jwt.sign(params, SECRET_KEY, {
    algorithm: 'HS512'
  });
}

const verifyToken = function(event){
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
    console.log("DecodedToken: ", decodedToken);

    effect = 'Allow';
    console.log("effect: ", effect);
  }catch(err){
    effect = 'Deny';
    console.log("effect: ", effect);
  }
  return effect;
}

module.exports.validateToken = (event, context, callback) => {
  var userInfo = verifyToken(event);
  console.log("userId: ", userInfo.userId);
  console.log("companyId: ", userInfo.companyId);
  
  var user = [userInfo.companyId, userInfo.userId];

  const effect = getEffect(event);
  console.log("effect:", effect);

  callback(null, {
      "principalId": user.join("|"),
      "policyDocument": {
        "Version": "2012-10-17",
        "Statement": [
            {
              "Action": [
                'lambda:InvokeFunction',
                'execute-api:Invoke'
              ],
              "Effect": effect,
              "Resource": event.methodArn
            }
          ]   
      }
  });

  console.log("event: ", event);
};
