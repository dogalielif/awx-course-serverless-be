import { PutObjectCommand, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { success } from "../../utils/http.util";

const BUCKET = 'import-products-aws-course-bucket';
const REGION = 'us-east-1';

const gets3Client = async () => await new S3Client({ region: REGION });

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

    return success(signedUrl);

  } catch(err) {
    throw new Error(err);
  }
}

