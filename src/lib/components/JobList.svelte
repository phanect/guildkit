<script lang="ts">
  import JobCard from "$lib/components/JobCard.svelte";
  import type { Job } from "@prisma/client";

  type Props = {
    jobs: Job[];
    editable?: boolean;
  };

  const { jobs, editable = false }: Props = $props();
</script>

<style lang="scss">
  .joblist {
    display: flex;
    justify-content: start;
    align-items: flex-start;
    column-gap: 2.5em;
    row-gap: 2.5rem;

    max-width: 96rem;
    width: 100%;
  }
</style>

<section class="joblist">
  {#each jobs as job (job.id)}
    <JobCard { job } { editable } />
  {/each}
</section>
