import data from "../mock/data";

export const getDBProducts = async () => {
  return data
}

export const getDBProductById = async (productId) => {
  return data.find(({id}) => id === productId);
}


