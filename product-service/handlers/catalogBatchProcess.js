import { createDBProduct } from '../services/productService';
import { requestHandler } from '../utils/http.util';

export const catalogBatchProcess = (event) => requestHandler(event, async (event) => {
  console.log('sqs event ', event)
  const newProducts = [].concat(...(event.Records.map(({body}) => JSON.parse(body))));
  try {
    console.log('products: ', newProducts)
    const results = await Promise.all(newProducts.map(async (product) => {
      console.log('should not be array', product);
      return await createDBProduct(product);
    }));
    console.log('mapped results', results);
    return results;
  } catch(err) {
    throw new Error(err);
  }
});
