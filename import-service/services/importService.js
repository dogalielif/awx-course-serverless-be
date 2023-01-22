const csv = require('csv-parser');

import { PutObjectCommand, CopyObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET = 'import-products-aws-course-bucket-2';
const REGION = 'eu-west-1';

const gets3Client = async () => await new S3Client({ region: REGION });
const getSQSClient = async () => await new SQSClient({region: REGION});

export const getSigned = async (event) => {
  const { name } = event.queryStringParameters;
  const bucketParams = {
    Bucket: BUCKET,
    Key: `uploaded/${name}`,
    Prefix: 'uploaded/',
  }
  
  try {
    const s3Client = await gets3Client();
    const command = new PutObjectCommand(bucketParams);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return signedUrl;

  } catch(err) {
    throw new Error(err);
  }
}


export const changePath = async (record) => {
  const s3Client = await gets3Client();

  const copyParams = {
    Bucket: BUCKET,
    CopySource: BUCKET + '/' + record.s3.object.key,
    Key: record.s3.object.key.replace('uploaded', 'parsed')
  };

  try {

    const data = await s3Client.send(new CopyObjectCommand(copyParams));
    console.log("Copy command success with response", data);
    const deleteResponse = await s3Client.send(new DeleteObjectCommand({Bucket: BUCKET, Key: record.s3.object.key}));
    console.log("Delete command success with response", deleteResponse);

  } catch (err) {
    console.log(`Error while changing file location ${err}`);
    throw new Error(err);
  }
}

export const getParsedObject = async (record) => {
  try {
    const s3Client = await gets3Client();

    const command = new GetObjectCommand({
      Bucket: BUCKET, 
      Key: record.s3.object.key
    });
    const item = await s3Client.send(command);
    return new Promise((resolve, reject) => {
      const results = [];
      item.Body.pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log(`parsed result: ${JSON.stringify(results)}`);
        resolve(results);
      });
    })
  } catch(err) {
    throw new Error(err);
  }
}

export const sendMessageToSQS = async (parsedProduct) => {
  try {
    const sqsClient = await getSQSClient();

    const params = {
      MessageBody: JSON.stringify(parsedProduct),
      QueueUrl: "https://sqs.eu-west-1.amazonaws.com/317080564677/catalog-items-queue"
    };
    const data = await sqsClient.send(new SendMessageCommand(params));
    return data;
  } catch(err) {
    console.log('error: ', err);
    throw new Error(err);
  }
}