ALTER TABLE "orgProps" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "organizationAndRecruiterRelation" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "orgProps" CASCADE;--> statement-breakpoint
DROP TABLE "organizationAndRecruiterRelation" CASCADE;--> statement-breakpoint
ALTER TABLE "userProps" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "userProps" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "addresses" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "currencies" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "emails" text[];--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "about" text;--> statement-breakpoint
ALTER TABLE "organization" DROP COLUMN "props_id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "recruits_for";--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_url_unique" UNIQUE("url");