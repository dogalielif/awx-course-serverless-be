import { getDBProductById } from '../services/productService';
import { requestHandler } from '../utils/http.util';

export const getProductById = (event) => requestHandler(event, async (e) => {
  const { productId } = e.pathParameters;
  return await getDBProductById(productId);
});
