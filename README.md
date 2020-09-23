# serverless-jwt-authorizer


- jwt alogorithm: HS512
- secretKey value & header name for accessToken are saved on AWS as Lambda environment variables
- princiapId is composed of 'userId' and 'companyId' with the delimiter '|' (ex. company1234|user1234)
- values that can be caught in authorizer function can be trasferred using context(in authorizer function) & mapping template(in target function method)
  [reference](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#context-variable-reference)



