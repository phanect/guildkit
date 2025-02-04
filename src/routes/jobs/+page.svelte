<script lang="ts">
  import JobCard from "$lib/components/JobCard.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
</script>

<section class="p-24 flex flex-col">
  <div class="grid grid-cols-3 justify-between gap-6">
    {#each data?.jobs as job (job.id)}
      <JobCard {job} />
    {/each}
  </div>
</section>
