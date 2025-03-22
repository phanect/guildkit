<script lang="ts">
  import JobCard from "$lib/components/JobCard.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
</script>

<style>
  .h1 {
    font-size: 1.5rem;
    font-weight: 900;
    color: #404040;
    text-align: center;

    margin-bottom: 1.2rem;
  }
</style>

<h1 class="h1">求人検索</h1>
<section class="p-24 flex flex-col">
  <div class="grid grid-cols-3 justify-between gap-6">
    {#each data?.jobs as job (job.id)}
      <JobCard {job} role={null} />
    {/each}
  </div>
</section>
