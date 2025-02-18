<script lang="ts">
  import JobCard from "$lib/components/JobCard.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { role } = data;
</script>

<section class="p-24 flex flex-col">
  <a
    href="/employer/jobs/new"
    class="btn btn-sm bg-black w-fit rounded-full text-white mb-6"
    data-sveltekit-preload-data="hover"
  >Add</a>
  <div class="grid grid-cols-3 justify-between gap-6">
    {#each data?.jobs as job (job.id)}
      <JobCard {job} {role} />
    {/each}
  </div>
</section>
