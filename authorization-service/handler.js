const Effect = {
  Allow: 'Allow',
  Deny: 'Deny'
}

const generatePolicyDocument = (effect, resource) => {
  return {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource
    }]
  }
}

const generateResponse = (principalId, effect, resource) => {
  return {
    principalId,
    policyDocument: generatePolicyDocument(effect, resource)
  }
} 

module.exports.restApiTokenAuthorizer = async (event) => {
  console.log(event);
  const { authorizationToken, methodArn } = event;
  const decodedToken = Buffer.from(authorizationToken.split(' ')[1], 'base64').toString('utf8');

  console.log('decode base64', decodedToken);
  
  const principalId = 'test';

  console.log('env variales', process.env)

  const response = decodedToken === process.env.AUTH_TOKEN 
  ? generateResponse(principalId, Effect.Allow, methodArn) 
  : generateResponse(principalId, Effect.Deny, methodArn) 

  console.log('Response', JSON.stringify(response));

  return await Promise.resolve(response);
}

