import data from "../mock/data";

export const getDBProducts = async () => {
  if (!data || !data.length) {
    throw new Error('Products not found');
  }
  return data
}

export const getDBProductById = async (productId) => {
  const product = data.find(({id}) => id === productId);
  if (!product) {
    return new Error('Products not found')
  }
  return product;
}


