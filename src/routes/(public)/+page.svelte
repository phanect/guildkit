<script lang="ts">
  import JobList from "$lib/components/JobList.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
</script>

<JobList jobs={ data.jobs } />
