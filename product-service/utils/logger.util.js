export default {
  log: (event) => {
    const { body, pathParameters } = event;
    console.log(`request body: ${JSON.stringify(body)}`)
    console.log(`request pathParameters: ${JSON.stringify(pathParameters)}`)
  },
  error: (error) => {
    console.error('error statusCode: ', error.statusCode);
    console.error('error message: ', error.message);
  }
}