import { env } from "node:process";
import {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
  BucketAlreadyExists,
  BucketAlreadyOwnedByYou,
  waitUntilBucketExists,
  type S3ClientConfig,
} from "@aws-sdk/client-s3";
import config from "./configs.ts";

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

const { platform: storagePlatform, bucket: configFileBucket, accountId: configFileAccountId, ...storageConfig } = config.storage;

const bucket = configFileBucket ?? env.STORAGE_BUCKET ?? "guildkit";
const cloudflareAccountId = configFileAccountId ?? env.CLOUDFLARE_ACCOUNT_ID;

if (storagePlatform === "cloudflare" && !cloudflareAccountId) {
  throw new Error("Cloudflare account ID is not configured for Cloudflare R2. Set `accountId` in your guildkit.config.ts or `CLOUDFLARE_ACCOUNT_ID` environment variable.");
}

const s3Config: S3ClientConfig = {
  ...storageConfig,

  // Hard-coded configs
  ...(
    storagePlatform === "development" ? {
      endpoint: "http://localhost:9000",
      forcePathStyle: true, // Required for Min.io
      region: "us-east-1", // Min.io's default
      credentials: {
        accessKeyId: "guildkit", // Same as MINIO_ROOT_USER configured in compose.yaml
        secretAccessKey: "guildkit", // Same as MINIO_ROOT_PASSWORD configured in compose.yaml
      },
    } : storagePlatform === "cloudflare" ? {
      endpoint: config.storage.endpoint ?? `https://${ cloudflareAccountId }.r2.cloudflarestorage.com`,
      region: "auto", // Cloudflare's default
    } : {} // empty if storagePlatform === "aws" or "custom"
  ),
};

const storage = new S3Client(s3Config);

await createBucketIfNotExists(storage, bucket);

/**
 *
 * @param destPath - path to put given file
 * @param file - file object to put
 * @returns Path for logo including bucket name
 */
export const putObject = async (destPath: string, file: File) => {
  await storage.send(new PutObjectCommand({
    Bucket: bucket,
    Key: destPath,
    Body: Buffer.from(await file.arrayBuffer()),
  }));

  return `/${ bucket }/${ destPath }`;
};

export const logoDirName = "org-logos";
