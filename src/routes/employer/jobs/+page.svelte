<script lang="ts">
  import Button from "$lib/components/generic/Button.svelte";
  import JobList from "$lib/components/JobList.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { jobs = [], role } = data;
  const editable = (role === "EMPLOYER" || role === "ADMIN");
</script>

<style>
  .button-section {
    display: flex;
    justify-content: end;

    width: 100%;
  }
</style>

<section class="button-section">
  <Button href="/employer/jobs/new" preload={true}>
    Add job
  </Button>
</section>

<JobList {jobs} {editable} />
