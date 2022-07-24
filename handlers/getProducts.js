import { getDBProducts } from '../services/productService';

export const getProducts = async (event) => {
  return await getDBProducts();
};
