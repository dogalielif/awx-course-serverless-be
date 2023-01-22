import { createDBProduct, sendNotification } from '../services/productService';
import { requestHandler } from '../utils/http.util';

export const catalogBatchProcess = (event) => requestHandler(event, async (event) => {
  console.log('sqs event ', event)
  const newProducts = [].concat(...(event.Records.map(({body}) => JSON.parse(body))));
  try {
    const results = await Promise.all(newProducts.map(async (product) => {
      return await createDBProduct(product);
    }));
    await sendNotification(results);
    return results;
  } catch(err) {
    throw new Error(err);
  }
});
