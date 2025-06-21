<script lang="ts">
  import Link from "$lib/components/generic/Link.svelte";
  import JobList from "$lib/components/JobList.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { jobs = [], role } = data;
  const editable = (role === "RECRUITER" || role === "ADMIN");
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 2.5em;

    width: 100%;
  }

  .button-section {
    display: flex;
    justify-content: start;

    background-color: #f0f0f0;
    box-shadow: 2px 2px 5px 5px #d0d0d0;
    border-radius: 0.5rem;

    width: 42.5rem;
    max-width: 100%;
    padding: 1rem;
}
</style>

<div class="container">
  <section class="button-section">
    <Link href="/employer/jobs/new" preload={true}>
      Add job
    </Link>
  </section>

  <JobList {jobs} {editable} />
</div>
