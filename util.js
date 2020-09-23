/**
  * Returns an IAM policy document for a given user and resource.
  *
  * @method buildIAMPolicy
  * @param {String} userId - user id
  * @param {String} effect  - Allow / Deny
  * @param {String} resource - resource ARN
  * @param {String} context - response context
  * @returns {Object} policyDocument
  */
 const buildIAMPolicy = (userInfo, effect, resource, context) => {
    console.log(`buildIAMPolicy ${userInfo.companyId|userInfo.userId} ${effect} ${resource}`);
    const policy = {
      principalId: userInfo.companyId|userInfo.userId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource,
          },
        ],
      },
      context,
    };
  
    console.log(JSON.stringify(policy));
    return policy;
  };
  
  module.exports = {
    buildIAMPolicy,
  };
  