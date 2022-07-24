export const HttpCode = {
  OK: 200,
  SERVER_ERROR: 500
};


export const responseHandler = ((response) => {
    return {
      statusCode: HttpCode.OK,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true 
      },
      body: JSON.stringify(response)
  }
})

export const errorHandler = ((err) => {
  const message = err.message || 'Server error occured'
    return {
      statusCode: err.statusCode || HttpCode.SERVER_ERROR,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true 
      },
      body: JSON.stringify(message)
  }
})