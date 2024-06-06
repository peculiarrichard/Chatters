import { S3Client, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import type { RcFile } from "antd/lib/upload";

const region = process.env.AWS_REGION;
const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
} as S3ClientConfig);

export const uploadToS3 = async (file: RcFile | File): Promise<string> => {
  try {
    const key = file.name;
    const response = await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file,
        ContentType: file.type,
      })
    );
    const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    return url;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
