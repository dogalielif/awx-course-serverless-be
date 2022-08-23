const Effect = {
  Allow: 'Allow',
  Deny: 'Deny'
}

const generatePolicyDocument = (effect, resource) => {
  return {
    version: '2012-10-17',
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

export const restApiTokenAuthorizer = (event) => {
  console.log(e);
  const { authorizationToken, methodArn } = e;
  
  const principalId = 'test';

  const response = authorizationToken === process.env.dogalielif 
  ? generateResponse(principalId, Effect.Allow, methodArn) 
  : generateResponse(principalId, Effect.Deny, methodArn) 

  console.log('Response', JSON.stringify(response));

  return response;
}

