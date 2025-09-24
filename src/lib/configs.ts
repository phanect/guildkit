import { env } from "node:process";
import type { S3ClientConfig } from "@aws-sdk/client-s3";

// TODO make these items configurable by the GuildKit instance admins

type BaseStorageConfig = S3ClientConfig & {
  /** Bucket name. Default to "guildkit" */
  bucket?: string;

  // Unconfigurable by default
  /** @deprecated This parameter is only required for Cloudflare R2 and ignored for this platform. */
  accountId?: undefined;
};

type CloudflareR2Config = Omit<BaseStorageConfig, "accountId" | "region"> & {
  platform: "cloudflare";
  accountId?: string;

  // Unconfigurable parameters
  /** @deprecated `region` is always `auto` on Cloudflare R2. */
  region?: "auto";
};

type MinioConfig = Omit<BaseStorageConfig, "region" | "forcePathStyle"> & {
  platform: "minio";

  // Unconfigurable parameters
  /** @deprecated This parameter is ignored. `region` is always `us-east-1` for Min.io. */
  region?: "us-east-1";
  /** @deprecated This parameter is ignored. `forcePathStyle` is always `true` for Min.io. */
  forcePathStyle?: true;
};

type DevStorageConfig = Omit<MinioConfig, "platform" | "endpoint" | "credentials"> & {
  platform: "development";
};

type AwsS3OrCustomConfig = BaseStorageConfig & {
  platform: "aws" | "custom";
};

export type GuildKitConfig = {
  storage: CloudflareR2Config | MinioConfig | DevStorageConfig | AwsS3OrCustomConfig;
  maxLogoSizeMiB: number;
};

const config: GuildKitConfig = {
  storage: env.SERVER_ENV === "development" ? {
    platform: "development",
  } : {
    platform: "cloudflare",
  },
  maxLogoSizeMiB: 8,
};

export default config;
