import db from "../db";
import  { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const REGION = 'eu-west-1';

const getSNSClient = async () => await new SNSClient({ region: REGION });

export const getDBProducts = async () => {
  try {
    const resp = await db.query('SELECT * FROM products as p inner join stocks as s on p.id = s.product_id')
    return resp?.rows ? resp?.rows : resp;
  } catch(err) {
    throw new Error(err);
  }
}

export const getDBProductById = async (id) => {
  try {
    const resp = await db.query('SELECT * FROM products WHERE id = $1', [id])
    return resp?.rows ? resp?.rows : resp;
  } catch(err) {
    throw new Error(err);
  }
}

export const createDBProduct = async (product) => {
  console.log('product to create: ', product);
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
  try {
    const resp = await db.query('INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING *', [title, description, price]);
    if(resp?.rows?.[0]) {
      await db.query('INSERT INTO stocks(product_id, count) VALUES($1, $2) RETURNING *', [resp?.rows[0].id, count])
    }
    return resp?.rows?.[0] ? resp.rows?.[0] : resp;
  } catch (err) {
    throw new Error(err);
  }
}

export const sendNotification = async (createdProducts) => {
  const params = {
    Subject: 'New products added to aws course project',
    Message: `Added products are \r\n ${JSON.stringify(createdProducts)}`,
    TopicArn: process.env.SNS_ARN
  };

  try {
    const snsClient = await getSNSClient();
    const data = await snsClient.send(new PublishCommand(params));
    console.log('sns response: ', data);
    return data;
  } catch(err) {
    console.log('sns error: ', err);
    throw new Error(err);
  }
}

