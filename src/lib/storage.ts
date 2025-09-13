import { env } from "node:process";
import { Client } from "minio";

type OmitFirst<T extends unknown[]> = T extends [ infer _, ...infer R ] ? R : never;

const storage = new Client({
  endPoint: env.STORAGE_ENDPOINT ?? `${ env.STORAGE_BUCKET }.s3express-${ env.STORAGE_AVAILABILITY_ZONE }.${ env.STORAGE_REGION }.amazonaws.com`,
  port: parseInt(env.STORAGE_PORT ?? "9000"),
  region: env.STORAGE_REGION ?? undefined,
  useSSL: true,
  accessKey: env.STORAGE_ACCESS_KEY,
  secretKey: env.STORAGE_SECRET_KEY,
});

if (!env.STORAGE_BUCKET) {
  throw new Error("Bucket name is not configured for the object storage");
}

if (!(await storage.bucketExists(env.STORAGE_BUCKET))) {
  throw new Error(`Bucket "${ env.STORAGE_BUCKET }" does not exist!`);
}

export const fPutObject = async (...args: OmitFirst<Parameters<typeof storage.fPutObject>>) =>
  storage.fPutObject(env.STORAGE_BUCKET ?? "BUCKET_NAME_IS_NOT_SET", ...args);
