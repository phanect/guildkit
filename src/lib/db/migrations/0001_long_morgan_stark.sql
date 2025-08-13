CREATE TABLE "jobsAndCandidatesRelation" (
	"appliedJobId" uuid NOT NULL,
	"candidateId" text NOT NULL,
	CONSTRAINT "jobsAndCandidatesRelation_appliedJobId_candidateId_pk" PRIMARY KEY("appliedJobId","candidateId")
);
--> statement-breakpoint
ALTER TABLE "Jobs" RENAME TO "job";--> statement-breakpoint
ALTER TABLE "job" DROP CONSTRAINT "Jobs_employerId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "userProps" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "userProps" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "jobsAndCandidatesRelation" ADD CONSTRAINT "jobsAndCandidatesRelation_appliedJobId_job_id_fk" FOREIGN KEY ("appliedJobId") REFERENCES "public"."job"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobsAndCandidatesRelation" ADD CONSTRAINT "jobsAndCandidatesRelation_candidateId_user_id_fk" FOREIGN KEY ("candidateId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_employerId_user_id_fk" FOREIGN KEY ("employerId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;