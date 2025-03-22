<script lang="ts">
  import JobList from "$lib/components/JobList.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { jobs = [], role } = data;
  const editable = (role === "EMPLOYER" || role === "ADMIN");
</script>

<section class="p-24 flex flex-col">
  <a
    href="/employer/jobs/new"
    class="btn btn-sm bg-black w-fit rounded-full text-white mb-6"
    data-sveltekit-preload-data="hover"
  >Add</a>

  <JobList {jobs} {editable} />
</section>
