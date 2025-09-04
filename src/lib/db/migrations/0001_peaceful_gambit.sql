ALTER TABLE "orgProps" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "orgProps" CASCADE;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email_verified" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "banned" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "addresses" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "currencies" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "emails" text[];--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "about" text;--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "props_id";--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_url_unique" UNIQUE("url");