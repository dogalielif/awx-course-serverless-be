import db from "../db";
import { responseHandler, errorHandler } from "../utils/http.util";

export const getDBProducts = async () => {
  try {
    const resp = await db.query('SELECT * FROM products as p inner join stocks as s on p.id = s.product_id')
    return responseHandler(resp?.rows);
  } catch(err) {
    return errorHandler(err);
  }
}

export const getDBProductById = async (id) => {
  try {
    const resp = await db.query('SELECT * FROM products WHERE id = $1', [id])
    return responseHandler(resp?.rows);
  } catch(err) {
    return errorHandler(err);
  }
}

export const createDBProduct = async (product) => {
  if(!product) {
    return errorHandler({statusCode: 400, message: 'Product cannot be null'})
  }
  try {
    const { title, price, description } = product;
    if(!title || !price || !description) {
      return errorHandler({statusCode: 400, message: 'Product should have title, price and description properties'})
    }
    const resp = await db.query('INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING *', [title, description, price])
    if(resp?.rows?.[0]) {
      await db.query('INSERT INTO stocks(product_id, count) VALUES($1, $2) RETURNING *', [resp?.rows[0].id, 3])
    }
    return responseHandler(resp?.rows);
  } catch(err) {
    return errorHandler(err);
  }
}

