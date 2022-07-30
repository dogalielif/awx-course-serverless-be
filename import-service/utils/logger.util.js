export default {
  log: (event) => {
    const { body, pathParameters, queryStringParameters } = event;
    console.log(`request body: ${JSON.stringify(body)}`)
    console.log(`request pathParameters: ${JSON.stringify(pathParameters)}`)
    console.log(`request queryStringParameters: ${JSON.stringify(queryStringParameters)}`)
  },
  error: (error) => {
    console.error('error statusCode: ', error.statusCode);
    console.error('error body: ', error.body);
  }
}