CREATE TABLE "orgProps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"emails" text[],
	"addresses" text[] NOT NULL,
	"currencies" "Currency"[] NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "organizationAndRecruiterRelation" (
	"organizationId" text NOT NULL,
	"recruiterId" text NOT NULL,
	CONSTRAINT "organizationAndRecruiterRelation_organizationId_recruiterId_pk" PRIMARY KEY("organizationId","recruiterId")
);
--> statement-breakpoint
ALTER TABLE "job" DROP CONSTRAINT "job_employerId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "props_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "recruits_for" text;--> statement-breakpoint
ALTER TABLE "job" ADD COLUMN "employer" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organizationAndRecruiterRelation" ADD CONSTRAINT "organizationAndRecruiterRelation_organizationId_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizationAndRecruiterRelation" ADD CONSTRAINT "organizationAndRecruiterRelation_recruiterId_user_id_fk" FOREIGN KEY ("recruiterId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_employer_organization_id_fk" FOREIGN KEY ("employer") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" DROP COLUMN "company";--> statement-breakpoint
ALTER TABLE "job" DROP COLUMN "employerId";