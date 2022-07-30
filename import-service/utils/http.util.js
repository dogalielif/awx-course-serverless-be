import logger from './logger.util';

const HttpCode = {
  OK: 200,
  ACCEPTED: 202,
  SERVER_ERROR: 500
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true 
}


export const requestHandler = (async (event, fn) => {
  try {

    logger.log(event);
    const response = await fn(event);
    const statusCode = response.statusCode || HttpCode.OK

    const resp = statusCode === HttpCode.OK ? {
      statusCode,
      headers: CORS_HEADERS,
      body: JSON.stringify(response)
    } : {
      statusCode,
      headers: CORS_HEADERS
    }

    console.log(`response: ${JSON.stringify(resp)}`);

    return resp;
  } catch(err) {

    const error = {
      body: JSON.stringify(err?.message || 'Error occured'),
      statusCode: err?.statusCode  || HttpCode.SERVER_ERROR
    }

    logger.error(JSON.stringify(error));
    
    return {
      ...error,
      headers: CORS_HEADERS
    }
  }
})