import { getDBProducts } from '../services/productService';
import { requestHandler } from '../../utils/http.util';

export const getProducts = (event) => requestHandler(event, async (e) => {
    return await getDBProducts();
  }
);

