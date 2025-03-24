<script lang="ts">
  import JobCard from "$lib/components/JobCard.svelte";
  import type { Job } from "@prisma/client";
  import JobCardEmpty from "./JobCardEmpty.svelte";

  type Props = {
    jobs: Job[];
    editable?: boolean;
  };

  const { jobs, editable = false }: Props = $props();
</script>

<style>
  .joblist {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 2.5em;
    row-gap: 2.5rem;

    max-width: 100%;
    width: fit-content;
  }
</style>

<section class="joblist">
  {#each jobs as job (job.id)}
    <JobCard { job } { editable } />
  {/each}

  {#if jobs.length % 2 === 1}
    <JobCardEmpty />
  {/if}
</section>
