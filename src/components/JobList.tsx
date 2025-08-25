import { JobCard, type JobCardInfo } from "@/components/JobCard.tsx";
import { JobCardEmpty } from "@/components/JobCardEmpty.tsx";

type Props = {
  jobs: JobCardInfo[];
  editable?: boolean;
};

export const JobList = ({ jobs, editable = false }: Props) => (
  <section className="flex justify-center flex-wrap gap-x-10 gap-y-10 max-w-full w-fit">
    { jobs.map((job) => <JobCard job={job} editable={editable} key={job.id} />) }

    { jobs.length % 2 === 1 && <JobCardEmpty /> }

    { jobs.length <= 0 && <p>There are no open positions at the moment.</p>}
  </section>
);
