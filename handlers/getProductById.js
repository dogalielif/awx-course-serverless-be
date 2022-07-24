import { getDBProductById } from '../services/productService';

export const getProductById = async (event) => {
  const { productId } = event.pathParameters;
  return await getDBProductById(productId);
};
