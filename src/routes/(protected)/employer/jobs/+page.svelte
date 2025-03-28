<script lang="ts">
  import Button from "$lib/components/generic/Button.svelte";
  import JobList from "$lib/components/JobList.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { jobs = [], role } = data;
  const editable = (role === "EMPLOYER" || role === "ADMIN");
</script>

<section class="p-24 flex flex-col">
  <Button href="/employer/jobs/new" preload={true}>
    Add job
  </Button>

  <JobList {jobs} {editable} />
</section>
