import db from "../db";

export const getDBProducts = async () => {
  const resp = await db.query('SELECT * FROM products as p inner join stocks as s on p.id = s.product_id')
  return resp?.rows ? resp?.rows : resp;
}

export const getDBProductById = async (id) => {
    const resp = await db.query('SELECT * FROM products WHERE id = $1', [id])
    return resp?.rows ? resp?.rows : resp;
}

export const createDBProduct = async (product) => {
  if(!product) {
    const error = new Error('Product cannot be null')
    error.statusCode = 400;
    throw error; 
  }
 
  const { title, price, description } = product;
  const count = product.count || 1;
  if(!title || !price || !description) {
    const error = new Error('Product should have title, price and description properties');
    error.statusCode = 400;
    throw error; 
  }
  const resp = await db.query('INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING *', [title, description, price])
  if(resp?.rows?.[0]) {
    await db.query('INSERT INTO stocks(product_id, count) VALUES($1, $2) RETURNING *', [resp?.rows[0].id, count])
  }
  return resp?.rows ? resp.rows : resp;
 
}

