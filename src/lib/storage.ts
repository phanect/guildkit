import { env } from "node:process";
import {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
  BucketAlreadyExists,
  BucketAlreadyOwnedByYou,
  waitUntilBucketExists,
} from "@aws-sdk/client-s3";

const createBucketIfNotExists = async (client: S3Client, bucketName: string) => {
  try {
    await client.send(new CreateBucketCommand({
      Bucket: bucketName,
    }));
    await waitUntilBucketExists({
      client,
      maxWaitTime: 20,
    }, { Bucket: bucketName });
  } catch (err) {
    if (err instanceof BucketAlreadyOwnedByYou) {
      // Skip creating the bucket because it already exists.
    } else if (err instanceof BucketAlreadyExists) {
      throw new Error(`The bucket "${ bucketName }" already exists in someone's AWS account. Bucket names must be globally unique.`);
    } else {
      throw err;
    }
  }
};

if (!env.STORAGE_ACCESS_KEY) {
  throw new Error("`STORAGE_ACCESS_KEY` environment variable is not configured for the object storage.");
}

if (!env.STORAGE_SECRET_KEY) {
  throw new Error("`STORAGE_SECRET_KEY` environment variable is not configured for the object storage.");
}

if (!env.STORAGE_BUCKET) {
  throw new Error("`STORAGE_BUCKET` environment variable is not configured for the object storage.");
}

const storage = new S3Client({
  endpoint: env.STORAGE_ENDPOINT,
  forcePathStyle: true, // Required for Min.io
  region: env.STORAGE_REGION,
  credentials: {
    accessKeyId: env.STORAGE_ACCESS_KEY,
    secretAccessKey: env.STORAGE_SECRET_KEY,
  },
});

await createBucketIfNotExists(storage, env.STORAGE_BUCKET);

export const putObject = async (destPath: string, file: File) =>
  storage.send(new PutObjectCommand({
    Bucket: env.STORAGE_BUCKET,
    Key: destPath,
    Body: Buffer.from(await file.arrayBuffer()),
  }));

export const endPointURL = env.STORAGE_ENDPOINT
  ? `${ env.STORAGE_ENDPOINT }/${ env.STORAGE_BUCKET }`
  : `https://s3.${ env.STORAGE_REGION }.amazonaws.com/${ env.STORAGE_BUCKET }`;

export const logoDirName = "org-logos";
