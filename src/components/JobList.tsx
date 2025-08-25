import { JobCard, type JobCardInfo } from "@/components/JobCard.tsx";
import { JobCardEmpty } from "@/components/JobCardEmpty.tsx";
import "./JobList.module.scss";

type Props = {
  jobs: JobCardInfo[];
  editable?: boolean;
};

export const JobList = ({ jobs, editable = false }: Props) => (
  <section className="joblist">
    { jobs.map((job) => <JobCard job={job} editable={editable} key={job.id} />) }

    { jobs.length % 2 === 1 && <JobCardEmpty /> }

    { jobs.length <= 0 && <p>There are no open positions at the moment.</p>}
  </section>
);
