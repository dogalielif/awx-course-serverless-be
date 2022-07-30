import { createDBProduct } from '../services/productService';
import { requestHandler } from '../utils/http.util';

export const createProduct = (event) => requestHandler(event, async (event) => {
  const product = event?.body && JSON.parse(event.body);
  return await createDBProduct(product);
});
