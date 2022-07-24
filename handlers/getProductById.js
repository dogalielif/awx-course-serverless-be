import { getDBProductById } from '../services/productService';

export const getProductById = async (event) => {
  const { productId } = event.pathParameters;
  const  product = await getDBProductById(productId);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true 
    },
    body: JSON.stringify(product)
  };
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
