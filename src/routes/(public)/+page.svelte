<script lang="ts">
  import JobList from "$lib/components/JobList.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
</script>

<style lang="scss">
  .h1 {
    font-size: 1.5rem;
    font-weight: 900;
    color: #404040;
    text-align: center;

    margin-bottom: 1.2rem;
  }
</style>

<h1 class="h1">求人検索</h1>

<JobList jobs={ data.jobs } />
