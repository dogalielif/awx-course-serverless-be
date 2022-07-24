import { createDBProduct } from '../services/productService';

export const createProduct = async (event) => {
  const product = event?.body && JSON.parse(event.body);
  return await createDBProduct(product);
};
