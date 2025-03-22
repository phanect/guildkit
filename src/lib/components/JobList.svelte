<script lang="ts">
  import JobCard from "$lib/components/JobCard.svelte";
  import type { Job } from "@prisma/client";

  type Props = {
    jobs: Job[];
    editable?: boolean;
  };

  const { jobs, editable = false }: Props = $props();
</script>

<section class="p-24 flex flex-col">
  <div class="grid grid-cols-2 justify-between gap-6">
    {#each jobs as job (job.id)}
      <JobCard { job } { editable } />
    {/each}
  </div>
</section>
