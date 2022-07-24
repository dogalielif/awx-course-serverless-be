import db from "../db";

export const getDBProducts = async () => {
  try {
    const products = await db.query('SELECT * FROM products')
    return products?.rows;
  } catch (e) {
    throw new Error(e);
  }
}

export const getDBProductById = async (id) => {
  const product = await db.query('SELECT * FROM products WHERE id = $1', [id])
  return product.rows;
}

