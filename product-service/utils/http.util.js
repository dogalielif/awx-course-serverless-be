import logger from './logger.util';

const HttpCode = {
  OK: 200,
  SERVER_ERROR: 500
};


export const requestHandler = (async (event, fn) => {
  try {

    logger.log(event);
    const response = await fn(event);

    return {
      statusCode: HttpCode.OK,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true 
      },
      body: JSON.stringify(response)
    }
  } catch(err) {

    const message = err?.message || 'Error occured' 
    logger.error(err);
    
    return {
      statusCode: err?.statusCode  || HttpCode.SERVER_ERROR,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true 
      },
      body: JSON.stringify(message)
    }
  }
})