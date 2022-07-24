import { getDBProducts } from '../services/productService';

export const getProducts = async (event) => {
  const  products = await getDBProducts();
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true 
    },
    body: JSON.stringify(products)
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
